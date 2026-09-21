"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { Button } from "@/components/ui/Button";
import { ComicSticker, HandwrittenNote, DoodleStar } from "@/components/comic/Doodles";
import { ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const FinalCtaScene: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto text-center relative overflow-hidden">
      {/* Background glow burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[350px] bg-[#C7FF3D]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Comic Canvas Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative z-10 rounded-3xl bg-gradient-to-b from-[#18181B] to-[#111113] border-2 border-[#C7FF3D]/40 p-8 sm:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-8"
      >
        {/* Floating Accents */}
        <div className="absolute -top-3 left-8 -rotate-3">
          <ComicSticker text="PEACE ✌️" variant="cyan" />
        </div>
        <div className="absolute -top-3 right-8 rotate-3 hidden sm:block">
          <ComicSticker text="WE ARE SO BACK 🗿" variant="lime" />
        </div>

        {/* Celebrating Mascot */}
        <div className="flex justify-center">
          <div className="relative group cursor-pointer">
            <BhonduMascot state="celebrating" size={130} className="group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-4">
              <DoodleStar size={24} color="#C7FF3D" />
            </div>
          </div>
        </div>

        {/* Massive Typography Beat */}
        <div className="space-y-3">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#A1A1AA] uppercase">
            Still Confused?
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#F4F4F5] uppercase tracking-tight leading-none">
            Bas Screenshot Bhe <span className="text-[#C7FF3D]">💀</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#A1A1AA] max-w-md mx-auto pt-2">
            Drop the broken screen. Get plain-English instructions. Fix your computer in 60 seconds.
          </p>

          <div className="pt-2">
            <HandwrittenNote color="#C7FF3D" rotate="-2deg" className="text-sm sm:text-base">
              &ldquo;degree nahi screenshot bhe&rdquo; 🗿
            </HandwrittenNote>
          </div>
        </div>

        {/* The Strongest CTA on the Page */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/app" className="w-full sm:w-auto">
            <Button
              variant="lime"
              size="lg"
              className="w-full sm:w-auto text-lg sm:text-xl px-10 py-5 font-black uppercase shadow-[0_8px_0_0_#84B512] active:translate-y-1 active:shadow-[0_2px_0_0_#84B512] border-2 border-[#111113] group"
              icon={<ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />}
            >
              Send a screenshot →
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#71717A] border-t border-[#27272A]/60">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
            Zero passwords or credentials needed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#8B5CF6]" />
            In-memory ephemeral analysis
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            Free to use • No signup required
          </span>
        </div>
      </motion.div>
    </section>
  );
};
