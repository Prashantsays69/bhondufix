"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { IndianMemeBadge, DoodleStar, DoodleArrow, TapeSticker } from "@/components/comic/Doodles";
import { Camera, BrainCircuit, Terminal, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { MascotState } from "@/lib/types";

interface StepData {
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  mascotState: MascotState;
  mascotQuote: string;
  visualSnippet: {
    label: string;
    code: string;
    tag: string;
  };
  accentColor: string;
}

const STEPS: StepData[] = [
  {
    number: "01",
    badge: "CAPTURE",
    title: "SCREENSHOT",
    subtitle: "Pura window capture karo, crop karne ki zaroorat nahi",
    description:
      "Paste directly with Ctrl+V or drop any image. Bhondu reads terminal dumps, IDE warnings, browser red screens, or random Windows popups.",
    mascotState: "confused",
    mascotQuote: "“Crop mat kar bhai, mujhe pura context dekhne de!”",
    visualSnippet: {
      label: "INPUT DETECTED",
      code: "Screenshot pasted (1920x1080) • PNG • 840KB\nStatus: Reading stack trace & UI context...",
      tag: "100% Client Protected",
    },
    accentColor: "#22D3EE",
  },
  {
    number: "02",
    badge: "VISION AI",
    title: "BHONDU UNDERSTANDS",
    subtitle: "Cryptic stack traces & compiler tantrums decoded",
    description:
      "Multimodal vision models analyze error codes, line numbers, port locks, and hidden dependencies in under 2 seconds. No technical degree needed.",
    mascotState: "analyzing",
    mascotQuote: "“Achaaa, ye wala bug hai! Dev server freeze ho gaya tha.”",
    visualSnippet: {
      label: "ANALYSIS PIPELINE",
      code: "Root Cause: EADDRINUSE (Port 3000 occupied)\nConfidence: 98.4%\nSafety Gate: Safe to auto-kill process",
      tag: "Zero Technical Jargon",
    },
    accentColor: "#8B5CF6",
  },
  {
    number: "03",
    badge: "SOLUTION",
    title: "PLAIN-ENGLISH FIX",
    subtitle: "Exact commands & steps that actually work",
    description:
      "No 40-page documentation links or condescending StackOverflow answers. Just clean, copy-pasteable terminal commands explained simply.",
    mascotState: "detective",
    mascotQuote: "“Ye command copy kar aur terminal me daal. Ek minute me chal jayega.”",
    visualSnippet: {
      label: "ACTIONABLE COMMAND",
      code: "$ npx kill-port 3000\nKilling process on port 3000... Done!\n$ npm run dev",
      tag: "1-Click Copyable",
    },
    accentColor: "#C7FF3D",
  },
  {
    number: "04",
    badge: "CONFIRMATION",
    title: "VERIFY",
    subtitle: "Confirm your system is live before pushing",
    description:
      "Step-by-step verification checklist ensures your dev server, database, or build pipeline is stable and safe without breaking production.",
    mascotState: "celebrating",
    mascotQuote: "“Boom! Kaam ho gaya, ab chill maar 🗿”",
    visualSnippet: {
      label: "SYSTEM VERIFIED",
      code: "✔ Port 3000: Responding HTTP 200 OK\n✔ Fast Refresh: Connected\n✔ WE ARE SO BACK 🗿",
      tag: "Production Safe",
    },
    accentColor: "#C7FF3D",
  },
];

export const HowItWorksScrollScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active step index [0, 1, 2, 3] from scroll
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.28) setActiveStepIndex(0);
      else if (latest < 0.54) setActiveStepIndex(1);
      else if (latest < 0.78) setActiveStepIndex(2);
      else setActiveStepIndex(3);
    });
  }, [scrollYProgress]);

  const activeStep = STEPS[activeStepIndex];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full h-[320vh] sm:h-[380vh] bg-[#09090B] border-b border-[#27272A]/70"
    >
      {/* Sticky Stage Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-[#27272A]/80 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D] animate-pulse" />
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F4F4F5]">
              02 / HOW BHONDUFIX WORKS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {STEPS.map((s, idx) => (
              <button
                key={s.number}
                type="button"
                onClick={() => {
                  if (containerRef.current) {
                    const top = containerRef.current.offsetTop;
                    const height = containerRef.current.offsetHeight;
                    window.scrollTo({
                      top: top + (height / 4) * idx + 10,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-8 h-8 rounded-full font-mono text-xs font-black transition-all ${
                  idx === activeStepIndex
                    ? "bg-[#C7FF3D] text-[#09090B] scale-110 shadow-comic"
                    : "bg-[#18181B] text-[#71717A] hover:text-[#F4F4F5]"
                }`}
                aria-label={`Jump to step ${s.number}`}
              >
                {s.number}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12 relative my-auto">
          
          {/* LEFT: Giant Number + Step Description */}
          <div className="flex-1 w-full space-y-4 sm:space-y-6">
            
            {/* Giant Graphic Step Number & Badge */}
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-7xl sm:text-9xl md:text-[10rem] font-black leading-none text-[#C7FF3D] font-mono select-none drop-shadow-[0_10px_30px_rgba(199,255,61,0.2)]">
                {activeStep.number}
              </span>

              <div className="space-y-1">
                <span className="sticker-badge bg-[#18181B] text-[#C7FF3D] border-[#C7FF3D]">
                  {activeStep.badge}
                </span>
                <p className="text-xs font-mono font-bold text-[#A1A1AA]">
                  PHASE {activeStepIndex + 1} OF 4
                </p>
              </div>
            </div>

            {/* Step Heading & Subtitle */}
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-[#F4F4F5] tracking-tight">
                {activeStep.title}
              </h3>
              <p className="text-base sm:text-xl font-bold text-[#C7FF3D]">
                {activeStep.subtitle}
              </p>
              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-lg leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Quick Meme Sticker */}
            <div className="pt-2">
              {activeStepIndex === 0 && <IndianMemeBadge type="degree-nahi" rotate="-2deg" />}
              {activeStepIndex === 1 && <IndianMemeBadge type="ye-kya-hai" rotate="2deg" />}
              {activeStepIndex === 2 && <IndianMemeBadge type="jugaad" rotate="-3deg" />}
              {activeStepIndex === 3 && <IndianMemeBadge type="so-back" rotate="2deg" />}
            </div>
          </div>

          {/* RIGHT: Visual Terminal Mockup + Reactive Bhondu Character */}
          <div className="flex-1 w-full max-w-lg flex flex-col items-center relative">
            
            {/* Mascot in active state with custom speech bubble */}
            <div className="relative mb-4 flex flex-col items-center">
              <div className="px-4 py-2 rounded-2xl bg-[#18181B] border-2 border-[#27272A] shadow-comic text-xs sm:text-sm font-black text-[#F4F4F5] max-w-xs text-center mb-2">
                {activeStep.mascotQuote}
              </div>

              <div className="relative">
                <BhonduMascot
                  state={activeStep.mascotState}
                  size={140}
                  className="drop-shadow-2xl transition-all duration-300"
                />
              </div>
            </div>

            {/* Live Terminal / Snippet Card */}
            <div className="w-full rounded-2xl bg-[#111113] border-2 border-[#27272A] shadow-comic-lg overflow-hidden font-mono text-xs sm:text-sm">
              <div className="px-4 py-2.5 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D]" />
                  <span className="text-[11px] font-bold text-[#A1A1AA] ml-1">
                    {activeStep.visualSnippet.label}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#18181B] border border-[#27272A] text-[#C7FF3D]">
                  {activeStep.visualSnippet.tag}
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-[#09090B] space-y-3">
                <pre className="whitespace-pre-wrap text-[#F4F4F5] leading-relaxed">
                  {activeStep.visualSnippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator Bar */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between border-t border-[#27272A]/60 pt-3 text-xs font-mono font-bold text-[#71717A]">
          <span>SCROLL PROGRESS: {Math.round((activeStepIndex + 1) * 25)}%</span>
          <span className="text-[#A1A1AA]">KEEP SCROLLING FOR INTERACTIVE DECODER ↓</span>
        </div>
      </div>
    </section>
  );
};
