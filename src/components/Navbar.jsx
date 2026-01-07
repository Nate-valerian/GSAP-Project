import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = [
  { name: "Nexus", href: "#nexus" },
  { name: "Vault", href: "#vault" },
  { name: "Prologue", href: "#prologue" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const animationRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = useCallback(() => {
    if (!audioElementRef.current) return;

    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    setIsIndicatorActive(newState);

    if (newState) {
      // Handle autoplay restrictions
      const playPromise = audioElementRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
          setIsAudioPlaying(false);
          setIsIndicatorActive(false);
        });
      }
    } else {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
  }, [isAudioPlaying]);

  // Handle scroll behavior
  useEffect(() => {
    const SCROLL_THRESHOLD = 50;
    const NAV_HIDE_THRESHOLD = 100;

    if (currentScrollY === 0) {
      // At top: show nav without floating style
      setIsNavVisible(true);
      if (navContainerRef.current) {
        navContainerRef.current.classList.remove("floating-nav");
      }
    } else if (
      currentScrollY > lastScrollY &&
      currentScrollY > NAV_HIDE_THRESHOLD
    ) {
      // Scrolling down past threshold: hide nav
      setIsNavVisible(false);
      if (navContainerRef.current) {
        navContainerRef.current.classList.add("floating-nav");
      }
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show nav with floating style
      setIsNavVisible(true);
      if (navContainerRef.current) {
        navContainerRef.current.classList.add("floating-nav");
      }
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate navbar visibility
  useEffect(() => {
    if (!navContainerRef.current) return;

    // Kill any ongoing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isNavVisible]);

  // Handle audio element initialization
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = 0.3; // Set reasonable volume
      audioElementRef.current.preload = "metadata";
    }
  }, []);

  // Handle page visibility change (pause audio when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isAudioPlaying) {
        audioElementRef.current?.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-300 sm:inset-x-6"
      style={{ pointerEvents: isNavVisible ? "auto" : "none" }}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4 py-2 md:px-6">
          {/* Logo and Product button */}
          <div className="flex items-center gap-4 md:gap-7">
            <img
              src="/img/logo.png"
              alt="Zentry Logo"
              className="w-8 md:w-10"
              loading="lazy"
            />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow className="ml-1" />}
              containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1 hover:scale-105 transition-transform"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="nav-hover-btn"
                  aria-label={`Navigate to ${item.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-1 md:space-x-0.5 ml-4 md:ml-10"
              aria-label={
                isAudioPlaying
                  ? "Pause background music"
                  : "Play background music"
              }
              aria-pressed={isAudioPlaying}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
                preload="metadata"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    animationPlayState: isIndicatorActive
                      ? "running"
                      : "paused",
                  }}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">
                {isAudioPlaying ? "Music playing" : "Music paused"}
              </span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
