import React from 'react'

const WhoAreWe = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#FDF6E3] px-6 py-10 text-[#422006] md:px-16 md:py-14">
      
      {/* Color Notes:
         bg-[#FDF6E3] -> The light cream/beige background
         text-[#422006] -> The dark chocolate brown text
      */}

      <div className="flex flex-col justify-between h-full min-h-[80vh]">
        
        {/* TOP SECTION */}
        <div className="flex flex-col items-start justify-between md:flex-row md:items-start">
          
          {/* Left: Huge Headline */}
          <div className="max-w-4xl">
            <h2 className="font-primary text-6xl font-black uppercase leading-none tracking-tight md:text-9xl">
              WHO ARE WE ?
            </h2>
            
            {/* Paragraph underneath */}
            <p className="mt-10 max-w-xl font-secondary text-xl leading-relaxed md:text-3xl">
              A Bootstrap startup for photography Studio Name is 
              the best in the area, cinematic, wedding
            </p>
          </div>

          {/* Right: Tagline */}
          <div className="mt-6 md:mt-4">
            <span className="font-primary text-xl font-bold md:text-2xl">
              Born to Create
            </span>
          </div>
        </div>

        {/* BOTTOM SECTION (Absolute positioning or Flex end) */}
        <div className="mt-20 md:mt-auto">
          <p className="font-secondary text-3xl md:text-5xl">
            Brand.Design.Development
          </p>
        </div>

      </div>
    </section>
  )
}

export default WhoAreWe