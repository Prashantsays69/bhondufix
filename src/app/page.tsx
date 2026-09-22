"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroScrollScene } from "@/components/home/HeroScrollScene";
import { HowItWorksScrollScene } from "@/components/home/HowItWorksScrollScene";
import { GibberishDecoderScene } from "@/components/home/GibberishDecoderScene";
import { CategoriesComicScene } from "@/components/home/CategoriesComicScene";
import { FinalCtaScene } from "@/components/home/FinalCtaScene";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5] selection:bg-[#C7FF3D] selection:text-[#09090B] overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* 1. Multi-Stage Pinned Hero Scene (8 continuous stages of typography, mascot entry & error-to-solution metamorphosis) */}
        <HeroScrollScene />

        {/* 2. Scroll-Driven 4-Step Narrative (01 to 04 with giant numbers & reactive mascot) */}
        <HowItWorksScrollScene />

        {/* 3. Interactive Dual-Mode Decoder (Tech Gibberish ➜ Bhondu Translation ➜ Actionable Fix) */}
        <GibberishDecoderScene />

        {/* 4. Art-Directed Floating Poster Categories with Moving Marquee Ticker */}
        <CategoriesComicScene />

        {/* 5. Dramatic Simplification Finale (Stark Canvas + Huge Typography + Massive CTA) */}
        <FinalCtaScene />
      </main>

      <Footer />
    </div>
  );
}
