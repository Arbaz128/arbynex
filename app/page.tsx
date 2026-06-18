import Particles from "@/components/Particles";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Proof from "@/components/Proof";
import Process from "@/components/Process";
import UseCases from "@/components/UseCases";
import Founder from "@/components/Founder";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main>
      <Particles />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Proof />
      <Process />
      <UseCases />
      <Founder />
      <Faq />
      <Cta />
      <Footer />
      <ChatWidget />
    </main>
  );
}
