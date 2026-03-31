"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import type { NavbarData } from "@/lib/types";
import defaults from "@/lib/defaults";

export default function Navbar({ data }: { data?: NavbarData }) {
  data = { ...defaults.navbar, ...data } satisfies NavbarData;
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  /* ── Hide/show on scroll (throttled at 16 ms) ─────────────────────────── */
  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    setScrolled(current > 50);
    if (Math.abs(current - lastScrollY.current) < 5) return;
    setVisible(current < lastScrollY.current || current < 80);
    lastScrollY.current = current;
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  /* ── Dark mode toggle ──────────────────────────────────────────────────── */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* ── Smart anchor navigation ───────────────────────────────────────────── */
  function handleNavClick(href: string) {
    setOpen(false);
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${href}`);
      } else {
        const el = document.querySelector(href);
        if (el) {
          const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  }

  /* ── Scroll-to hash on homepage load ───────────────────────────────────── */
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 150);
    }
  }, [pathname]);

  const navBg = scrolled
    ? "bg-white border-b-2 border-navy shadow-sm"
    : "bg-white border-b-2 border-navy";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${navBg} ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy flex items-center justify-center shrink-0">
              <span className="text-white font-black text-sm tracking-tighter">
                {data.logoText}
              </span>
            </div>
            <span className="text-navy font-black text-sm uppercase tracking-widest hidden sm:block leading-tight">
              {data.orgName}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {data.links.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-navy text-xs font-bold uppercase tracking-widest hover:text-orange transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-orange"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy text-xs font-bold uppercase tracking-widest hover:text-orange transition-colors duration-150"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="p-1.5 text-navy hover:text-orange transition-colors duration-150"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href={data.donateHref}
              className="bg-orange text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 hover:bg-orange-dark transition-colors duration-150"
            >
              {data.donateLabel}
            </Link>
          </div>

          {/* Mobile: dark mode + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="p-1.5 text-navy hover:text-orange transition-colors duration-150"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-navy"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-5 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 bg-navy transition-all duration-200 ${
                    open ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-navy transition-all duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-navy transition-all duration-200 ${
                    open ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-off-white px-6 py-6 flex flex-col gap-4">
          {data.links.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-navy text-xs font-bold uppercase tracking-widest hover:text-orange transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-navy text-xs font-bold uppercase tracking-widest hover:text-orange transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href={data.donateHref}
            onClick={() => setOpen(false)}
            className="mt-2 bg-orange text-white text-xs font-black uppercase tracking-widest px-5 py-3 text-center hover:bg-orange-dark transition-colors"
          >
            {data.donateLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
