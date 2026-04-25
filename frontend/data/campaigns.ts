import { STRAPI_BASE_URL } from "./strapi";

export type CampaignStatus = "Live" | "Draft" | "Closed";

export interface StrapiCampaign {
  id: number;
  documentId: string;
  description: string;
  goal: number;
  raised: number;
  donationStatus: CampaignStatus;
  media?: { url: string };
}

export async function getLiveCampaigns(): Promise<StrapiCampaign[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/donation-campaigns?populate[]=media`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const all: StrapiCampaign[] = data.data ?? [];
    return all.filter((c) => c.donationStatus === "Live");
  } catch {
    return [];
  }
}
