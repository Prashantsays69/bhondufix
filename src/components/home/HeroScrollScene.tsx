"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { DoodleStar, DoodleArrow, IndianMemeBadge } from "@/components/comic/Doodles";
import {
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { MascotState } from "@/lib/types";

export const HeroScrollScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage 1 & 2: Massive Typography Motion
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [1, shouldReduceMotion ? 1 : 0.65]);
  const titleY = useTransform(scrollYProgress, [0, 0.25], [0, shouldReduceMotion ? 0 : -140]);
  const titleX = useTransform(scrollYProgress, [0, 0.25], [0, shouldReduceMotion ? 0 : -40]);
  const titleOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0.15]);

  // Stage 3 & 6: Bhondu Mascot Motion & Entry
  const mascotX = useTransform(scrollYProgress, [0.12, 0.3], [-140, 0]);
  const mascotY = useTransform(scrollYProgress, [0.12, 0.3, 0.55, 0.8], [60, 0, -20, 0]);
  const mascotScale = useTransform(scrollYProgress, [0.12, 0.3, 0.65, 0.85], [0.7, 1.05, 1, 1.15]);

  // Mascot dynamic state calculation based on scroll progress
  // [0 - 0.25] confused -> [0.25 - 0.52] panicking -> [0.52 - 0.7] thinking -> [0.7 - 1.0] celebrating/solved
  const mascotStateProgress = useTransform(scrollYProgress, [0, 0.25, 0.52, 0.72], [0, 1, 2, 3]);

  // Stage 4 & 5: Cursed Error Window Entrance
  const errorWindowX = useTransform(scrollYProgress, [0.18, 0.38], [shouldReduceMotion ? 0 : 160, 0]);
  const errorWindowY = useTransform(scrollYProgress, [0.18, 0.38], [shouldReduceMotion ? 0 : 120, 0]);
  const errorWindowRotate = useTransform(scrollYProgress, [0.18, 0.38, 0.58, 0.75], [8, -2, -1, 0]);
  const errorWindowOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

  // Stage 5: Chaotic Clutter Stickers Entrance & Exit
  const clutterOpacity = useTransform(scrollYProgress, [0.32, 0.42, 0.58, 0.68], [0, 1, 1, 0]);
  const clutterScale = useTransform(scrollYProgress, [0.32, 0.42, 0.58, 0.68], [0.6, 1, 1, 0.7]);
  const clutterY = useTransform(scrollYProgress, [0.32, 0.42], [30, 0]);

  // Stage 7: Transformation from Cursed Error to Solution
  // 0 -> raw cursed error, 1 -> clean solution
  const solutionMorph = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const errorContentOpacity = useTransform(scrollYProgress, [0.55, 0.63], [1, 0]);
  const solutionContentOpacity = useTransform(scrollYProgress, [0.63, 0.74], [0, 1]);

  // Ambient Glow Transition (Red -> Lime)
  const redGlowOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.62], [0, 0.35, 0]);
  const limeGlowOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 0.4]);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // State calculation for mascot face
  const [currentMascotState, setCurrentMascotState] = React.useState<MascotState>("confused");

  React.useEffect(() => {
    return mascotStateProgress.on("change", (latest) => {
      if (latest < 0.8) setCurrentMascotState("confused");
      else if (latest < 1.8) setCurrentMascotState("panicking");
      else if (latest < 2.6) setCurrentMascotState("thinking");
      else setCurrentMascotState("celebrating");
    });
  }, [mascotStateProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[360vh] sm:h-[420vh] bg-[#09090B] border-b border-[#27272A]/70"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-6 px-4 sm:px-8 select-none">
        {/* Dynamic Ambient Glows */}
        <motion.div
          style={{ opacity: redGlowOpacity }}
          className="absolute top-1/3 right-10 sm:right-1/4 w-[350px] sm:w-[550px] h-[350px] bg-[#FB7185] blur-[150px] rounded-full pointer-events-none -z-10"
        />
        <motion.div
          style={{ opacity: limeGlowOpacity }}
          className="absolute top-1/3 left-10 sm:left-1/4 w-[350px] sm:w-[600px] h-[350px] bg-[#C7FF3D] blur-[160px] rounded-full pointer-events-none -z-10"
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[300px] bg-[#8B5CF6]/15 blur-[160px] rounded-full pointer-events-none -z-10" />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 1 & 2: MASSIVE TYPOGRAPHY
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center relative">
          <motion.div
            style={{
              scale: titleScale,
              y: titleY,
              x: titleX,
              opacity: titleOpacity,
            }}
            className="w-full origin-top-left transition-transform duration-75"
          >
            {/* Top Kinetic Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
              <span className="sticker-badge bg-[#18181B] text-[#C7FF3D] border-[#C7FF3D]">
                <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-ping" />
                V2.0 LIVE
              </span>
              <span className="sticker-badge bg-[#8B5CF6] text-[#F4F4F5] border-[#111113]">
                AI SCREENSHOT TECH-SUPPORT
              </span>
              <span className="hidden sm:inline-block text-xs font-mono font-bold text-[#A1A1AA]">
                // NO DEGREE REQUIRED
              </span>
            </div>

            {/* Giant Poster Headline: BHONDUFIX */}
            <div className="relative leading-none">
              <h1 className="text-[17vw] sm:text-[14vw] md:text-[12.5vw] font-black uppercase tracking-tighter text-[#F4F4F5] drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
                Bhondu<span className="text-[#C7FF3D] inline-block hover:rotate-3 transition-transform">Fix</span>
              </h1>

              {/* Decorative Stars */}
              <div className="absolute -top-3 sm:-top-8 right-4 sm:right-24 animate-pulse">
                <DoodleStar size={36} color="#C7FF3D" />
              </div>
              <div className="absolute bottom-2 left-[58%] hidden sm:block">
                <DoodleStar size={24} color="#22D3EE" />
              </div>
            </div>

            {/* Subtitle & Core Tagline */}
            <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <p className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">
                Bas screenshot bhe <span className="text-[#C7FF3D]">💀</span>
              </p>
              <div className="h-4 w-px bg-[#27272A] hidden sm:block" />
              <p className="text-sm sm:text-lg text-[#A1A1AA] font-medium max-w-lg">
                Tech support for people who don&apos;t speak Tech. Zero jargon. Just fixes that work.
              </p>
            </div>
          </motion.div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              STAGES 3 to 7: THE CINEMATIC BHONDU & ERROR ➜ SOLUTION STAGE
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-5xl relative flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
              
              {/* STAGE 3 & 6: Living Mascot Container */}
              <motion.div
                style={{
                  x: mascotX,
                  y: mascotY,
                  scale: mascotScale,
                }}
                className="relative z-30 shrink-0 flex flex-col items-center"
              >
                {/* Dynamic Mascot Comic Bubble */}
                <motion.div
                  className="mb-2 px-3.5 py-1.5 rounded-2xl bg-[#18181B] border-2 border-[#27272A] shadow-comic text-xs font-black tracking-wide text-[#F4F4F5] flex items-center gap-1.5"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {currentMascotState === "confused" && <span>&ldquo;Bhai ye screen pe kya phat gaya?&rdquo;</span>}
                  {currentMascotState === "panicking" && <span className="text-[#FB7185]">&ldquo;ARRE BHAI PORT 3000 BLOCK HAI! 💀&rdquo;</span>}
                  {currentMascotState === "thinking" && <span className="text-[#22D3EE]">&ldquo;Ruk ek second... analyzing stack trace...&rdquo;</span>}
                  {currentMascotState === "celebrating" && <span className="text-[#C7FF3D]">&ldquo;Sorted! Tera dev server is live again 🗿&rdquo;</span>}
                </motion.div>

                <div className="relative group cursor-pointer">
                  <BhonduMascot
                    state={currentMascotState}
                    size={175}
                    className="drop-shadow-2xl transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 bg-[#111113] border border-[#27272A] rounded-full px-2.5 py-0.5 text-[10px] font-mono text-[#A1A1AA]">
                    STATUS: {currentMascotState.toUpperCase()}
                  </div>
                </div>
              </motion.div>

              {/* STAGE 4, 5, 7: The Transforming Window (Error ➜ Solution) */}
              <motion.div
                style={{
                  x: errorWindowX,
                  y: errorWindowY,
                  rotate: errorWindowRotate,
                  opacity: errorWindowOpacity,
                }}
                className="relative w-full max-w-xl z-20"
              >
                {/* Stage 5 Meme Stickers Orbiting the Window */}
                <motion.div
                  style={{
                    opacity: clutterOpacity,
                    scale: clutterScale,
                    y: clutterY,
                  }}
                  className="absolute -top-10 -left-6 sm:-left-12 z-40 pointer-events-none"
                >
                  <IndianMemeBadge type="arre-bhai" rotate="-9deg" />
                </motion.div>

                <motion.div
                  style={{
                    opacity: clutterOpacity,
                    scale: clutterScale,
                  }}
                  className="absolute -bottom-8 -right-4 sm:-right-8 z-40 pointer-events-none"
                >
                  <IndianMemeBadge type="ye-kya-hai" rotate="7deg" />
                </motion.div>

                <motion.div
                  style={{
                    opacity: clutterOpacity,
                  }}
                  className="absolute -top-7 right-8 z-40 pointer-events-none hidden sm:block"
                >
                  <IndianMemeBadge type="bas-kar" rotate="-4deg" />
                </motion.div>

                <motion.div
                  style={{
                    opacity: clutterOpacity,
                  }}
                  className="absolute top-1/2 -right-16 z-40 pointer-events-none hidden sm:block"
                >
                  <DoodleArrow direction="left" color="#FB7185" width={50} height={25} />
                </motion.div>

                {/* THE CHUNKY TERMINAL / SOLUTION WINDOW CONTAINER */}
                <div className="relative rounded-2xl bg-[#111113] border-2 border-[#27272A] shadow-comic-lg overflow-hidden transition-all duration-300">
                  
                  {/* Window Chrome Titlebar */}
                  <div className="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FB7185] border border-black/40" />
                      <span className="w-3 h-3 rounded-full bg-[#FBBF24] border border-black/40" />
                      <span className="w-3 h-3 rounded-full bg-[#C7FF3D] border border-black/40" />
                      <span className="ml-2 text-xs font-mono font-bold text-[#A1A1AA]">
                        {currentMascotState === "celebrating" ? "bhondufix_solution.sh — SOLVED" : "terminal — crash_log.zsh"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {currentMascotState === "celebrating" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#C7FF3D] text-[#09090B]">
                          RESOLVED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FB7185] text-[#09090B] animate-pulse">
                          CRITICAL ERROR
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Window Dynamic Content Area */}
                  <div className="p-4 sm:p-6 min-h-[220px] flex flex-col justify-center relative font-mono text-xs sm:text-sm">
                    
                    {/* STATE A: THE CURSED TERMINAL ERROR */}
                    <motion.div
                      style={{
                        opacity: errorContentOpacity,
                        display: currentMascotState === "celebrating" ? "none" : "block",
                      }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 text-[#FB7185] font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>node:events:498 throw er; // Unhandled &apos;error&apos; event</span>
                      </div>

                      <div className="bg-[#09090B] p-3.5 rounded-xl border border-[#FB7185]/30 text-[#F4F4F5] space-y-1 font-mono text-xs">
                        <p className="text-[#FB7185] font-extrabold text-sm sm:text-base">
                          Error: listen EADDRINUSE: address already in use :::3000
                        </p>
                        <p className="text-[#71717A]">
                          at Server.setupListenHandle [as _listen2] (node:net:1485:16)
                        </p>
                        <p className="text-[#71717A]">
                          at listenInCluster (node:net:1533:12)
                        </p>
                        <p className="text-[#A1A1AA] pt-1">
                          Emitted &apos;error&apos; event on Server instance at:
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] pt-1">
                        <span>Status: App crashed (Exit code 1)</span>
                        <span className="text-[#FB7185] font-bold">Stack trace locked</span>
                      </div>
                    </motion.div>

                    {/* STATE B: THE BHONDUFIX PLAIN-ENGLISH SOLUTION */}
                    <motion.div
                      style={{
                        opacity: solutionContentOpacity,
                        display: currentMascotState === "celebrating" ? "block" : "none",
                      }}
                      className="space-y-4"
                    >
                      {/* Bhondu Explanation */}
                      <div className="bg-[#C7FF3D]/10 border-2 border-[#C7FF3D] rounded-xl p-3.5 text-[#F4F4F5] space-y-1">
                        <div className="flex items-center gap-2 text-[#C7FF3D] font-black text-xs uppercase tracking-wider">
                          <Sparkles className="w-4 h-4" />
                          <span>BhonduFix Translation</span>
                        </div>
                        <p className="text-sm font-bold text-[#F4F4F5]">
                          &ldquo;Bhai, tera previous dev server Port 3000 pe abhi bhi camping kar raha hai 💀&rdquo;
                        </p>
                      </div>

                      {/* Actionable Commands */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#A1A1AA]">
                          <span>EXECUTE FIX:</span>
                          <span className="text-[#C7FF3D]">1-CLICK COPY</span>
                        </div>

                        <div className="flex items-center justify-between gap-2 p-3 bg-[#09090B] rounded-xl border border-[#27272A] font-mono text-xs text-[#C7FF3D]">
                          <code>npx kill-port 3000</code>
                          <button
                            type="button"
                            onClick={() => copyCommand("npx kill-port 3000")}
                            className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#F4F4F5] transition-colors"
                            aria-label="Copy fix command"
                          >
                            {copied ? <Check className="w-3.5 h-3.5 text-[#C7FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Resolved Badge */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#C7FF3D]">
                          <CheckCircle2 className="w-4 h-4" />
                          PORT 3000 FREED & APP RESTARTED
                        </span>
                        <span className="text-xs font-black text-[#F4F4F5] bg-[#18181B] px-2.5 py-1 rounded-md border border-[#27272A]">
                          WE ARE SO BACK 🗿
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 8 & FOOTER SCROLL CUE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-[#27272A]/40 text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
            <span className="text-[#F4F4F5]">SCROLL TO TRANSFORM</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 text-[#C7FF3D] hover:underline"
            >
              <span>Instant Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
