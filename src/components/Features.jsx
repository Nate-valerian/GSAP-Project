import { useState, useRef, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = useCallback((event) => {
    if (!itemRef.current) return;

    // Use requestAnimationFrame for performance
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();

      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 5; // Reduced from 10 to 5 for subtle effect
      const tiltY = (relativeX - 0.5) * -5;

      const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
      setTransformStyle(newTransform);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTransformStyle("");
  }, []);

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = useCallback((event) => {
    if (!hoverButtonRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = hoverButtonRef.current.getBoundingClientRect();
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHoverOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setHoverOpacity(0);
  }, []);

  return (
    <div className="relative size-full overflow-hidden rounded-md">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline // Important for mobile
        className="absolute left-0 top-0 size-full object-cover object-center"
        aria-label={`Video background for ${
          typeof title === "string" ? title : "feature"
        }`}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">
            {typeof title === "string" ? title : title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-black/80 px-5 py-3 text-xs uppercase text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/90"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px rounded-full transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(101, 111, 226, 0.8), rgba(0, 0, 0, 0.15))`,
              }}
            />
            <TiLocationArrow className="relative z-20 size-4" />
            <p className="relative z-20 font-medium">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-32 md:pb-52" aria-label="Features section">
    <div className="container mx-auto px-4 md:px-10">
      <div className="px-4 py-20 md:px-5 md:py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into the Metagame Layer
        </p>
        <p className="mt-3 max-w-md font-circular-web text-lg text-blue-50/70">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      {/* First large feature */}
      <BentoTilt className="border-hsla relative mb-7 h-72 w-full overflow-hidden rounded-lg md:h-[65vh]">
        <BentoCard
          src="/videos/feature-1.mp4" // Added leading slash
          title={
            <>
              radia<b>n</b>t
            </>
          }
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon
        />
      </BentoTilt>

      {/* Grid of features */}
      <div className="grid h-auto w-full grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-3 md:gap-7">
        {/* Row 1 - spans 2 rows on desktop */}
        <BentoTilt className="bento-tilt_1 md:row-span-2">
          <BentoCard
            src="/videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        {/* Row 2 - top right */}
        <BentoTilt className="bento-tilt_1 md:ms-0">
          <BentoCard
            src="/videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        {/* Row 3 - bottom left */}
        <BentoTilt className="bento-tilt_1 md:me-0">
          <BentoCard
            src="/videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>

        {/* Small card 1 */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-violet-300 to-violet-400 p-6">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[4] self-end text-black/30 md:scale-[5]" />
          </div>
        </BentoTilt>

        {/* Small card 2 */}
        <BentoTilt className="bento-tilt_2">
          <div className="relative size-full overflow-hidden">
            <video
              src="/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="size-full object-cover object-center"
              aria-label="Feature preview video"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
