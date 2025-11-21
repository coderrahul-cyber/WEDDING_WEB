
// import React from "react";
// import Image from "next/image";
// import {motion} from "framer-motion";

// export default function StickyRevealPage() {
// //   return (
// //     <>
// //       <div className="sticky bottom-0 left-0 w-full h-screen z-0 flex items-center justify-center overflow-hidden bg-[#4a0010]">
        
// //         {/* Content Container */}
// //         <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 h-full flex flex-col md:flex-row items-end md:items-center justify-between relative">
          
// //           {/* LEFT: The Image of the two men */}
// //           <div className="relative z-20 w-full md:w-1/2 h-[60vh] md:h-[85vh] flex items-end">
// //             {/* Replace '/men-standing.png' with your actual image path */}
// //             <div className="relative w-full h-full">
// //                {/* Using a placeholder div here. Replace with <Image /> */}
// //                <Image 
// //                  src={"/assets/img/jimg.png"}  
// //                  alt="Two men standing"
// //                  unoptimized={true}
// //                  width={20} height={20}
// //                  className="object-cover object-top h-full w-auto max-w-full mask-image-gradient"
// //                  style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
// //                />
// //             </div>
// //           </div>

// //           {/* RIGHT: Huge Typography */}
// //           <div className="relative z-10 w-full md:w-1/2 text-left md:text-right pb-20 md:pb-0 pl-4 md:pl-0">
            
// //             {/* The Big "Background" Text */}
// //             <h2 className={` font-oswald text-red-500/30 text-[12vw] md:text-[7vw] leading-[0.9] uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-center pointer-events-none select-none mix-blend-screen`}>
// //               Future Three
// //             </h2>

// //             {/* The Main Text Block */}
// //             <div className="relative text-[#ffb3c1] space-y-4">
// //               <h3 className={` font-oswald text-4xl md:text-6xl uppercase font-bold leading-none tracking-tight`}>
// //                 In a world where <br />
// //                 <span className="text-white">every second counts,</span> <br />
// //                 we design <br />
// //                 with intention <br />
// //                 to maximise <br />
// //                 dwell time
// //               </h3>

// //               <div className="mt-12 pt-8 border-t border-red-800/50 flex flex-col items-end">
// //                 <h4 className={` font-primary-new text-3xl text-white`}>
// //                   Jyoti + Sam
// //                 </h4>
// //                 <p className="text-xs uppercase tracking-widest mt-2 opacity-70">
// //                   Co-Founders of Future Three
// //                 </p>
                
// //                 <button className="mt-8 px-8 py-3 border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-[#4a0010] transition-colors">
// //                   Our Story &gt;
// //                 </button>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>

// //     </>
// //   );



// }

"use client"; 

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StickyRevealPage() {
  
  // Animation variants for smooth re-use
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (

    <section className="sticky w-full bg-[#3c090b] z-0">
      
      <div className="w-full max-w-[1600px]  mx-auto px-4 md:px-12 flex flex-col md:flex-row relative">

        {/* ==========================================
            LEFT COLUMN: STICKY IMAGE
            Stays pinned to the viewport while you scroll
        ========================================== */}
        <div className=" hidden md:flex md:w-1/2 w-screen h-screen sticky  top-0 items-end justify-center z-10 pb-0">
           <div className="relative w-full h-[85%]">
               <Image 
                 src={"/assets/img/background.webp"}  
                 alt="Jyoti and Sam"
                 unoptimized={true}
                 width={800} 
                 height={1200}
                 className="object-cover object-top h-full w-auto max-w-full mask-image-gradient mx-auto"
                 style={
                    { 
                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', 

                    }
                }
               />
            </div>
            
            {/* Background Decorative Text (Fixed behind image) */}
            <h2 className="font-oswald text-red-500/20 text-[7vw] leading-[0.9] uppercase tracking-tighter absolute top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-[120%] text-center pointer-events-none select-none mix-blend-screen z-[-1]">
               Jyoti  Studio
            </h2>
        </div>

        {/* ==========================================
            RIGHT COLUMN: SCROLLING TEXT BLOCKS
            Flows naturally. Each block is min-h-screen.
        ========================================== */}
        <div className="w-full md:w-1/2  md:flex flex-col  relative z-20 pl-0 md:pl-12">
          
          {/* --- BLOCK 1: Intro (Your Original Text) --- */}
          <div className="  h-1/2 md:min-h-screen flex flex-col  justify-center py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="relative text-[#ffb3c1] space-y-4 text-right"
            >
             {/* <Image width={30} height={40} unoptimized={true} alt="img" src={"/assets/img/background.webp"} className="  -z-10 absolute  size-auto top-0" /> */}
              <h3 className="font-oswald text-4xl md:text-6xl uppercase font-bold leading-none tracking-tight">
                In a world where <br />
                <span className="text-white">every second counts,</span> <br />
                we design <br />
                with intention <br />
                to maximise <br />
                dwell time
              </h3>

              <div className="mt-12 pt-8 border-t border-red-800/50 flex flex-col items-end">
                <h4 className="font-primary-new text-3xl text-white">
                  Jyoti + Sam
                </h4>
                <p className="text-xs uppercase tracking-widest mt-2 opacity-70">
                  Co-Founders of Studio J
                </p>
                <button  className="mt-8 px-8 py-3 border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-[#4a0010] transition-colors">
                  Our Story &gt;
                </button>
              </div>
            </motion.div>
          </div>

          {/* --- BLOCK 2: Behind The Threes --- */}
          <div className="h-1/2 md:min-h-screen flex flex-col justify-center py-20 text-right">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h3 className="font-oswald text-4xl md:text-6xl uppercase font-bold text-white mb-6">
                Behind The Threes
              </h3>
              <p className="font-primary-new text-xl md:text-3xl leading-relaxed text-white/90 ml-auto max-w-xl">
                Step inside our studio and discover the untold stories, insider tips, 
                and the entrepreneurial journey that fuels our creative process.
              </p>
              <p className="mt-8 text-sm text-[#ffb3c1] uppercase tracking-widest border-b border-[#ffb3c1]/30 pb-1 inline-block cursor-pointer hover:text-white transition">
                Follow on YouTube
              </p>
            </motion.div>
          </div>

          {/* --- BLOCK 3: Power House --- */}
          <div className="h-1/2 md:min-h-screen flex flex-col justify-center py-20 text-right">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
               <div className="bg-[#6b8c42] px-3 py-1 text-[10px] font-bold uppercase inline-block text-white mb-6 tracking-widest">
                 Latest Episode
               </div>
               <h3 className="font-oswald text-6xl md:text-8xl uppercase font-bold text-white leading-[0.8] mb-8">
                 Power <br/> House
               </h3>
               
               {/* Video Thumbnail Placeholder */}
               <div className="relative aspect-video w-full md:w-[80%] ml-auto bg-black/20 rounded-lg overflow-hidden mb-6 group cursor-pointer border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition">
                     <div className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-4 py-2 text-xs font-bold uppercase">
                        Play Video
                     </div>
                  </div>
               </div>

               <p className="font-primary-new text-xl text-[#ffb3c1] opacity-80 max-w-md ml-auto">
                 How We Landed A German Nutrition Powerhouse.
               </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}



