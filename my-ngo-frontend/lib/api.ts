/* ──────────────────────────────────────────────────────────────────────────
   API helpers — fetches site content from the backend and falls back
   gracefully to hardcoded defaults when the backend is unreachable or
   a section is missing from the response.

   Set  NEXT_PUBLIC_API_URL  in your .env  (or .env.local) to point at
   the backend, e.g.  NEXT_PUBLIC_API_URL=https://api.amarigirlsfoundation.org
   ────────────────────────────────────────────────────────────────────────── */

import type { SiteContent } from './types'
import defaults from './defaults'
import { asRecord, asString, mapMediaToUrl, mapTextItems } from './normalizers'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? ''

/* ── Section-level keys for safe merge ───────────────────────────────── */
const SECTION_KEYS: (keyof SiteContent)[] = [
  'navbar',
  'hero',
  'founder',
  'missionVision',
  'objectives',
  'communityProject',
  'gallery',
  'testimonials',
  'partner',
  'board',
  'contact',
  'footer',
]

function normalizeHero(heroRaw: unknown): unknown {
  const hero = asRecord(heroRaw)
  const splitHeading = (value: unknown) => {
    const raw = asString(value).trim()
    if (!raw) return { main: '', accent: '' }
    const parts = raw
      .split('|')
      .map((p) => p.trim())
      .filter(Boolean)
    if (parts.length >= 2)
      return { main: parts[0], accent: parts.slice(1).join(' ') }
    const words = raw.split(/\s+/)
    if (words.length >= 2) {
      return {
        main: words.slice(0, words.length - 1).join(' '),
        accent: words[words.length - 1],
      }
    }
    return { main: raw, accent: '' }
  }

  return {
    ...hero,
    backgroundImage: mapMediaToUrl(hero.backgroundImage),
    headingLine3Desktop:
      typeof hero.headingLine3Desktop === 'object' &&
      hero.headingLine3Desktop !== null
        ? hero.headingLine3Desktop
        : splitHeading(hero.headingLine3Desktop),
    headingLine3Mobile:
      typeof hero.headingLine3Mobile === 'object' &&
      hero.headingLine3Mobile !== null
        ? hero.headingLine3Mobile
        : splitHeading(hero.headingLine3Mobile),
  }
}

function normalizeSiteContentResponse(payload: unknown): Partial<SiteContent> {
  const root = asRecord(payload)
  const dataCandidate = asRecord(root.data)

  // Handle both wrapped (Strapi) and plain object responses.
  const siteContent =
    Object.keys(dataCandidate).length > 0 &&
    SECTION_KEYS.some((k) => k in dataCandidate)
      ? dataCandidate
      : root

  const founder = asRecord(siteContent.founder)
  const objectives = asRecord(siteContent.objectives)
  const communityProject = asRecord(siteContent.communityProject)
  const gallery = asRecord(siteContent.gallery)
  const contact = asRecord(siteContent.contact)
  const board = asRecord(siteContent.board)
  const testimonials = asRecord(siteContent.testimonials)

  const normalized = {
    ...siteContent,
    hero: normalizeHero(siteContent.hero),
    founder: {
      ...founder,
      image: mapMediaToUrl(founder.image),
      bio: mapTextItems(founder.bio),
    },
    objectives: {
      ...objectives,
      items: mapTextItems(objectives.items),
    },
    communityProject: {
      ...communityProject,
      image: mapMediaToUrl(communityProject.image),
      paragraphs: mapTextItems(communityProject.paragraphs),
    },
    gallery: {
      ...gallery,
      images: Array.isArray(gallery.images)
        ? gallery.images.map((img) => {
            const image = asRecord(img)
            return {
              src: mapMediaToUrl(image.image),
              alt: asString(image.alt),
            }
          })
        : [],
    },
    board: {
      ...board,
      members: Array.isArray(board.members)
        ? board.members.map((m) => {
            const member = asRecord(m)
            return {
              ...member,
              image: mapMediaToUrl(member.image),
            }
          })
        : [],
    },
    testimonials: {
      ...testimonials,
      items: Array.isArray(testimonials.items)
        ? testimonials.items.map((t) => {
            const item = asRecord(t)
            return {
              ...item,
              image: mapMediaToUrl(item.image),
            }
          })
        : [],
    },
    contact: {
      ...contact,
      phones: mapTextItems(contact.phones),
      socials: mapTextItems(contact.socials),
    },
  }

  return normalized as Partial<SiteContent>
}

/* ── Image URL resolver ──────────────────────────────────────────────────
   • Full URLs  → returned as-is
   • Paths starting with /  → local public folder, returned as-is
   • Relative paths  → prepended with the API base
   • Empty / falsy  → empty string
   ────────────────────────────────────────────────────────────────────── */
export function resolveImageUrl(path: string | undefined | null): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/')) return path
  return API_BASE ? `${API_BASE}/${path}` : `/${path}`
}

/* ── Main fetch function ─────────────────────────────────────────────── */
export async function fetchSiteContent(): Promise<SiteContent> {
  // No backend URL configured → use defaults immediately
  if (!API_BASE) {
    return defaults
  }

  try {
    const res = await fetch(`${API_BASE}/api/site-content`, {
      next: { revalidate: 60 }, // ISR — re-fetch every 60 s
    })

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`)
    }

    const raw = await res.json()
    const data: Partial<SiteContent> = normalizeSiteContentResponse(raw)

    // Merge: each missing section falls back to its default
    const merged: SiteContent = { ...defaults }
    for (const key of SECTION_KEYS) {
      if (data[key] !== undefined && data[key] !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(merged as any)[key] = data[key]
      }
    }

    return merged
  } catch (err) {
    console.error(
      '[fetchSiteContent] Failed to fetch site content, using defaults:',
      err,
    )
    return defaults
  }
}
