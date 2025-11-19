import React, { useEffect } from 'react';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div
      className={`
        fixed inset-0 z-50 
        bg-black/70 backdrop-blur-sm
        transition-all duration-500 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    >
      {/* 1. SCROLL CONTAINER: Allows scrolling if content is too tall on mobile */}
      <div className="h-full w-full overflow-y-auto py-4 sm:py-10">
        
        {/* 2. CENTERING WRAPPER */}
        <div className="flex min-h-full items-center justify-center px-4">
          
          {/* 3. CONTENT BOX (White Background, Black Text) */}
          <div
            className={`
              relative w-full max-w-5xl rounded-lg bg-white p-6 shadow-2xl transition-all duration-500 text-black md:p-14
              ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* CLOSE BUTTON (Standard 'X' top right) */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-black md:hidden"
            >
              ✕ Close
            </button>

            {/* --- TOP SECTION --- */}
            <div className="flex flex-col gap-6 md:flex-row md:justify-between border-b border-gray-200 pb-6">
              <h2 className="font-primary text-4xl font-bold md:text-7xl">Let's Talk</h2>
              
              <div className="flex flex-col text-left md:text-right">
                <a href="mailto:hello@xyz.com" className="font-secondary text-lg underline md:text-xl text-neutral-600">hello@xyz.com</a>
                <a href="tel:+91000000000" className="font-secondary text-lg underline md:text-xl text-neutral-600">+91 000 000 000</a>
              </div>
            </div>
            
            {/* --- FORM SECTION --- */}
            <form className="pt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                
                {/* Left Column (Inputs) */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Your Name</label>
                    <input type="text" className="w-full rounded bg-gray-100 p-3 focus:ring-2 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Company Name</label>
                    <input type="text" className="w-full rounded bg-gray-100 p-3 focus:ring-2 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Email Address</label>
                    <input type="email" className="w-full rounded bg-gray-100 p-3 focus:ring-2 focus:ring-black outline-none" />
                  </div>
                </div>

                {/* Right Column (Textarea & Submit) */}
                <div className="flex flex-col gap-4">
                  <div className="flex-grow">
                     <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Your Message</label>
                     <textarea rows={8} className="w-full rounded bg-gray-100 p-3 focus:ring-2 focus:ring-black outline-none resize-none h-48 md:h-full"></textarea>
                  </div>
                  <button className="bg-black text-white py-3 px-6 font-bold uppercase text-xs tracking-widest hover:opacity-80">
                    Submit
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
      
      {/* Footer Close Button (Outside the modal box) */}
      <button 
        onClick={onClose}
        className={`
          relative z-10 mt-6 
          text-lg font-bold text-white 
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
      >
        Close
      </button>

    </div>
  );
};