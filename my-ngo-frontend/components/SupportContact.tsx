"use client";

import { useEffect, useState } from "react";
import { getSiteSettings, type StrapiSiteSettings } from "@/api/siteSettings";
import type { ContactData } from "@/lib/types";
import defaults from "@/lib/defaults";

/* ── Social icon SVGs ──────────────────────────────────────────────────────── */
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

const SOCIAL_CONFIG = [
  { key: "twitterUrl" as const, label: "Twitter / X", Icon: TwitterIcon },
  { key: "facebookUrl" as const, label: "Facebook", Icon: FacebookIcon },
  { key: "instagramUrl" as const, label: "Instagram", Icon: InstagramIcon },
  { key: "youtubeUrl" as const, label: "YouTube", Icon: YouTubeIcon },
];

export default function SupportContact({
  data,
}: {
  data?: ContactData;
}) {
  data = { ...defaults.contact, ...data } satisfies ContactData;
  const [settings, setSettings] = useState<StrapiSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  /* ── Resolved values: Strapi wins, defaults as fallback ─────────────────── */
  const bankName = settings?.bankName ?? data.bank.bankName;
  const accountName = settings?.accountName ?? data.bank.accountName;
  const accountNumber = settings?.accountNumber ?? data.bank.accountNumber;
  const donateNote = settings?.donateNote ?? data.donateNote;
  const phones: string[] = settings?.phones ?? data.phones;
  const email = settings?.email ?? data.email;
  const location = settings?.location ?? data.location;

  /* Build social list — only show links that have a URL set */
  const socials = settings
    ? SOCIAL_CONFIG.filter((s) => settings[s.key]?.trim()).map((s) => ({
        label: s.label,
        href: settings[s.key],
        Icon: s.Icon,
      }))
    : data.socials.map((label) => ({ label, href: "#", Icon: null }));

  return (
    <section id="contact" className="bg-navy py-24 px-6 lg:px-10">
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

        <div className="grid md:grid-cols-2 gap-0.5 bg-navy-dark">

          {/* Bank details */}
          <div className="bg-navy p-10 border-t-4 border-orange">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">
              Donate / Bank Details
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 loading-shimmer opacity-20" />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-navy-dark">
                {[
                  { label: "Bank", value: bankName, big: false },
                  { label: "Account Name", value: accountName, big: false },
                  { label: "Account Number", value: accountNumber, big: true },
                ].map((row) => (
                  <div key={row.label} className="py-5">
                    <p className="text-slate-muted text-xs uppercase tracking-widest font-bold mb-1">
                      {row.label}
                    </p>
                    <p
                      className={`font-black ${
                        row.big
                          ? "text-orange text-2xl tracking-[0.2em]"
                          : "text-white text-sm"
                      }`}
                    >
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-8 text-slate-muted text-xs leading-relaxed uppercase tracking-wide">
              {donateNote}
            </p>
          </div>

          {/* Contact info */}
          <div className="bg-navy p-10 border-t-4 border-white">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">
              Get in Touch
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 loading-shimmer opacity-20" />
                ))}
              </div>
            ) : (
              <div className="space-y-7">
                <div>
                  <p className="text-slate-muted text-xs uppercase tracking-widest font-bold mb-2">Phone</p>
                  {phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className={`block text-orange font-black text-sm hover:underline${i > 0 ? " mt-1" : ""}`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>

                <div>
                  <p className="text-slate-muted text-xs uppercase tracking-widest font-bold mb-2">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-white font-black text-sm hover:text-orange transition-colors"
                  >
                    {email}
                  </a>
                </div>

                <div>
                  <p className="text-slate-muted text-xs uppercase tracking-widest font-bold mb-2">Location</p>
                  <p className="text-white font-black text-sm">{location}</p>
                </div>

                {socials.length > 0 && (
                  <div>
                    <p className="text-slate-muted text-xs uppercase tracking-widest font-bold mb-4">
                      Follow Us
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {socials.map(({ label, href, Icon }) =>
                        Icon ? (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="flex items-center gap-2 bg-navy-dark text-white text-xs font-black uppercase tracking-widest px-4 py-2 hover:bg-orange transition-colors duration-150"
                          >
                            <Icon />
                            {label}
                          </a>
                        ) : (
                          <span
                            key={label}
                            className="bg-navy-dark text-white text-xs font-black uppercase tracking-widest px-4 py-2"
                          >
                            {label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
