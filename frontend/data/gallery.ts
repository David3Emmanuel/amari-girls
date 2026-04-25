import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiGalleryItem {
  id: number;
  documentId: string;
  caption: string;
  alt: string;
  image: { url: string; width?: number; height?: number };
  program?: { id: number; title: string; slug: string } | null;
  event?: { id: number; title: string } | null;
}

export interface GalleryFilter {
  programId?: number;
  eventId?: number;
}

export async function getGalleryItems(
  filter?: GalleryFilter
): Promise<StrapiGalleryItem[]> {
  try {
    let url =
      `${STRAPI_BASE_URL}/api/gallery-items` +
      `?populate[]=image&populate[]=program&populate[]=event` +
      `&sort=createdAt:desc`;

    if (filter?.programId) {
      url += `&filters[program][id][$eq]=${filter.programId}`;
    } else if (filter?.eventId) {
      url += `&filters[event][id][$eq]=${filter.eventId}`;
    }

    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Returns the distinct programs and events that appear in the gallery,
 * so the frontend can build filter tabs dynamically.
 */
export async function getGalleryFilters(): Promise<{
  programs: { id: number; title: string; slug: string }[];
  events: { id: number; title: string }[];
}> {
  const items = await getGalleryItems();
  const programMap = new Map<number, { id: number; title: string; slug: string }>();
  const eventMap = new Map<number, { id: number; title: string }>();

  for (const item of items) {
    if (item.program) programMap.set(item.program.id, item.program);
    if (item.event) eventMap.set(item.event.id, item.event);
  }

  return {
    programs: Array.from(programMap.values()),
    events: Array.from(eventMap.values()),
  };
}
