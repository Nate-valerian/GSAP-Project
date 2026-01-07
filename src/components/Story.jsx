import gsap from "gsap";
import { useRef, useCallback } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const animationRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!frameRef.current) return;

    // Use requestAnimationFrame for performance
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const element = frameRef.current;
      const rect = element.getBoundingClientRect();

      const xPos = clientX - rect.left;
      const yPos = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((yPos - centerY) / centerY) * -10;
      const rotateY = ((xPos - centerX) / centerX) * 10;

      // Kill any ongoing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(element, {
        duration: 0.3,
        rotateX,
        rotateY,
        transformPerspective: 500,
        ease: "power2.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    if (frameRef.current) {
      // Kill ongoing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(frameRef.current, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Optional: Add a subtle scale effect on enter
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        duration: 0.3,
        scale: 1.02,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section
      id="story"
      className="min-h-screen w-full overflow-hidden bg-black text-blue-50"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24 px-4 md:px-8">
        <p className="font-general text-xs uppercase tracking-wider md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative size-full max-w-7xl mx-auto">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 md:mt-10 pointer-events-none mix-blend-difference relative z-10 text-center"
          />

          <div className="story-img-container mt-10 md:mt-20">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseEnter}
                  src="/img/entrance.webp"
                  alt="The hidden realm entrance to Zentry - a mystical gateway to infinite possibilities"
                  className="w-full h-auto object-contain cursor-pointer transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>

            {/* SVG filter for rounded corners (hidden by default) */}
            <svg className="absolute size-0" aria-hidden="true">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="mt-8 md:-mt-64 md:me-0 lg:me-44 flex w-full max-w-7xl justify-center md:justify-end">
          <div className="flex h-full w-full max-w-lg flex-col items-center md:items-start px-4">
            <p className="mt-3 text-center font-circular-web text-violet-50/90 md:text-start text-base leading-relaxed">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
              id="realm-btn"
              title="Discover prologue"
              containerClass="mt-8 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingImage;
