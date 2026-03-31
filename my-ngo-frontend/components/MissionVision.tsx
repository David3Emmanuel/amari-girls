import type { MissionVisionData } from "@/lib/types";
import defaults from "@/lib/defaults";

export default function MissionVision({ data }: { data?: MissionVisionData }) {
  data = { ...defaults.missionVision, ...data } satisfies MissionVisionData;
  return (
    <section id="mission" className="bg-navy py-24 px-6 lg:px-10">
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

        <div className="grid md:grid-cols-2 gap-px bg-navy-dark">
          {/* Mission */}
          <div className="bg-navy p-10 border-t-4 border-orange">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-black uppercase tracking-widest">
                Our Mission
              </h3>
            </div>
            <p className="text-slate-300 text-[15px] leading-relaxed">
              {data.missionText}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-navy p-10 border-t-4 border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-black uppercase tracking-widest">
                Our Vision
              </h3>
            </div>
            <p className="text-slate-300 text-[15px] leading-relaxed">
              {data.visionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
