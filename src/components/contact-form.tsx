"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { contactLimits, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

const emptyFields: ContactFields = { name: "", email: "", message: "" };
const inputClass = "mt-2 w-full rounded-xl border border-brand/30 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/50 focus:border-brand focus:outline-2 focus:outline-offset-2 focus:outline-brand aria-invalid:border-red-700 disabled:opacity-60";

export function ContactForm() {
  const [values, setValues] = useState<ContactFields>(emptyFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const sending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof ContactFields, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  function showErrors(fieldErrors: ContactErrors) {
    setErrors(fieldErrors);
    setFeedback({ success: false, message: "Please check the highlighted fields." });
    const first = (["name", "email", "message"] as const).find((field) => fieldErrors[field]);
    if (first) {
      requestAnimationFrame(() => {
        const element = formRef.current?.elements.namedItem(first);
        if (element instanceof HTMLElement) element.focus();
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    setFeedback(null);
    const validation = validateContact(values);
    if (!validation.ok) {
      showErrors(validation.errors);
      return;
    }

    sending.current = true;
    setPending(true);
    setErrors({});
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        if (result.errors) showErrors(result.errors);
        setFeedback({ success: false, message: result.message || "We couldn’t confirm your submission. Please try again." });
        return;
      }
      setValues(emptyFields);
      setFeedback({ success: true, message: result.message });
    } catch {
      setFeedback({ success: false, message: "We couldn’t confirm your submission. Check your connection and try again. Your text is still here." });
    } finally {
      clearTimeout(timeout);
      sending.current = false;
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-labelledby="form-heading" aria-busy={pending} className="rounded-3xl border border-brand/20 bg-white p-6 sm:p-9">
      <h2 id="form-heading" className="text-2xl font-medium tracking-tight text-brand">Tell us about your project.</h2>
      <p className="mt-3 text-sm leading-6">All fields are required.</p>
      <div className="mt-7 space-y-6">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold">Name</label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={contactLimits.name} value={values.name} onChange={(event) => update("name", event.target.value)} disabled={pending} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass} />
          {errors.name && <p id="name-error" className="mt-2 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={contactLimits.email} value={values.email} onChange={(event) => update("email", event.target.value)} disabled={pending} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass} />
          {errors.email && <p id="email-error" className="mt-2 text-sm text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-semibold">Message</label>
          <textarea id="contact-message" name="message" required minLength={10} maxLength={contactLimits.message} rows={6} value={values.message} onChange={(event) => update("message", event.target.value)} disabled={pending} aria-invalid={Boolean(errors.message)} aria-describedby={`message-hint${errors.message ? " message-error" : ""}`} className={`${inputClass} min-h-40 resize-y`} />
          <p id="message-hint" className="mt-2 text-xs leading-5 text-ink/70">Include your facility type, the product you’re interested in, or what you’d like to improve. 10–3,000 characters.</p>
          {errors.message && <p id="message-error" className="mt-2 text-sm text-red-700">{errors.message}</p>}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {feedback && <p className={`mt-6 flex items-start gap-3 rounded-xl p-4 text-sm leading-6 ${feedback.success ? "bg-accent text-ink" : "border border-red-700 text-red-700"}`}>
          {feedback.success && <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />}
          {feedback.message}
        </p>}
      </div>
      <button type="submit" disabled={pending} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Send message"}
        {pending ? <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
      </button>
      <noscript><p className="mt-4 text-sm">Please enable JavaScript to submit this form.</p></noscript>
    </form>
  );
}
