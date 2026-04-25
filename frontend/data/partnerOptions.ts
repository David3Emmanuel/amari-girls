import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiPartnerOption {
  id: number;
  documentId: string;
  num: string;           // e.g. "01"
  title: string;
  description: string;
  ctaLabel: string;      // e.g. "Sponsor Now"
  ctaHref: string;       // e.g. "/donate"  or  "/volunteer"
  accent: boolean;       // true → orange top bar & button, false → navy
  sortOrder: number;
}

export async function getPartnerOptions(): Promise<StrapiPartnerOption[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/partner-options?sort=sortOrder:asc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
