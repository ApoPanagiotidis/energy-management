import { validateContact } from "@/lib/contact";
import { ContactDeliveryError, deliverContact } from "@/lib/contact-delivery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return Response.json({ message: "Submit the form as JSON." }, { status: 415 });
  }

  let input: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > 20_000) {
      return Response.json({ message: "Your message is too large. Please shorten it." }, { status: 413 });
    }
    input = JSON.parse(text);
  } catch {
    return Response.json({ message: "We couldn’t read your submission. Please try again." }, { status: 400 });
  }

  const result = validateContact(input);
  if (!result.ok) {
    return Response.json({ message: "Please check the highlighted fields.", errors: result.errors }, { status: 400 });
  }

  try {
    await deliverContact(result.data);
    return Response.json({ success: true, message: "Your message was saved to the local test inbox." });
  } catch (error) {
    const unavailable = error instanceof ContactDeliveryError && error.code === "NOT_CONFIGURED";
    return Response.json({
      message: unavailable
        ? "Message delivery isn’t available yet. Your message has not been sent."
        : "We couldn’t confirm your submission. Your text is still here; please try again shortly.",
    }, { status: 503 });
  }
}
