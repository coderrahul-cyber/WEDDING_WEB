import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white pt-20 pb-10 px-6 md:px-16">
      
      {/* Top Section: Big Heading */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-20">
        <div>
          <h2 className="font-primary text-6xl md:text-9xl uppercase leading-none tracking-tighter">
            Let&lsquo;s <br />
            Work.
          </h2>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-4">
          <a 
            href="mailto:hello@xyzstudio.com" 
            className="font-secondary text-2xl md:text-3xl underline decoration-neutral-700 underline-offset-4 hover:decoration-white transition-all"
          >
            hello@xyzstudio.com
          </a>
          <p className="font-mono text-sm text-neutral-500">
            Based in Uttarakhand, India
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-neutral-800 mb-10"></div>

      {/* Bottom Links Section */}
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-0 text-sm font-mono text-neutral-400">
        
        {/* Socials */}
        <div className="flex flex-col gap-2">
          <span className="text-white mb-2">SOCIALS</span>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <span className="text-white mb-2">SITEMAP</span>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/work" className="hover:text-white transition-colors">Work</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2">
           <span className="text-white mb-2">LEGAL</span>
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-end md:items-end">
          <p>© XYZ STUDIO {currentYear}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;