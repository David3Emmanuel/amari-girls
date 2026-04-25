"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Palette,
  Globe,
  CalendarDays,
  Star,
  Heart,
  Users,
  BookOpen,
  Megaphone,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { getVolunteerRoles, parseTasks, type StrapiVolunteerRole, type RoleIconSlug } from "@/data/volunteerRoles";
import { submitVolunteerApplication } from "@/data/submissions";

/* ── Icon map: slug → lucide component ─────────────────────────────────── */
const ICON_MAP: Record<RoleIconSlug, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  globe: Globe,
  calendar: CalendarDays,
  star: Star,
  heart: Heart,
  users: Users,
  book: BookOpen,
  megaphone: Megaphone,
};

/* ── Hardcoded fallback roles (shown when Strapi is not connected) ──────── */
const FALLBACK_ROLES: StrapiVolunteerRole[] = [
  {
    id: 1,
    documentId: "1",
    icon: "palette",
    title: "Art Workshop Facilitator",
    description: "Lead creative arts and expression workshops for girls aged 10–18.",
    tasks: [
      "Plan and deliver 2-hour arts sessions",
      "Source materials with the programmes team",
      "Document outcomes with photos and notes",
      "Mentor girls on creative confidence",
    ],
    sortOrder: 1,
  },
  {
    id: 2,
    documentId: "2",
    icon: "globe",
    title: "Community Outreach Ambassador",
    description: "Represent Amari Girls in your local community and expand our reach.",
    tasks: [
      "Identify girls in underserved areas",
      "Share programme information with families",
      "Coordinate with local schools and leaders",
      "Report community needs back to HQ",
    ],
    sortOrder: 2,
  },
  {
    id: 3,
    documentId: "3",
    icon: "calendar",
    title: "Event Support Staff",
    description: "Help plan, set up, and run our outreach events and ceremonies.",
    tasks: [
      "Assist with event logistics and set-up",
      "Welcome guests and coordinate registration",
      "Support facilitators on the day",
      "Help document the event for our records",
    ],
    sortOrder: 3,
  },
];

const FAQS = [
  {
    q: "Do I need professional qualifications to volunteer?",
    a: "No formal qualifications are required. We welcome anyone with a heart for girls' empowerment. Skills in education, art, communications, events, or community work are a bonus.",
  },
  {
    q: "How much time do I need to commit?",
    a: "Most roles require 4–8 hours per month. We are flexible and work around your availability. Event support roles may require one full day per event.",
  },
  {
    q: "Will I receive training before I start?",
    a: "Yes. All volunteers attend an orientation session and receive a handbook. Role-specific training is provided before your first assignment.",
  },
  {
    q: "Is volunteering in-person or remote?",
    a: "Most roles are in-person within Lagos and select states. Some administrative and communications roles can be done remotely.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-navy font-black text-xs uppercase tracking-wide">{q}</span>
        <ChevronDown
          className="w-4 h-4 text-orange shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="text-slate-muted text-xs leading-relaxed pb-4 uppercase tracking-wide">
          {a}
        </p>
      )}
    </div>
  );
}

function RoleCard({ role }: { role: StrapiVolunteerRole }) {
  const Icon = ICON_MAP[role.icon] ?? Palette;
  const tasks = parseTasks(role.tasks);
  return (
    <div className="bg-white p-7 border-t-4 border-orange">
      <Icon className="w-7 h-7 text-orange mb-4" />
      <h3 className="text-navy font-black uppercase tracking-wide text-sm mb-2">
        {role.title}
      </h3>
      <p className="text-slate-muted text-xs leading-relaxed mb-4">{role.description}</p>
      {tasks.length > 0 && (
        <ul className="space-y-1.5">
          {tasks.map((t) => (
            <li key={t} className="flex items-start gap-2 text-xs text-navy/70">
              <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" />
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function VolunteerPage() {
  const [roles, setRoles] = useState<StrapiVolunteerRole[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    getVolunteerRoles().then((data) => {
      setRoles(data.length > 0 ? data : FALLBACK_ROLES);
      setLoadingRoles(false);
    });
  }, []);

  function update(field: string, val: string) {
    setFormData((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.interest) {
      setStatus("error");
      setFeedback("Please fill in all required fields.");
      return;
    }
    setStatus("loading");
    try {
      await submitVolunteerApplication(formData);
      setStatus("success");
      setFeedback("Application submitted! We will be in touch within 5 business days.");
      setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header bar */}
      <div className="bg-navy py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-slate-muted hover:text-orange transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-white font-black text-xs uppercase tracking-widest">
            Amari Girls Foundation — Volunteer
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
            Join Our Team
          </p>
          <h1 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest mb-4">
            Volunteer With Us
          </h1>
          <p className="text-slate-muted text-sm leading-relaxed max-w-2xl uppercase tracking-wide">
            Your time and talent can transform a girl's future. Explore our volunteer
            roles below and apply today.
          </p>
        </div>

        {/* Role cards */}
        {loadingRoles ? (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 loading-shimmer" />
            ))}
          </div>
        ) : (
          <div className={`grid gap-6 mb-16 ${roles.length === 1 ? "md:grid-cols-1 max-w-sm" : roles.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Application form */}
          <div className="bg-white p-8">
            <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b-2 border-navy/10">
              Apply to Volunteer
            </h2>

            {status === "success" ? (
              <div className="text-center py-10">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-navy font-black uppercase tracking-widest text-sm mb-2">
                  Application Received!
                </p>
                <p className="text-slate-muted text-xs leading-relaxed">{feedback}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 bg-orange text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-dark transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                />

                {/* Role dropdown — populated from whichever source is active */}
                <select
                  value={formData.interest}
                  onChange={(e) => update("interest", e.target.value)}
                  required
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy focus:outline-none focus:border-orange transition-colors bg-white"
                >
                  <option value="">Select a Role *</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Tell us why you want to volunteer (optional)"
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors resize-none"
                />

                {feedback && status === "error" && (
                  <p className="text-red-500 text-xs uppercase tracking-wide">{feedback}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-navy text-white font-black text-xs uppercase tracking-widest py-4 hover:bg-navy-dark transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b-2 border-navy/10">
              Frequently Asked Questions
            </h2>
            <div>
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
