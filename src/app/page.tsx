import HeroSection from "./components/Hero/HeroSection";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);



export default function Home() {



  return (
    <>
      <header>
        <HeroSection />

      </header>



    </>
  );
}
