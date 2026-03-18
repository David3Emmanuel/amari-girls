"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPartnerOptions, type StrapiPartnerOption } from "@/api/partnerOptions";
import type { PartnerData } from "@/lib/types";
import defaults from "@/lib/defaults";

/* ── Map default options to the display shape ──────────────────────────────
   Default CTA hrefs: "Sponsor Now" → /donate, "Partner With Us" → /donate,
   "Volunteer" → /volunteer
   ────────────────────────────────────────────────────────────────────────── */
const DEFAULT_HREFS: Record<string, string> = {
  "Sponsor Now": "/donate",
  "Partner With Us": "/donate",
  "Volunteer": "/volunteer",
};

function resolveHref(cta: string, strapiHref?: string): string {
  if (strapiHref && strapiHref.trim()) return strapiHref.trim();
  return DEFAULT_HREFS[cta] ?? "/donate";
}

interface DisplayOption {
  num: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  accent: boolean;
}

export default function PartnerWithUs({
  data = defaults.partner,
}: {
  data?: PartnerData;
}) {
  const [strapiOptions, setStrapiOptions] = useState<StrapiPartnerOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartnerOptions().then((opts) => {
      setStrapiOptions(opts);
      setLoading(false);
    });
  }, []);

  const usingFallback = !loading && strapiOptions.length === 0;

  /* Build the final list from either Strapi or defaults */
  const displayOptions: DisplayOption[] = usingFallback
    ? data.options.map((o) => ({
        num: o.num,
        title: o.title,
        description: o.description,
        ctaLabel: o.cta,
        ctaHref: resolveHref(o.cta),
        accent: o.accent,
      }))
    : strapiOptions.map((o) => ({
        num: o.num,
        title: o.title,
        description: o.description,
        ctaLabel: o.ctaLabel,
        ctaHref: resolveHref(o.ctaLabel, o.ctaHref),
        accent: o.accent,
      }));

  return (
    <section id="partner" className="bg-white py-24 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
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

        {/* Loading skeletons */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-0.5 bg-navy">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-72 loading-shimmer" />
            ))}
          </div>
        )}

        {/* Option cards */}
        {!loading && displayOptions.length > 0 && (
          <div className="grid md:grid-cols-3 gap-0.5 bg-navy">
            {displayOptions.map((option) => (
              <div key={option.num} className="bg-white flex flex-col">
                {/* Top accent bar */}
                <div className={`h-1 ${option.accent ? "bg-orange" : "bg-navy"}`} />

                <div className="p-10 flex flex-col flex-1">
                  {/* Number */}
                  <span className="text-off-white text-5xl font-black leading-none select-none">
                    {option.num}
                  </span>

                  {/* Title */}
                  <h3 className="text-navy text-base font-black uppercase tracking-wide mt-4 mb-4 leading-tight">
                    {option.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-8 h-px bg-orange mb-6" />

                  {/* Body */}
                  <p className="text-navy text-sm leading-relaxed flex-1">
                    {option.description}
                  </p>

                  {/* CTA — uses Next Link so navigation is client-side */}
                  <Link
                    href={option.ctaHref}
                    className={`mt-8 inline-block text-center text-xs font-black uppercase tracking-widest px-6 py-3 transition-colors duration-150 ${
                      option.accent
                        ? "bg-orange text-white hover:bg-orange-dark"
                        : "bg-navy text-white hover:bg-navy-dark"
                    }`}
                  >
                    {option.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
