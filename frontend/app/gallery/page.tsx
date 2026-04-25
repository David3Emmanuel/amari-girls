"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Images, Calendar } from "lucide-react";
import { getGalleryItems, type StrapiGalleryItem } from "@/data/gallery";
import { getStrapiImageUrl } from "@/data/strapi";

/* ──────────────────────────────────────────────────────────────────────────
   Group shape
   ────────────────────────────────────────────────────────────────────────── */
interface EventGroup {
  id: string;               // event id as string, or "general"
  label: string;            // event title or "General"
  items: StrapiGalleryItem[];
}

function buildGroups(items: StrapiGalleryItem[]): EventGroup[] {
  const map = new Map<string, EventGroup>();

  for (const item of items) {
    const key = item.event ? String(item.event.id) : "general";
    const label = item.event ? item.event.title : "General";

    if (!map.has(key)) {
      map.set(key, { id: key, label, items: [] });
    }
    map.get(key)!.items.push(item);
  }

  /* Events first (in insertion order), General last */
  const groups = Array.from(map.values());
  const general = groups.find((g) => g.id === "general");
  const events = groups.filter((g) => g.id !== "general");
  return general ? [...events, general] : events;
}

/* ──────────────────────────────────────────────────────────────────────────
   Lightbox — works across a flat array of all items
   ────────────────────────────────────────────────────────────────────────── */
