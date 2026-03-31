"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Images, ArrowRight } from "lucide-react";
import { getGalleryItems, type StrapiGalleryItem } from "@/api/gallery";
import { getStrapiImageUrl } from "@/api/strapi";
import type { GalleryData } from "@/lib/types";
import defaults from "@/lib/defaults";

/* ── Homepage Gallery Teaser ────────────────────────────────────────────────
   Shows up to 6 preview photos, a total photo count, and a "Browse Gallery"
   button that leads to /gallery — the full event-organised gallery page.
   Photos themselves are NOT exposed here.
   ────────────────────────────────────────────────────────────────────────── */
export default function Gallery({
  data,
}: {
  data?: GalleryData;
}) {
  data = { ...defaults.gallery, ...data } satisfies GalleryData;
  const [items, setItems] = useState<StrapiGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryItems().then((strapiItems) => {
      setItems(strapiItems);
      setLoading(false);
    });
  }, []);

  /* Count distinct events we have photos for */
  const eventCount = new Set(
    items.filter((i) => i.event).map((i) => i.event!.id)
  ).size;

  /* Up to 6 most-recent for the preview mosaic */
  const preview = items.slice(0, 6);

  /* If Strapi has nothing, use the static fallback images as preview */
  const usingFallback = !loading && items.length === 0;
  const fallbackPreview = data.images.slice(0, 6).map((img, i) => ({
    id: i,
    documentId: String(i),
    caption: img.alt,
    alt: img.alt,
    image: { url: img.src },
    program: null,
    event: null,
  })) as StrapiGalleryItem[];

  const previewItems = usingFallback ? fallbackPreview : preview;

  return (
    <section id="gallery" className="bg-off-white py-24 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-12 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-orange" />
            <div>
              <p className="text-orange text-xs font-black uppercase tracking-[0.3em]">
                {data.sectionLabel}
              </p>
              <h2 className="text-navy text-3xl md:text-4xl font-black uppercase tracking-tight mt-1">
                {data.sectionTitle}
              </h2>
            </div>
          </div>

          {/* Stats chips */}
          {!loading && !usingFallback && (
            <div className="flex items-center gap-3 self-end">
              <span className="bg-navy text-white text-xs font-black uppercase tracking-widest px-4 py-2">
                {items.length} Photos
              </span>
              {eventCount > 0 && (
                <span className="bg-orange text-white text-xs font-black uppercase tracking-widest px-4 py-2">
                  {eventCount} Event{eventCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 bg-navy mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square loading-shimmer" />
            ))}
          </div>
        )}

        {/* Preview mosaic — non-interactive, just a taste */}
        {!loading && previewItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 bg-navy mb-8 pointer-events-none select-none">
            {previewItems.map((item, i) => {
              const src = getStrapiImageUrl(item.image?.url);
              const fallbackSrc = `https://placehold.co/400x400/0d2a6e/ffffff?text=${String(i + 1).padStart(2, "0")}`;
              return (
                <div
                  key={item.id}
                  className="aspect-square bg-navy-dark overflow-hidden relative"
                >
                  <img
                    src={src || fallbackSrc}
                    alt={item.alt || item.caption || ""}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = fallbackSrc;
                    }}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle dark gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  {/* Event label badge */}
                  {item.event && (
                    <span className="absolute bottom-2 left-2 bg-orange text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 leading-tight">
                      {item.event.title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state (no photos at all) */}
        {!loading && previewItems.length === 0 && (
          <div className="border-2 border-dashed border-navy/20 flex flex-col items-center justify-center py-20 mb-8">
            <Images className="w-12 h-12 text-navy/20 mb-4" />
            <p className="text-navy font-black text-sm uppercase tracking-widest">
              No photos yet
            </p>
            <p className="text-slate-muted text-xs mt-2 uppercase tracking-wide">
              Check back after our next event.
            </p>
          </div>
        )}

        {/* Overlay CTA — encourages the click to the gallery page */}
        <div className="bg-navy px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-sm uppercase tracking-widest mb-1">
              {usingFallback
                ? "Our gallery is growing"
                : `${items.length} photo${items.length !== 1 ? "s" : ""} across ${eventCount || "multiple"} event${eventCount !== 1 ? "s" : ""}`}
            </p>
            <p className="text-slate-muted text-xs uppercase tracking-wide">
              Photos are organised by event so you can relive every moment.
            </p>
          </div>
          <Link
            href="/gallery"
            className="shrink-0 flex items-center gap-2 bg-orange text-white font-black text-xs uppercase tracking-widest px-7 py-4 hover:bg-orange-dark transition-colors duration-150"
          >
            Browse Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
