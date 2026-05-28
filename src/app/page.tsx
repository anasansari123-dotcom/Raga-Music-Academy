import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About }))
);
const TeachersSection = dynamic(() =>
  import("@/components/sections/TeachersSection").then((m) => ({
    default: m.TeachersSection,
  }))
);
const AffiliationsSection = dynamic(() =>
  import("@/components/sections/AffiliationsSection").then((m) => ({
    default: m.AffiliationsSection,
  }))
);
const GlobalStudentsSection = dynamic(() =>
  import("@/components/sections/GlobalStudentsSection").then((m) => ({
    default: m.GlobalStudentsSection,
  }))
);
const CoursesSection = dynamic(() =>
  import("@/components/sections/CoursesSection").then((m) => ({
    default: m.CoursesSection,
  }))
);
const WhyChooseUs = dynamic(() =>
  import("@/components/sections/WhyChooseUs").then((m) => ({
    default: m.WhyChooseUs,
  }))
);
const CertificationSection = dynamic(() =>
  import("@/components/sections/CertificationSection").then((m) => ({
    default: m.CertificationSection,
  }))
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => ({
    default: m.Testimonials,
  }))
);
const DailyRiyaz = dynamic(() =>
  import("@/components/sections/DailyRiyaz").then((m) => ({
    default: m.DailyRiyaz,
  }))
);
const Gallery = dynamic(() =>
  import("@/components/sections/Gallery").then((m) => ({ default: m.Gallery }))
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ }))
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact }))
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0 overflow-x-hidden">
        <Hero />
        <About />
        <TeachersSection />
        <AffiliationsSection />
        <GlobalStudentsSection />
        <CoursesSection />
        <WhyChooseUs />
        <CertificationSection />
        <Testimonials />
        <DailyRiyaz />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  );
}
