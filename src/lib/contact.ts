import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/lib/site.config";

// In-memory fallback rate limiter. Resets on cold start / across serverless
// instances — fine as a bot-slowing speed bump, NOT a substitute for a real
// store. Swap for Upstash Redis (tech-stack.md D-010) once
// UPSTASH_REDIS_REST_URL / _TOKEN are set; the guard below already checks
// for them so this degrades gracefully rather than crashing without creds.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) return false;

  record.count += 1;
  return true;
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
    // No credentials configured yet (local dev / not wired up in P0–P4).
    // Log instead of throwing so the form UX can still be exercised.
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
    replyTo: input.email,
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
