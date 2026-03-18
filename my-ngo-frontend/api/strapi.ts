/* ──────────────────────────────────────────────────────────────────────────
   Strapi base URL and image helper.
   Set NEXT_PUBLIC_STRAPI_URL in .env.local, e.g.:
     NEXT_PUBLIC_STRAPI_URL=https://your-strapi.strapiapp.com
   ────────────────────────────────────────────────────────────────────────── */

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

/** Normalises any image URL coming from Strapi (absolute CDN or relative path). */
export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_BASE_URL}${url}`;
}
