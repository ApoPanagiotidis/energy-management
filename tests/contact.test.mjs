import assert from "node:assert/strict";
import test from "node:test";
import { validateContact } from "../src/lib/contact.ts";
import { ContactDeliveryError, deliverContact } from "../src/lib/contact-delivery.ts";

const enquiry = { name: "Test Visitor", email: "visitor@example.test", message: "Please help me compare the energy meters." };
const environment = { NODE_ENV: "development", MAILPIT_URL: "http://mailpit:8025" };

test("trims fields while preserving multiline message content", () => {
  assert.deepEqual(validateContact({ name: "  A  ", email: " visitor@example.test ", message: "  First line\nSecond line  " }), {
    ok: true, data: { name: "A", email: "visitor@example.test", message: "First line\nSecond line" },
  });
});

test("rejects missing fields, non-string values, and invalid email addresses", () => {
  for (const input of [null, [], {}, { name: 123, email: ["test@example.test"], message: {} }]) {
    const result = validateContact(input);
    assert.equal(result.ok, false);
    assert.deepEqual(Object.keys(result.errors), ["name", "email", "message"]);
  }
  for (const email of ["bad", "a@b", "a@@example.test", "a @example.test", "a@example.test\r\nBcc:other@example.test"]) {
    assert.equal(validateContact({ ...enquiry, email }).ok, false);
  }
});

test("enforces lengths and rejects newlines in the name", () => {
  for (const change of [{ name: "a".repeat(101) }, { name: "A\nB" }, { email: "a".repeat(250) + "@b.test" }, { message: "  short  " }, { message: "a".repeat(3001) }]) {
    assert.equal(validateContact({ ...enquiry, ...change }).ok, false);
  }
  assert.equal(validateContact({ ...enquiry, name: "a".repeat(100), message: "a".repeat(3000) }).ok, true);
});

test("captures a plain-text enquiry locally with a fixed recipient and visitor reply-to", async () => {
  let calls = 0;
  await deliverContact({ ...enquiry, message: "<script>alert('test')</script>" }, environment, async (url, options) => {
    calls++;
    assert.equal(String(url), "http://mailpit:8025/api/v1/send");
    assert.equal(options.method, "POST");
    const payload = JSON.parse(options.body);
    assert.equal(payload.To[0].Email, "enquiries@apollo.example");
    assert.equal(payload.ReplyTo[0].Email, enquiry.email);
    assert.match(payload.Text, /<script>/);
    assert.equal(payload.HTML, undefined);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ ID: "test-capture" });
  });
  assert.equal(calls, 1);
});

test("never reports success when the inbox rejects or cannot receive a message", async () => {
  for (const send of [async () => new Response("unavailable", { status: 503 }), async () => { throw new Error("offline"); }]) {
    await assert.rejects(deliverContact(enquiry, environment, send), error => error instanceof ContactDeliveryError && error.code === "UNAVAILABLE");
  }
});

test("blocks local capture in production and when not configured", async () => {
  for (const config of [{ NODE_ENV: "development" }, { ...environment, NODE_ENV: "production" }]) {
    await assert.rejects(deliverContact(enquiry, config, async () => { assert.fail("Must not contact Mailpit"); }), error => error.code === "NOT_CONFIGURED");
  }
});
