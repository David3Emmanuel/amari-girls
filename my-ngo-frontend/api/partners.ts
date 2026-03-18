import { STRAPI_BASE_URL } from "./strapi";

export type PartnerType = "Government" | "NGO" | "Corporate" | "Foundation";

export interface StrapiOrgPartner {
  id: number;
  documentId: string;
  name: string;
  type: PartnerType;
  url?: string;
  logo?: { url: string };
}

export async function getAllOrgPartners(): Promise<StrapiOrgPartner[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/partners?populate[]=logo`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
