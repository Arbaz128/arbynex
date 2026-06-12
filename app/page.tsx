import Particles from "@/components/Particles";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Process from "@/components/Process";
import UseCases from "@/components/UseCases";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Particles />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <UseCases />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
