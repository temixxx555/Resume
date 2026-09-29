import { NextResponse, type NextRequest } from "next/server";
import { validateContact, type ContactValues } from "@/lib/contact-shared";
import { sendContactEmail } from "@/lib/mailer";

/**
 * Spam protection, in layers:
 *  1. Same-origin check.
 *  2. A honeypot field real people never see.
 *  3. A minimum fill time (bots submit instantly).
 *  4. Per-IP rate limiting. This in-memory limiter is per server instance; on serverless, swap it
 *     for a shared store (Upstash Redis, Vercel KV) or your host's WAF.
 *  5. Add a CAPTCHA (Cloudflare Turnstile, hCaptcha) at the marked spot if abuse appears.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Partial<ContactValues> & { website?: string; startedAt?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot or impossibly fast submission: respond as if it worked, and do nothing.
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (body.website || !(elapsed > 2500 && elapsed < 1000 * 60 * 60 * 24)) {
    return NextResponse.json({ ok: true });
  }

  // TODO(captcha): verify a Turnstile/hCaptcha token here before continuing.

  const values: ContactValues = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    company: String(body.company ?? ""),
    type: String(body.type ?? ""),
    message: String(body.message ?? ""),
  };
  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "invalid", fields: errors }, { status: 422 });
  }

  const result = await sendContactEmail(values);
  if (!result.ok) {
    // Not configured is an expected state, not an error: tell the client to fall back to a prefilled mailto: link.
    if (result.reason === "not_configured") return NextResponse.json({ ok: false, fallback: "mailto" });
    return NextResponse.json({ error: result.reason }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
