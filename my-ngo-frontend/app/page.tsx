import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderNote from "@/components/FounderNote";
import MissionVision from "@/components/MissionVision";
import Objectives from "@/components/Objectives";
import Programs from "@/components/Programs";
import CommunityProject from "@/components/CommunityProject";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import DonateCTA from "@/components/DonateCTA";
import Transparency from "@/components/Transparency";
import PartnerWithUs from "@/components/PartnerWithUs";
import VolunteerCTA from "@/components/VolunteerCTA";
import Events from "@/components/Events";
import BoardOfTrustees from "@/components/BoardOfTrustees";
import SupportContact from "@/components/SupportContact";
import Footer from "@/components/Footer";
import { fetchSiteContent } from "@/lib/api";

export default async function Home() {
  const content = await fetchSiteContent();

  return (
    <>
      <Navbar data={content.navbar} />
      <main className="pt-16">
        <Hero data={content.hero} />
        <FounderNote data={content.founder} />
        <MissionVision data={content.missionVision} />
        <Objectives data={content.objectives} />
        <Programs />
        <CommunityProject data={content.communityProject} />
        <Gallery data={content.gallery} />
        <Testimonials data={content.testimonials} />
        <DonateCTA />
        <Transparency />
        <PartnerWithUs data={content.partner} />
        <VolunteerCTA />
        <Events />
        <BoardOfTrustees data={content.board} />
        <SupportContact data={content.contact} />
      </main>
      <Footer data={content.footer} />
    </>
  );
}
