"use client"
import React, { useEffect, useState } from 'react';
import { ContactOverlay } from '@/components/Contact';
import Link from 'next/link';
import WhoAreWe from '@/components/WhoAreWe';
import Footer from '@/components/Footer';
import Packages from '@/components/Packages';


const VIDEO_URL = "/assets/video/web2.mov";



// ----------------------------------------------------------------------
// Main Application Component (Updated)
// ----------------------------------------------------------------------

/**
 * Main application component representing the studio landing page.
 */
const App: React.FC = () => {
  // Add state to manage the contact overlay visibility
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    // We use a React Fragment <> to allow the overlay to be a sibling
    // to the main page wrapper.
    <>
      {/* Main container: Ensures full screen height and sets text color. */}
      {/* overflow-hidden clips the video edges. */}
      <div className="relative min-h-screen w-full overflow-hidden font-sans text-white">
        
        {/* Video Background Section */}
        <div className="absolute inset-0 z-[-1]">
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            muted // Autoplay in most browsers requires the video to be muted
            playsInline // Important for iOS Safari
            className="h-full w-full object-cover "
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
              <h1 className="text-4xl font-primary leading-none tracking-tight md:text-9xl">
                STUDIO
                <br />
                NAME
              </h1>
            </div>
            
            {/* Nav Links */}
            <ul className="flex items-center md:text-2xl font-primary-medium gap-6 md:gap-10">
              <li>
                <Link
                  href="/work" 
                  className=" tracking-wider transition-colors  hover:text-bg "
                >
                  WORK
                </Link>
              </li>
              <li>
                {/* Updated this to a button to open the overlay */}
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="  tracking-wider transition-colors  hover:text-bg "
                >
                  CONTACT
                </button>
              </li>
              <li>
                <Link 
                  href="https://www.instagram.com/jp___photography_"
                  target='#' 
                  className="  tracking-wider transition-colors  hover:text-bg "
                >
                  IG
                </Link>
                .
                 <Link 
                  href="#" 
                  className="  tracking-wider transition-colors  hover:text-bg "
                >
                  YT
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main Content (Bottom Left) */}
          <main className="mb-10">
            <h2 className="text-5xl font-primary md:text-7xl">Born to Create</h2>
            <p className="mt-4 text-xl font-primary-medium  md:text-2xl">
              Lights.Camera.Action
            </p>
            <p className="md:mt-3 max-w-md  font-secondary  text-neutral-300 text-lg md:text-xl">
             Every wedding has a script written by destiny. Let [Studio Name] capture the unscripted beauty of yours with our signature cinematic style.
            </p>
          </main>
        </div>
      </div>
          <WhoAreWe />
          <Packages />
          <Footer />

      {/* Render the Contact Overlay */}
      <ContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
    </>
  );
};

export default App;