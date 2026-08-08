import { describe, expect, it } from "vitest";
import { bookingSchema, contactSchema } from "./booking";

const validContact = {
  name: "Alex",
  phone: "+49123456789",
  telegram: "",
  comment: "",
  company: "",
};

describe("contactSchema", () => {
  it("accepts a valid contact with just a phone", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("accepts a valid contact with just a telegram handle", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      phone: "",
      telegram: "@alex",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a contact with neither phone nor telegram", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      phone: "",
      telegram: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validContact, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects a honeypot field that has been filled in", () => {
    // The "company" field is invisible to real visitors — Zod itself
    // rejects a non-empty value here (max length 0); the actual
    // spam-drop behavior lives in submitBooking, this just confirms the
    // schema enforces the field stays empty when parsed strictly.
    const result = contactSchema.safeParse({
      ...validContact,
      company: "Acme Inc",
    });
    expect(result.success).toBe(false);
  });
});

describe("bookingSchema", () => {
  it("accepts a fully valid booking payload", () => {
    const result = bookingSchema.safeParse({
      serviceSlug: "fine-line",
      artistSlug: "alex",
      date: "2026-03-05",
      time: "14:00",
      contact: validContact,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing artist slug", () => {
    const result = bookingSchema.safeParse({
      serviceSlug: "fine-line",
      artistSlug: "",
      date: "2026-03-05",
      time: "14:00",
      contact: validContact,
    });
    expect(result.success).toBe(false);
  });
});
