"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExplanationMode } from "@/lib/types";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { IndianMemeBadge, DoodleStar, DoodleArrow } from "@/components/comic/Doodles";
import {
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  ArrowDown,
  Layers,
} from "lucide-react";

export const GibberishDecoderScene: React.FC = () => {
  const [mode, setMode] = useState<ExplanationMode>("bhondu");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const testCases = [
    {
      id: "port-3000",
      tabLabel: "Port 3000 Collision",
      category: "Node.js / Next.js",
      rawError: "Error: listen EADDRINUSE: address already in use :::3000\nat Server.setupListenHandle [as _listen2] (node:net:1485:16)",
      bhonduTranslation:
        "Bhai, tera previous dev server Port 3000 pe abhi bhi camping kar raha hai like an uninvited wedding guest 💀",
      normalTranslation:
        "TCP port 3000 is occupied by an existing background Node process. The operating system rejected the bind request.",
      fixCommand: "npx kill-port 3000",
      fixTitle: "Kill the rogue process on port 3000",
      restartCommand: "npm run dev",
      verification: "Terminal prints: ready - started server on 0.0.0.0:3000",
      memeType: "arre-bhai" as const,
    },
    {
      id: "git-conflict",
      tabLabel: "Git Merge Hell",
      category: "Git / Version Control",
      rawError: "CONFLICT (content): Merge conflict in src/app/page.tsx\nAutomatic merge failed; fix conflicts and then commit the result.",
      bhonduTranslation:
        "Bhai, tumne aur tumhare dost ne same line change kar di. Git ka dimag kharab ho gaya hai 😭",
      normalTranslation:
        "Conflicting diffs exist between HEAD and incoming branch. Git requires manual line resolution before staged commit.",
      fixCommand: "git merge --abort",
      fixTitle: "Reset conflict cleanly or open merge editor",
      restartCommand: "git pull --rebase origin main",
      verification: "Working tree is clean. Conflicts dismissed safely.",
      memeType: "ye-kya-hai" as const,
    },
    {
      id: "college-portal",
      tabLabel: "College ERP 403",
      category: "Govt / College Portals",
      rawError: "HTTP 403 Forbidden - Access Denied (CSRF token missing, expired, or invalidated by session timeout)",
      bhonduTranslation:
        "College ka portal bhool gaya tum kaun ho kyunki 20 min roll number dhoondhne me nikal diya. Back mat karna! 💀",
      normalTranslation:
        "User authentication cookie timed out while the tab was idle, causing the server CSRF guard to invalidate the POST payload.",
      fixCommand: "Ctrl + Shift + R",
      fixTitle: "Hard refresh without clearing form cache",
      restartCommand: "Re-submit active session tab",
      verification: "Submission accepted without form wipe.",
      memeType: "abey-ruk" as const,
    },
  ];

  const current = testCases[activeTab];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="decoder" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#27272A] pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D] animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-[#C7FF3D]">
              03 / LIVE TRANSLATION ENGINE
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F4F5]">
            Tech Gibberish <span className="text-[#C7FF3D]">➜</span> Bhondu
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl">
            Watch real-world terminal errors, build failures, and portal timeouts get transformed into human plain English.
          </p>
        </div>

        {/* Mode Toggle Component */}
        <div className="shrink-0 flex flex-col items-end gap-2">
          <ModeToggle mode={mode} onToggle={setMode} />
          <span className="text-[11px] font-mono font-bold text-[#71717A]">
            MODE: {mode === "bhondu" ? "MASTIKHOR BHONDU" : "SERIOUS ENGINEER"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {testCases.map((tc, idx) => (
          <button
            key={tc.id}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === idx
                ? "bg-[#C7FF3D] text-[#09090B] shadow-comic scale-105"
                : "bg-[#18181B] text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#27272A]"
            }`}
          >
            {tc.tabLabel}
          </button>
        ))}
      </div>

      {/* 3-Step Animated Flow Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        
        {/* STEP 1: TECH GIBBERISH */}
        <div className="rounded-2xl bg-[#111113] border-2 border-[#FB7185]/40 p-5 sm:p-6 shadow-comic flex flex-col justify-between relative group hover:border-[#FB7185] transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#FB7185] text-[#09090B]">
                1. TECH GIBBERISH
              </span>
              <AlertTriangle className="w-4 h-4 text-[#FB7185]" />
            </div>

            <div className="bg-[#09090B] p-4 rounded-xl border border-[#27272A] font-mono text-xs text-[#FB7185] overflow-x-auto">
              <pre className="whitespace-pre-wrap">{current.rawError}</pre>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#71717A]">
            <span>Category: {current.category}</span>
            <span className="text-[#FB7185] font-bold">Unreadable Dump</span>
          </div>
        </div>

        {/* STEP 2: BHONDU TRANSLATION */}
        <div className="rounded-2xl bg-[#111113] border-2 border-[#8B5CF6]/50 p-5 sm:p-6 shadow-comic-purple flex flex-col justify-between relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#8B5CF6] text-[#F4F4F5]">
                2. TRANSLATION
              </span>
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            </div>

            <div className="bg-[#09090B] p-4 rounded-xl border border-[#8B5CF6]/40 min-h-[120px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${mode}-${activeTab}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`text-sm sm:text-base font-bold leading-relaxed ${
                    mode === "bhondu" ? "text-[#F4F4F5]" : "text-[#A1A1AA] font-mono text-xs"
                  }`}
                >
                  {mode === "bhondu" ? current.bhonduTranslation : current.normalTranslation}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4">
            <IndianMemeBadge type={current.memeType} rotate="-2deg" />
          </div>
        </div>

        {/* STEP 3: ACTIONABLE FIX */}
        <div className="rounded-2xl bg-[#111113] border-2 border-[#C7FF3D] p-5 sm:p-6 shadow-comic-lime flex flex-col justify-between relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#C7FF3D] text-[#09090B]">
                3. ACTIONABLE FIX
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#C7FF3D]" />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-[#F4F4F5]">
                {current.fixTitle}
              </p>

              {/* 1-Click Copy Command */}
              <div className="flex items-center justify-between gap-2 p-3 bg-[#09090B] rounded-xl border border-[#27272A] font-mono text-xs text-[#C7FF3D]">
                <code className="truncate">{current.fixCommand}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(current.fixCommand)}
                  className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#F4F4F5] transition-colors shrink-0"
                  aria-label="Copy fix command"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#C7FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="text-[11px] font-mono text-[#A1A1AA]">
                Next: <code className="text-[#F4F4F5]">{current.restartCommand}</code>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#27272A]/80">
            <span className="text-xs font-black text-[#C7FF3D]">
              WE ARE SO BACK 🗿
            </span>
            <span className="text-[10px] font-mono text-[#71717A]">
              Safe to run
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
