import gsap from "gsap"; // Fixed import
import { useState, useRef } from "react"; // Removed useEffect

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2,
        rotationX: -yOffset / 2,
        transformPerspective: 500,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    // Reset immediately on mouse leave
    gsap.to(sectionRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power1.out",
    });

    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power1.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: "500px" }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
