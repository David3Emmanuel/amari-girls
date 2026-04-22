/* ──────────────────────────────────────────────────────────────────────────
   API helpers — fetches site content from the backend and falls back
   gracefully to hardcoded defaults when the backend is unreachable or
   a section is missing from the response.

   Set  NEXT_PUBLIC_STRAPI_URL  in your .env  (or .env.local) to point at
   the backend, e.g.  NEXT_PUBLIC_STRAPI_URL=https://api.amarigirlsfoundation.org
   ────────────────────────────────────────────────────────────────────────── */

import type { HeroData, SiteContent, FounderData, ObjectivesData, CommunityProjectData, GalleryData, BoardData, TestimonialsData, ContactData } from './types'
import defaults from './defaults'
import { asRecord, asString, mapMediaToUrl, mapTextItems } from './normalizers'

const API_BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? ''

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

function normalizeHero(heroRaw: unknown): Partial<HeroData> {
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
        ? hero.headingLine3Desktop as { main: string; accent: string }
        : splitHeading(hero.headingLine3Desktop),
    headingLine3Mobile:
      typeof hero.headingLine3Mobile === 'object' &&
      hero.headingLine3Mobile !== null
        ? hero.headingLine3Mobile as { main: string; accent: string }
        : splitHeading(hero.headingLine3Mobile),
  }
}

function normalizeFounder(founderRaw: unknown): Partial<FounderData> {
  const founder = asRecord(founderRaw)           
  return {
    ...founder,
    image: mapMediaToUrl(founder.image),
    bio: mapTextItems(founder.bio),
  }
}

function normalizeObjectives(objectivesRaw: unknown): Partial<ObjectivesData> {
  const objectives = asRecord(objectivesRaw)
  return {
    ...objectives,
    items: mapTextItems(objectives.items),
  }
}

function normalizeCommunityProject(projectRaw: unknown): Partial<CommunityProjectData> {
  const project = asRecord(projectRaw)
  return {
    ...project,
    image: mapMediaToUrl(project.image),
    paragraphs: mapTextItems(project.paragraphs),
  }
}

function normalizeGallery(galleryRaw: unknown): Partial<GalleryData> {
  const gallery = asRecord(galleryRaw)
  return {
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
  }
}

function normalizeBoard(boardRaw: unknown): Partial<BoardData> {
  const board = asRecord(boardRaw)
  return {
    ...board,
    members: Array.isArray(board.members)
      ? board.members.map((m) => {
          const member = asRecord(m)
          return {
            ...member,
            image: mapMediaToUrl(member.image),
          } as BoardData['members'][number]
        })
      : [],
  }
}

function normalizeTestimonials(testimonialsRaw: unknown): Partial<TestimonialsData> {
  const testimonials = asRecord(testimonialsRaw)
  return {
    ...testimonials,
    items: Array.isArray(testimonials.items)
      ? testimonials.items.map((t) => {
          const item = asRecord(t)
          return {
            ...item,
            image: mapMediaToUrl(item.image),
          } as TestimonialsData['items'][number]
        })
      : [],
  }
}

function normalizeContact(contactRaw: unknown): Partial<ContactData> {
  const contact = asRecord(contactRaw)
  return {
    ...contact,
    phones: mapTextItems(contact.phones),
    socials: mapTextItems(contact.socials),
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

  const normalized: Partial<SiteContent> = {}

  // Only process sections that exist in the source data
  if (siteContent.hero != null) {
    normalized.hero = normalizeHero(siteContent.hero)
  }

  if (siteContent.founder != null) {
    normalized.founder = normalizeFounder(siteContent.founder)
  }

  if (siteContent.objectives != null) {
    normalized.objectives = normalizeObjectives(siteContent.objectives)
  }

  if (siteContent.communityProject != null) {
    normalized.communityProject = normalizeCommunityProject(siteContent.communityProject)
  }

  if (siteContent.gallery != null) {
    normalized.gallery = normalizeGallery(siteContent.gallery)
  }

  if (siteContent.board != null) {
    normalized.board = normalizeBoard(siteContent.board)
  }

  if (siteContent.testimonials != null) {
    normalized.testimonials = normalizeTestimonials(siteContent.testimonials)
  }

  if (siteContent.contact != null) {
    normalized.contact = normalizeContact(siteContent.contact)
  }

  // Copy navbar, missionVision, partner sections as-is if they exist
  if (siteContent.navbar != null) {
    normalized.navbar = siteContent.navbar
  }
  if (siteContent.missionVision != null) {
    normalized.missionVision = siteContent.missionVision
  }
  if (siteContent.partner != null) {
    normalized.partner = siteContent.partner
  }
  if (siteContent.footer != null) {
    normalized.footer = siteContent.footer
  }

  return normalized
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
