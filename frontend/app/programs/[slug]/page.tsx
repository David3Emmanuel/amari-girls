"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Tag,
  Users,
  Heart,
} from "lucide-react";
import { getAllPrograms, type StrapiProgram } from "@/api/programs";
import { getStrapiImageUrl } from "@/api/strapi";

export default function ProgramDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<StrapiProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* ── Fetch program ─────────────────────────────────────────────────────── */
  useEffect(() => {
    getAllPrograms().then((data) => {
      const found = data.find((p) => p.slug === slug) ?? null;
      setProgram(found);
      setNotFound(!found);
      setLoading(false);
    });
  }, [slug]);

  /* ── Auto-rotate gallery every 2 s ────────────────────────────────────── */
  useEffect(() => {
    if (!program?.gallery_items || program.gallery_items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === program.gallery_items!.length - 1 ? 0 : prev + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [program?.gallery_items])

  const prevImage = useCallback(() => {
    if (!program?.gallery_items) return
    setCurrentImageIndex((prev) =>
      prev === 0 ? program.gallery_items!.length - 1 : prev - 1,
    )
  }, [program?.gallery_items])

  const nextImage = useCallback(() => {
    if (!program?.gallery_items) return
    setCurrentImageIndex((prev) =>
      prev === program.gallery_items!.length - 1 ? 0 : prev + 1,
    )
  }, [program?.gallery_items])

  /* ── States ────────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-navy font-black text-xs uppercase tracking-widest">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !program) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-navy font-black text-2xl uppercase tracking-widest mb-3">
            404
          </p>
          <p className="text-slate-muted text-xs uppercase tracking-widest mb-6">
            Programme not found.
          </p>
          <Link
            href="/#programs"
            className="bg-orange text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-dark transition-colors"
          >
            View All Programmes
          </Link>
        </div>
      </div>
    );
  }

  const heroImg = getStrapiImageUrl(program.heroImage?.url)
  const gallery = program.gallery_items ?? []

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header bar */}
      <div className="bg-navy py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/#programs" className="text-slate-muted hover:text-orange transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-white font-black text-xs uppercase tracking-widest">
            Amari Girls Foundation — Programmes
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-64 md:h-80 bg-navy overflow-hidden">
        {heroImg ? (
          <img
            src={heroImg}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 className="text-white font-black text-2xl md:text-4xl uppercase tracking-widest">
            {program.title}
          </h1>
          {program.summary && (
            <p className="text-slate-muted text-sm mt-2 max-w-xl leading-relaxed">
              {program.summary}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Gallery */}
            {gallery.length > 0 && (
              <div>
                <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b-2 border-navy/10">
                  Gallery
                </h2>
                <div className="relative bg-navy/5 overflow-hidden">
                  {/* Main image */}
                  <div className="relative h-64 md:h-80">
                    <img
                      src={getStrapiImageUrl(gallery[currentImageIndex]?.url)}
                      alt={`Gallery image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Counter */}
                    <span className="absolute top-3 right-3 bg-navy/70 text-white text-xs font-black px-2 py-1">
                      {currentImageIndex + 1} / {gallery.length}
                    </span>
                    {/* Arrows */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-navy/70 text-white flex items-center justify-center hover:bg-orange transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-navy/70 text-white flex items-center justify-center hover:bg-orange transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Thumbnails */}
                  {gallery.length > 1 && (
                    <div className="flex gap-1.5 p-2 overflow-x-auto">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`shrink-0 w-14 h-14 border-2 overflow-hidden transition-colors ${
                            i === currentImageIndex
                              ? "border-orange"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={getStrapiImageUrl(img.url)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Body */}
            {program.body && (
              <div>
                <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b-2 border-navy/10">
                  About This Programme
                </h2>
                <div
                  className="prose prose-sm max-w-none text-navy/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: program.body }}
                />
              </div>
            )}

            {/* Success stories */}
            {program.story_impacts && program.story_impacts.length > 0 && (
              <div>
                <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b-2 border-navy/10">
                  Success Stories
                </h2>
                <div className="space-y-5">
                  {program.story_impacts.map((story) => (
                    <div key={story.id} className="bg-white p-6 border-l-4 border-orange">
                      <h3 className="text-navy font-black uppercase tracking-wide text-xs mb-2">
                        {story.title}
                      </h3>
                      <p className="text-slate-muted text-xs leading-relaxed mb-3">
                        {story.excerpt}
                      </p>
                      {story.body && (
                        <div
                          className="text-navy/70 text-xs leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: story.body }}
                        />
                      )}
                      {story.beneficiary && (
                        <p className="text-orange font-black text-xs uppercase tracking-widest mt-3">
                          — {story.beneficiary.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            {program.tags && program.tags.length > 0 && (
              <div className="bg-white p-5">
                <h3 className="text-navy font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-off-white text-navy text-xs font-black uppercase tracking-widest px-3 py-1"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Partners */}
            {program.partners && program.partners.length > 0 && (
              <div className="bg-white p-5">
                <h3 className="text-navy font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange" /> Partners
                </h3>
                <ul className="space-y-2">
                  {program.partners.map((p) => (
                    <li key={p.id} className="text-xs text-slate-muted uppercase tracking-wide">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-orange transition-colors"
                        >
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA card */}
            <div className="bg-navy p-6">
              <Heart className="w-6 h-6 text-orange mb-3" />
              <p className="text-white font-black uppercase tracking-widest text-xs mb-2">
                Support This Programme
              </p>
              <p className="text-slate-muted text-xs leading-relaxed mb-5">
                Your donation directly funds initiatives like this one.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/donate"
                  className="bg-orange text-white font-black text-xs uppercase tracking-widest px-5 py-3 text-center hover:bg-orange-dark transition-colors"
                >
                  Donate Now
                </Link>
                <Link
                  href="/volunteer"
                  className="border-2 border-white/20 text-white font-black text-xs uppercase tracking-widest px-5 py-3 text-center hover:border-orange hover:text-orange transition-colors"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
