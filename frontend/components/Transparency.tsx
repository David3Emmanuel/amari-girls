"use client";

import { useEffect, useState } from "react";
import { Shield, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { getAllReports, type StrapiReport } from "@/api/reports";
import { getAllOrgPartners, type StrapiOrgPartner } from "@/api/partners";
import { getStrapiImageUrl, STRAPI_BASE_URL } from "@/api/strapi";

const PARTNER_BADGE: Record<string, string> = {
  Government: "bg-navy text-white",
  NGO: "bg-orange text-white",
  Corporate: "bg-slate-700 text-white",
  Foundation: "bg-green-700 text-white",
};

const PILLARS = [
  {
    icon: Shield,
    title: "Financial Accountability",
    desc: "We maintain rigorous financial controls and publish annual reports.",
    bullets: [
      "Independent annual audits",
      "Donor fund ring-fencing",
      "Quarterly board reviews",
      "Published financial statements",
    ],
  },
  {
    icon: FileText,
    title: "Governance",
    desc: "Our Board of Trustees provides independent oversight of all operations.",
    bullets: [
      "Registered non-profit status",
      "Clear conflict-of-interest policy",
      "Bi-annual board meetings",
      "Written code of conduct",
    ],
  },
  {
    icon: CheckCircle,
    title: "Community Engagement",
    desc: "We involve beneficiary communities in planning, delivery, and evaluation.",
    bullets: [
      "Community advisory input",
      "Beneficiary feedback loops",
      "Open programme reporting",
      "Impact measurement framework",
    ],
  },
];

async function downloadFile(fileUrl: string, name: string) {
  const url = getStrapiImageUrl(fileUrl);
  const res = await fetch(url);
  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function Transparency() {
  const [reports, setReports] = useState<StrapiReport[]>([]);
  const [partners, setPartners] = useState<StrapiOrgPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllReports(), getAllOrgPartners()]).then(([r, p]) => {
      setReports(r);
      setPartners(p);
      setLoading(false);
    });
  }, []);

  return (
    <section id="transparency" className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
            Open & Accountable
          </p>
          <h2 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
            Transparency
          </h2>
        </div>

        {/* 3 pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {PILLARS.map(({ icon: Icon, title, desc, bullets }) => (
            <div key={title} className="bg-white p-7 border-t-4 border-orange">
              <Icon className="w-7 h-7 text-orange mb-4" />
              <h3 className="text-navy font-black uppercase tracking-wide text-sm mb-2">
                {title}
              </h3>
              <p className="text-slate-muted text-xs leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-navy/70">
                    <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Reports */}
        <div className="mb-14">
          <h3 className="text-navy font-black uppercase tracking-[0.2em] text-xs mb-6 pb-3 border-b-2 border-navy/10">
            Reports & Documents
          </h3>
          {loading && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white animate-pulse h-16" />
              ))}
            </div>
          )}
          {!loading && reports.length === 0 && (
            <p className="text-slate-muted text-xs uppercase tracking-wide">
              Reports coming soon.
            </p>
          )}
          {!loading && reports.length > 0 && (
            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="bg-white flex items-center justify-between gap-4 p-4"
                >
                  <div>
                    <p className="text-navy font-black text-xs uppercase tracking-wide">
                      {r.year} — {r.type}
                    </p>
                    {r.summary && (
                      <p className="text-slate-muted text-xs mt-0.5">{r.summary}</p>
                    )}
                  </div>
                  {r.files && r.files.length > 0 ? (
                    <button
                      onClick={() =>
                        downloadFile(r.files![0].url, r.files![0].name || `${r.year}-report.pdf`)
                      }
                      className="shrink-0 bg-orange text-white text-xs font-black uppercase tracking-widest px-4 py-2 hover:bg-orange-dark transition-colors"
                    >
                      Download
                    </button>
                  ) : (
                    <span className="shrink-0 text-slate-muted text-xs font-black uppercase tracking-widest border border-slate-muted/30 px-3 py-1.5">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partners */}
        {!loading && partners.length > 0 && (
          <div>
            <h3 className="text-navy font-black uppercase tracking-[0.2em] text-xs mb-6 pb-3 border-b-2 border-navy/10">
              Partners & Collaborators
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((p) => {
                const logoUrl = getStrapiImageUrl(p.logo?.url);
                return (
                  <div
                    key={p.id}
                    className="bg-white flex items-center gap-3 p-4"
                  >
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={p.name}
                        className="w-10 h-10 object-contain shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-navy/5 flex items-center justify-center shrink-0 text-navy font-black text-xs">
                        {p.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-navy font-black text-xs uppercase tracking-wide truncate">
                        {p.name}
                      </p>
                      <span
                        className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 mt-0.5 ${
                          PARTNER_BADGE[p.type] ?? "bg-navy/10 text-navy"
                        }`}
                      >
                        {p.type} ✓
                      </span>
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-slate-muted hover:text-orange transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
