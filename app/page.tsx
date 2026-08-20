import Particles from "@/components/Particles";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import AiAutomation from "@/components/AiAutomation";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
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
      <AiAutomation />
      <TechStack />
      <Work />
      <Industries />
      <Process />
      <WhyUs />
      <Faq />
      <Cta />
      <Footer />
      <ChatWidget />
    </main>
  );
}
