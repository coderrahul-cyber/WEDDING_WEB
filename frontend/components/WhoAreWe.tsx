import React from 'react'

const WhoAreWe = () => {
  return (
    <section className="relative min-h-screen max-h-screen w-full bg-bg px-6 py-10 text-[#422006] md:px-6 md:py-5">

      <div className="flex flex-col justify-between h-full  w-full min-h-[80vh]">
        
        {/* TOP SECTION */}
        <div className="flex flex-col items-start  justify-between md:flex-row md:items-start">
          
          {/* Left: Huge Headline */}
          <div className="max-w-4xl">
            <h2 className="font-primary text-5xl font-black uppercase leading-none tracking-tight md:text-8xl">
              WHO ARE WE ?
            </h2>
            
            {/* Paragraph underneath */}
            <p className="mt-5 max-w-xl font-secondary text-xl leading-7 md:text-2xl md:mt-2">
              A Bootstrap startup for photography Studio Name is 
              the best in the area, cinematic, wedding
            </p>
          </div>

          {/* Right: Tagline */}
          <div className="mt-6 md:mt-4">
            <span className="font-primary-medium text-xl  md:text-2xl">
              Born to Create
            </span>
          </div>
        </div>

        {/* BOTTOM SECTION (Absolute positioning or Flex end) */}
        <div className="mt-20 md:mt-auto absolute bottom-5 md:bottom-5 left-6 ">
          <p className="font-secondary text-3xl md:text-4xl">
            Lights.Camera.Action
          </p>
          <br /><br />
        </div>

      </div>
    </section>
  )
}

export default WhoAreWe