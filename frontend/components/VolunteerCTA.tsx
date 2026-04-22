import Link from "next/link";

export default function VolunteerCTA() {
  return (
    <section id="volunteer-cta" className="py-16 bg-navy">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-3">
          Get Involved
        </p>
        <h2 className="text-white font-black text-3xl md:text-4xl uppercase tracking-widest mb-5">
          Volunteer With Us
        </h2>
        <p className="text-slate-muted text-sm leading-relaxed max-w-xl mx-auto mb-8 uppercase tracking-wide">
          Give your time, skills, and passion to empower girls across Nigeria.
          Whether you are a professional, student, or community member — there
          is a place for you in our movement.
        </p>
        <Link
          href="/volunteer"
          className="inline-block bg-orange text-white font-black text-xs uppercase tracking-widest px-10 py-4 hover:bg-orange-dark transition-colors duration-150"
        >
          Sign Up to Volunteer
        </Link>
      </div>
    </section>
  );
}
