"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ContactOverlay } from '@/components/Contact';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


import WhoAreWe from '@/components/WhoAreWe';
import Footer from '@/components/Footer';
import Packages from '@/components/Packages';
import Detail from '@/components/Detail';
import StickyRevealPage from '@/components/Detail';
import PreLoader from '@/app/loading';
import IntroOverlay from '@/app/loading';

const VIDEO_URL = "/assets/video/web2.mov";

const App: React.FC = () => {
  // Add state to manage the contact overlay visibility
  const [isContactOpen, setIsContactOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

gsap.set(container.current, { opacity: 1 });
    // --- INITIAL SET STATES (To prevent flash) ---
    gsap.set(".hero-video", { scale: 1.2, filter: "blur(10px)" });
    gsap.set(".nav-item", { y: -50, opacity: 0 });
    gsap.set(".hero-line", { y: 50, opacity: 0 });
    gsap.set(".hero-para", { opacity: 0 });

    // --- THE ANIMATION SEQUENCE ---
    
    // Step 1: The "Lens Focus" Effect
    // The video de-blurs and scales down (zooms out) to create depth
    tl.to(".hero-video", {
      scale: 1,
      filter: "blur(0px)",
      duration: 2,
      ease: "power2.inOut" // Smooth cinematic feel
    })

    // Step 2: Reveal Navigation (Top to Bottom)
    // Happens slightly before the video finishes (.to argument "-=1.5")
    .to(".nav-item", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1 // Nav items appear one after another
    }, "-=1.5")

    // Step 3: Reveal Main Text (Bottom to Top)
    .to(".hero-line", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2
    }, "-=1") // Overlaps with nav animation

    // Step 4: Fade in the paragraph softly
    .to(".hero-para", {
      opacity: 1,
      duration: 1.5
    }, "-=0.5");

  }, { scope: container }); 
  

  return (
    // We use a React Fragment <> to allow the overlay to be a sibling
    // to the main page wrapper.
    <>
    <div ref={container} className='opacity-0 '>
      {/* Main container: Ensures full screen height and sets text color. */}
      {/* overflow-hidden clips the video edges. */}
      <div className="relative min-h-screen w-full overflow-hidden font-sans text-white">
        
        {/* Video Background Section */}
        <div className="absolute inset-0 md:-inset-x-12 z-[-1]">
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            muted // Autoplay in most browsers requires the video to be muted
            playsInline // Important for iOS Safari
            className=" hero-video min-h-screen max-h-screen w-full object-cover "
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Dark overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Page Content Wrapper */}
        {/* This wrapper uses flex to position the header (top) and main (bottom) */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between p-5 md:p-16">
        
          {/* Header Navigation */}
          <nav className="flex w-full items-start justify-between">
            {/* Logo */}
            <div className='nav-item'>
              <h1 className="text-3xl font-primary-new font-bold leading-none tracking-tight md:text-9xl">
                Jyoti
                <br />
                Studio
              </h1>
            </div>
            
            {/* Nav Links */}
            
                 <ul className="flex items-center md:text-2xl font-primary-new font-bold gap-6 md:gap-10">
              <li className='nav-item'>
                <Link
                  href="/work"
                  className=" tracking-wider transition-colors  hover:text-bg cursor-pointer "
                >
                  WORK
                </Link>
              </li>
              <li className='nav-item'>
                {/* Updated this to a button to open the overlay */}
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="  tracking-wider transition-colors  hover:text-bg cursor-pointer "
                >
                  CONTACT
                </button>
              </li>
              <li className='nav-item'>
                <Link
                  href="https://www.instagram.com/jp___photography_"
                  target='#'
                  className="  tracking-wider transition-colors  hover:text-bg cursor-pointer "
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
            <h2 className="text-5xl hero-line font-primary-new md:text-7xl capitalize">Your story,our lens</h2>
            <p className="mt-4 text-xl hero-line font-primary-new   md:text-2xl">
              Lights.Camera.Capture
            </p>
            <p className="md:mt-3 hero-para max-w-md  font-secondary font-light  text-neutral-300 text-lg md:text-xl">
             Every wedding has a script written by destiny. Let [Studio Name] capture the unscripted beauty of yours with our signature cinematic style.
            </p>
          </main>
        </div>
        
      </div>
          <WhoAreWe />
          <Packages />
      
          <StickyRevealPage />
          <Footer />

      {/* Render the Contact Overlay */}
      <ContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
    </div>
    </>
  );
};

export default App;

//animation
// "use client";

// import React, { useRef, useState } from 'react';
// import Link from 'next/link';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// // Import your other components...
// import WhoAreWe from '@/components/WhoAreWe';
// import Footer from '@/components/Footer';
// import Packages from '@/components/Packages';
// import StickyRevealPage from '@/components/Detail';
//  import { ContactOverlay } from '@/components/Contact';

