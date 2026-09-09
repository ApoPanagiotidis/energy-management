export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export type ContactValidation =
  | { ok: true; data: ContactFields }
  | { ok: false; errors: ContactErrors };

export const contactLimits = { name: 100, email: 254, message: 3000 };

export function validateContact(input: unknown): ContactValidation {
  const values = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {};
  const read = (key: keyof ContactFields) =>
    typeof values[key] === "string" ? values[key].trim() : "";
  const data = { name: read("name"), email: read("email"), message: read("message") };
  const errors: ContactErrors = {};

  if (!data.name || data.name.length > contactLimits.name || /[\r\n]/.test(data.name)) {
    errors.name = "Enter your name using 1–100 characters on one line.";
  }
  if (data.email.length > contactLimits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }
  if (data.message.length < 10 || data.message.length > contactLimits.message) {
    errors.message = "Enter a message between 10 and 3,000 characters.";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
