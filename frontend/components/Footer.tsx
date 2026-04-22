"use client";

import { useState } from "react";
import Link from "next/link";
import type { FooterData } from "@/lib/types";
import defaults from "@/lib/defaults";
import { createNewsletter, type NewsletterError } from "@/api/submissions";

/* ── Inline SVG social icons ──────────────────────────────────────────────── */
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

export default function Footer({ data: _data }: { data?: Partial<FooterData> }) {
  const data = { ...defaults.footer, ..._data } satisfies FooterData;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await createNewsletter(email);
      setEmail("");
      setStatus("success");
      setMessage("Thank you for subscribing!");
    } catch (err) {
      const e = err as NewsletterError;
      setStatus("error");
      setMessage(e.isDuplicate ? "This email is already subscribed." : "Something went wrong. Please try again.");
    } finally {
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  }

  return (
    <footer className="bg-navy-dark">
      <div className="h-1 bg-orange w-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + socials */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-orange flex items-center justify-center shrink-0">
                <span className="text-white font-black text-sm tracking-tighter">{data.logoText}</span>
              </div>
              <p className="text-white font-black text-xs uppercase tracking-widest leading-tight">
                {data.orgNameLine1} <br /> {data.orgNameLine2}
              </p>
            </div>
            <p className="text-slate-muted text-xs leading-relaxed uppercase tracking-wide mb-5">
              {data.brandDescription}
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "Twitter", icon: <TwitterIcon />, href: "#" },
                { label: "Facebook", icon: <FacebookIcon />, href: "#" },
                { label: "Instagram", icon: <InstagramIcon />, href: "#" },
                { label: "YouTube", icon: <YouTubeIcon />, href: "#" },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 bg-navy flex items-center justify-center text-slate-muted hover:text-orange hover:bg-navy/80 transition-colors duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-orange font-black uppercase tracking-[0.3em] text-xs mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {data.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-muted hover:text-orange text-xs font-bold uppercase tracking-widest transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/donate" className="text-slate-muted hover:text-orange text-xs font-bold uppercase tracking-widest transition-colors duration-150">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-slate-muted hover:text-orange text-xs font-bold uppercase tracking-widest transition-colors duration-150">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-muted hover:text-orange text-xs font-bold uppercase tracking-widest transition-colors duration-150">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-orange font-black uppercase tracking-[0.3em] text-xs mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-wide">
              <li>
                <span className="text-orange font-black">Phone </span>
                <span className="text-slate-muted">{data.phone}</span>
              </li>
              <li>
                <span className="text-orange font-black">Email </span>
                <span className="text-slate-muted">{data.email}</span>
              </li>
              <li>
                <span className="text-orange font-black">Location </span>
                <span className="text-slate-muted">{data.location}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-orange font-black uppercase tracking-[0.3em] text-xs mb-5">
              Newsletter
            </h4>
            <p className="text-slate-muted text-xs uppercase tracking-wide leading-relaxed mb-4">
              Stay updated with our latest programmes, stories, and events.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-navy border border-navy/60 text-white placeholder:text-slate-muted text-xs px-4 py-3 focus:outline-none focus:border-orange transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-orange text-white font-black text-xs uppercase tracking-widest py-3 hover:bg-orange-dark transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
              {message && (
                <p
                  className={`text-xs uppercase tracking-wide ${
                    status === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-navy flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-muted text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {data.copyrightOrg}
          </p>
          <p className="text-slate-muted text-xs uppercase tracking-widest">
            {data.registrationNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
