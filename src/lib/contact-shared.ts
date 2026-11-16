/**
 * Contact form rules shared by the browser and the API route.
 * Deliberately has no dependency on lib/services, so the client bundle stays small:
 * the list of topics is passed in (see lib/contact.ts for the server-side list).
 */
export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  /** One or more topic values, comma-separated. */
  topic: string;
  /** Optional budget band. */
  budget?: string;
  message: string;
  /** honeypot — must stay empty */
  website?: string;
};

export const budgets = ["< $500", "$500 - $2k", "$2k - $5k", "$5k - $10k", "$10k +"];

export const topicValues = (topic?: string) =>
  (topic ?? "").split(",").map((t) => t.trim()).filter(Boolean);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Topic = { value: string; label: string };

/** Shared client + server validation. Returns field → message. */
export function validateContact(p: Partial<ContactPayload>, topics: readonly Topic[]) {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  const name = p.name?.trim() ?? "";
  const email = p.email?.trim() ?? "";
  const message = p.message?.trim() ?? "";

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!email) errors.email = "We need an email address to reply.";
  else if (!EMAIL.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";

  if ((p.company?.length ?? 0) > 120) errors.company = "Please keep this under 120 characters.";

  const chosen = topicValues(p.topic);
  if (!chosen.length || !chosen.every((v) => topics.some((t) => t.value === v)))
    errors.topic = "Please choose what you need help with.";

  if (p.budget && !budgets.includes(p.budget)) errors.budget = "Please choose a budget from the list.";

  if (message.length < 20) errors.message = "Please share a little more detail (at least 20 characters).";
  else if (message.length > 4000) errors.message = "Please keep your message under 4,000 characters.";

  return errors;
}
