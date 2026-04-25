import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiTag {
  id: number;
  name: string;
}

export interface StrapiPartner {
  id: number;
  name: string;
  type?: string;
  url?: string;
  logo?: { url: string };
}

export interface StrapiStoryImpact {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  beneficiary?: { name: string; initials: string };
}

export interface StrapiProgram {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  heroImage?: { url: string };
  gallery_items?: { url: string }[];
  tags?: StrapiTag[];
  partners?: StrapiPartner[];
  story_impacts?: StrapiStoryImpact[];
}

export async function getAllPrograms(): Promise<StrapiProgram[]> {
  try {
    const url =
      `${STRAPI_BASE_URL}/api/programs` +
      `?populate[]=heroImage&populate[]=gallery_items&populate[]=tags` +
      `&populate[]=partners&populate[]=story_impacts`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function getProgramBySlug(
  slug: string
): Promise<StrapiProgram | null> {
  const programs = await getAllPrograms();
  return programs.find((p) => p.slug === slug) ?? null;
}
