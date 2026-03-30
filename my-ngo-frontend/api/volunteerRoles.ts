import { STRAPI_BASE_URL } from './strapi'
import { asRecord } from '@/lib/normalizers'

/**
 * Icon is stored as a string slug in Strapi (e.g. "palette", "globe", "calendar").
 * The frontend maps these to lucide-react icons.
 */
export type RoleIconSlug =
  | 'palette'
  | 'globe'
  | 'calendar'
  | 'star'
  | 'heart'
  | 'users'
  | 'book'
  | 'megaphone'

export interface StrapiVolunteerRole {
  id: number
  documentId: string
  title: string
  description: string
  /**
   * tasks is stored in Strapi as a JSON array field:
   *   ["Task one", "Task two", "Task three"]
   * OR as a newline-separated plain-text field — we handle both.
   */
  tasks: string[] | string
  icon: RoleIconSlug
  sortOrder: number
}

function normalizeRoleTasks(raw: unknown): string[] | string {
  if (Array.isArray(raw)) {
    // Strapi component form: [{ task: "..." }, ...]
    const taskComponents = raw
      .map((item) => asRecord(item).task)
      .filter(
        (value): value is string =>
          typeof value === 'string' && value.trim().length > 0,
      )
    if (taskComponents.length > 0) return taskComponents

    // Backward compatibility: plain string[]
    return raw.filter(
      (value): value is string =>
        typeof value === 'string' && value.trim().length > 0,
    )
  }

  if (typeof raw === 'string') return raw
  return []
}

/** Returns tasks as a clean string array regardless of how Strapi stores them. */
export function parseTasks(raw: string[] | string): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean)
  if (typeof raw === 'string')
    return raw
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean)
  return []
}

export async function getVolunteerRoles(): Promise<StrapiVolunteerRole[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/volunteer-roles?sort=sortOrder:asc`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) return []
    const raw = await res.json()
    const items = Array.isArray(raw?.data) ? raw.data : []

    return items.map((item: StrapiVolunteerRole) => ({
      ...item,
      tasks: normalizeRoleTasks(asRecord(item).tasks),
    }))
  } catch {
    return []
  }
}
