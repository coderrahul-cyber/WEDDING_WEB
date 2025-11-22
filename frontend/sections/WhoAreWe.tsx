"use client";

import React, { useEffect, useRef } from "react";
import BounceCards from "../components/Bounce";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://picsum.photos/400/400?grayscale",
  "https://picsum.photos/500/500?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/700/700?grayscale",
  "https://picsum.photos/300/300?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/700/700?grayscale",
  "https://picsum.photos/300/300?grayscale",
];

const transformStyles = [
  "rotate(5deg)",
  "rotate(0deg)",
  "rotate(-5deg)",
  "rotate(5deg)",
  "rotate(-5deg)",
];

const bottomText = ["Lights.", "Camera.", "Action"];

const WhoAreWe = () => {
  const containerRef = useRef<HTMLElement>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const mobileTaglineRef = useRef<HTMLDivElement | null>(null);
  const desktopTaglineRef = useRef<HTMLDivElement | null>(null);
  const bottomTextRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // when section comes into viewport
          toggleActions: "play none none none",
        },
      });

      // Heading: slide up + rotate + fade
      if (headingRef.current) {
        tl.from(headingRef.current, {
          opacity: 0,
          y: 96, // ~ translate-y-24
          rotate: -3,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Paragraph: fade/slide up with slight delay
      if (paragraphRef.current) {
        tl.from(
          paragraphRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Taglines (mobile + desktop)
      const taglines = [
        mobileTaglineRef.current,
        desktopTaglineRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (taglines.length) {
        tl.from(
          taglines,
          {
            opacity: 0,
            x: 40,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.5"
        );
      }

      // Bottom text: "Lights. Camera. Action."
      if (bottomTextRefs.current.length) {
        tl.from(
          bottomTextRefs.current,
          {
            opacity: 0,
            y: 48,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.15,
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="whoweare"
      ref={containerRef}
      className="relative w-full min-h-screen bg-bg text-text overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-full h-full min-h-screen">
        {/* LEFT SECTION (Text) */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-6 py-10 md:p-12 z-10 bg-bg md:min-h-screen">
          {/* TOP CONTENT */}
          <div className="flex flex-col items-start justify-between md:flex-row md:items-start">
            <div className="max-w-2xl perspective-1000">
              {/* Headline (GSAP-controlled) */}
              <h2
                ref={headingRef}
                className="font-primary text-5xl font-black uppercase leading-none tracking-tight md:text-7xl lg:text-8xl origin-bottom"
              >
                WHO ARE WE ?
              </h2>

              {/* Paragraph (GSAP-controlled) */}
              <p
                ref={paragraphRef}
                className="mt-6 max-w-lg font-secondary text-lg leading-relaxed md:text-xl md:mt-8 text-gray-700"
              >
                A Bootstrap startup for photography [Studio Name] is the best in
                the area, cinematic, wedding. Started in 2023, with the passion
                for photography and providing quality to our users.
              </p>
            </div>

            {/* Mobile Tagline */}
            <div className="mt-6 md:hidden overflow-hidden">
              <div
                ref={mobileTaglineRef}
                className="font-primary-medium text-xl"
              >
                Born to Create
              </div>
            </div>
          </div>

          {/* BOTTOM CONTENT (Lights Camera Action) */}
          <div className="mt-12 md:mt-auto">
            <p className="font-secondary text-3xl md:text-4xl flex flex-wrap gap-2">
              {bottomText.map((word, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) bottomTextRefs.current[index] = el;
                  }}
                  className="inline-block"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (Cards) */}
        <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen flex items-center justify-center p-4 md:p-0">
          <BounceCards
            className="custom-bounceCards w-full h-full"
            images={images}
            containerWidth="100%"
            containerHeight="100%"
          />

          {/* Desktop Tagline */}
          <div className="absolute top-6 right-6 hidden md:flex overflow-hidden z-20">
            <div
              ref={desktopTaglineRef}
              className="font-primary-medium text-xl md:text-2xl text-white mix-blend-difference"
            >
              Born to Create
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
