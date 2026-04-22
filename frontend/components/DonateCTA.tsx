"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, RefreshCw, Calendar, Gift } from "lucide-react";
import { getSiteSettings, type StrapiSiteSettings } from "@/api/siteSettings";
import defaults from "@/lib/defaults";

const DONATION_OPTIONS = [
  {
    icon: Heart,
    title: "One-Time Gift",
    desc: "Make a single contribution of any amount to support our girls directly.",
  },
  {
    icon: RefreshCw,
    title: "Monthly Giving",
    desc: "Commit to a recurring monthly donation and ensure sustained impact.",
  },
  {
    icon: Calendar,
    title: "Quarterly Support",
    desc: "Donate once per quarter to align giving with our programme cycles.",
  },
  {
    icon: Gift,
    title: "In-Kind Donation",
    desc: "Contribute school supplies, equipment, books, or other materials.",
  },
];

const USAGE = [
  "70% — Direct programme delivery (scholarships, training, outreach)",
  "15% — Operational costs and administration",
  "10% — Monitoring, evaluation, and impact reporting",
  "5%  — Fundraising and donor communications",
];

export default function DonateCTA() {
  const [settings, setSettings] = useState<StrapiSiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      setSettings(data);
    });
  }, []);

  return (
    <section id="donate-cta" className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
            Make a Difference
          </p>
          <h2 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
            Support Our Work
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Donation options */}
          <div>
            <h3 className="text-navy font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b-2 border-navy/10">
              Ways to Give
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {DONATION_OPTIONS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white p-5 border-l-4 border-orange">
                  <Icon className="w-5 h-5 text-orange mb-3" />
                  <h4 className="text-navy font-black text-xs uppercase tracking-wide mb-1">
                    {title}
                  </h4>
                  <p className="text-slate-muted text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/donate"
                className="bg-orange text-white font-black text-xs uppercase tracking-widest px-8 py-4 text-center hover:bg-orange-dark transition-colors duration-150"
              >
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="border-2 border-navy text-navy font-black text-xs uppercase tracking-widest px-8 py-4 text-center hover:bg-navy hover:text-white transition-colors duration-150"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* How we use donations */}
          <div>
            <h3 className="text-navy font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b-2 border-navy/10">
              How We Use Your Donation
            </h3>
            <ul className="space-y-4">
              {USAGE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange shrink-0 mt-1.5" />
                  <span className="text-navy/80 text-xs leading-relaxed uppercase tracking-wide">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-navy p-6">
              <p className="text-orange font-black text-xs uppercase tracking-[0.2em] mb-2">
                Bank Transfer
              </p>
              <p className="text-white font-black text-xs uppercase tracking-widest">
                {settings?.bankName || defaults.contact.bank!.bankName}
              </p>
              <p className="text-slate-muted text-xs mt-1">
                {settings?.accountName || defaults.contact.bank!.accountName}
              </p>
              <p className="text-orange font-black text-lg mt-2 tracking-widest">
                {settings?.accountNumber || defaults.contact.bank!.accountNumber}
              </p>
              <p className="text-slate-muted text-xs mt-3 leading-relaxed">
                {settings?.donateNote || defaults.contact.donateNote}
              </p>
              <p className="text-slate-muted text-xs mt-3 leading-relaxed">
                Please send your receipt to{" "}
                <span className="text-orange">{settings?.email || defaults.contact.email}</span> for
                acknowledgement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
