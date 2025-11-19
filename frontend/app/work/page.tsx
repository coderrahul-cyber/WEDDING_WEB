"use client";

// Import Link for navigation
import Link from "next/link"; 
import InfiniteCarousel from "@/components/InfinteScrollEffect/ScrollEffect"; // Your existing carousel import


// Renamed component for better practice
export default function WorkPage(){
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* ⬅️ NAVIGATION: Fixed element to go back to the home page */}
      <nav className="fixed top-0 left-0 z-50 w-full p-8">
        <Link 
          href="/" // Links to the root of your application (Home)
          className="text-sm font-bold uppercase tracking-widest hover:opacity-70 text-white"
        >
          ← BACK TO HOME
        </Link>
      </nav>

      {/* The Carousel Component */}
      <InfiniteCarousel />
      
    </main>
  )
}