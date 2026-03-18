"use client";

import { useEffect, useState } from "react";
import { getTestimonials, type StrapiTestimonial } from "@/api/testimonials";
import { getStrapiImageUrl } from "@/api/strapi";
import type { TestimonialsData } from "@/lib/types";
import defaults from "@/lib/defaults";

/* ── Builds a display-ready testimonial from a Strapi record ────────────── */
function StrapiCard({ t }: { t: StrapiTestimonial }) {
  const imgSrc = getStrapiImageUrl(t.image?.url);
  const initial = t.name.charAt(0).toUpperCase();
  const fallback = `https://placehold.co/56x56/0d2a6e/ffffff?text=${initial}`;

  return (
    <div className="bg-white p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-navy overflow-hidden shrink-0">
          <img
            src={imgSrc || fallback}
            alt={t.name}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallback; }}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-black text-navy text-xs uppercase tracking-wide">{t.name}</p>
          <p className="text-orange text-xs font-bold uppercase tracking-widest mt-0.5">
            {t.role}
          </p>
          {t.program && (
            <p className="text-slate-muted text-[10px] uppercase tracking-widest mt-0.5">
              {t.program.title}
            </p>
          )}
        </div>
      </div>
      <div className="w-6 h-px bg-orange" />
      <p className="text-navy text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
    </div>
  );
}

/* ── Fallback static card (uses the existing TestimonialItem shape) ─────── */
function StaticCard({
  t,
}: {
  t: { name: string; role: string; quote: string; image: string };
}) {
  const initial = t.name.charAt(0).toUpperCase();
  const fallback = `https://placehold.co/56x56/0d2a6e/ffffff?text=${initial}`;

  return (
    <div className="bg-white p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-navy overflow-hidden shrink-0">
          <img
            src={t.image || fallback}
            alt={t.name}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallback; }}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-black text-navy text-xs uppercase tracking-wide">{t.name}</p>
          <p className="text-orange text-xs font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
        </div>
      </div>
      <div className="w-6 h-px bg-orange" />
      <p className="text-navy text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function Testimonials({
  data = defaults.testimonials,
}: {
  data?: TestimonialsData;
}) {
  const [strapiItems, setStrapiItems] = useState<StrapiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then((items) => {
      setStrapiItems(items);
      setLoading(false);
    });
  }, []);

  const usingFallback = !loading && strapiItems.length === 0;

  /* When Strapi has data, the first item with featured=true becomes the hero quote */
  const featuredFromStrapi = strapiItems.find((t) => t.featured) ?? strapiItems[0] ?? null;
  const cardsFromStrapi = strapiItems.filter((t) => t !== featuredFromStrapi).slice(0, 6);

  /* Fallback featured & cards from defaults */
  const featuredQuote = usingFallback ? data.featuredQuote : featuredFromStrapi?.quote ?? data.featuredQuote;
  const featuredAuthor = usingFallback ? data.featuredAuthor : featuredFromStrapi?.name ?? data.featuredAuthor;
  const featuredRole = usingFallback ? data.featuredRole : featuredFromStrapi?.role ?? data.featuredRole;
  const featuredProgram = !usingFallback && featuredFromStrapi?.program ? featuredFromStrapi.program.title : null;

  return (
    <section id="testimonials" className="bg-navy py-24 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-1 h-10 bg-orange" />
          <div>
            <p className="text-orange text-xs font-black uppercase tracking-[0.3em]">
              {data.sectionLabel}
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight mt-1">
              {data.sectionTitle}
            </h2>
          </div>
        </div>

        {/* Featured quote — solid white block */}
        <div className="bg-white p-10 md:p-14 mb-0.5">
          <div className="text-orange text-7xl font-black leading-none mb-4 select-none">&ldquo;</div>
          <blockquote className="text-navy text-lg md:text-xl font-bold leading-relaxed max-w-3xl uppercase tracking-tight">
            {featuredQuote}
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-8 h-px bg-orange" />
            <div>
              <p className="text-navy font-black text-xs uppercase tracking-widest">
                {featuredAuthor}
              </p>
              <p className="text-slate-muted text-xs uppercase tracking-widest mt-0.5">
                {featuredRole}
              </p>
              {featuredProgram && (
                <p className="text-orange text-[10px] font-black uppercase tracking-widest mt-0.5">
                  {featuredProgram}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-0.5 bg-navy mt-0.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 loading-shimmer" />
            ))}
          </div>
        )}

        {/* Strapi testimonial cards */}
        {!loading && !usingFallback && cardsFromStrapi.length > 0 && (
          <div className="grid md:grid-cols-3 gap-0.5 bg-navy mt-0.5">
            {cardsFromStrapi.map((t) => (
              <StrapiCard key={t.id} t={t} />
            ))}
          </div>
        )}

        {/* Fallback static cards */}
        {!loading && usingFallback && data.items.length > 0 && (
          <div className="grid md:grid-cols-3 gap-0.5 bg-navy mt-0.5">
            {data.items.map((t, i) => (
              <StaticCard key={i} t={t} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
