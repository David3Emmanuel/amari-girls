import { STRAPI_BASE_URL } from "./strapi";

/* ── Volunteer application ─────────────────────────────────────────────── */
export interface VolunteerPayload {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}

export async function submitVolunteerApplication(
  payload: VolunteerPayload
): Promise<void> {
  const res = await fetch(`${STRAPI_BASE_URL}/api/volunteers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  if (!res.ok) throw new Error(`Volunteer submission failed: ${res.status}`);
}

/* ── Contact form ──────────────────────────────────────────────────────── */
export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${STRAPI_BASE_URL}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  if (!res.ok) throw new Error(`Contact submission failed: ${res.status}`);
}

/* ── Newsletter ────────────────────────────────────────────────────────── */
export interface NewsletterError {
  isDuplicate: boolean;
  message: string;
}

export async function createNewsletter(email: string): Promise<void> {
  const res = await fetch(`${STRAPI_BASE_URL}/api/newsletters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { email } }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg: string = body?.error?.message ?? "";
    const err: NewsletterError = {
      isDuplicate: msg.toLowerCase().includes("duplicate"),
      message: msg,
    };
    throw err;
  }
}
