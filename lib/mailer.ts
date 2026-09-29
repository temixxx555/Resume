import "server-only";
import { personal } from "@/data/site";
import type { ContactValues } from "./contact-shared";

/**
 * Transactional email is behind one function so the provider can be swapped without touching the form.
 * Configure with environment variables (never expose these to the client):
 *
 *   RESEND_API_KEY        API key from resend.com
 *   CONTACT_FROM_EMAIL    A sender on a domain you have verified, e.g. "Portfolio <hello@yourdomain.dev>"
 *   CONTACT_TO_EMAIL      Where messages are delivered (defaults to the address in data/site.ts)
 *
 * To use Postmark or another provider, replace the body of `deliver()`.
 */

export function isMailerConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}

export async function sendContactEmail(v: ContactValues) {
  if (!isMailerConfigured()) return { ok: false as const, reason: "not_configured" as const };
  return deliver(v);
}

async function deliver(v: ContactValues) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL ?? personal.email],
      reply_to: v.email,
      subject: `[Portfolio] ${v.type}: ${v.name}${v.company ? ` (${v.company})` : ""}`,
      text: `${v.message}\n\n—\nFrom: ${v.name} <${v.email}>\nCompany: ${v.company || "n/a"}\nType: ${v.type}`,
    }),
  });
  if (!res.ok) return { ok: false as const, reason: "provider_error" as const };
  return { ok: true as const };
}
