import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiSiteSettings {
  /** Bank transfer details */
  bankName: string;
  accountName: string;
  accountNumber: string;
  donateNote: string;

  /** Contact info */
  phones: string[];        // JSON array in Strapi: ["...", "..."]
  email: string;
  location: string;

  /** Social links */
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
}

export async function getSiteSettings(): Promise<StrapiSiteSettings | null> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/site-setting`,  // Strapi single types use singular slug
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // Strapi v5 single type: data is at data (no array)
    return data.data ?? null;
  } catch {
    return null;
  }
}
