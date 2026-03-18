import { STRAPI_BASE_URL } from "./strapi";

export interface StrapiEvent {
  id: number;
  documentId: string;
  title: string;
  description: string;
  start: string;
  end: string;
  capacity?: number;
  coverImage?: { url: string };
  venue?: { name: string };
}

export type EventStatus = "Upcoming" | "Ongoing" | "Past Event";

export function getEventStatus(start: string, end: string): EventStatus {
  const now = Date.now();
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (now < s) return "Upcoming";
  if (now >= s && now <= e) return "Ongoing";
  return "Past Event";
}

export async function getAllEvents(): Promise<StrapiEvent[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/events?populate[]=coverImage&populate[]=venue`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
