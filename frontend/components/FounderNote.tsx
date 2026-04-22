import ClientImage from "@/components/ClientImage";
import type { FounderData } from "@/lib/types";
import { resolveImageUrl } from "@/lib/api";
import defaults from "@/lib/defaults";

export default function FounderNote({ data: _data }: { data?: Partial<FounderData> }) {
  const data = { ...defaults.founder, ..._data } satisfies FounderData;
  const imgSrc = resolveImageUrl(data.image);

  return (
    <section id="about" className="bg-white py-24 px-6 lg:px-10">
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

        <div className="grid lg:grid-cols-2">
          {/* Photo block — solid off-white panel */}
          <div className="bg-off-white flex flex-col items-center justify-center py-14 px-10">
            <div className="w-52 h-64 bg-navy overflow-hidden">
              <ClientImage
                src={imgSrc}
                alt={`${data.name} \u2014 ${data.role}`}
                fallback="https://placehold.co/208x256/0d2a6e/ffffff?text=Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-navy font-black text-sm uppercase tracking-wide">
                {data.name}
              </p>
              <div className="w-8 h-px bg-orange mx-auto my-2" />
              <p className="text-orange text-xs font-bold uppercase tracking-widest">
                {data.role}
              </p>
            </div>
          </div>

          {/* Bio block — solid left border */}
          <div className="border-l-4 border-navy px-10 py-14 flex flex-col justify-center">
            <div className="inline-block bg-navy text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 mb-8 self-start">
              {data.noteLabel}
            </div>

            <div className="space-y-4 text-navy text-[15px] leading-relaxed">
              {data.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-8 h-px bg-orange" />
              <p className="text-navy font-black text-xs uppercase tracking-widest">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
