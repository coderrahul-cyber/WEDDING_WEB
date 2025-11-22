"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out quart
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    // This ensures GSAP animations are in perfect sync with the smooth scroll
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Turn off GSAP's internal lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}