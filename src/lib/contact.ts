import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site.config";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

/**
 * Upstash-backed rate limiter, created only when the Redis env vars are set.
 *
 * On Vercel/serverless the in-memory fallback below resets on cold start and
 * is per-instance, so it is a bot-slowing speed bump at best. Set
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN to get a durable,
 * shared counter across all instances. Without them the site degrades
 * gracefully instead of crashing.
 */
let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter !== null) return limiter;

  const hasRedis =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

  limiter = hasRedis
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(
          MAX_ATTEMPTS,
          `${WINDOW_MS / 60_000} m`,
        ),
        prefix: "rl:contact",
        // Per-instance cache trims upstream Redis calls; correctness is
        // still guaranteed by the remote counter.
        ephemeralCache: new Map(),
      })
    : null;

  return limiter;
}

// In-memory fallback limiter. Keys expire after the window; the map is swept
// when it grows past a sane cap so memory stays bounded.
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkInMemory(key: string): boolean {
  const now = Date.now();

  if (attempts.size > 10_000) {
    for (const [k, record] of attempts) {
      if (record.resetAt < now) attempts.delete(k);
    }
  }

  const record = attempts.get(key);

  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) return false;

  record.count += 1;
  return true;
}

export async function checkRateLimit(key: string): Promise<boolean> {
  const active = getLimiter();

  if (active) {
    const { success } = await active.limit(key);
    return success;
  }

  return checkInMemory(key);
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  budget?: string;
  message: string;
}): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

  if (!apiKey) {
    // No credentials configured (local dev / not yet wired up). Log instead
    // of throwing so the form UX can still be exercised.
    console.warn("[contact] RESEND_API_KEY not set — email not sent", {
      to,
      from: input.email,
    });
    return { delivered: false };
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: `${siteConfig.name} site <notifications@${siteConfig.domain}>`,
    to,
    reply_to: input.email,
    subject: `New project inquiry from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.budget ? `Budget: ${input.budget}` : null,
      "",
      input.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { delivered: true };
}
