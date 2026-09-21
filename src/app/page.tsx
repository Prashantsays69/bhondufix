"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroScrollScene } from "@/components/home/HeroScrollScene";
import { StoryTransformationScene } from "@/components/home/StoryTransformationScene";
import { HowItWorksScrollScene } from "@/components/home/HowItWorksScrollScene";
import { GibberishDecoderScene } from "@/components/home/GibberishDecoderScene";
import { CategoriesComicScene } from "@/components/home/CategoriesComicScene";
import { FinalCtaScene } from "@/components/home/FinalCtaScene";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5] selection:bg-[#C7FF3D] selection:text-[#09090B] overflow-x-hidden">
      <Navbar />

      <main className="flex-1 space-y-8 sm:space-y-16 pb-16">
        {/* 1. Cinematic Hero Scene with oversized typography & progressive reveal */}
        <HeroScrollScene />

        {/* 2. Metamorphosis Story Scene: Scary Error ➜ Bhondu Reacts ➜ Simple Solution */}
        <StoryTransformationScene />

        {/* 3. The 4-Step Comic Loop */}
        <HowItWorksScrollScene />

        {/* 4. Interactive Tech Gibberish ➜ Bhondu Decoder (Dual Mode) */}
        <GibberishDecoderScene />

        {/* 5. Asymmetric Playful Categories */}
        <CategoriesComicScene />

        {/* 6. Grand Finale CTA Scene */}
        <FinalCtaScene />
      </main>

      <Footer />
    </div>
  );
}
