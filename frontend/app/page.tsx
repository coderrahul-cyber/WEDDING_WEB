"use client"
import React, { useState, useEffect } from 'react';
import { ContactOverlay } from '@/components/Contact';
import { AboutSection } from '@/components/WhoAreWe';

/**
 * Set the video URL.
 * Since your video is in the /public folder at the root of your frontend project
 * (e.g., /public/bg-video.mp4), you can access it directly with "/bg-video.mp4".
 */
const VIDEO_URL = "/bg-video.mp4";



// ----------------------------------------------------------------------
// Main Application Component (Updated)
// ----------------------------------------------------------------------

/**
 * Main application component representing the studio landing page.
 */
const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Add state to track scroll position
  const [scrollY, setScrollY] = useState(0);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set listener
    window.addEventListener('scroll', handleScroll);

    // Clean up listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    // We use a main tag to wrap the sections of the page
    <main>
      {/* Hero Video Section 
        This is the original component, now wrapped in a <section>
      */}
      <section className="relative min-h-screen w-full overflow-hidden font-sans text-white">
        
        {/* Video Background Section */}
        <div className="absolute inset-0 z-[-1]">
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            muted // Autoplay in most browsers requires the video to be muted
            playsInline // Important for iOS Safari
            className="h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Dark overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Page Content Wrapper */}
        {/* This wrapper uses flex to position the header (top) and main (bottom) */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 md:p-16">
          
          {/* Header Navigation */}
          <nav className="flex w-full items-start justify-between">
            {/* Logo */}
            <div>
              <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
                STUDIO
                <br />
                NAME
              </h1>
            </div>
            
            {/* Nav Links */}
            <ul className="flex items-center gap-6 md:gap-10">
              <li>
                <a 
                  href="#" 
                  className="text-sm font-semibold tracking-wider transition-opacity hover:opacity-75 md:text-base"
                >
                  WORK
                </a>
              </li>
              <li>
                {/* Updated this to a button to open the overlay */}
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="text-sm font-semibold tracking-wider transition-opacity hover:opacity-75 md:text-base"
                >
                  CONTACT
                </button>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm font-semibold tracking-wider transition-opacity hover:opacity-75 md:text-base"
                >
                  IG.YT
                </a>
              </li>
            </ul>
          </nav>

          {/* Main Content (Bottom Left) */}
          <div 
            className="mb-10"
            // Apply parallax to the hero text as well
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <h2 className="text-5xl font-bold md:text-7xl">Born to Create</h2>
            <p className="mt-4 text-lg font-medium tracking-wide md:text-xl">
              Brand.Desgin.Developement
            </p>
            <p className="mt-3 max-w-md text-base text-neutral-300">
              A Bootstrap startup for photograhy Studio Name is the best in the
              area, cinematic, wedding
            </p>
          </div>
        </div>
      </section>

      {/* New "About" Section
        Render the new component right after the first section
      */}
      <AboutSection scrollY={scrollY} />

      {/* Render the Contact Overlay (remains at the end) */}
      <ContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
};

export default App;