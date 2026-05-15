import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DailyRiyaz } from "@/components/sections/DailyRiyaz";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CoursesSection />
        <WhyChooseUs />
        <DailyRiyaz />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
