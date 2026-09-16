import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkRateLimit, sendContactEmail } from "@/lib/contact";
import { contactSchema } from "@/lib/schema";

const MIN_FILL_TIME_MS = 1500;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!(await checkRateLimit(ip))) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }

  const { name, email, budget, message, company, renderedAt } = parsed.data;

  // Honeypot: any value here means a bot filled every field.
  if (company) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  // Time-trap: humans take at least a moment to fill the form out.
  if (Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { message: "Please try submitting again." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({ name, email, budget, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] send failed", error);
    return NextResponse.json(
      { message: "Couldn't send that right now. Please try again shortly." },
      { status: 502 },
    );
  }
}
