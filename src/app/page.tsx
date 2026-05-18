import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TeachersSection } from "@/components/sections/TeachersSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DailyRiyaz } from "@/components/sections/DailyRiyaz";
import { Testimonials } from "@/components/sections/Testimonials";
import { GlobalStudentsSection } from "@/components/sections/GlobalStudentsSection";
import { CertificationSection } from "@/components/sections/CertificationSection";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0 overflow-x-hidden">
        <Hero />
        <About />
        <TeachersSection />
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
