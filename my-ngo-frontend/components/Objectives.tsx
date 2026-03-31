import type { ObjectivesData } from "@/lib/types";
import defaults from "@/lib/defaults";

export default function Objectives({ data }: { data?: ObjectivesData }) {
  data = { ...defaults.objectives, ...data } satisfies ObjectivesData;
  return (
    <section className="bg-off-white py-24 px-6 lg:px-10">
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

        <div className="grid md:grid-cols-2 gap-0">
          {data.items.map((obj, i) => (
            <div
              key={i}
              className="flex items-start gap-6 border-b border-l-0 border-navy py-6 px-2 first:border-t md:odd:border-r md:odd:pr-12 md:even:pl-12"
            >
              <div className="shrink-0 w-8 h-8 bg-navy flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-navy text-[15px] leading-relaxed">{obj}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
