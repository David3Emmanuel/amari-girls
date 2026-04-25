"use client";

import { useEffect, useState } from "react";
import { getBoardMembers, type StrapiBoardMember } from "@/data/boardMembers";
import { getStrapiImageUrl } from "@/data/strapi";
import type { BoardData } from "@/lib/types";
import defaults from "@/lib/defaults";

export default function BoardOfTrustees({
  data: _data,
}: {
  data?: Partial<BoardData>;
}) {
  const data = { ...defaults.board, ..._data } satisfies BoardData;
  const [members, setMembers] = useState<StrapiBoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBoardMembers().then((data) => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  const usingFallback = !loading && members.length === 0;

  /* Build a unified display list from whichever source is active */
  const displayMembers = usingFallback
    ? data.members.map((m, i) => ({
        id: i,
        name: m.name,
        role: m.role,
        bio: undefined as string | undefined,
        imgSrc: m.image,
      }))
    : members.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        bio: m.bio,
        imgSrc: getStrapiImageUrl(m.image?.url),
      }));

  return (
    <section id="board" className="bg-off-white py-24 px-6 lg:px-10">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 bg-navy">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-off-white h-48 loading-shimmer" />
            ))}
          </div>
        )}

        {/* Member grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 bg-navy">
            {displayMembers.map((member) => {
              const initials = member.name
                .split(" ")
                .filter((w) => w.length > 1)
                .map((w) => w[0])
                .join("")
                .slice(0, 2);
              const fallback = `https://placehold.co/160x160/0d2a6e/ffffff?text=${initials}`;

              return (
                <div
                  key={member.id}
                  className="bg-off-white flex flex-col items-center text-center p-6 group"
                >
                  <div className="w-20 h-20 bg-navy overflow-hidden mb-4">
                    <img
                      src={member.imgSrc || fallback}
                      alt={member.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = fallback;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-6 h-px bg-orange mb-3" />
                  <p className="text-navy font-black text-xs uppercase tracking-wide leading-tight">
                    {member.name}
                  </p>
                  <p className="text-orange text-xs font-bold uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-slate-muted text-[10px] leading-relaxed mt-2 hidden group-hover:block">
                      {member.bio}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
