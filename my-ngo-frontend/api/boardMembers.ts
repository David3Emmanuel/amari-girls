import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiBoardMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  bio?: string;
  sortOrder: number;
  image?: { url: string } | null;
}

export async function getBoardMembers(): Promise<StrapiBoardMember[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/board-members?populate[]=image&sort=sortOrder:asc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
