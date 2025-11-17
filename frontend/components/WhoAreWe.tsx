"use client";
interface AboutSectionProps {
    scrollY: number;
  }
  
  /**
   * A new section component for "Who Are We?"
   * It receives the page's scrollY position to create parallax effects.
   */
  export const AboutSection: React.FC<AboutSectionProps> = ({ scrollY }) => {
    // We calculate a parallax effect. This will be a small number.
    // We divide by a large number to make the effect subtle.
    // We only want this effect to *really* kick in after the first viewport.
    const parallaxOffset = (scrollY - (window.innerHeight || 0)) * 0.1;
  
    return (
      <section 
        className="relative min-h-screen w-full bg-[#FBF0D9] p-10 md:p-16 text-[#6B2A1D] font-sans overflow-hidden"
      >
        <div className="relative z-10 flex h-full min-h-screen flex-col justify-between">
          {/* Top Row */}
          <div className="flex items-start justify-between">
            <div>
              <h2 
                className="text-7xl font-extrabold uppercase md:text-9xl"
                // Apply a subtle parallax effect
                style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
              >
                Who Are We?
              </h2>
              <p className="mt-4 max-w-md text-base">
                A Bootstrap startup for photograhy Studio Name is the best in the
                area, cinematic, wedding
              </p>
            </div>
            <div 
              className="text-right text-lg font-bold"
              // Apply a different (faster) parallax effect
              style={{ transform: `translateY(${parallaxOffset * 1.5}px)` }}
            >
              Born to Create
            </div>
          </div>
  
          {/* Bottom Row */}
          <div>
            <p className="text-lg font-medium tracking-wide md:text-xl">
              Brand.Desgin.Developement
            </p>
          </div>
        </div>
      </section>
    );
  };