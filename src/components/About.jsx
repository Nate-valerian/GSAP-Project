import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false, // Set to true for debugging
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // Cleanup
    return () => {
      clipAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Empty dependency array means it runs once

  return (
    <div id="about" className="min-h-screen w-screen overflow-hidden">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-5">
        <p className="font-general text-sm uppercase tracking-wider md:text-xs">
          Welcome to Zentry
        </p>

        {/* Make sure AnimatedTitle component exists */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center max-w-4xl mx-auto"
        />

        <div className="about-subtext max-w-2xl text-center">
          <p className="mb-4 text-lg font-medium">
            The Game of Games begins—your life, now an epic MMORPG
          </p>
          <p className="text-gray-600">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image overflow-hidden">
          <img
            src="/img/about.webp" // Added leading slash
            alt="Zentry gaming platform"
            className="absolute left-0 top-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
