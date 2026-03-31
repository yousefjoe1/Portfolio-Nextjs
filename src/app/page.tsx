import HeroSection from "./components/Hero/HeroSection";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Projects from "./components/Projects/Projects";
import SkillsSection from "./components/Skills/SkillsSection";
import Certifications from "./components/Certifications/Certifications";

gsap.registerPlugin(useGSAP);



export default function Home() {


  // bg-[#0a051a] bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#2d1b4d] via-[#0a051a] to-[#0a051a]
  return (
    <main className="lg:p-9 md:p-5 p-2 flex flex-col gap-20 ">
      <h2 className="text-4xl text-center md:text-5xl font-bold text-white mb-2">
        This is not my Portfolio,
        <span className="bg-gradient-to-r text-center from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          It is My Life
        </span>
      </h2> <header>
        <HeroSection />
      </header>
      <section className="bg-brand-secondary/50 backdrop-blur-md rounded-2xl overflow-hidden">

        <SkillsSection />
      </section>

      <section className="bg-brand-secondary/50 backdrop-blur-md rounded-2xl p-4 overflow-hidden">
        <Projects />
      </section>

      <section className="bg-brand-secondary/50 backdrop-blur-md rounded-2xl p-4 overflow-hidden">
        <Certifications />
      </section>



    </main>
  );
}
