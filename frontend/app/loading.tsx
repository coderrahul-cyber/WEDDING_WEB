"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loading() {
  const container = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const exitPlayedRef = useRef(false);

  useEffect(() => {
    if (!container.current) return;

    // initial safe state
    gsap.set(".logo-dot", { scale: 0.6, opacity: 0.95, transformOrigin: "50% 50%" });
    gsap.set(".logo-ring", { rotate: 0, scale: 0.96, opacity: 0.95, transformOrigin: "50% 50%" });
    gsap.set(".particle", { x: 0, y: 0, opacity: 0 });
    gsap.set(".shutter-top", { yPercent: 0, transformOrigin: "50% 0%" });
    gsap.set(".shutter-bottom", { yPercent: 0, transformOrigin: "50% 100%" });

    // subtle looping entrance while page loads: ring rotate + dot pulse + particles
    const loop = gsap.timeline({ repeat: -1 });

    loop.to(".logo-ring", { rotate: 360, duration: 4.2, ease: "none" }, 0);
    loop.to(
      ".logo-dot",
      { scale: 1.08, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: 1 },
      0
    );

    // particles burst rhythm
    loop.to(
      ".particle",
      {
        opacity: 1,
        y: -18,
        x: (i) => (i % 2 === 0 ? -18 : 18),
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      },
      0.4
    );

    loopRef.current = loop;

    // function to play cinematic exit once page is ready
    const playExitOnce = () => {
      if (exitPlayedRef.current) return;
      exitPlayedRef.current = true;

      // stop loop
      loopRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => setHidden(true),
      });

      // quick emphasize before split
      tl.to(
        ".logo-container",
        { scale: 1.05, duration: 0.35, ease: "power2.out" },
        0
      );

      tl.to(
        ".logo-dot",
        { scale: 1.45, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        0
      );

      // micro burst outward to hint the split
      tl.to(
        ".particle",
        {
          opacity: 1,
          x: (i) => (i - 2) * 22,
          y: (i) => (i % 2 === 0 ? -44 : 44),
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
        },
        "+=0.05"
      );

      // hold a beat so user perceives the logo
      tl.to({}, { duration: 0.28 });

      // Cinematic split: top goes up fully off-screen, bottom goes down.
      // We animate slightly beyond 100% to ensure full cover across devices.
      tl.to(
        ".shutter-top",
        {
          yPercent: -120,
          duration: 1.05,
          ease: "power4.inOut",
          force3D: true,
        },
        "cinema"
      );

      tl.to(
        ".shutter-bottom",
        {
          yPercent: 120,
          duration: 1.05,
          ease: "power4.inOut",
          force3D: true,
        },
        "cinema"
      );

      // simultaneously fade out the logo container for a polished reveal
      tl.to(
        ".logo-container",
        { opacity: 0, scale: 0.9, duration: 0.9, ease: "power2.inOut" },
        "cinema"
      );
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        playExitOnce();
      } else {
        window.addEventListener("load", playExitOnce, { once: true });

        // SPA navigation fallback
        const fallback = setTimeout(playExitOnce, 10000);

        return () => {
          window.removeEventListener("load", playExitOnce);
          clearTimeout(fallback);
          loop.kill();
        };
      }
    }

    return () => {
      loop.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
      aria-hidden
    >
      {/* SHUTTERS: full-screen bars for cinematic split */}
      <div className="shutter-top absolute top-0 left-0 h-[60vh] md:h-[55vh] w-full bg-black z-40 border-b border-white/3" />
      <div className="shutter-bottom absolute bottom-0 left-0 h-[60vh] md:h-[55vh] w-full bg-black z-40 border-t border-white/3" />

      {/* CENTER LOGO */}
      <div className="logo-container relative z-50 flex flex-col items-center gap-6 pointer-events-none">
       

        <div className="text-center text-white/90">
          <h2 className="text-xl md:text-2xl font-semibold">JYOTI STUDIO</h2>
          <p className="text-sm text-white/50 mt-1">Crafting interfaces — loading…</p>
        </div>
      </div>
    </div>
  );
}
