import { NextResponse } from "next/server";
import { topicLabels, validateEnquiry, type ContactPayload } from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * Delivery is configured with environment variables:
 *   RESEND_API_KEY     — API key from resend.com
 *   CONTACT_TO_EMAIL   — inbox that receives enquiries
 *   CONTACT_FROM_EMAIL — verified sender (optional, defaults to onboarding@resend.dev)
 *
 * Without them, enquiries are logged in development and rejected with a
 * clear 503 in production so no lead is silently lost.
 */
export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success for bots.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const topic = topicLabels(body.topic);
  const text = [
    `Name: ${body.name.trim()}`,
    `Email: ${body.email.trim()}`,
    body.company ? `Company: ${body.company.trim()}` : null,
    `Services: ${topic}`,
    body.budget ? `Budget: ${body.budget}` : null,
    "",
    body.message.trim(),
  ]
    .filter((l) => l !== null)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Delivery not configured — enquiry received:\n" + text);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Our contact form is being set up. Please try again shortly." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "YOOH Website <onboarding@resend.dev>",
      to: [to],
      reply_to: body.email.trim(),
      subject: `New enquiry — ${topic} — ${body.name.trim()}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
