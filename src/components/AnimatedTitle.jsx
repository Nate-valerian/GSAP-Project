import gsap from "gsap"; // Fixed import
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Better trigger point
          end: "center center",
          toggleActions: "play none none reverse",
          scrub: false,
          markers: false, // Set to true for debugging
        },
      });

      titleAnimation.to(
        wordsRef.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          stagger: 0.05, // Increased for better effect
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Function to parse HTML and split into words while preserving <b> tags
  const parseTitle = (html) => {
    // Split by <br /> or <br> tags
    const lines = html.split(/<br\s*\/?>/i);

    return lines.map((line, lineIndex) => {
      // Split by spaces but preserve HTML tags
      const words = [];
      let currentWord = "";
      let inTag = false;

      for (let char of line) {
        if (char === "<") {
          inTag = true;
          currentWord += char;
        } else if (char === ">") {
          inTag = false;
          currentWord += char;
        } else if (char === " " && !inTag) {
          if (currentWord.trim()) {
            words.push(currentWord);
            currentWord = "";
          }
        } else {
          currentWord += char;
        }
      }

      if (currentWord.trim()) {
        words.push(currentWord);
      }

      return (
        <div
          key={lineIndex}
          className="flex-center max-w-full flex-wrap gap-2 px-5 md:gap-3 md:px-10"
        >
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              ref={(el) => wordsRef.current.push(el)}
              className="animated-word inline-block"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={clsx("animated-title flex flex-col gap-4", containerClass)}
    >
      {parseTitle(title)}
    </div>
  );
};

export default AnimatedTitle;
