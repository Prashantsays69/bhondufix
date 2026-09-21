"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { MascotState } from "@/lib/types";
import { ComicSticker, HandwrittenNote, DoodleArrow, SpeechBubble } from "@/components/comic/Doodles";
import { Copy, Check, Terminal, CheckCircle2, Sparkles } from "lucide-react";

export const StoryTransformationScene: React.FC = () => {
  const [activeMood, setActiveMood] = useState<MascotState>("confused");
  const [copied, setCopied] = useState(false);

  const moodDialogues: Record<MascotState, { title: string; speech: string }> = {
    confused: {
      title: "Bhondu Mastikhor",
      speech: "“Arey tension mat le! Dev server is camping on Port 3000 like an uninvited wedding guest 😭”",
    },
    panicking: {
      title: "Panic Mode!",
      speech: "“DON'T RUN RANDOM REDDIT SCRIPTS! Reddit user 'dark_coder69' will delete your system32 💀”",
    },
    thinking: {
      title: "Brainstorming",
      speech: "“Hold on, let me cross-reference the TCP port binding tables... Aha, found the culprit!”",
    },
    analyzing: {
      title: "OCR Scanner Active",
      speech: "“Scanning error tokens... filtering useless stack trace nonsense... 99.4% confidence.”",
    },
    detective: {
      title: "Sherlock Bhondu",
      speech: "“Found the exact line where everything broke. Not your fault, the software author wrote bad code.”",
    },
    warning: {
      title: "Safety Inspector",
      speech: "“Safety first! We don't touch your registry or ask for passwords. Only safe commands here.”",
    },
    solved: {
      title: "Problem Squashed!",
      speech: "“Zombie process terminated! Dev server running peacefully. Go sleep now 🗿”",
    },
    celebrating: {
      title: "We Are So Back!",
      speech: "“WE ARE SO BACK 🗿! Zero engineering degree needed, fixed in 10 seconds flat!”",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("npx kill-port 3000");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="story-scene" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 scroll-mt-16">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2">
          <ComicSticker text="FROM THIS → TO THIS" variant="cyan" rotate="-2deg" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F4F5] uppercase">
          The Bhondu Metamorphosis
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          Cryptic red terror on the left. Plain-English peace of mind on the right.
        </p>
      </div>

      {/* 3-Stage Interactive Comic Storyboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Stage 1: The Scary Error Terminal (Columns 1-4) */}
        <motion.div
          whileHover={{ rotateY: -3, scale: 1.01 }}
          className="lg:col-span-4 rounded-3xl bg-[#09090B] border-2 border-[#FB7185]/40 shadow-[0_16px_40px_rgba(251,113,133,0.12)] p-5 space-y-4 relative overflow-hidden"
        >
          {/* Header Chrome */}
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FB7185] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FBBF24] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27272A] inline-block" />
              <span className="text-[11px] font-mono text-[#71717A] ml-2">cursed_terminal.sh</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#FB7185] bg-[#FB7185]/10 px-2 py-0.5 rounded border border-[#FB7185]/30">
              CRITICAL 💀
            </span>
          </div>

          {/* Cursed Code Snippet */}
          <div className="p-3.5 rounded-2xl bg-[#111113] border border-[#27272A] font-mono text-xs text-[#FB7185] space-y-1.5 shadow-inner">
            <p className="text-[#A1A1AA]">$ npm run dev</p>
            <p className="font-bold">Error: listen EADDRINUSE :::3000</p>
            <p className="text-[10px] text-[#71717A]">
              at Server.setupListenHandle [as _listen2] (net.js:1318:16)
            </p>
            <p className="text-[10px] text-[#FB7185]/80">
              errno: -4091, code: &apos;EADDRINUSE&apos;, syscall: &apos;listen&apos;
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] pt-1">
            <span>Midnight React emergency</span>
            <HandwrittenNote color="#FB7185" rotate="-3deg">
              &ldquo;what does this even mean?!&rdquo;
            </HandwrittenNote>
          </div>
        </motion.div>

        {/* Center: Connector & Bhondu Mastikhor (Columns 5-8) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-[#111113] border-2 border-[#8B5CF6]/30 shadow-[0_16px_50px_rgba(139,92,246,0.15)] relative text-center space-y-4">
          {/* Doodle Arrows on Desktop */}
          <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 z-20">
            <DoodleArrow direction="right" color="#8B5CF6" width={48} height={28} />
          </div>
          <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 z-20">
            <DoodleArrow direction="right" color="#C7FF3D" width={48} height={28} />
          </div>

          {/* Speech Bubble reacting to chosen mood */}
          <SpeechBubble
            tailPosition="bottom-center"
            bg="bg-[#18181B]"
            borderColor="border-[#8B5CF6]/40"
            className="w-full max-w-xs"
          >
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#A78BFA] font-black">
                  {moodDialogues[activeMood].title}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#C7FF3D]" />
              </div>
              <p className="text-xs sm:text-sm text-[#F4F4F5] leading-snug">
                {moodDialogues[activeMood].speech}
              </p>
            </div>
          </SpeechBubble>

          {/* Interactive Mascot */}
          <div className="cursor-pointer group py-2" title="Click Bhondu to cycle mood!">
            <BhonduMascot state={activeMood} size={130} className="group-hover:scale-105 transition-transform" />
          </div>

          {/* Playful Mood Switcher Pills */}
          <div className="space-y-1.5 w-full">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block font-bold">
              Tap to see Bhondu react:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {(["confused", "panicking", "thinking", "analyzing", "detective", "solved"] as MascotState[]).map(
                (mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setActiveMood(mood)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer border ${
                      activeMood === mood
                        ? "bg-[#C7FF3D] text-[#09090B] border-[#111113] shadow-[2px_2px_0_0_#111113] -translate-y-0.5"
                        : "bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-[#F4F4F5] hover:bg-[#27272A]"
                    }`}
                  >
                    {mood}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Stage 3: Clean BhonduFix Solution (Columns 9-12) */}
        <motion.div
          whileHover={{ rotateY: 3, scale: 1.01 }}
          className="lg:col-span-4 rounded-3xl bg-[#09090B] border-2 border-[#C7FF3D]/40 shadow-[0_16px_40px_rgba(199,255,61,0.12)] p-5 space-y-4 relative overflow-hidden"
        >
          {/* Header Chrome */}
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C7FF3D] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#22D3EE] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27272A] inline-block" />
              <span className="text-[11px] font-mono text-[#71717A] ml-2">bhondu_fix.sh</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#C7FF3D] bg-[#C7FF3D]/10 px-2 py-0.5 rounded border border-[#C7FF3D]/30">
              SOLVED 🗿
            </span>
          </div>

          {/* Clean Actionable Steps */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#111113] border border-[#27272A] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#C7FF3D]">Step 1: Kick out camper</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#A1A1AA] hover:text-[#C7FF3D] bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A] cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-[#C7FF3D]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <code className="block font-mono text-xs text-[#C7FF3D] bg-[#18181B] p-2 rounded-lg border border-[#27272A]">
                npx kill-port 3000
              </code>
            </div>

            <div className="p-3 rounded-xl bg-[#111113] border border-[#27272A] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#A1A1AA]">Step 2: Restart peacefully</span>
              <code className="block font-mono text-xs text-[#F4F4F5] bg-[#18181B] p-2 rounded-lg border border-[#27272A]">
                npm run dev
              </code>
            </div>
          </div>

          {/* Verification check */}
          <div className="p-2.5 rounded-xl bg-[#C7FF3D]/10 border border-[#C7FF3D]/20 text-[11px] text-[#C7FF3D] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Ready on http://localhost:3000 in 1.1s</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
