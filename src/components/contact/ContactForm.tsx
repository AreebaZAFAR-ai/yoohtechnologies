"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { budgets, validateContact, type ContactPayload, type Topic } from "@/lib/contact-shared";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<keyof ContactPayload, string>>;
type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ topics }: { topics: Topic[] }) {
  const params = useSearchParams();
  const topicParam = params.get("topic") ?? params.get("service");
  const initialTopic = topics.some((t) => t.value === topicParam) ? topicParam! : "";

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const read = (): Partial<ContactPayload> => {
    const fd = new FormData(formRef.current!);
    return {
      ...Object.fromEntries(
        ["name", "email", "company", "budget", "message", "website"].map((k) => [k, String(fd.get(k) ?? "")]),
      ),
      topic: fd.getAll("topic").map(String).join(","),
    };
  };

  const recheck = (field: keyof ContactPayload) => {
    if (!errors[field]) return;
    const next = validateContact(read(), topics);
    setErrors((e) => ({ ...e, [field]: next[field] }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = read();
    const v = validateContact(data, topics);
    setErrors(v);
    setServerError("");
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="tex-felt flex min-h-[420px] flex-col items-center justify-center rounded-2xl bg-green p-8 text-center text-paper md:p-14">
        <span className="grid size-16 place-items-center rounded-full bg-paper text-green">
          <Check className="size-8" />
        </span>
        <p className="heading mt-8 text-h2">Message received.</p>
        <p className="mt-4 max-w-md text-paper/80">
          Thank you for reaching out. A member of the YOOH team will review your message and get
          back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="ui mt-8 min-h-12 rounded-full border border-paper/60 px-6 text-btn hover:bg-paper hover:text-green"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-10">
      <Field label="Your name" name="name" required error={errors.name} onBlur={() => recheck("name")} autoComplete="name" />
      <Field label="Email address" name="email" type="email" required error={errors.email} onBlur={() => recheck("email")} autoComplete="email" />
      <Field label="Company" hint="Optional" name="company" error={errors.company} autoComplete="organization" />

      <ChipGroup
        legend="What can we help with?"
        hint="Select all that apply"
        required
        error={errors.topic}
        name="topic"
        type="checkbox"
        options={topics}
        defaultValue={initialTopic}
        onChange={() => recheck("topic")}
      />

      <ChipGroup
        legend="Project budget"
        hint="Optional — helps us scope the right team"
        error={errors.budget}
        name="budget"
        type="radio"
        options={budgets.map((b) => ({ value: b, label: b }))}
      />

      <Field
        label="Tell us about your project"
        name="message"
        required
        textarea
        error={errors.message}
        onBlur={() => recheck("message")}
        defaultValue={params.get("message")?.slice(0, 1000) ?? undefined}
      />

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg border-l-4 border-signal bg-white/70 px-4 py-3 text-ink">
          {serverError}
        </p>
      )}

      <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-ink/15 pt-10 md:flex-row md:items-center">
        <p className="text-small text-ink/60">We reply within one business day.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-green px-8 font-heading text-btn-lg font-medium text-paper transition-colors duration-300 hover:bg-ink disabled:opacity-70 md:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          {status === "sending" ? (
            <LoaderCircle aria-hidden className="size-5 animate-spin" />
          ) : (
            <ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white/70 px-4 py-4 text-lead text-ink placeholder:text-ink/35 transition-colors focus:border-green focus:outline-none aria-[invalid=true]:border-signal";

function Field({
  label,
  hint,
  name,
  type = "text",
  required,
  error,
  textarea,
  onBlur,
  autoComplete,
  defaultValue,
}: {
  label: string;
  hint?: string;
  name: keyof ContactPayload;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
  onBlur?: () => void;
  autoComplete?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const common = {
    id,
    name,
    required,
    onBlur,
    autoComplete,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": cn(hint && hintId, error && errId) || undefined,
    className: cn(inputCls, textarea && "min-h-52 resize-y"),
  };
  return (
    <div>
      <label htmlFor={id} className="block font-heading text-small font-medium text-ink">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-small text-ink/60">
          {hint}
        </p>
      )}
      <div className="mt-3">
        {textarea ? <textarea {...common} rows={6} /> : <input {...common} type={type} />}
      </div>
      {error && (
        <p id={errId} className="mt-2 text-sm text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

function ChipGroup({
  legend,
  hint,
  name,
  type,
  options,
  required,
  error,
  defaultValue,
  onChange,
}: {
  legend: string;
  hint?: string;
  name: keyof ContactPayload;
  type: "checkbox" | "radio";
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  defaultValue?: string;
  onChange?: () => void;
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={cn(hint && `${id}-hint`, error && `${id}-err`) || undefined}>
      <legend className="font-heading text-small font-medium text-ink">
        {legend}
        {required && <span aria-hidden> *</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-small text-ink/60">
          {hint}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input
              type={type}
              name={name}
              value={o.value}
              defaultChecked={o.value === defaultValue}
              onChange={onChange}
              aria-invalid={error ? true : undefined}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-11 items-center rounded-full border border-ink/15 bg-white/70 px-5 text-small text-ink/80 transition-colors hover:border-green peer-checked:border-green peer-checked:bg-green peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-3 text-sm text-signal">
          {error}
        </p>
      )}
    </fieldset>
  );
}