function Lightbox({
  items,
  index,
  onClose,
}: {
  items: StrapiGalleryItem[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1)),
    [items.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1)),
    [items.length]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const item = items[current];
  if (!item) return null;

  const src = getStrapiImageUrl(item.image?.url);

  return (
    <div
      className="fixed inset-0 z-[100] bg-navy/96 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 bg-navy/80">
        <div className="flex items-center gap-3">
          <span className="text-white font-black text-xs uppercase tracking-widest">
            {current + 1} / {items.length}
          </span>
          {item.event && (
            <span className="bg-orange text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
              {item.event.title}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 bg-white/10 hover:bg-orange transition-colors text-white flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Prev arrow */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-orange transition-colors text-white flex items-center justify-center"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-4xl w-full max-h-[80vh] px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={item.alt || item.caption || "Gallery image"}
          className="max-w-full max-h-[72vh] object-contain mx-auto block"
        />
        {(item.caption || item.event || item.program) && (
          <div className="mt-3 text-center space-y-1">
            {item.caption && (
              <p className="text-white text-sm font-bold">{item.caption}</p>
            )}
            {item.event && (
              <p className="text-orange text-xs font-black uppercase tracking-widest">
                {item.event.title}
              </p>
            )}
            {item.program && !item.event && (
              <p className="text-orange text-xs font-black uppercase tracking-widest">
                {item.program.title}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Next arrow */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-orange transition-colors text-white flex items-center justify-center"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Photo grid for a single event group
   ────────────────────────────────────────────────────────────────────────── */
function EventGrid({
  group,
  allItems,
  onOpen,
}: {
  group: EventGroup;
  allItems: StrapiGalleryItem[];   // flat list for lightbox indexing
  onOpen: (globalIndex: number) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 bg-navy">
        {group.items.map((item) => {
          const globalIndex = allItems.findIndex((a) => a.id === item.id);
          const src = getStrapiImageUrl(item.image?.url);
          const fallbackSrc = `https://placehold.co/400x400/0d2a6e/ffffff?text=${encodeURIComponent(
            item.event?.title?.slice(0, 2).toUpperCase() ?? "AG"
          )}`;

          return (
            <button
              key={item.id}
              onClick={() => onOpen(globalIndex)}
              className="aspect-square bg-navy-dark overflow-hidden group relative focus:outline-none"
              aria-label={item.alt || item.caption || "Open photo"}
            >
              <img
                src={src || fallbackSrc}
                alt={item.alt || item.caption || ""}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackSrc;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Orange reveal bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              {/* Caption overlay */}
              {item.caption && (
                <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-xs font-bold leading-tight line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Gallery page
   ────────────────────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  const [allItems, setAllItems] = useState<StrapiGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  useEffect(() => {
    getGalleryItems().then((data) => {
      setAllItems(data);
      setLoading(false);
    });
  }, []);

  const groups = buildGroups(allItems);

  /* Filter to active group if sidebar item clicked, else show all */
  const visibleGroups =
    activeGroupId ? groups.filter((g) => g.id === activeGroupId) : groups;

  return (
    <>
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={allItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div className="min-h-screen bg-off-white">
        {/* Header bar */}
        <div className="bg-navy sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/#gallery"
                className="text-slate-muted hover:text-orange transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <span className="text-white font-black text-xs uppercase tracking-widest">
                  Amari Girls Foundation
                </span>
                <span className="text-slate-muted mx-2 text-xs">·</span>
                <span className="text-orange font-black text-xs uppercase tracking-widest">
                  Gallery
                </span>
              </div>
            </div>
            {!loading && (
              <div className="flex items-center gap-3">
                <span className="text-slate-muted text-xs uppercase tracking-widest">
                  {allItems.length} photo{allItems.length !== 1 ? "s" : ""}
                </span>
                <span className="text-slate-muted text-xs">·</span>
                <span className="text-slate-muted text-xs uppercase tracking-widest">
                  {groups.filter((g) => g.id !== "general").length} event
                  {groups.filter((g) => g.id !== "general").length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
          {/* Orange accent */}
          <div className="h-0.5 bg-orange w-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

          {/* Page title */}
          <div className="mb-10">
            <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-1">
              Moments That Matter
            </p>
            <h1 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
              Our Gallery
            </h1>
            <p className="text-slate-muted text-xs uppercase tracking-wide mt-2">
              Photos organised by event. Click any photo to view full size.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i}>
                  <div className="h-6 w-48 loading-shimmer mb-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 bg-navy">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className="aspect-square loading-shimmer" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && allItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-navy/20">
              <Images className="w-14 h-14 text-navy/20 mb-5" />
              <p className="text-navy font-black text-sm uppercase tracking-widest mb-2">
                Gallery Coming Soon
              </p>
              <p className="text-slate-muted text-xs uppercase tracking-wide text-center max-w-xs">
                Photos from our events will appear here once uploaded to the backend.
              </p>
              <Link
                href="/"
                className="mt-8 bg-orange text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-dark transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}

          {/* Content: sidebar + groups */}
          {!loading && allItems.length > 0 && (
            <div className="flex gap-8 items-start">

              {/* Sticky sidebar — event jump links */}
              <aside className="hidden lg:block w-52 shrink-0 sticky top-24">
                <p className="text-navy font-black text-xs uppercase tracking-[0.25em] mb-3">
                  Jump to Event
                </p>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveGroupId(null)}
                      className={`w-full text-left text-xs font-black uppercase tracking-widest px-3 py-2 transition-colors ${
                        activeGroupId === null
                          ? "bg-navy text-white"
                          : "text-navy hover:text-orange"
                      }`}
                    >
                      All Events
                      <span className="ml-1 text-orange">({allItems.length})</span>
                    </button>
                  </li>
                  {groups.map((g) => (
                    <li key={g.id}>
                      <button
                        onClick={() =>
                          setActiveGroupId(g.id === activeGroupId ? null : g.id)
                        }
                        className={`w-full text-left text-xs font-black uppercase tracking-widest px-3 py-2 transition-colors flex items-center gap-1.5 ${
                          activeGroupId === g.id
                            ? "bg-navy text-white"
                            : "text-navy hover:text-orange"
                        }`}
                      >
                        {g.id !== "general" && (
                          <Calendar className="w-3 h-3 shrink-0 text-orange" />
                        )}
                        <span className="truncate">{g.label}</span>
                        <span
                          className={`ml-auto shrink-0 ${activeGroupId === g.id ? "text-orange" : "text-slate-muted"}`}
                        >
                          ({g.items.length})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Mobile event filter pills */}
              <div className="lg:hidden flex flex-wrap gap-1.5 mb-6 w-full">
                <button
                  onClick={() => setActiveGroupId(null)}
                  className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 transition-colors ${
                    activeGroupId === null
                      ? "bg-navy text-white"
                      : "bg-white border-2 border-navy/20 text-navy hover:border-orange hover:text-orange"
                  }`}
                >
                  All ({allItems.length})
                </button>
                {groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() =>
                      setActiveGroupId(g.id === activeGroupId ? null : g.id)
                    }
                    className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 transition-colors ${
                      activeGroupId === g.id
                        ? "bg-navy text-white"
                        : "bg-white border-2 border-navy/20 text-navy hover:border-orange hover:text-orange"
                    }`}
                  >
                    {g.label} ({g.items.length})
                  </button>
                ))}
              </div>

              {/* Event groups */}
              <div className="flex-1 min-w-0 space-y-14">
                {visibleGroups.map((group) => (
                  <div key={group.id} id={`event-${group.id}`}>
                    {/* Group header */}
                    <div className="flex items-center gap-3 mb-4">
                      {group.id !== "general" && (
                        <Calendar className="w-4 h-4 text-orange shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-navy font-black text-base uppercase tracking-widest truncate">
                          {group.label}
                        </h2>
                        <p className="text-slate-muted text-xs uppercase tracking-wide mt-0.5">
                          {group.items.length} photo{group.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="h-px flex-1 bg-navy/10" />
                    </div>

                    {/* Photo grid */}
                    <EventGrid
                      group={group}
                      allItems={allItems}
                      onOpen={(idx) => setLightboxIndex(idx)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
