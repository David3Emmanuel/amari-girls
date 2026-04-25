"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, Star } from "lucide-react";
import { getAllPrograms, type StrapiProgram } from "@/data/programs";
import { getStrapiImageUrl } from "@/data/strapi";

const ICONS = [BookOpen, Users, Star];

export default function Programs() {
  const [programs, setPrograms] = useState<StrapiProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPrograms().then((data) => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
            What We Do
          </p>
          <h2 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
            Our Programmes
          </h2>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-off-white animate-pulse rounded-none h-72" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && programs.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-navy/20">
            <BookOpen className="w-12 h-12 text-navy/30 mx-auto mb-4" />
            <p className="text-navy font-black uppercase tracking-widest text-sm">
              Programmes Coming Soon
            </p>
            <p className="text-slate-muted text-xs mt-2 uppercase tracking-wide">
              Check back shortly for updates on our work.
            </p>
          </div>
        )}

        {/* Programme cards */}
        {!loading && programs.length > 0 && (
          <>
            {/* Stats bar */}
            <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b-2 border-navy/10">
              <div>
                <span className="text-orange font-black text-2xl">{programs.length}</span>
                <span className="text-navy font-black text-xs uppercase tracking-widest ml-2">
                  Active Programmes
                </span>
              </div>
              <div>
                <span className="text-orange font-black text-2xl">200+</span>
                <span className="text-navy font-black text-xs uppercase tracking-widest ml-2">
                  Girls Reached
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((prog, i) => {
                const Icon = ICONS[i % ICONS.length];
                const imgUrl = getStrapiImageUrl(prog.heroImage?.url);
                return (
                  <div
                    key={prog.id}
                    className="group border-2 border-navy/10 hover:border-orange transition-colors duration-200 flex flex-col"
                  >
                    {/* Hero image */}
                    <div className="relative h-44 bg-navy/5 overflow-hidden">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={prog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-navy/5">
                          <Icon className="w-10 h-10 text-navy/20" />
                        </div>
                      )}
                      {/* Icon badge */}
                      <div className="absolute top-3 right-3 w-9 h-9 bg-orange flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-navy font-black uppercase tracking-wide text-sm mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-slate-muted text-xs leading-relaxed flex-1">
                        {prog.summary}
                      </p>
                      <Link
                        href={`/programs/${prog.slug}`}
                        className="mt-4 inline-block text-orange font-black text-xs uppercase tracking-widest hover:underline"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/volunteer"
                className="bg-navy text-white font-black text-xs uppercase tracking-widest px-8 py-4 text-center hover:bg-navy-dark transition-colors duration-150"
              >
                Get Involved
              </Link>
              <Link
                href="#testimonials"
                className="border-2 border-navy text-navy font-black text-xs uppercase tracking-widest px-8 py-4 text-center hover:bg-navy hover:text-white transition-colors duration-150"
              >
                View Success Stories
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
