"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { MascotState, ExplanationMode, AIResponseContract } from "@/lib/types";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Bug,
  RefreshCw,
} from "lucide-react";

export default function FoundationTestPage() {
  // Mascot state demo
  const [mascotState, setMascotState] = useState<MascotState>("confused");
  const [mode, setMode] = useState<ExplanationMode>("bhondu");

  // API Verification demo state
  const [apiTesting, setApiTesting] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<AIResponseContract | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const testApiStructure = async () => {
    setApiTesting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          context: "Testing port 3000 in use",
          mode: mode,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const data: AIResponseContract = await res.json();
      setApiResult(data);
      setMascotState("solved");
    } catch (err: any) {
      setApiError(err.message || "Failed to verify API");
      setMascotState("warning");
    } finally {
      setApiTesting(false);
    }
  };

  const mascotStates: { state: MascotState; label: string; badgeVariant: "purple" | "cyan" | "lime" | "warning" | "error" }[] = [
    { state: "confused", label: "Confused", badgeVariant: "purple" },
    { state: "analyzing", label: "Analyzing", badgeVariant: "cyan" },
    { state: "detective", label: "Detective", badgeVariant: "purple" },
    { state: "warning", label: "Warning", badgeVariant: "warning" },
    { state: "solved", label: "Solved", badgeVariant: "lime" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 space-y-12">
        {/* Foundation Hero Header */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-bold text-[#A1A1AA]">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-pulse"></span>
            Milestone 1 — Foundation Playground
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#F4F4F5]">
            Bas screenshot bhe <span className="text-[#C7FF3D]">🚀</span>
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Design tokens, typography, mascot states, component system, and structured AI response contract established.
          </p>
        </section>

        {/* 1. Mascot States System */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C7FF3D]" />
                Bhondu Mascot States
              </h2>
              <p className="text-xs text-[#A1A1AA]">
                Specification Section 11: 5 canonical mascot states (confused, analyzing, detective, warning, solved).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {mascotStates.map((item) => (
                <button
                  key={item.state}
                  onClick={() => setMascotState(item.state)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    mascotState === item.state
                      ? "bg-[#C7FF3D] text-[#09090B] border-[#C7FF3D] shadow-[0_2px_8px_rgba(199,255,61,0.3)]"
                      : "bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:border-[#71717A] hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Card variant="elevated" className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex flex-col items-center justify-center p-6 bg-[#09090B] rounded-2xl border border-[#27272A]">
              <BhonduMascot state={mascotState} size={150} />
              <div className="mt-4 text-center">
                <Badge variant={mascotStates.find((s) => s.state === mascotState)?.badgeVariant || "lime"}>
                  Current: {mascotState}
                </Badge>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#F4F4F5]">Mascot Expression Matrix</h3>
                <p className="text-xs text-[#A1A1AA]">
                  The mascot dynamically shifts expression according to the active pipeline stage:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="font-bold text-[#A78BFA]">1. Confused:</span> Big head, spiral eye, question mark sticker for initial empty / intake state.
                </div>
                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="font-bold text-[#22D3EE]">2. Analyzing:</span> Radar antenna and visor scan line during OCR & model inference.
                </div>
                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="font-bold text-[#A78BFA]">3. Detective:</span> Sherlock hat + magnifying glass examining subtle error clues.
                </div>
                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="font-bold text-[#FBBF24]">4. Warning:</span> Safety helmet & caution badge for destructive action gates.
                </div>
                <div className="sm:col-span-2 p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="font-bold text-[#C7FF3D]">5. Solved:</span> Thug-life shades and sparkle confetti when error is resolved!
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 2. Component System Showcase */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#22D3EE]" />
              UI Component System
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Specification Section 10: Chunky rounded cards, tactile buttons, sticker pills, and dual mode toggle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons & Badges */}
            <Card variant="default" sticker="Tactile UI" stickerColor="lime" className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#A1A1AA] uppercase tracking-wider">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="lime">Bas screenshot bhe</Button>
                  <Button variant="purple">Re-analyze</Button>
                  <Button variant="outline">Learn More</Button>
                  <Button variant="danger" size="sm">Cancel</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#A1A1AA] uppercase tracking-wider">Sticker Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="lime" dot>High Confidence (94%)</Badge>
                  <Badge variant="purple">Bhondu Mode</Badge>
                  <Badge variant="cyan">Terminal / Dev</Badge>
                  <Badge variant="warning">Safety Check</Badge>
                  <Badge variant="error">Critical Risk</Badge>
                </div>
              </div>
            </Card>

            {/* Mode Toggle & Brand Philosophy */}
            <Card variant="accent" sticker="Dual Persona" stickerColor="purple" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#F4F4F5]">Explanation Tone</h3>
                  <p className="text-xs text-[#A1A1AA]">Switching changes phrasing without altering technical accuracy.</p>
                </div>
                <ModeToggle mode={mode} onToggle={setMode} />
              </div>

              <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#C7FF3D]">Active Preview:</span>
                  <span className="text-[#A1A1AA] font-mono">{mode.toUpperCase()}</span>
                </div>
                <p className="text-sm text-[#F4F4F5] italic leading-relaxed">
                  {mode === "bhondu"
                    ? "“Two packages are fighting over which version they want 😭. Don't panic, just tell npm to chill with --legacy-peer-deps.”"
                    : "“The package manager detected conflicting dependency requirements between these packages. Run npm install --legacy-peer-deps to proceed.”"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
                <span>Session preference auto-preserved</span>
              </div>
            </Card>
          </div>
        </section>

        {/* 3. API Structure & AI Response Contract Verification */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#8B5CF6]" />
                API Route & Response Contract Verification
              </h2>
              <p className="text-xs text-[#A1A1AA]">
                Testing <code className="text-[#C7FF3D] font-mono">POST /api/analyze</code> with strict Zod schema validation.
              </p>
            </div>

            <Button
              variant="lime"
              onClick={testApiStructure}
              disabled={apiTesting}
              icon={<RefreshCw className={`w-4 h-4 ${apiTesting ? "animate-spin" : ""}`} />}
            >
              {apiTesting ? "Testing Schema..." : "Test /api/analyze"}
            </Button>
          </div>

          <Card variant="elevated" className="space-y-4">
            {apiError && (
              <div className="p-4 rounded-xl bg-[#FB7185]/10 border border-[#FB7185]/30 text-[#FB7185] text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>API Error: {apiError}</span>
              </div>
            )}

            {apiResult ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#27272A]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C7FF3D]" />
                    <span className="font-bold text-sm text-[#F4F4F5]">Response Contract Validated</span>
                  </div>
                  <Badge variant="lime" dot>
                    Confidence: {Math.round(apiResult.confidence * 100)}%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#A1A1AA]">Problem</span>
                    <p className="text-sm font-bold text-[#F4F4F5]">{apiResult.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#A1A1AA]">Explanation ({mode})</span>
                    <p className="text-xs text-[#F4F4F5] leading-relaxed">{apiResult.explanation}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-3">
                  <span className="text-[10px] font-black uppercase text-[#A1A1AA]">Actionable Steps</span>
                  <div className="space-y-2">
                    {apiResult.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs bg-[#111113] p-3 rounded-lg border border-[#27272A]">
                        <span className="w-5 h-5 rounded-full bg-[#C7FF3D] text-[#09090B] font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-[#F4F4F5]">{step.title}</p>
                          <p className="text-[#A1A1AA] mt-0.5">{step.instruction}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#C7FF3D]/10 border border-[#C7FF3D]/20 text-xs text-[#C7FF3D] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span><strong>Verification:</strong> {apiResult.verification}</span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <Bug className="w-8 h-8 text-[#A1A1AA] mx-auto opacity-50" />
                <p className="text-sm text-[#A1A1AA]">Click <strong>Test /api/analyze</strong> above to dispatch a payload and verify schema output.</p>
              </div>
            )}
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
