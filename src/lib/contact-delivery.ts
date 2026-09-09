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
  environment: { NODE_ENV?: string; MAILPIT_URL?: string } = process.env,
  send: typeof fetch = fetch,
): Promise<void> {
  if (environment.NODE_ENV !== "development" || !environment.MAILPIT_URL) {
    throw new ContactDeliveryError("NOT_CONFIGURED");
  }

  try {
    const response = await send(new URL("/api/v1/send", environment.MAILPIT_URL), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        From: { Name: "Apollo website preview", Email: "website@apollo.example" },
        To: [{ Name: "Local enquiries", Email: "enquiries@apollo.example" }],
        ReplyTo: [{ Name: fields.name, Email: fields.email }],
        Subject: "Apollo Green Solutions — website enquiry",
        Text: `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`,
        Tags: ["contact-form"],
      }),
    });
    if (!response.ok) throw new ContactDeliveryError("UNAVAILABLE");
  } catch {
    throw new ContactDeliveryError("UNAVAILABLE");
  }
}
