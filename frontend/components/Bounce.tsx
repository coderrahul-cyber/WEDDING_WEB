"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number | string;
  containerHeight?: number | string;
  animationDelay?: number;
  animationStagger?: number;
  enableHover?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = "100%",
  containerHeight = "auto",
  animationDelay = 0.1,
  animationStagger = 0.15, // Delay between each card for "one by one" effect
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // GSAP ScrollTrigger animation
 useEffect(() => {
  if (!containerRef.current || cardsRef.current.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      // Mobile breakpoint — adjust based on your design
      isMobile: "(max-width: 640px)",
      isDesktop: "(min-width: 641px)",
    },
    (context) => {
      const { isMobile, isDesktop } = context.conditions!;

      // MOBILE — Smooth scroll reveal
      if (isMobile) {
        gsap.from(cardsRef.current, {
          opacity: 0,
          x: (index: number) => (index % 2 === 0 ? -80 : 80),
          scale: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 80%",
            scrub: true, // smooth scroll-linked animation
          },
        });
      }

      // DESKTOP — original stagger entrance animation
      if (isDesktop) {
        gsap.from(cardsRef.current, {
          opacity: 0,
          x: (index: number) => (index % 2 === 0 ? -100 : 100),
          scale: 0.8,
          duration: 0.8,
          delay: animationDelay,
          ease: "cubic-bezier(0.17, 0.55, 0.55, 1)",
          stagger: animationStagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    }
  );

  return () => mm.revert();
}, [images.length, animationDelay, animationStagger]);


  return (
    <div
      ref={containerRef}
      className={`bounceCardsContainer ${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:content-center gap-6 gap-y-[-20px] p-4`}
      style={{
        width: containerWidth,
        height: containerHeight,
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) cardsRef.current[idx] = el;
          }}
          className="group relative w-full aspect-square max-w-[250px]"
        >
          {/* Inner Card for Hover Effects */}
          <div
            className={`w-full h-full  rounded-xl overflow-hidden shadow-lg border-4 border-white transition-transform duration-300  ${
              enableHover
                ? "hover:scale-105 hover:shadow-2xl hover:z-10 hover:border-gray-200"
                : ""
            }`}
          >
            {/* Standard img tag ensures compatibility if next/image is not configured */}
            <img
              className="w-full h-full object-cover bg-amber-200"
              src={src}
              alt={`card-${idx}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
