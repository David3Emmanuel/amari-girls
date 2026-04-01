import type { HeroData } from "@/lib/types";
import { resolveImageUrl } from "@/lib/api";
import defaults from "@/lib/defaults";

export default function Hero({ data: _data }: { data?: Partial<HeroData> }) {

  const data = { ...defaults.hero, ..._data } satisfies HeroData;
  data.headingLine3Desktop = {...defaults.hero.headingLine3Desktop, ...data.headingLine3Desktop };
  data.headingLine3Mobile = { ...defaults.hero.headingLine3Mobile, ...data.headingLine3Mobile };
  data.ctaButtons = data.ctaButtons || defaults.hero.ctaButtons;
  data.socials = data.socials || defaults.hero.socials;
  data.stats = data.stats || defaults.hero.stats;

  const bgUrl = resolveImageUrl(data.backgroundImage);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        /* Locked to exactly one viewport height */
        height: "100vh",
        clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
      }}
    >
      {/* ── LAYER 0: Full-bleed background image ──────────────────────────── */}
      <div
        className="absolute inset-0 z-0 bg-navy"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ── LAYER 1: Solid navy diagonal panel ────────────────────────────── */}
      <div
        className="absolute inset-y-0 left-0 bg-navy z-10 anim-slide-in-left"
        style={{
          width: "70%",
          clipPath: "polygon(0 0, 100% 0, 78% 100%, 0 100%)",
        }}
      />

      {/* ── LAYER 2: Orange accent bars ───────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-orange z-30 anim-scale-full" />
      <div className="absolute top-1/3 right-0 w-1 h-40 bg-orange z-30 anim-fade-in-4" />

      {/* ── LAYER 3: Main content ─────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col justify-center h-full px-10 lg:px-20 pt-16 pb-28">

        {/* Label */}
        <div className="flex items-center gap-3 mb-6 anim-fade-in-1">
          <div className="w-2 h-2 bg-orange anim-pulsate" />
          <p className="text-orange text-xs font-black uppercase tracking-[0.4em] anim-text-focus">
            {data.label}
          </p>
        </div>

        {/* MEGA HEADING — 4-line mixed typography */}
        <h1
          className="font-black uppercase leading-[0.9] tracking-tighter anim-tracking-expand"
          style={{ fontSize: "clamp(1.5rem, 8vw, 7.5rem)" }}
        >
          {/* LINE 1 — Solid white */}
          <span className="block text-white">{data.headingLine1}</span>

          {/* LINE 2 — Image clips through letterforms (boosted filter) */}
          <span
            className="block"
            style={{
              backgroundImage: `url('${bgUrl}')`,
              backgroundSize: "150% auto",
              backgroundPosition: "30% center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "brightness(2.8) saturate(2.2) contrast(1.3)",
            }}
          >
            {data.headingLine2}
          </span>

          {/* LINE 3 — Desktop: outlined text, Mobile: solid fills */}
          <span
            className="hidden md:block"
            style={{
              WebkitTextStroke: "3px white",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {data.headingLine3Desktop.main}
            <span style={{ WebkitTextStroke: "3px #f97316" }}>{data.headingLine3Desktop.accent}</span>
          </span>

          <span
            className="block md:hidden text-white"
            style={{
              fontSize: "clamp(1.3rem, 10vw, 2.0rem)",
            }}
          >
            {data.headingLine3Mobile.main}
            <span className="text-orange" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>{data.headingLine3Mobile.accent}</span>
          </span>

          {/* LINE 4 — Solid orange */}
          <span className="block text-orange">{data.headingLine4}</span>
        </h1>

        {/* Orange rule */}
        <div className="w-16 h-1 bg-orange mt-6 mb-5 anim-scale-left" />

        {/* Tagline */}
        <p className="text-white text-xs font-bold uppercase tracking-[0.3em] max-w-xs anim-fade-in-2">
          {data.tagline}
        </p>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 anim-fade-in-3">
          {data.ctaButtons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className={
                btn.variant === "primary"
                  ? "bg-orange text-white text-xs font-black uppercase tracking-widest px-7 py-3.5 hover:bg-orange-dark transition-colors duration-150 inline-block"
                  : "border-2 border-white text-white text-xs font-black uppercase tracking-widest px-7 py-3.5 hover:border-orange hover:text-orange transition-colors duration-150 inline-block"
              }
            >
              {btn.label}
            </a>
          ))}
        </div>

        {/* Social strip */}
        <div className="mt-8 flex items-center gap-6 anim-fade-in-5">
          {data.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-muted hover:text-orange text-xs font-black uppercase tracking-widest transition-colors duration-150"
            >
              {s.label}
            </a>
          ))}
          <div className="flex-1 h-px bg-navy-dark" />
        </div>
      </div>

      {/* ── LAYER 4: Impact stats (right side, above the diagonal cut) ────── */}
      <div className="absolute bottom-32 right-10 z-20 hidden sm:flex flex-col items-end gap-5 anim-fade-in-5">
        {data.stats.map((stat) => (
          <div key={stat.label} className="text-right">
            <p className="text-white font-black text-4xl leading-none">{stat.num}</p>
            <div className="w-full h-px bg-orange mt-1 mb-1" />
            <p className="text-orange text-xs font-black uppercase tracking-[0.2em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
