import { STRAPI_BASE_URL } from "./strapi";

/**
 * Icon is stored as a string slug in Strapi (e.g. "palette", "globe", "calendar").
 * The frontend maps these to lucide-react icons.
 */
export type RoleIconSlug =
  | "palette"
  | "globe"
  | "calendar"
  | "star"
  | "heart"
  | "users"
  | "book"
  | "megaphone";

export interface StrapiVolunteerRole {
  id: number;
  documentId: string;
  title: string;
  description: string;
  /**
   * tasks is stored in Strapi as a JSON array field:
   *   ["Task one", "Task two", "Task three"]
   * OR as a newline-separated plain-text field — we handle both.
   */
  tasks: string[] | string;
  icon: RoleIconSlug;
  sortOrder: number;
}

/** Returns tasks as a clean string array regardless of how Strapi stores them. */
export function parseTasks(raw: string[] | string): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string") return raw.split("\n").map((t) => t.trim()).filter(Boolean);
  return [];
}

export async function getVolunteerRoles(): Promise<StrapiVolunteerRole[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/volunteer-roles?sort=sortOrder:asc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
