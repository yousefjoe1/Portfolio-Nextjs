import HeroSection from "./components/Hero/HeroSection";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Projects from "./components/Projects/Projects";
import SkillsSection from "./components/Skills/SkillsSection";

gsap.registerPlugin(useGSAP);



export default function Home() {


  // bg-[#0a051a] bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#2d1b4d] via-[#0a051a] to-[#0a051a]
  return (
    <main className="lg:p-9 md:p-5 p-2 flex flex-col gap-20 ">
      <header>
        <HeroSection />
      </header>
      <section className="bg-brand-secondary/50 backdrop-blur-md rounded-2xl overflow-hidden">

        <SkillsSection />
      </section>

      <section className="bg-brand-secondary/50 backdrop-blur-md rounded-2xl p-4 overflow-hidden">
        <Projects />
      </section>



    </main>
  );
}
