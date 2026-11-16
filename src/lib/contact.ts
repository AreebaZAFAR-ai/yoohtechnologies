import { services } from "./services";
import { topicValues, validateContact as validate, type ContactPayload, type Topic } from "./contact-shared";

export * from "./contact-shared";

export const topics: Topic[] = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "templates", label: "Website templates" },
  { value: "not-sure", label: "Not sure yet — let's talk" },
  { value: "careers", label: "Careers / Joining the team" },
];

export const topicLabels = (topic?: string) =>
  topicValues(topic)
    .map((v) => topics.find((t) => t.value === v)?.label ?? v)
    .join(", ");

/** Server-side validation against the full topic list. */
export const validateEnquiry = (p: Partial<ContactPayload>) => validate(p, topics);
