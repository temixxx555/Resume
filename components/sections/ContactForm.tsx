"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { inquiryTypes, toMailto, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact-shared";
import { personal } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const empty: ContactValues = { name: "", email: "", company: "", type: inquiryTypes[0], message: "" };

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (k: keyof ContactValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      if (res.ok) {
        const data = (await res.json()) as { ok?: boolean; fallback?: string };
        if (data.fallback === "mailto") {
          // No email provider configured: open the visitor's mail app with everything prefilled.
          window.location.href = toMailto(personal.email, values);
          setStatus("mailto");
        } else {
          setStatus("sent");
        }
      } else if (res.status === 422) {
        const data = (await res.json()) as { fields?: ContactErrors };
        setErrors(data.fields ?? {});
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => statusRef.current?.focus(), 50);
  }

  if (status === "sent" || status === "mailto") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[6px] border border-line bg-raised p-8 outline-none">
        <span className="mb-5 grid size-10 place-items-center rounded-full bg-accent text-on-accent">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="t-h3">{status === "sent" ? "Message sent." : "Your email app should be open."}</h3>
        <p className="t-body mt-3 max-w-md text-muted">
          {status === "sent"
            ? "Thanks. I will reply to the address you gave me."
            : `Everything is prefilled. If nothing opened, write to ${personal.email} directly.`}
        </p>
        <button
          type="button"
          className="u mt-6 min-h-11"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
            startedAt.current = Date.now();
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = "w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[1.05rem] outline-none transition-colors placeholder:text-faint focus:border-accent";

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${uid}-status`} className="space-y-8">
      <fieldset className="border-0 p-0">
        <legend className="t-mono mb-4 text-muted">What is this about?</legend>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((t) => {
            const on = values.type === t;
            return (
              <label
                key={t}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center rounded-[5px] border px-3.5 text-[0.9rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent md:min-h-10",
                  on ? "border-accent bg-accent text-on-accent" : "border-line-strong hover:border-fg",
                )}
              >
                <input
                  type="radio"
                  name="type"
                  value={t}
                  checked={on}
                  onChange={() => setValues((v) => ({ ...v, type: t }))}
                  className="sr-only"
                />
                {t}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Name" error={errors.name}>
          <input id={`${uid}-name`} name="name" autoComplete="name" value={values.name} onChange={set("name")} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} required />
        </Field>
        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} required />
        </Field>
      </div>
      <Field id={`${uid}-company`} label="Company / organisation" optional error={errors.company}>
        <input id={`${uid}-company`} name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={field} />
      </Field>
      <Field id={`${uid}-message`} label="What are you looking to build?" error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          className={cn(field, "resize-y")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${uid}-message-err` : undefined}
          required
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-solid !min-h-14 !px-7 disabled:opacity-70">
          <span>{status === "sending" ? "Sending…" : "Send message"}</span>
          {status === "sending" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="arrow size-4" aria-hidden="true" />}
        </button>
        <p id={`${uid}-status`} role="status" aria-live="polite" ref={statusRef} tabIndex={-1} className="text-[0.92rem] outline-none">
          {status === "error" ? (
            <span className="text-accent">
              Something went wrong. Please email <a href={`mailto:${personal.email}`} className="underline">{personal.email}</a> instead.
            </span>
          ) : (
            <span className="text-muted">No account, no newsletter. Just a reply.</span>
          )}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="t-mono mb-1 block text-muted">
        {label}
        {optional && <span className="text-faint"> · optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.88rem] text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
