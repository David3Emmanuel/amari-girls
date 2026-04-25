import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiTestimonial {
  id: number;
  documentId: string;
  name: string;
  role: string;
  quote: string;
  featured: boolean;
  sortOrder: number;
  image?: { url: string } | null;
  program?: { id: number; title: string; slug: string } | null;
}

export async function getTestimonials(): Promise<StrapiTestimonial[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/testimonials?populate[]=image&populate[]=program&sort=sortOrder:asc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
