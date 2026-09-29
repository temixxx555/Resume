/** Validation shared by the browser form and the API route. Dependency-free on purpose. */

export const inquiryTypes = [
  "Full-time opportunity",
  "Contract / freelance project",
  "Startup collaboration",
  "Product development",
  "Other",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  type: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Please tell me your name.";
  if (v.name.length > 100) e.name = "That name is a little long.";
  if (!emailRe.test(v.email.trim()) || v.email.length > 200) e.email = "Please enter a valid email address.";
  if (v.company.length > 120) e.company = "Keep this under 120 characters.";
  if (!(inquiryTypes as readonly string[]).includes(v.type)) e.type = "Please choose one.";
  if (v.message.trim().length < 15) e.message = "A sentence or two about what you are building helps a lot.";
  if (v.message.length > 4000) e.message = "Please keep the message under 4,000 characters.";
  return e;
}

export function toMailto(to: string, v: ContactValues) {
  const subject = `${v.type}: ${v.name}${v.company ? ` (${v.company})` : ""}`;
  const body = `${v.message}\n\n—\n${v.name}\n${v.email}${v.company ? `\n${v.company}` : ""}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
