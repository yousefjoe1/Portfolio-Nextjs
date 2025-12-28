import HeroSection from "./components/Hero/HeroSection";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Projects from "./components/Projects/Projects";

gsap.registerPlugin(useGSAP);



export default function Home() {



  return (
    <main className="p-4 flex flex-col gap-8">
      <header>
        <HeroSection />
      </header>

      <section className="bg-brand-secondary rounded-2xl p-4">
        <Projects />
      </section>



    </main>
  );
}
