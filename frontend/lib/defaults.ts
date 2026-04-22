/* ──────────────────────────────────────────────────────────────────────────
   Hardcoded default data for every section.
   Used as fallback when the backend API is unreachable or a specific
   section is missing from the response.
   ────────────────────────────────────────────────────────────────────────── */

import type { FullSiteContent } from "./types";

const defaults: FullSiteContent = {
  /* ── Navbar ──────────────────────────────────────────────────────────── */
  navbar: {
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Mission", href: "#mission" },
      { label: "Gallery", href: "/gallery" },
      { label: "Partner", href: "#partner" },
      { label: "Board", href: "#board" },
      { label: "Contact", href: "#contact" },
    ],
    logoText: "AG",
    orgName: "Amari Girls Foundation",
    donateLabel: "Donate",
    donateHref: "#contact",
  },

  /* ── Hero ────────────────────────────────────────────────────────────── */
  hero: {
    backgroundImage: "/images/hero-bg.png",
    label: "Est. 2024 \u2014 Lagos, Nigeria",
    headingLine1: "Amari Girls",
    headingLine2: "Educational",
    headingLine3Desktop: { main: "& EMPOWERME", accent: "NT" },
    headingLine3Mobile: { main: "& EMPOWE", accent: "RMENT" },
    headingLine4: "Foundation",
    tagline: "Grooming girls for a great future",
    ctaButtons: [
      { label: "Learn More", href: "#about", variant: "primary" },
      { label: "Get Involved", href: "#partner", variant: "outline" },
    ],
    socials: [
      { label: "FB", href: "https://facebook.com" },
      { label: "IG", href: "https://instagram.com" },
      { label: "TW", href: "https://twitter.com" },
      { label: "YT", href: "https://youtube.com" },
    ],
    stats: [
      { num: "200+", label: "Girls Impacted" },
      { num: "05+", label: "Communities" },
    ],
  },

  /* ── Founder ─────────────────────────────────────────────────────────── */
  founder: {
    sectionLabel: "Meet Our Founder",
    sectionTitle: "Founder\u2019s Profile",
    name: "Dr. Omowunmi Jumoke Ogunleye",
    role: "Founder & Executive Director",
    image: "/images/founder.jpg",
    bio: [
      "Amari Girls Educational and Empowerment Foundation was born out of a deep passion to see girls rise above every limitation \u2014 social, economic, or cultural \u2014 and step into their full potential.",
      "Our foundation grooms girls who are not just academically excellent, but emotionally intelligent, entrepreneurially minded, and community-conscious leaders. Every girl deserves a chance to thrive, regardless of where she comes from.",
      "Through scholarship support, skills acquisition, mentorship circles, and community outreaches \u2014 we are building a generation of women who will lead with purpose and lasting impact.",
      "I invite you to join us. Whether as a donor, volunteer, or partner, your support directly changes lives and transforms communities.",
    ],
    noteLabel: "A Word from the Founder",
  },

  /* ── Mission & Vision ────────────────────────────────────────────────── */
  missionVision: {
    sectionLabel: "What Drives Us",
    sectionTitle: "Mission & Vision",
    missionText:
      "To provide girls from underserved communities with access to quality education, mentorship, skills training, and psychosocial support \u2014 equipping them with the tools to become confident, self-reliant, and impactful members of society.",
    visionText:
      "A Nigeria where every girl has an equal opportunity to achieve her full potential \u2014 educated, empowered, and equipped to lead in her community, her nation, and the world.",
  },

  /* ── Objectives ──────────────────────────────────────────────────────── */
  objectives: {
    sectionLabel: "Our Goals",
    sectionTitle: "Objectives",
    items: [
      "Provide scholarships and educational support to girls from low-income families.",
      "Equip girls with vocational and entrepreneurial skills for economic independence.",
      "Offer mentorship programmes connecting girls with accomplished women role models.",
      "Conduct community outreaches that promote girl-child education and awareness.",
      "Provide psychosocial support and counselling to girls facing personal or social challenges.",
      "Advocate for policies and social norms that protect and promote girls\u2019 rights.",
      "Build a network of partners, sponsors, and volunteers committed to girls\u2019 empowerment.",
      "Document and share success stories that inspire and drive systemic change.",
    ],
  },

  /* ── Community Project ───────────────────────────────────────────────── */
  communityProject: {
    sectionLabel: "Where It All Began",
    sectionTitle: "First Community Outreach",
    location: "Ede, Osun State",
    image: "/images/outreach.jpg",
    paragraphs: [
      "The Foundation held its inaugural community outreach bringing together girls from surrounding communities for a day of learning, inspiration, and empowerment.",
      "Interactive sessions covered education, personal development, and career possibilities \u2014 led by experienced facilitators who shared their journeys and offered practical guidance.",
      "School supplies, hygiene kits, and resource materials were distributed. The event identified girls in need of ongoing scholarship support and mentorship.",
    ],
    quote:
      "\u201CWe came to plant a seed \u2014 and the harvest is already evident in the eyes of these girls.\u201D",
    quoteAuthor: "\u2014 Dr. Omowunmi Jumoke Ogunleye",
  },

  /* ── Gallery ─────────────────────────────────────────────────────────── */
  gallery: {
    sectionLabel: "Moments That Matter",
    sectionTitle: "Gallery",
    images: [
      { src: "/images/gallery-1.jpg", alt: "Girls at a mentorship session" },
      { src: "/images/gallery-2.jpg", alt: "Community outreach event" },
      { src: "/images/gallery-3.jpg", alt: "Scholarship presentation ceremony" },
      { src: "/images/gallery-4.jpg", alt: "Skills training workshop" },
      { src: "/images/gallery-5.jpg", alt: "Girls empowerment seminar" },
      { src: "/images/gallery-6.jpg", alt: "Founder with beneficiaries" },
      { src: "/images/gallery-7.jpg", alt: "Classroom session" },
      { src: "/images/gallery-8.jpg", alt: "Cultural celebration" },
      { src: "/images/gallery-9.jpg", alt: "Graduation ceremony" },
    ],
  },

  /* ── Testimonials ────────────────────────────────────────────────────── */
  testimonials: {
    sectionLabel: "Voices of Impact",
    sectionTitle: "Testimonials",
    featuredQuote:
      "Every girl deserves to know her worth, discover her purpose, and have the tools to pursue it \u2014 we will not stop until every girl can say: I was given a chance, and I made the most of it.",
    featuredAuthor: "Dr. Omowunmi Jumoke Ogunleye",
    featuredRole: "Founder & Executive Director",
    items: [
      {
        name: "Adunola Adeyemi",
        role: "Beneficiary, 2023 Cohort",
        quote:
          "Amari Girls Foundation changed my life. Through their scholarship and mentorship, I was able to finish secondary school and gain admission to university. I am forever grateful.",
        image: "/images/testimonial-1.jpg",
      },
      {
        name: "Mrs. Folake Balogun",
        role: "Parent",
        quote:
          "I was struggling to keep my daughter in school. The foundation stepped in and not only paid her fees but gave her guidance she had never received. She is now a confident young woman.",
        image: "/images/testimonial-2.jpg",
      },
      {
        name: "Chiamaka Nwosu",
        role: "Volunteer & Facilitator",
        quote:
          "Being part of the Amari team taught me that empowerment is a chain reaction. The girls we mentor today will be the mentors of tomorrow. The impact is generational.",
        image: "/images/testimonial-3.jpg",
      },
    ],
  },

  /* ── Partner With Us ─────────────────────────────────────────────────── */
  partner: {
    sectionLabel: "Join the Movement",
    sectionTitle: "How to Partner With Us",
    options: [
      {
        num: "01",
        title: "Sponsor a Child",
        description:
          "Cover a girl\u2019s school fees, books, uniforms, and learning materials for a full academic year. Your sponsorship directly keeps a girl in school and on the path to a brighter future.",
        cta: "Sponsor Now",
        accent: true,
      },
      {
        num: "02",
        title: "Program Sponsorship & Funding",
        description:
          "Fund specific programmes \u2014 mentorship series, skills acquisition workshops, health outreaches, or community awareness campaigns. Corporate and institutional partnerships welcome.",
        cta: "Partner With Us",
        accent: false,
      },
      {
        num: "03",
        title: "Volunteer Engagement",
        description:
          "Give your time, expertise, and passion. Volunteer as a mentor, facilitator, event coordinator, or professional skills trainer. Your presence makes an immeasurable difference.",
        cta: "Volunteer",
        accent: false,
      },
    ],
  },

  /* ── Board of Trustees ───────────────────────────────────────────────── */
  board: {
    sectionLabel: "Leadership",
    sectionTitle: "Board of Trustees",
    members: [
      { name: "Dr. Omowunmi Jumoke Ogunleye", role: "Chairperson", image: "/images/board-1.jpg" },
      { name: "Board Member", role: "Trustee", image: "/images/board-2.jpg" },
      { name: "Board Member", role: "Trustee", image: "/images/board-3.jpg" },
      { name: "Board Member", role: "Trustee", image: "/images/board-4.jpg" },
      { name: "Board Member", role: "Trustee", image: "/images/board-5.jpg" },
      { name: "Board Member", role: "Trustee", image: "/images/board-6.jpg" },
    ],
  },

  /* ── Support / Contact ───────────────────────────────────────────────── */
  contact: {
    sectionLabel: "Reach Out",
    sectionTitle: "Support & Contact",
    bank: {
      bankName: "First Bank of Nigeria",
      accountName: "Amari Girls Educational & Empowerment Foundation",
      accountNumber: "0123456789",
    },
    donateNote:
      "All donations are tax-deductible. Please send your receipt to our email for acknowledgement.",
    phones: ["+234 800 000 0000", "+234 800 000 0001"],
    email: "info@amarigirlsfoundation.org",
    location: "Lagos, Nigeria",
    socials: ["Facebook", "Instagram", "Twitter", "YouTube"],
  },

  /* ── Footer ──────────────────────────────────────────────────────────── */
  footer: {
    logoText: "AG",
    orgNameLine1: "Amari Girls Educational",
    orgNameLine2: "& Empowerment Foundation",
    brandDescription:
      "Grooming girls for a great future through education, mentorship, skills training, and community empowerment.",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Mission", href: "#mission" },
      { label: "Gallery", href: "/gallery" },
      { label: "Partner", href: "#partner" },
      { label: "Contact", href: "#contact" },
    ],
    phone: "+234 800 000 0000",
    email: "info@amarigirlsfoundation.org",
    location: "Lagos, Nigeria",
    copyrightOrg: "Amari Girls Educational & Empowerment Foundation",
    registrationNote: "Registered Non-Profit Organisation",
  },
};

export default defaults;
