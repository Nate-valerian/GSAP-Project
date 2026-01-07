import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const mainVideoRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
  };

  useEffect(() => {
    if (loadedVideos >= 1) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > totalVideos ? 1 : nextIndex;
    });
  };

  // GSAP for text animation on load
  useGSAP(() => {
    if (!loading) {
      gsap.from("#main-heading", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from("#subtitle", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from("#cta-button", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1.2,
      });

      gsap.from("#gaming-text", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 1,
      });
    }
  }, [loading]);

  useGSAP(
    () => {
      if (hasClicked && nextVdRef.current) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVdRef.current) nextVdRef.current.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });

        setTimeout(() => setHasClicked(false), 1500);
      }
    },
    {
      dependencies: [currentIndex, hasClicked],
      scope: containerRef,
    }
  );

  useGSAP(
    () => {
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });

      const animation = gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });

      return () => {
        animation.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  const getVideoSrc = (index) => {
    const safeIndex = Math.max(1, Math.min(index, totalVideos));
    return `videos/hero-${safeIndex}.mp4`;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-x-hidden"
    >
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
          <div className="text-center">
            <div className="three-body mb-8">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <h2 className="special-font text-2xl text-white mb-2">
              ZENTR<b>G</b>
            </h2>
            <p className="font-robert-regular text-violet-200">
              Loading immersive experience...
            </p>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/50 z-30"></div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-20 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div>
          {/* Mini video preview */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg border-2 border-white/30 backdrop-blur-sm">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc(
                    currentIndex === totalVideos ? 1 : currentIndex + 1
                  )}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                  onError={() => {
                    handleVideoLoad();
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <TiLocationArrow className="text-white text-2xl rotate-45" />
                  </div>
                </div>
              </div>
            </VideoPreview>
          </div>

          {/* Next video */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={() => {
              handleVideoLoad();
            }}
          />

          {/* Main background video */}
          <video
            ref={mainVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={() => {
              handleVideoLoad();
            }}
          />
        </div>

        {/* Main content with improved styling */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="container mx-auto px-5 sm:px-10 pt-24 md:pt-32">
            {/* Logo/Nav replacement */}
            <div className="flex items-center justify-between mb-16 md:mb-24">
              <h1 className="special-font text-3xl sm:text-4xl text-white">
                ZENTR<b>G</b>
              </h1>
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#products"
                  className="nav-hover-btn text-white/90 hover:text-white"
                >
                  PRODUCTS
                </a>
                <a
                  href="#trailer"
                  className="nav-hover-btn text-white/90 hover:text-white"
                >
                  TRAILER
                </a>
                <a
                  href="#gaming"
                  className="nav-hover-btn text-white/90 hover:text-white"
                >
                  GAMING
                </a>
              </div>
            </div>

            {/* Main hero content */}
            <div className="max-w-3xl">
              <h1
                id="main-heading"
                ref={textRef}
                className="special-font hero-heading text-white mb-6 leading-tight"
              >
                redefi<b>n</b>e{" "}
                <span className="block text-5xl sm:text-6xl md:text-8xl">
                  gaming
                </span>
              </h1>

              <p
                id="subtitle"
                className="mb-10 max-w-xl font-robert-regular text-xl text-white/90 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10"
              >
                <span className="text-violet-300 font-medium">
                  Enter the Metagame Layer
                </span>
                <br />
                Unleash the Play Economy where every victory, item, and strategy
                shapes your digital legacy.
              </p>

              <div id="cta-button" className="flex flex-col sm:flex-row gap-4">
                <Button
                  id="watch-trailer"
                  title="Watch trailer"
                  leftIcon={<TiLocationArrow className="rotate-45" />}
                  containerClass="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex-center gap-3"
                />
                <Button
                  id="explore-products"
                  title="Explore Products"
                  containerClass="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center">
                <span className="font-robert-regular text-sm text-white/70 mb-2">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming text overlay - enhanced */}
        <h1
          id="gaming-text"
          className="special-font hero-heading absolute bottom-10 right-5 sm:right-10 z-40 text-white/20 select-none pointer-events-none text-6xl sm:text-8xl md:text-12xl"
        >
          G<b>A</b>MING
        </h1>
      </div>
    </div>
  );
};

export default Hero;






// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { TiLocationArrow } from "react-icons/ti";
// import { useEffect, useRef, useState } from "react";

// import Button from "./Button";
// import VideoPreview from "./VideoPreview";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [hasClicked, setHasClicked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [loadedVideos, setLoadedVideos] = useState(0);

//   const totalVideos = 4;
//   const nextVdRef = useRef(null);
//   const mainVideoRef = useRef(null);
//   const containerRef = useRef(null);

//   const handleVideoLoad = () => {
//     setLoadedVideos((prev) => {
//       const newCount = prev + 1;
//       console.log(`Video loaded: ${newCount}/${totalVideos}`);
//       return newCount;
//     });
//   };

//   useEffect(() => {
//     // Load at least one video before showing content
//     if (loadedVideos >= 1) {
//       setTimeout(() => setLoading(false), 500); // Small delay for smooth transition
//     }
//   }, [loadedVideos]);

//   const handleMiniVdClick = () => {
//     setHasClicked(true);
//     setCurrentIndex((prevIndex) => {
//       const nextIndex = prevIndex + 1;
//       return nextIndex > totalVideos ? 1 : nextIndex;
//     });
//   };

//   // GSAP for click animation
//   useGSAP(
//     () => {
//       if (hasClicked && nextVdRef.current) {
//         gsap.set("#next-video", { visibility: "visible" });
//         gsap.to("#next-video", {
//           transformOrigin: "center center",
//           scale: 1,
//           width: "100%",
//           height: "100%",
//           duration: 1,
//           ease: "power1.inOut",
//           onStart: () => {
//             if (nextVdRef.current) nextVdRef.current.play();
//           },
//         });

//         gsap.from("#current-video", {
//           transformOrigin: "center center",
//           scale: 0,
//           duration: 1.5,
//           ease: "power1.inOut",
//         });

//         // Reset hasClicked after animation
//         setTimeout(() => setHasClicked(false), 1500);
//       }
//     },
//     {
//       dependencies: [currentIndex, hasClicked],
//       scope: containerRef,
//     }
//   );

//   // GSAP for scroll animation
//   useGSAP(
//     () => {
//       gsap.set("#video-frame", {
//         clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//         borderRadius: "0% 0% 40% 10%",
//       });

//       const animation = gsap.from("#video-frame", {
//         clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//         borderRadius: "0% 0% 0% 0%",
//         ease: "power1.inOut",
//         scrollTrigger: {
//           trigger: "#video-frame",
//           start: "center center",
//           end: "bottom center",
//           scrub: true,
//         },
//       });

//       return () => {
//         // Cleanup
//         animation.kill();
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       };
//     },
//     { scope: containerRef }
//   );

//   const getVideoSrc = (index) => {
//     const safeIndex = Math.max(1, Math.min(index, totalVideos));
//     return `videos/hero-${safeIndex}.mp4`;
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-dvh w-screen overflow-x-hidden"
//     >
//       {loading && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
//           <div className="three-body">
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//           </div>
//         </div>
//       )}

//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
//       >
//         <div>
//           {/* Mini video preview */}
//           <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
//             <VideoPreview>
//               <div
//                 onClick={handleMiniVdClick}
//                 className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
//               >
//                 <video
//                   ref={nextVdRef}
//                   src={getVideoSrc(
//                     currentIndex === totalVideos ? 1 : currentIndex + 1
//                   )}
//                   loop
//                   muted
//                   id="current-video"
//                   className="size-64 origin-center scale-150 object-cover object-center"
//                   onLoadedData={handleVideoLoad}
//                   onError={() => {
//                     console.error("Failed to load preview video");
//                     handleVideoLoad(); // Count it anyway to proceed
//                   }}
//                 />
//               </div>
//             </VideoPreview>
//           </div>

//           {/* Next video (hidden initially) */}
//           <video
//             ref={nextVdRef}
//             src={getVideoSrc(currentIndex)}
//             loop
//             muted
//             id="next-video"
//             className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
//             onLoadedData={handleVideoLoad}
//             onError={() => {
//               console.error("Failed to load next video");
//               handleVideoLoad();
//             }}
//           />

//           {/* Main background video */}
//           <video
//             ref={mainVideoRef}
//             src={getVideoSrc(currentIndex)}
//             autoPlay
//             loop
//             muted
//             className="absolute left-0 top-0 size-full object-cover object-center"
//             onLoadedData={handleVideoLoad}
//             onError={() => {
//               console.error("Failed to load main video");
//               handleVideoLoad();
//             }}
//           />
//         </div>

//         {/* Gaming text overlay (inside video frame) */}
//         <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
//           G<b>A</b>MING
//         </h1>

//         {/* Main content */}
//         <div className="absolute left-0 top-0 z-40 size-full">
//           <div className="mt-24 px-5 sm:px-10">
//             <h1 className="special-font hero-heading text-blue-100">
//               redefi<b>n</b>e
//             </h1>
//             <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
//               Enter the Metagame Layer <br /> Unleash the Play Economy
//             </p>
//             <Button
//               id="watch-trailer"
//               title="Watch trailer"
//               leftIcon={<TiLocationArrow />}
//               containerClass="bg-yellow-300 flex-center gap-1"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Duplicate gaming text outside? Remove if not needed */}
//       {/* <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
//         G<b>A</b>MING
//       </h1> */}
//     </div>
//   );
// };

// export default Hero;
