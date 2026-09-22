"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { HandwrittenNote, DoodleArrow } from "@/components/comic/Doodles";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const FinalCtaScene: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-36 px-4 sm:px-8 max-w-5xl mx-auto text-center relative overflow-hidden">
      {/* Subtle single ambient spotlight behind Bhondu */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] bg-[#C7FF3D]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* SUDDEN SIMPLIFICATION: High-contrast, clean, uncluttered canvas */}
      <div className="space-y-8 sm:space-y-10 relative z-10">
        
        {/* Centered Bhondu in Solved/Celebrating state */}
        <div className="flex justify-center">
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -8, 0],
                    rotate: [0, 1.5, 0, -1.5, 0],
                  }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <BhonduMascot state="celebrating" size={160} className="drop-shadow-2xl" />
          </motion.div>
        </div>

        {/* Huge Stark Typography */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base md:text-lg font-black tracking-widest text-[#71717A] uppercase font-mono">
            STILL CONFUSED?
          </p>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-[#F4F4F5] tracking-tighter leading-none select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
            BAS SCREENSHOT <br />
            <span className="text-[#C7FF3D]">BHE 💀</span>
          </h2>

          <p className="text-base sm:text-xl text-[#A1A1AA] max-w-lg mx-auto font-medium pt-2">
            No signup required. No credit card. Zero tech jargon. Just drop your error and get back to work.
          </p>
        </div>

        {/* Massive Lime CTA Button */}
        <div className="pt-4 flex flex-col items-center justify-center gap-3">
          <Link
            href="/app"
            className="group inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-5 sm:py-6 rounded-full text-base sm:text-xl font-black uppercase tracking-wider bg-[#C7FF3D] text-[#09090B] border-2 border-[#C7FF3D] shadow-[0_8px_0_0_#84B512] hover:shadow-[0_12px_0_0_#84B512] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_2px_0_0_#84B512] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C7FF3D]"
          >
            <Sparkles className="w-5 h-5 text-[#09090B] group-hover:rotate-12 transition-transform" />
            <span>SEND A SCREENSHOT →</span>
            <ArrowRight className="w-5 h-5 text-[#09090B] group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Small handwritten detail */}
          <div className="pt-2 flex items-center gap-2 text-center">
            <HandwrittenNote color="#C7FF3D" rotate="-2deg" className="text-sm sm:text-base">
              &ldquo;degree nahi screenshot bhe&rdquo;
            </HandwrittenNote>
          </div>
        </div>

        {/* Minimal Safe Tag */}
        <div className="pt-8 flex items-center justify-center gap-2 text-xs font-mono text-[#71717A]">
          <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
          <span>Private & Ephemeral • Screenshots deleted automatically after analysis</span>
        </div>
      </div>
    </section>
  );
};
