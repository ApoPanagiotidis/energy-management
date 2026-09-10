import type { ContactFields } from "./contact";

export class ContactDeliveryError extends Error {
  code: "NOT_CONFIGURED" | "UNAVAILABLE";

  constructor(code: "NOT_CONFIGURED" | "UNAVAILABLE") {
    super(code);
    this.code = code;
  }
}

// Called only from the server route. Keep inbox configuration out of client code.
export async function deliverContact(
  fields: ContactFields,
  environment: {
    NODE_ENV?: string;
    MAILPIT_URL?: string;
    RESEND_API_KEY?: string;
    CONTACT_FROM_EMAIL?: string;
    CONTACT_TO_EMAIL?: string;
  } = process.env,
  send: typeof fetch = fetch,
): Promise<"local" | "email"> {
  const local = environment.NODE_ENV === "development";
  if (local ? !environment.MAILPIT_URL : (
    !environment.RESEND_API_KEY?.trim() ||
    !environment.CONTACT_FROM_EMAIL?.trim() ||
    !environment.CONTACT_TO_EMAIL?.trim()
  )) {
    throw new ContactDeliveryError("NOT_CONFIGURED");
  }

  const subject = "Apollo Green Solutions — website enquiry";
  const text = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
  try {
    const response = await send(local
      ? new URL("/api/v1/send", environment.MAILPIT_URL)
      : "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(!local ? { Authorization: `Bearer ${environment.RESEND_API_KEY}` } : {}),
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify(local ? {
        From: { Name: "Apollo website preview", Email: "website@apollo.example" },
        To: [{ Name: "Local enquiries", Email: "enquiries@apollo.example" }],
        ReplyTo: [{ Name: fields.name, Email: fields.email }],
        Subject: subject,
        Text: text,
        Tags: ["contact-form"],
      } : {
        from: environment.CONTACT_FROM_EMAIL,
        to: [environment.CONTACT_TO_EMAIL],
        reply_to: fields.email,
        subject,
        text,
      }),
    });
    if (!response.ok) throw new ContactDeliveryError("UNAVAILABLE");
    if (!local) {
      const result: unknown = await response.json();
      if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id.trim()) {
        throw new ContactDeliveryError("UNAVAILABLE");
      }
    }
    return local ? "local" : "email";
  } catch {
    throw new ContactDeliveryError("UNAVAILABLE");
  }
}
