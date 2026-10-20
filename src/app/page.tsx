import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Collection } from "@/components/sections/Collection";
import { Projects } from "@/components/sections/Projects";
import { Advisory } from "@/components/sections/Advisory";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { MobileCta } from "@/components/sections/MobileCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <Philosophy />
        <Collection />
        <Projects />
        <Advisory />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
