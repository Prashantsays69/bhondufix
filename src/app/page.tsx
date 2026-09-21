"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { MascotState, ExplanationMode } from "@/lib/types";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Laptop,
  Smartphone,
  GraduationCap,
  Globe,
  Sparkles,
  CheckCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function LandingPage() {
  const [heroMascotState, setHeroMascotState] = useState<MascotState>("confused");
  const [demoMode, setDemoMode] = useState<ExplanationMode>("bhondu");
  const [activeTab, setActiveTab] = useState<number>(0);

  const realisticExamples = [
    {
      category: "Terminal / Dev",
      rawError: "Error: listen EADDRINUSE: address already in use :::3000",
      context: "I was trying to test my React app and terminal exploded in red text.",
      normalExplanation:
        "Another background node process is already bound to TCP port 3000.",
      bhonduExplanation:
        "Bhai your previous dev server is still ghosting in the background and camping on Port 3000 like an uninvited wedding guest 😭.",
      steps: [
        {
          title: "Identify the camper",
          instruction: "Run `npx kill-port 3000` to boot the zombie process out.",
        },
        {
          title: "Restart peacefully",
          instruction: "Run `npm run dev` again.",
        },
      ],
      verification: "Terminal should print 'Ready in 1.2s on http://localhost:3000'.",
    },
    {
      category: "Windows / Desktop",
      rawError: "The code execution cannot proceed because MSVCP140.dll was not found.",
      context: "Just downloaded a game and it refuses to open.",
      normalExplanation:
        "The software requires Microsoft Visual C++ 2015-2022 Redistributable runtime libraries which are missing from System32.",
      bhonduExplanation:
        "Your Windows PC is missing the standard runtime brainpack that every 3D app needs. One clean official installer fixes it.",
      steps: [
        {
          title: "Download official runtime",
          instruction: "Grab the official vc_redist.x64.exe from Microsoft's site.",
        },
        {
          title: "Install & restart app",
          instruction: "Run the installer, click Next, and re-launch your game.",
        },
      ],
      verification: "The game launches without asking for DLL files.",
    },
    {
      category: "College Portal",
      rawError: "HTTP 403 Forbidden - Access Denied (CSRF token missing or invalidated)",
      context: "Trying to submit examination form before 11:59 PM deadline.",
      normalExplanation:
        "The session token expired while the tab remained idle, causing subsequent POST requests to fail CSRF verification.",
      bhonduExplanation:
        "The college server forgot who you were because you took 20 minutes to find your roll number. Don't re-type everything from scratch!",
      steps: [
        {
          title: "Save your typed answers",
          instruction: "Copy your text answers to notepad so you don't lose them.",
        },
        {
          title: "Hard refresh session",
          instruction: "Press Ctrl + Shift + R to generate a fresh security token.",
        },
      ],
      verification: "The submit button successfully accepts the form.",
    },
  ];

  const categories = [
    {
      icon: <Terminal className="w-5 h-5 text-[#C7FF3D]" />,
      name: "Coding & Dev Errors",
      desc: "Port collisions, npm conflicts, Git merge drama, and cryptic bash logs.",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#22D3EE]" />,
      name: "Browser & Web Glitches",
      desc: "CORS blocks, 403 Forbidden, broken cookies, and payment portal timeouts.",
    },
    {
      icon: <Laptop className="w-5 h-5 text-[#8B5CF6]" />,
      name: "Windows & Desktop Apps",
      desc: "Missing DLLs, frozen background services, and unclickable permission dialogs.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#FBBF24]" />,
      name: "Android Device Issues",
      desc: "Developer options, ADB debugging, permission locks, and storage mysteries.",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#FB7185]" />,
      name: "College Portals",
      desc: "Clunky ERPs, registration session timeouts, and attendance gateways.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5]">
      <Navbar />

      <main className="flex-1 space-y-20 pb-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12 px-4 sm:px-6 bg-grid-pattern border-b border-[#27272A]/50">
          {/* Subtle background ambient glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-[#C7FF3D]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            {/* Main Headline */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F4F4F5] leading-[1.08]">
                Bas screenshot bhe <span className="text-[#C7FF3D] inline-block animate-bounce">💀</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-[#A1A1AA] font-medium max-w-2xl mx-auto">
                Tech support for people who don&apos;t speak Tech.
              </p>
            </div>

            {/* Visual Storytelling Flow: Scary Error ➔ Bhondu ➔ Simple Solution */}
            <div className="max-w-4xl mx-auto bg-[#111113]/95 backdrop-blur-md border-2 border-[#27272A] p-4 sm:p-7 rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.7)] space-y-4 relative overflow-hidden">
              {/* Subtle decorative glow accents */}
              <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#C7FF3D]/5 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#8B5CF6]/5 blur-3xl rounded-full pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch relative z-10">
                {/* 1. Scary Error Screen Beat */}
                <div className="p-4 rounded-2xl bg-[#09090B] border border-[#FB7185]/30 shadow-inner flex flex-col justify-between text-left relative group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#FB7185] bg-[#FB7185]/10 px-2 py-0.5 rounded border border-[#FB7185]/20 flex items-center gap-1">
                        <span>💀</span> scary error
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A]">terminal.log</span>
                    </div>
                    <div className="font-mono text-xs text-[#FB7185] bg-[#18181B] p-2.5 rounded-xl border border-[#27272A] break-words">
                      <code>Error: listen EADDRINUSE :::3000</code>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A1A1AA] mt-2 italic">
                    Cryptic red errors camping on your computer at midnight.
                  </p>
                </div>

                {/* 2. Bhondu Mascot (Interactive Centerpiece) */}
                <div className="flex flex-col items-center justify-between p-4 rounded-2xl bg-[#18181B]/80 border-2 border-[#8B5CF6]/30 text-center relative shadow-sm">
                  <div
                    className="cursor-pointer group select-none flex flex-col items-center"
                    onClick={() => {
                      const states: MascotState[] = ["confused", "analyzing", "detective", "warning", "solved"];
                      const nextIndex = (states.indexOf(heroMascotState) + 1) % states.length;
                      setHeroMascotState(states[nextIndex]);
                    }}
                    title="Click Bhondu to cycle mood!"
                  >
                    <BhonduMascot state={heroMascotState} size={100} className="group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] font-bold text-[#A1A1AA] group-hover:text-[#C7FF3D] transition-colors mt-1 font-mono">
                      tap to cycle ({heroMascotState})
                    </span>
                  </div>

                  <div className="mt-2 w-full">
                    <div className="p-2.5 rounded-xl bg-[#111113] border border-[#27272A] text-xs text-[#F4F4F5] leading-snug">
                      {heroMascotState === "confused" && "“Bhai tension mat le! Just drop the screen 💀”"}
                      {heroMascotState === "analyzing" && "“Scanning error tokens... filtering gibberish 🔍”"}
                      {heroMascotState === "detective" && "“Found the culprit! Port 3000 is occupied 💡”"}
                      {heroMascotState === "warning" && "“Hold up! Check safety before running commands ⚠️”"}
                      {heroMascotState === "solved" && "“Zombie process dead! Problem squashed 🗿”"}
                    </div>
                  </div>
                </div>

                {/* 3. Simple Solution Beat */}
                <div className="p-4 rounded-2xl bg-[#09090B] border border-[#C7FF3D]/30 shadow-inner flex flex-col justify-between text-left relative group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#C7FF3D] bg-[#C7FF3D]/10 px-2 py-0.5 rounded border border-[#C7FF3D]/20 flex items-center gap-1">
                        <span>🗿</span> simple fix
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A]">plain english</span>
                    </div>
                    <div className="font-mono text-xs text-[#C7FF3D] bg-[#18181B] p-2.5 rounded-xl border border-[#27272A] break-words">
                      <code>npx kill-port 3000</code>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A1A1AA] mt-2">
                    One clean verified step. Solved in 10 seconds.
                  </p>
                </div>
              </div>

              {/* Subtitle footer inside visual storytelling card */}
              <div className="text-[11px] text-[#A1A1AA] flex items-center justify-center gap-2 pt-1 border-t border-[#27272A]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#C7FF3D]" />
                <span>Zero jargon • Zero passwords needed • Ephemeral in-memory vision</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/app" className="w-full sm:w-auto">
                <Button
                  variant="lime"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 group"
                  icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                >
                  Send a screenshot
                </Button>
              </Link>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm px-6 py-4">
                  See how it works
                </Button>
              </a>
            </div>

            {/* Trust Highlights under Hero */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
                Zero passwords or OTPs asked
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#22D3EE]" />
                No auto-executing scripts
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#8B5CF6]" />
                In-memory ephemeral analysis
              </span>
            </div>
          </div>
        </section>

        {/* ===================== THE 4-STEP LOOP ===================== */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 scroll-mt-20">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F4F4F5]">
              How BhonduFix saves your sanity
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto">
              No technical essays. No condescending forum replies. Just 4 clean steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <Card variant="default" className="relative space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-[#18181B] border-2 border-[#27272A] flex items-center justify-center font-black text-sm text-[#C7FF3D]">
                01
              </div>
              <h3 className="text-base font-bold text-[#F4F4F5]">1. Bas Screenshot Bhe</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Take a screenshot of the broken error dialog, terminal line, or confusing form and drop it in.
              </p>
            </Card>

            {/* Step 2 */}
            <Card variant="default" className="relative space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-[#18181B] border-2 border-[#27272A] flex items-center justify-center font-black text-sm text-[#22D3EE]">
                02
              </div>
              <h3 className="text-base font-bold text-[#F4F4F5]">2. Bhondu Decodes</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Vision AI inspects the visible buttons, error logs, and context to diagnose what genuinely happened.
              </p>
            </Card>

            {/* Step 3 */}
            <Card variant="default" className="relative space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-[#18181B] border-2 border-[#27272A] flex items-center justify-center font-black text-sm text-[#8B5CF6]">
                03
              </div>
              <h3 className="text-base font-bold text-[#F4F4F5]">3. Plain English Steps</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Receive 2–3 exact, numbered steps. Choose Bhondu Mode for friendly analogies or Normal Mode for concise instructions.
              </p>
            </Card>

            {/* Step 4 */}
            <Card variant="default" className="relative space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-[#18181B] border-2 border-[#27272A] flex items-center justify-center font-black text-sm text-[#FB7185]">
                04
              </div>
              <h3 className="text-base font-bold text-[#F4F4F5]">4. Verify or Loop</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Did it fix the problem? If yes, celebrate! If still cooked, drop the new screen and Bhondu adapts.
              </p>
            </Card>
          </div>
        </section>

        {/* ===================== REALISTIC EXAMPLES & DUAL MODE ===================== */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-[#F4F4F5]">
                See how Bhondu translates tech gibberish
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">
                Toggle between modes to see the real personality difference.
              </p>
            </div>

            <ModeToggle mode={demoMode} onToggle={setDemoMode} />
          </div>

          {/* Example selector tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#27272A] pb-3">
            {realisticExamples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === idx
                    ? "bg-[#18181B] text-[#C7FF3D] border-[#C7FF3D] shadow-sm"
                    : "bg-transparent text-[#A1A1AA] border-transparent hover:text-[#F4F4F5] hover:bg-[#111113]"
                }`}
              >
                {ex.category}
              </button>
            ))}
          </div>

          {/* Active Example Showcase Card */}
          <Card variant="elevated" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Raw Error */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#A1A1AA] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FB7185]" />
                    What you saw on screen
                  </span>
                  <span className="text-[11px] font-mono text-[#71717A]">
                    {realisticExamples[activeTab].category}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A] font-mono text-xs text-[#FB7185] break-words shadow-inner">
                  {realisticExamples[activeTab].rawError}
                </div>

                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA]">
                  <span className="font-bold text-[#F4F4F5]">User context:</span> &quot;
                  {realisticExamples[activeTab].context}&quot;
                </div>
              </div>

              {/* Right Column: Bhondu Output */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#C7FF3D] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    How BhonduFix explains it ({demoMode.toUpperCase()})
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272A] text-xs sm:text-sm text-[#F4F4F5] leading-relaxed shadow-sm">
                  {demoMode === "bhondu"
                    ? realisticExamples[activeTab].bhonduExplanation
                    : realisticExamples[activeTab].normalExplanation}
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#A1A1AA]">Actionable Solution:</span>
                  {realisticExamples[activeTab].steps.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#C7FF3D] text-[#09090B] font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-[#F4F4F5]">{st.title}</p>
                        <p className="text-[#A1A1AA] mt-0.5">{st.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verification */}
                <div className="p-2.5 rounded-xl bg-[#C7FF3D]/10 border border-[#C7FF3D]/20 text-xs text-[#C7FF3D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Verification:</strong> {realisticExamples[activeTab].verification}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ===================== CATEGORIES ===================== */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#F4F4F5]">What can you drop right now?</h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg mx-auto">
              Focused strictly on high-impact errors where real users get stuck daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-[#18181B] border-2 border-[#27272A] hover:border-[#71717A] transition-all space-y-3"
              >
                <div className="p-2.5 w-fit rounded-xl bg-[#111113] border border-[#27272A]">{cat.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-[#F4F4F5]">{cat.name}</h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}

            {/* Coming soon card */}
            <div className="p-5 rounded-3xl bg-[#111113]/60 border-2 border-dashed border-[#27272A] space-y-2 flex flex-col justify-center text-center">
              <span className="text-xs font-bold text-[#A1A1AA]">More Coming Soon</span>
              <p className="text-xs text-[#71717A]">
                Payments & banking errors, tax forms, and browser extensions.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== BOTTOM CTA BANNER ===================== */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#18181B] via-[#111113] to-[#09090B] border-2 border-[#C7FF3D]/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-[#F4F4F5]">
                Stop googling Reddit threads from 2016.
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md mx-auto">
                Drop the screen. Get plain-English instructions. Fix it in 60 seconds.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/app">
                <Button variant="lime" size="lg" className="text-base sm:text-lg px-8 py-4">
                  Send a screenshot
                </Button>
              </Link>
            </div>

            <div className="text-[11px] text-[#71717A]">
              No login or credit card required
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
