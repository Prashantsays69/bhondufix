"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScreenshotIntake } from "@/components/intake/ScreenshotIntake";
import { ResultCard } from "@/components/results/ResultCard";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { ExplanationMode, AIResponseContract } from "@/lib/types";
import {
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function WorkspacePage() {
  const [mode, setMode] = useState<ExplanationMode>("bhondu");
  const [activeDiagnosis, setActiveDiagnosis] = useState<AIResponseContract | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeContext, setActiveContext] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReanalyzingMode, setIsReanalyzingMode] = useState<boolean>(false);

  // Initial Intake Submission Handler
  const handleIntakeSubmission = (data: {
    image: string;
    context: string;
    result: AIResponseContract;
  }) => {
    setActiveImage(data.image);
    setActiveContext(data.context);
    setActiveDiagnosis(data.result);
    setErrorMessage(null);
  };

  // Mode Toggle Handler (Dynamic tone change)
  const handleModeToggle = async (newMode: ExplanationMode) => {
    setMode(newMode);
    if (!activeDiagnosis || !activeImage) return;

    setIsReanalyzingMode(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: activeImage,
          context: activeContext,
          mode: newMode,
        }),
      });

      if (res.ok) {
        const updatedData: AIResponseContract = await res.json();
        setActiveDiagnosis(updatedData);
      }
    } catch {
      // Fallback: local mode toggle without network interruption
    } finally {
      setIsReanalyzingMode(false);
    }
  };

  // Follow-up Screenshot Submission Handler (Continuous Verification Loop)
  const handleFollowUpSubmission = async (data: {
    image: string;
    context: string;
  }) => {
    if (!activeDiagnosis) return;
    setErrorMessage(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: data.image || activeImage,
          context: data.context || "still not working",
          mode,
          previousContext: {
            problem: activeDiagnosis.problem,
            attemptedSteps: activeDiagnosis.steps.map((s) => s.title),
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `Server error (${res.status})`);
      }

      const followUpDiagnosis: AIResponseContract = await res.json();
      setActiveDiagnosis(followUpDiagnosis);
      if (data.image) setActiveImage(data.image);
      setActiveContext(data.context);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to analyze follow-up screenshot.");
    }
  };

  // Reset to initial clean state
  const handleReset = () => {
    setActiveDiagnosis(null);
    setActiveImage(null);
    setActiveContext("");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Top Breadcrumb & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#A1A1AA] hover:text-[#C7FF3D] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <ModeToggle mode={mode} onToggle={handleModeToggle} />
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-[#FB7185]/10 border-2 border-[#FB7185]/40 text-[#FB7185] text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold underline text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* State Machine: Screenshot Intake vs ResultCard */}
        {activeDiagnosis ? (
          <ResultCard
            diagnosis={activeDiagnosis}
            mode={mode}
            onModeToggle={handleModeToggle}
            onReset={handleReset}
            onFollowUpSubmit={handleFollowUpSubmission}
          />
        ) : (
          <ScreenshotIntake mode={mode} onAnalyze={handleIntakeSubmission} />
        )}

        {/* Safety & Trust Footer Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#111113] border border-[#27272A] text-xs text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C7FF3D] shrink-0" />
            <span>
              <strong>Private & ephemeral:</strong> Uploads are analyzed in-memory. Zero credentials ever requested or stored.
            </span>
          </div>
          <Link
            href="/test"
            className="text-[#A78BFA] hover:underline shrink-0 text-[11px] font-bold"
          >
            M1 Foundation Playground →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
