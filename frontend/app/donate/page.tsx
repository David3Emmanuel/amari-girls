"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { getLiveCampaigns, type StrapiCampaign } from "@/data/campaigns";
import { getStrapiImageUrl } from "@/data/strapi";

/* Paystack global type */
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        onSuccess: (transaction: { reference: string }) => void;
        onCancel: () => void;
      }) => { openIframe: () => void };
    };
  }
}

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

const IMPACT_TIERS = [
  { amount: 5000, impact: "School supplies for 2 girls" },
  { amount: 10000, impact: "One month of mentorship sessions" },
  { amount: 25000, impact: "Fund a full workshop series" },
  { amount: 50000, impact: "Vocational training for one girl" },
  { amount: 100000, impact: "Full scholarship for one girl" },
];

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, goal > 0 ? (raised / goal) * 100 : 0);
  return (
    <div className="w-full bg-navy/10 h-2 mt-2">
      <div
        className="bg-orange h-2 transition-[width] duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function DonatePage() {
  const [campaigns, setCampaigns] = useState<StrapiCampaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<StrapiCampaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getLiveCampaigns().then((data) => {
      setCampaigns(data);
      if (data.length > 0) setSelectedCampaign(data[0]);
    });
  }, []);

  const finalAmount = donationAmount ?? (customAmount ? parseInt(customAmount, 10) : null);

  function handlePreset(amount: number) {
    setDonationAmount(amount);
    setCustomAmount("");
  }

  function handleCustomInput(val: string) {
    setCustomAmount(val.replace(/\D/g, ""));
    setDonationAmount(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!finalAmount || finalAmount < 100) {
      setMessage("Please enter a valid donation amount (minimum ₦100).");
      setStatus("error");
      return;
    }
    if (!email) {
      setMessage("Please enter your email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMessage("");

    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
    if (!key) {
      setStatus("error");
      setMessage("Payment is not configured yet. Please donate via bank transfer.");
      return;
    }

    const ref = "AGF_" + Math.floor(Math.random() * 1_000_000_000 + 1);
    const handler = window.PaystackPop.setup({
      key,
      email,
      amount: finalAmount * 100, // kobo
      currency: "NGN",
      ref,
      metadata: {
        name,
        phone,
        campaign_id: selectedCampaign?.id ?? null,
        custom_fields: [{ display_name: "Donor Name", variable_name: "donor_name", value: name }],
      },
      onSuccess: () => {
        setStatus("success");
        setMessage(`Thank you, ${name || "generous donor"}! Your gift of ₦${finalAmount.toLocaleString()} has been received. Reference: ${ref}`);
        setDonationAmount(null);
        setCustomAmount("");
        setName("");
        setEmail("");
        setPhone("");
      },
      onCancel: () => {
        setStatus("idle");
        setMessage("Payment cancelled.");
        setTimeout(() => setMessage(""), 3000);
      },
    });
    handler.openIframe();
    setStatus("idle");
  }

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-off-white">
        {/* Header bar */}
        <div className="bg-navy py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Link href="/" className="text-slate-muted hover:text-orange transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-white font-black text-xs uppercase tracking-widest">
              Amari Girls Foundation — Donate
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="mb-10">
            <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
              Your Gift Changes Lives
            </p>
            <h1 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
              Make a Donation
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: campaigns */}
            <div className="lg:sticky lg:top-24 self-start">
              <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-5 pb-3 border-b-2 border-navy/10">
                Active Campaigns
              </h2>
              {campaigns.length === 0 ? (
                <div className="bg-white p-6 text-center border-2 border-dashed border-navy/20">
                  <Heart className="w-10 h-10 text-navy/20 mx-auto mb-3" />
                  <p className="text-navy font-black text-xs uppercase tracking-widest">
                    General Fund
                  </p>
                  <p className="text-slate-muted text-xs mt-1">
                    Your donation goes directly to supporting girls in need.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((c) => {
                    const img = getStrapiImageUrl(c.media?.url);
                    const pct = c.goal > 0 ? Math.min(100, (c.raised / c.goal) * 100) : 0;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCampaign(c)}
                        className={`w-full text-left border-2 transition-colors duration-150 ${
                          selectedCampaign?.id === c.id
                            ? "border-orange"
                            : "border-navy/10 hover:border-orange/50"
                        }`}
                      >
                        {img && (
                          <img
                            src={img}
                            alt=""
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <p className="text-navy font-black text-xs uppercase tracking-wide mb-2">
                            {c.description}
                          </p>
                          <div className="flex justify-between text-xs text-slate-muted uppercase tracking-wide mb-1">
                            <span>Raised: ₦{c.raised.toLocaleString()}</span>
                            <span>Goal: ₦{c.goal.toLocaleString()}</span>
                          </div>
                          <ProgressBar raised={c.raised} goal={c.goal} />
                          <p className="text-orange font-black text-xs mt-1">{pct.toFixed(0)}% funded</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Impact tiers */}
              <div className="mt-8">
                <h3 className="text-navy font-black uppercase tracking-widest text-xs mb-4 pb-2 border-b border-navy/10">
                  Your Impact
                </h3>
                <ul className="space-y-2">
                  {IMPACT_TIERS.map(({ amount, impact }) => (
                    <li key={amount} className="flex items-center gap-3 text-xs">
                      <span className="text-orange font-black">₦{amount.toLocaleString()}</span>
                      <span className="text-slate-muted uppercase tracking-wide">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white p-8">
              <h2 className="text-navy font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b-2 border-navy/10">
                Donation Details
              </h2>

              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-navy font-black uppercase tracking-widest text-sm mb-2">
                    Thank You!
                  </p>
                  <p className="text-slate-muted text-xs leading-relaxed">{message}</p>
                  <button
                    onClick={() => { setStatus("idle"); setMessage(""); }}
                    className="mt-6 bg-orange text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-dark transition-colors"
                  >
                    Donate Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Preset amounts */}
                  <div>
                    <label className="block text-navy font-black text-xs uppercase tracking-widest mb-3">
                      Select Amount (₦)
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {PRESET_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePreset(amt)}
                          className={`py-2.5 text-xs font-black uppercase tracking-widest border-2 transition-colors duration-150 ${
                            donationAmount === amt
                              ? "bg-orange border-orange text-white"
                              : "border-navy/20 text-navy hover:border-orange"
                          }`}
                        >
                          ₦{(amt / 1000).toFixed(0)}k
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomInput(e.target.value)}
                      className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {/* Donor info */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-2 border-navy/20 px-4 py-3 text-xs text-navy placeholder:text-slate-muted focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  {message && status === "error" && (
                    <p className="text-red-500 text-xs uppercase tracking-wide">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-orange text-white font-black text-xs uppercase tracking-widest py-4 hover:bg-orange-dark transition-colors disabled:opacity-60"
                  >
                    {status === "loading"
                      ? "Processing…"
                      : `Donate${finalAmount ? ` ₦${finalAmount.toLocaleString()}` : ""} Now`}
                  </button>

                  <p className="text-slate-muted text-xs text-center uppercase tracking-wide">
                    Secured by Paystack · All transactions are encrypted
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
