"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { Button } from "@/components/ui/Button";
import { ComicSticker, HandwrittenNote, DoodleStar } from "@/components/comic/Doodles";
import { ArrowRight, Sparkles, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

export const HeroScrollScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll-driven parallax transforms
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, shouldReduceMotion ? 1 : 0.88]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, shouldReduceMotion ? 0 : -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  const mascotY = useTransform(scrollYProgress, [0, 0.5], [20, shouldReduceMotion ? 20 : -30]);
  const stickerLeftRotate = useTransform(scrollYProgress, [0, 0.5], [-8, shouldReduceMotion ? -8 : -14]);
  const stickerRightRotate = useTransform(scrollYProgress, [0, 0.5], [6, shouldReduceMotion ? 6 : 12]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between overflow-hidden pt-8 sm:pt-14 pb-12 px-4 sm:px-6 bg-grid-pattern border-b border-[#27272A]/60"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[300px] bg-[#8B5CF6]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[250px] sm:w-[450px] h-[300px] bg-[#C7FF3D]/12 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Floating Comic Stickers */}
      <div className="max-w-6xl mx-auto w-full relative z-20 flex items-center justify-between pointer-events-none">
        <motion.div style={{ rotate: stickerLeftRotate }} className="pointer-events-auto">
          <ComicSticker text="ERROR AGAIN?! 💀" variant="rose" rotate="-8deg" />
        </motion.div>
        <motion.div style={{ rotate: stickerRightRotate }} className="pointer-events-auto hidden sm:block">
          <ComicSticker text="WHAT DO I DO?! 😵‍💫" variant="purple" rotate="6deg" />
        </motion.div>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="max-w-5xl mx-auto w-full text-center space-y-6 sm:space-y-8 my-auto relative z-10">
        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="space-y-3 sm:space-y-4"
        >
          {/* Giant Comic Typography: BHONDUFIX */}
          <div className="relative inline-block">
            <h1 className="text-5xl sm:text-8xl md:text-9xl font-black tracking-tight text-[#F4F4F5] uppercase select-none leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Bhondu<span className="text-[#C7FF3D]">Fix</span>
            </h1>

            {/* Doodle sparkles */}
            <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 animate-pulse">
              <DoodleStar size={28} color="#C7FF3D" />
            </div>
            <div className="absolute -bottom-2 -left-3 sm:-bottom-4 sm:-left-6">
              <DoodleStar size={20} color="#22D3EE" />
            </div>
          </div>

          {/* Core Tagline with Indian Meme Energy */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B] border-2 border-[#27272A] shadow-[3px_3px_0_0_#111113]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D] animate-ping" />
              <h2 className="text-lg sm:text-3xl md:text-4xl font-black text-[#F4F4F5] tracking-tight">
                Bas screenshot bhe <span className="text-[#C7FF3D]">💀</span>
              </h2>
            </div>

            <p className="text-sm sm:text-xl text-[#A1A1AA] font-medium max-w-xl mx-auto">
              Tech support for people who don&apos;t speak Tech.
            </p>
          </div>
        </motion.div>

        {/* Mascot Peak & Floating Speech Bubble */}
        <motion.div
          style={{ y: mascotY }}
          className="relative inline-flex flex-col items-center justify-center pt-2"
        >
          {/* Comic Speech Bubble */}
          <div className="mb-2 -rotate-1 hover:rotate-0 transition-transform">
            <div className="relative px-4 py-2 rounded-2xl bg-[#18181B] border-2 border-[#C7FF3D]/40 text-xs sm:text-sm font-bold text-[#F4F4F5] shadow-[4px_4px_0_0_#111113] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C7FF3D] shrink-0" />
              <span>&ldquo;Bhai tension mat le, I will translate this.&rdquo;</span>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <BhonduMascot state="confused" size={130} className="drop-shadow-2xl group-hover:scale-105 transition-transform" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <HandwrittenNote color="#C7FF3D" rotate="2deg">
                scroll to see metamorphosis ↓
              </HandwrittenNote>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/app" className="w-full sm:w-auto">
            <Button
              variant="lime"
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-9 py-4 font-black shadow-[0_6px_0_0_#84B512] active:translate-y-1 active:shadow-[0_2px_0_0_#84B512] transition-all group border-2 border-[#111113]"
              icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />}
            >
              SEND A SCREENSHOT
            </Button>
          </Link>

          <a href="#story-scene" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm px-6 py-4 font-bold border-2 border-[#27272A] hover:border-[#F4F4F5] hover:bg-[#18181B]"
            >
              See the magic ↓
            </Button>
          </a>
        </div>

        {/* Trust Highlights */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs text-[#A1A1AA]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
            Zero passwords asked
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
            No auto-executing scripts
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#8B5CF6]" />
            Ephemeral in-memory vision
          </span>
        </div>
      </div>
    </section>
  );
};
