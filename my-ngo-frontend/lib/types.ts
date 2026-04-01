/* ──────────────────────────────────────────────────────────────────────────
   Shared TypeScript types for all site content sections.
   The backend API should return an object matching `SiteContent`.
   ────────────────────────────────────────────────────────────────────────── */

// ── Navbar ──────────────────────────────────────────────────────────────────
export interface NavbarData {
  links: { label: string; href: string }[];
  logoText: string;
  orgName: string;
  donateLabel: string;
  donateHref: string;
}

// ── Hero ────────────────────────────────────────────────────────────────────
export interface HeroData {
  backgroundImage: string;
  label: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3Desktop: { main: string; accent: string };
  headingLine3Mobile: { main: string; accent: string };
  headingLine4: string;
  tagline: string;
  ctaButtons: { label: string; href: string; variant: "primary" | "outline" }[];
  socials: { label: string; href: string }[];
  stats: { num: string; label: string }[];
}

// ── Founder ─────────────────────────────────────────────────────────────────
export interface FounderData {
  sectionLabel: string;
  sectionTitle: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
  noteLabel: string;
}

// ── Mission & Vision ────────────────────────────────────────────────────────
export interface MissionVisionData {
  sectionLabel: string;
  sectionTitle: string;
  missionText: string;
  visionText: string;
}

// ── Objectives ──────────────────────────────────────────────────────────────
export interface ObjectivesData {
  sectionLabel: string;
  sectionTitle: string;
  items: string[];
}

// ── Community Project ───────────────────────────────────────────────────────
export interface CommunityProjectData {
  sectionLabel: string;
  sectionTitle: string;
  location: string;
  image: string;
  paragraphs: string[];
  quote: string;
  quoteAuthor: string;
}

// ── Gallery ─────────────────────────────────────────────────────────────────
export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryData {
  sectionLabel: string;
  sectionTitle: string;
  images: GalleryImage[];
}

// ── Testimonials ────────────────────────────────────────────────────────────
export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface TestimonialsData {
  sectionLabel: string;
  sectionTitle: string;
  featuredQuote: string;
  featuredAuthor: string;
  featuredRole: string;
  items: TestimonialItem[];
}

// ── Partner With Us ─────────────────────────────────────────────────────────
export interface PartnerOption {
  num: string;
  title: string;
  description: string;
  cta: string;
  accent: boolean;
}

export interface PartnerData {
  sectionLabel: string;
  sectionTitle: string;
  options: PartnerOption[];
}

// ── Board of Trustees ───────────────────────────────────────────────────────
export interface BoardMember {
  name: string;
  role: string;
  image: string;
}

export interface BoardData {
  sectionLabel: string;
  sectionTitle: string;
  members: BoardMember[];
}

// ── Support / Contact ───────────────────────────────────────────────────────
export interface ContactData {
  sectionLabel: string;
  sectionTitle: string;
  bank: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  donateNote: string;
  phones: string[];
  email: string;
  location: string;
  socials: string[];
}

// ── Footer ──────────────────────────────────────────────────────────────────
export interface FooterData {
  logoText: string;
  orgNameLine1: string;
  orgNameLine2: string;
  brandDescription: string;
  links: { label: string; href: string }[];
  phone: string;
  email: string;
  location: string;
  copyrightOrg: string;
  registrationNote: string;
}

// ── Programs section (homepage teaser) ──────────────────────────────────────
export interface ProgramsData {
  sectionLabel: string;
  sectionTitle: string;
}

// ── Events section ───────────────────────────────────────────────────────────
export interface EventsData {
  sectionLabel: string;
  sectionTitle: string;
}

// ── Transparency section ─────────────────────────────────────────────────────
export interface TransparencyData {
  sectionLabel: string;
  sectionTitle: string;
}

// ── DonateCTA section ────────────────────────────────────────────────────────
export interface DonateCTAData {
  sectionLabel: string;
  sectionTitle: string;
  donateHref: string;
}

// ── VolunteerCTA section ─────────────────────────────────────────────────────
export interface VolunteerCTAData {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

// ── Full site payload ───────────────────────────────────────────────────────
export interface SiteContent {
  navbar: Partial<NavbarData>;
  hero: Partial<HeroData>;
  founder: Partial<FounderData>;
  missionVision: Partial<MissionVisionData>;
  objectives: Partial<ObjectivesData>;
  communityProject: Partial<CommunityProjectData>;
  gallery: Partial<GalleryData>;
  testimonials: Partial<TestimonialsData>;
  partner: Partial<PartnerData>;
  board: Partial<BoardData>;
  contact: Partial<ContactData>;
  footer: Partial<FooterData>;
}

export interface FullSiteContent {
  navbar: NavbarData;
  hero: HeroData;
  founder: FounderData;
  missionVision: MissionVisionData;
  objectives: ObjectivesData;
  communityProject: CommunityProjectData;
  gallery: GalleryData;
  testimonials: TestimonialsData;
  partner: PartnerData;
  board: BoardData;
  contact: ContactData;
  footer: FooterData;
}