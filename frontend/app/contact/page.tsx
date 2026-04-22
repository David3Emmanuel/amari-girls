"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/api/submissions";
import { getSiteSettings, type StrapiSiteSettings } from "@/api/siteSettings";
import defaults from "@/lib/defaults";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [settings, setSettings] = useState<StrapiSiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      setSettings(data);
    });
  }, []);

  function update(field: string, val: string) {
    setFormData((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContactForm(formData);
      setStatus("success");
      setFeedback("Message sent! We will respond within 2 business days.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try emailing us directly.");
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
            Amari Girls Foundation — Contact
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="mb-12">
          <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
            Reach Out
          </p>
          <h1 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
            Contact Us
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8">
            <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b-2 border-navy/10">
              Send a Message
            </h2>

            {status === "success" ? (
              <div className="text-center py-10">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-navy font-black uppercase tracking-widest text-sm mb-2">
                  Message Sent!
                </p>
                <p className="text-slate-muted text-xs leading-relaxed">{feedback}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 bg-orange text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-dark transition-colors"
                >
                  Send Another
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
                  type="text"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  required
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                />
                <textarea
                  placeholder="Your message *"
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  rows={5}
                  className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors resize-none"
                />

                {feedback && status === "error" && (
                  <p className="text-red-500 text-xs uppercase tracking-wide">{feedback}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-orange text-white font-black text-xs uppercase tracking-widest py-4 hover:bg-orange-dark transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white p-7">
              <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-5 pb-3 border-b-2 border-navy/10">
                Get in Touch
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-orange flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-navy font-black text-xs uppercase tracking-widest mb-0.5">
                      Email
                    </p>
                    <p className="text-slate-muted text-xs">
                      {settings?.email || defaults.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-orange flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-navy font-black text-xs uppercase tracking-widest mb-0.5">
                      Phone
                    </p>
                    {(settings?.phones || defaults.contact.phones!).map((phone, idx) => (
                      <p key={idx} className="text-slate-muted text-xs">
                        {phone}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-orange flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-navy font-black text-xs uppercase tracking-widest mb-0.5">
                      Location
                    </p>
                    <p className="text-slate-muted text-xs">
                      {settings?.location || defaults.contact.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy p-7">
              <p className="text-orange font-black text-xs uppercase tracking-[0.2em] mb-2">
                Bank Transfer
              </p>
              <p className="text-white font-black text-xs uppercase tracking-widest">
                {settings?.bankName || defaults.contact.bank!.bankName}
              </p>
              <p className="text-slate-muted text-xs mt-1">
                {settings?.accountName || defaults.contact.bank!.accountName}
              </p>
              <p className="text-orange font-black text-xl mt-2 tracking-widest">
                {settings?.accountNumber || defaults.contact.bank!.accountNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
