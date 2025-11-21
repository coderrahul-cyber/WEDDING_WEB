
// animation
"use client"; // Required for GSAP

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const WhoAreWe = () => {
  const container = useRef<HTMLOptionElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%", // Animation starts when top of section hits 75% of viewport
          end: "bottom bottom",
          toggleActions: "play none none reverse", // Plays on enter, reverses on leave
        },
      });

      // 1. Headline: Slides up with a slight rotation for a "magazine" feel
      tl.from(".anim-headline", {
        y: 100,
        opacity: 0,
        rotateX: -10, // Subtle 3D tilt
        duration: 1.2,
        ease: "power4.out",
      });

      // 2. Tagline (Born to create): Fades in from the right
      tl.from(
        ".anim-tagline",
        {
          x: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8" // Overlap with previous animation
      );

      // 3. Paragraph: Simple fade up
      tl.from(
        ".anim-para",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // 4. Bottom Text: The "Lights. Camera. Action" stagger
      tl.from(
        ".anim-bottom-word",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2, // 0.2s delay between each word
          ease: "back.out(1.7)", // Slight overshoot for "impact"
        },
        "-=0.5"
      );
    },
    { scope: container }
  );

  // Helper to split the bottom text for animation
  const bottomText = ["Lights.", "Camera.", "Action"];

  return (
    <section
      id="whoweare"
      ref={container}
      className="relative min-h-screen max-h-screen w-full bg-bg px-6 py-10 text-text md:px-6 md:py-5 overflow-hidden"
    >
      <div className="flex flex-col justify-between h-full w-full min-h-[80vh]">
        {/* TOP SECTION */}
        <div className="flex flex-col items-start justify-between md:flex-row md:items-start">
          {/* Left: Huge Headline */}
          <div className="max-w-4xl perspective-1000"> {/* perspective helps the 3D text tilt */}
            <h2 className="anim-headline font-primary text-5xl font-black uppercase leading-none tracking-tight md:text-8xl origin-bottom">
              WHO ARE WE ?
            </h2>

            {/* Paragraph underneath */}
            <p className="anim-para mt-5 max-w-xl font-secondary text-xl leading-7 md:text-2xl md:mt-2 opacity-100">
              A Bootstrap startup for photography Studio Name is the best in the
              area, cinematic, wedding
            </p>
          </div>

          {/* Right: Tagline */}
          <div className="mt-6 md:mt-4 overflow-hidden">
            <div className="anim-tagline font-primary-medium text-xl md:text-2xl">
              Born to Create
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-20 md:mt-auto absolute bottom-5 md:bottom-5 left-6">
          <p className="font-secondary text-3xl md:text-4xl flex gap-2">
            {/* Mapping the words to animate them individually */}
            {bottomText.map((word, index) => (
              <span key={index} className="anim-bottom-word inline-block">
                {word}
              </span>
            ))}
          </p>
          <br />
          <br />
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;