// // Mock video URL (Replace with your real one)
// const VIDEO_URL = "/assets/video/web2.mov";

// const HomePage = () => {
//   const [isContactOpen, setIsContactOpen] = useState(false);
  
//   // 1. Create a scope ref for the main container
//   const container = useRef<HTMLDivElement>(null);
//   // 2. The Animation Logic
//   useGSAP(() => {
//     const tl = gsap.timeline({
//         defaults: { ease: "power3.out" }
//     });

//     // --- INITIAL SET STATES (To prevent flash) ---
//     gsap.set(".hero-video", { scale: 1.2, filter: "blur(10px)" });
//     gsap.set(".nav-item", { y: -50, opacity: 0 });
//     gsap.set(".hero-line", { y: 50, opacity: 0 });
//     gsap.set(".hero-para", { opacity: 0 });

//     // --- THE ANIMATION SEQUENCE ---
    
//     // Step 1: The "Lens Focus" Effect
//     // The video de-blurs and scales down (zooms out) to create depth
//     tl.to(".hero-video", {
//       scale: 1,
//       filter: "blur(0px)",
//       duration: 2,
//       ease: "power2.inOut" // Smooth cinematic feel
//     })

//     // Step 2: Reveal Navigation (Top to Bottom)
//     // Happens slightly before the video finishes (.to argument "-=1.5")
//     .to(".nav-item", {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       stagger: 0.1 // Nav items appear one after another
//     }, "-=1.5")

//     // Step 3: Reveal Main Text (Bottom to Top)
//     .to(".hero-line", {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       stagger: 0.2
//     }, "-=1") // Overlaps with nav animation

//     // Step 4: Fade in the paragraph softly
//     .to(".hero-para", {
//       opacity: 1,
//       duration: 1.5
//     }, "-=0.5");

//   }, { scope: container }); // Scope ensures we only animate things inside this component

//   return (
//     <div ref={container}> {/* Attach ref here for GSAP Scoping */}
      
//       {/* Main container */}
//       <div className="relative min-h-screen w-full overflow-hidden font-sans text-white">
        
//         {/* Video Background Section */}
//         <div className="absolute inset-0 md:-inset-x-12 z-[-1]">
//           {/* Added class 'hero-video' for GSAP targeting */}
//           <video
//             src={VIDEO_URL}
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="hero-video min-h-screen max-h-screen w-full object-cover"
//           >
//             Your browser does not support the video tag.
//           </video>
          
//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-black/40"></div>
//         </div>

//         {/* Page Content Wrapper */}
//         <div className="relative z-10 flex min-h-screen flex-col justify-between p-5 md:p-16">
        
//           {/* Header Navigation */}
//           <nav className="flex w-full items-start justify-between overflow-hidden">
//             {/* Logo */}
//             <div className="nav-item"> {/* Added class for animation */}
//               <h1 className="text-3xl font-primary-new font-bold leading-none tracking-tight md:text-9xl">
//                 Jyoti
//                 <br />
//                 Studio
//               </h1>
//             </div>
            
//             {/* Nav Links */}
//             <ul className="flex items-center md:text-2xl font-primary-new font-bold gap-6 md:gap-10">
//               {['WORK', 'CONTACT', 'IG', 'YT'].map((item, idx) => (
//                 <li key={idx} className="nav-item"> {/* Added class for animation */}
//                    {item === 'CONTACT' ? (
//                       <button 
//                         onClick={() => setIsContactOpen(true)}
//                         className="tracking-wider transition-colors hover:text-bg cursor-pointer"
//                       >
//                         CONTACT
//                       </button>
//                    ) : (
//                       <Link href="#" className="tracking-wider transition-colors hover:text-bg cursor-pointer">
//                         {item}
//                       </Link>
//                    )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Main Content (Bottom Left) */}
//           <main className="mb-10 overflow-hidden">
//             {/* Split text lines for stagger effect */}
//             <div className="overflow-hidden">
//                 <h2 className="hero-line text-5xl font-primary-new md:text-7xl capitalize block">
//                     Your story, our lens
//                 </h2>
//             </div>
            
//             <div className="overflow-hidden">
//                 <p className="hero-line mt-4 text-xl font-primary-new md:text-2xl block">
//                     Lights. Camera. Capture.
//                 </p>
//             </div>

//             <p className="hero-para md:mt-3 max-w-md font-secondary font-light text-neutral-300 text-lg md:text-xl">
//               Every wedding has a script written by destiny. Let Jyoti Studio capture the unscripted beauty of yours with our signature cinematic style.
//             </p>
//           </main>
//         </div>
//       </div>

//       {/* Other Sections */}
//       <WhoAreWe />
//       <Packages />
//       <StickyRevealPage />
//       <Footer />

//       {/* Render the Contact Overlay */}
//       <ContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
//     </div>
//   );
// }

// export default HomePage;