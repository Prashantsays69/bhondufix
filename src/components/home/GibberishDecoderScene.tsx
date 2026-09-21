"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExplanationMode } from "@/lib/types";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { ComicSticker, HandwrittenNote, DoodleArrow } from "@/components/comic/Doodles";
import { AlertTriangle, Sparkles, CheckCircle2, Terminal } from "lucide-react";

export const GibberishDecoderScene: React.FC = () => {
  const [mode, setMode] = useState<ExplanationMode>("bhondu");
  const [activeTab, setActiveTab] = useState<number>(0);

  const testCases = [
    {
      category: "Terminal / Dev",
      tabLabel: "Dev Server Crash",
      rawError: "Error: listen EADDRINUSE: address already in use :::3000",
      context: "I ran 'npm run dev' and terminal exploded in red text.",
      normalExplanation: "Another background Node.js process is already bound to TCP port 3000.",
      bhonduExplanation:
        "Bhai your previous dev server is still ghosting in the background and camping on Port 3000 like an uninvited wedding guest 😭.",
      steps: [
        {
          title: "Identify & terminate camper",
          instruction: "npx kill-port 3000",
        },
        {
          title: "Restart peacefully",
          instruction: "npm run dev",
        },
      ],
      verification: "Terminal should print: Ready on http://localhost:3000",
    },
    {
      category: "Windows / Desktop",
      tabLabel: "Missing Windows DLL",
      rawError: "The code execution cannot proceed because MSVCP140.dll was not found.",
      context: "Just downloaded a game/app and it refuses to launch.",
      normalExplanation:
        "The software requires Microsoft Visual C++ 2015–2022 Redistributable runtime libraries.",
      bhonduExplanation:
        "Your Windows PC is missing the standard runtime brainpack that every 3D app needs. One clean official installer fixes it.",
      steps: [
        {
          title: "Download official Microsoft runtime",
          instruction: "Search 'Visual C++ Redistributable x64' on Microsoft official site.",
        },
        {
          title: "Install & restart app",
          instruction: "Run the installer, click Next, and re-launch your game.",
        },
      ],
      verification: "Game opens smoothly without DLL dialogs.",
    },
    {
      category: "College Portal",
      tabLabel: "College ERP Timeout",
      rawError: "HTTP 403 Forbidden - Access Denied (CSRF token missing or invalidated)",
      context: "Trying to submit exam form before 11:59 PM deadline.",
      normalExplanation: "Session token expired while the tab remained idle, causing CSRF verification to fail.",
      bhonduExplanation:
        "The college server forgot who you were because you took 20 minutes to find roll number. Don't re-type from scratch!",
      steps: [
        {
          title: "Save your answers",
          instruction: "Copy your text answers to Notepad so you don't lose work.",
        },
        {
          title: "Hard refresh session",
          instruction: "Press Ctrl + Shift + R to generate fresh CSRF token.",
        },
      ],
      verification: "The submit button accepts your form without 403 error.",
    },
  ];

  const current = testCases[activeTab];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      {/* Header with Mode Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <ComicSticker text="TECHNICAL GIBBERISH → BHONDU" variant="purple" rotate="-2deg" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F4F5] uppercase">
            See Bhondu Decode Live
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">
            Toggle between modes to see the real personality difference.
          </p>
        </div>

        <div className="shrink-0">
          <ModeToggle mode={mode} onToggle={setMode} />
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {testCases.map((tc, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === idx
                ? "bg-[#C7FF3D] text-[#09090B] border-[#111113] shadow-[3px_3px_0_0_#111113] -translate-y-0.5"
                : "bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-[#F4F4F5] hover:bg-[#27272A]"
            }`}
          >
            {tc.tabLabel}
          </button>
        ))}
      </div>

      {/* Decoder Showcase Board */}
      <div className="rounded-3xl bg-[#111113] border-2 border-[#27272A] p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left: What you saw on screen (Technical Gibberish) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FB7185] flex items-center gap-1.5 font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                1. Technical Gibberish on Screen
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">{current.category}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#09090B] border border-[#FB7185]/40 font-mono text-xs text-[#FB7185] break-words shadow-inner space-y-1">
              <code>{current.rawError}</code>
            </div>

            <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA]">
              <strong className="text-[#F4F4F5]">Your context:</strong> &ldquo;{current.context}&rdquo;
            </div>

            <div className="hidden md:flex items-center justify-center pt-2">
              <HandwrittenNote color="#8B5CF6" rotate="-1deg">
                Bhondu visual OCR parses error tokens ➜
              </HandwrittenNote>
            </div>
          </div>

          {/* Right: Bhondu Translation + Actionable Solution */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C7FF3D] flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                2. {mode.toUpperCase()} Mode Explanation
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${mode}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-[#18181B] border-2 border-[#27272A] text-xs sm:text-sm text-[#F4F4F5] leading-relaxed shadow-sm"
              >
                {mode === "bhondu" ? current.bhonduExplanation : current.normalExplanation}
              </motion.div>
            </AnimatePresence>

            {/* Actionable Steps */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] font-bold">
                Actionable Fix (Copy & Run):
              </span>
              {current.steps.map((st, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] text-xs flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-md bg-[#C7FF3D] text-[#09090B] font-black flex items-center justify-center shrink-0 text-[10px] font-mono">
                    {i + 1}
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-bold text-[#F4F4F5]">{st.title}</p>
                    <code className="block font-mono text-[11px] text-[#C7FF3D] pt-0.5">
                      {st.instruction}
                    </code>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification */}
            <div className="p-3 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-xs text-[#22D3EE] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                <strong>Verification:</strong> {current.verification}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
