import React from 'react';
import Image from 'next/image';

const Packages = () => {
  const packages = [
    {
      id: "01",
      title: "Package 1",
      subtitle: "Essential Branding",
      description: "Distinct brand identities resonate through strategic logos, cohesive style guidelines and thoughtful visual systems. Every element is precision designed to tell your story.",
      image: "/assets/img/img01.webp", // Make sure this image path exists or use a placeholder
    },
    {
      id: "02",
      title: "Package 2",
      subtitle: "Web & Digital",
      description: "From pixel-perfect UI to immersive 3D interactions, we marry editorial-grade aesthetics with intuitive user experiences. We prototype, iterate, and refine every interface.",
      image: "/assets/img/img02.webp",
    },
    {
      id: "03",
      title: "Package 3",
      subtitle: "Full Development",
      description: "We bring designs to life with bullet-proof builds, custom JavaScript and performant code. Our development process ensures every animation runs smoothly and loads in a flash.",
      image: "/assets/img/img03.webp",
    },
  ];

  return (
    // Updated background to Cream (#FDF6E3) and text to Dark Brown (#422006) to match WhoAreWe
    <section className="w-full bg-[#FDF6E3] text-[#422006] py-20 md:py-32">
      <div className="px-6 md:px-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-24">
          <h2 className="font-secondary text-6xl md:text-8xl lg:text-9xl leading-none">
            Our Core
          </h2>
          <h2 className="font-primary text-7xl md:text-9xl lg:text-[12rem] uppercase leading-none tracking-tighter">
            PACKAGES
          </h2>
        </div>

        {/* --- PACKAGES LIST --- */}
        <div className="flex flex-col">
          {packages.map((pkg) => (
            // Changed border color to a subtle brown opacity to match text
            <div key={pkg.id} className="group border-t border-[#422006]/20 py-16 md:py-24">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                
                {/* Column 1: Title */}
                <div className="md:col-span-4">
                  <h3 className="font-primary text-4xl md:text-6xl tracking-tight">
                    {pkg.title}
                  </h3>
                </div>

                {/* Column 2: Description */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <h4 className="font-primary text-lg font-bold uppercase tracking-wider">
                    {pkg.subtitle}
                  </h4>
                  {/* Updated text color to be slightly lighter brown for contrast */}
                  <p className="font-secondary text-lg md:text-xl leading-relaxed text-[#422006]/80 max-w-sm">
                    {pkg.description}
                  </p>
                </div>

                {/* Column 3: Image */}
                <div className="md:col-span-4 relative aspect-[4/3] w-full overflow-hidden bg-[#422006]/10">
                  {/* Placeholder Image Logic */}
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* "View Project" Button Overlay - Updated to Brown Theme */}
                  <div className="absolute bottom-0 left-0 bg-[#422006] px-4 py-2 text-xs font-bold text-[#FDF6E3] uppercase tracking-widest">
                    View Details ↗
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Border - Updated color */}
        <div className="border-t border-[#422006]/20"></div>

      </div>
    </section>
  );
};

export default Packages;