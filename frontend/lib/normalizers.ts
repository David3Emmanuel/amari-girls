export type AnyRecord = Record<string, unknown>

export function asRecord(value: unknown): AnyRecord {
  return value && typeof value === 'object' ? (value as AnyRecord) : {}
}

export function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

export function mapTextItems(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (typeof item === 'string') return item
      return asString(asRecord(item).text)
    })
    .filter(Boolean)
}

export function mapMediaToUrl(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  const media = asRecord(value)
  const direct = asString(media.url)
  if (direct) return direct
  const data = asRecord(media.data)
  const attrs = asRecord(data.attributes)
  return asString(attrs.url)
}
