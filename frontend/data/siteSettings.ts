import { STRAPI_BASE_URL } from './strapi'
import { asRecord, asString } from '@/lib/normalizers'

const SITE_SETTINGS_POPULATE_QUERY =
  'populate[bankDetails][populate]=*' +
  '&populate[contactInfo][populate][phones][populate]=*' +
  '&populate[socialLinks][populate]=*'

export interface StrapiSiteSettings {
  /** Bank transfer details */
  bankName: string
  accountName: string
  accountNumber: string
  donateNote: string

  /** Contact info */
  phones: string[] // JSON array in Strapi: ["...", "..."]
  email: string
  location: string

  /** Social links */
  facebookUrl: string
  instagramUrl: string
  twitterUrl: string
  youtubeUrl: string
}

function normalizeSiteSettings(raw: unknown): StrapiSiteSettings | null {
  const root = asRecord(raw)
  const data = asRecord(root.data)
  const source = Object.keys(data).length > 0 ? data : root

  const bankDetails = asRecord(source.bankDetails)
  const contactInfo = asRecord(source.contactInfo)
  const socialLinks = asRecord(source.socialLinks)

  const phonesRaw = Array.isArray(contactInfo.phones) ? contactInfo.phones : []
  const phones = phonesRaw
    .map((p) => asString(asRecord(p).phone))
    .filter(Boolean)

  if (Object.keys(source).length === 0) return null

  return {
    bankName: asString(bankDetails.bankName),
    accountName: asString(bankDetails.accountName),
    accountNumber: asString(bankDetails.accountNumber),
    donateNote: asString(bankDetails.donateNote),
    phones,
    email: asString(contactInfo.email),
    location: asString(contactInfo.location),
    facebookUrl: asString(socialLinks.facebook),
    instagramUrl: asString(socialLinks.instagram),
    twitterUrl: asString(socialLinks.twitter),
    youtubeUrl: asString(socialLinks.youtube),
  }
}

export async function getSiteSettings(): Promise<StrapiSiteSettings | null> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/site-setting?${SITE_SETTINGS_POPULATE_QUERY}`, // Strapi single types use singular slug
      { next: { revalidate: 60 } },
    )
    if (!res.ok) return null
    const raw = await res.json()
    return normalizeSiteSettings(raw)
  } catch {
    return null
  }
}
