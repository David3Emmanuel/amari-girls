import ClientImage from "@/components/ClientImage";
import type { CommunityProjectData } from "@/lib/types";
import { resolveImageUrl } from "@/lib/api";
import defaults from "@/lib/defaults";

export default function CommunityProject({ data: _data }: { data?: Partial<CommunityProjectData> }) {
  const data = { ...defaults.communityProject, ..._data } satisfies CommunityProjectData;
  const imgSrc = resolveImageUrl(data.image);

  return (
    <section className="bg-white py-24 px-6 lg:px-10">
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

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image panel */}
          <div className="bg-navy-dark overflow-hidden min-h-72 relative">
            <ClientImage
              src={imgSrc}
              alt={`${data.sectionTitle} in ${data.location}`}
              fallback="https://placehold.co/600x400/091f52/ffffff?text=Outreach"
              className="w-full h-full object-cover absolute inset-0"
            />
            {/* Solid orange bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange" />
          </div>

          {/* Text panel */}
          <div className="bg-off-white px-10 py-12 flex flex-col justify-center">
            <div className="inline-block bg-orange text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 mb-8 self-start">
              {data.location}
            </div>

            <div className="space-y-4 text-navy text-[15px] leading-relaxed">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Pull quote */}
            <div className="mt-10 border-l-4 border-orange pl-6">
              <p className="text-navy font-black text-sm uppercase tracking-wide leading-relaxed">
                {data.quote}
              </p>
              <p className="text-slate-muted text-xs uppercase tracking-widest font-bold mt-2">
                {data.quoteAuthor}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
