"use client";

import React, { useState } from "react";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ModeToggle } from "@/components/ui/ModeToggle";
import {
  AIResponseContract,
  ExplanationMode,
  MascotState,
} from "@/lib/types";
import {
  evaluateSafetyGate,
  SafetyGateEvaluation,
} from "@/lib/services/safety-service";
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  PartyPopper,
  Terminal,
} from "lucide-react";

interface ResultCardProps {
  diagnosis: AIResponseContract;
  mode: ExplanationMode;
  onModeToggle: (newMode: ExplanationMode) => void;
  onReset: () => void;
  onFollowUpSubmit?: (data: { image: string; context: string }) => void;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  diagnosis,
  mode,
  onModeToggle,
  onReset,
  onFollowUpSubmit,
  className = "",
}) => {
  // Safety gate evaluation
  const safety: SafetyGateEvaluation = evaluateSafetyGate(
    diagnosis.problem,
    diagnosis.steps,
    diagnosis.warnings,
    diagnosis.confidence
  );

  // User acknowledgment state for risky actions
  const [userAcknowledgedRisk, setUserAcknowledgedRisk] = useState<boolean>(
    !safety.requiresExplicitConsent
  );

  // Verification loop state: null | 'yep' | 'nope'
  const [verificationFeedback, setVerificationFeedback] = useState<
    "yep" | "nope" | null
  >(null);

  // Follow-up screenshot upload state
  const [showFollowUpUpload, setShowFollowUpUpload] = useState<boolean>(false);
  const [followUpFile, setFollowUpFile] = useState<File | null>(null);
  const [followUpPreview, setFollowUpPreview] = useState<string | null>(null);
  const [followUpContext, setFollowUpContext] = useState<string>("");
  const [isSubmittingFollowUp, setIsSubmittingFollowUp] = useState<boolean>(false);

  // Copied code feedback state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isLowConfidence = diagnosis.confidence < 60 || diagnosis.need_more_context;
  const isResolved =
    verificationFeedback === "yep" ||
    diagnosis.problem.toLowerCase().includes("resolved");

  // Derive dynamic mascot state
  let activeMascot: MascotState = "detective";
  if (isResolved) {
    activeMascot = "solved";
  } else if (safety.level === "risky" && !userAcknowledgedRisk) {
    activeMascot = "warning";
  } else if (isLowConfidence || verificationFeedback === "nope") {
    activeMascot = "confused";
  } else {
    activeMascot = "detective";
  }

  const handleCopyStep = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFollowUpFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFollowUpFile(selected);
        setFollowUpPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSendFollowUp = async () => {
    if (!followUpPreview && !followUpContext.trim()) return;
    setIsSubmittingFollowUp(true);

    if (onFollowUpSubmit) {
      onFollowUpSubmit({
        image: followUpPreview || "",
        context: followUpContext.trim(),
      });
    }
  };

  return (
    <div className={`space-y-6 animate-in fade-in zoom-in-95 duration-200 ${className}`}>
      {/* 1. Header Banner & Mascot Persona */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-6 rounded-3xl bg-[#111113] border-2 border-[#27272A] shadow-lg">
        <div className="shrink-0">
          <BhonduMascot state={activeMascot} size={110} />
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <Badge
              variant={
                diagnosis.confidence >= 80
                  ? "lime"
                  : diagnosis.confidence >= 60
                  ? "cyan"
                  : "warning"
              }
              dot
            >
              {diagnosis.confidence}% Confidence
            </Badge>

            {safety.level === "risky" && (
              <Badge variant="warning">Requires Confirmation</Badge>
            )}

            {isLowConfidence && (
              <Badge variant="purple">Needs More Context</Badge>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#F4F4F5]">
            {diagnosis.problem}
          </h2>

          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            {diagnosis.explanation}
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
            <ModeToggle mode={mode} onToggle={onModeToggle} />
          </div>
        </div>
      </div>

      {/* 2. Low Confidence & Ambiguity Notice (if confidence < 60) */}
      {isLowConfidence && (
        <div className="p-5 rounded-3xl bg-[#8B5CF6]/10 border-2 border-[#8B5CF6]/30 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#A78BFA]">
            <HelpCircle className="w-5 h-5 text-[#8B5CF6] shrink-0" />
            <span>Bhondu needs more visual context</span>
          </div>
          <p className="text-xs text-[#F4F4F5] leading-relaxed">
            {diagnosis.follow_up_request ||
              "The screenshot was cropped or lacked sufficient error details to diagnose with confidence. Rather than hallucinating a fix, Bhondu needs to see more of the screen."}
          </p>
          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Upload uncropped screenshot
            </Button>
          </div>
        </div>
      )}

      {/* 3. Safety Gate Evaluation Banner (for Risky Actions) */}
      {!isLowConfidence && safety.level === "risky" && (
        <div className="p-5 rounded-3xl bg-[#FBBF24]/10 border-2 border-[#FBBF24]/40 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FBBF24] shrink-0" />
            <h3 className="text-sm font-black text-[#FBBF24] uppercase tracking-wide">
              {safety.title}
            </h3>
          </div>

          <p className="text-xs text-[#F4F4F5] leading-relaxed">
            {safety.reason}
          </p>

          {safety.safeAlternative && (
            <div className="p-3 rounded-xl bg-[#111113] border border-[#27272A] text-xs text-[#C7FF3D] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Safer Alternative: </strong>
                <span>{safety.safeAlternative}</span>
              </div>
            </div>
          )}

          {!userAcknowledgedRisk ? (
            <div className="pt-2">
              <Button
                variant="purple"
                size="sm"
                onClick={() => setUserAcknowledgedRisk(true)}
              >
                ⚠️ I understand the risk, show instructions
              </Button>
            </div>
          ) : (
            <div className="text-[11px] text-[#A1A1AA] flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF3D]" />
              <span>Risk acknowledged by user. Gated steps unlocked below.</span>
            </div>
          )}
        </div>
      )}

      {/* 4. Actionable Steps (Rendered when confident and un-gated) */}
      {!isLowConfidence && userAcknowledgedRisk && diagnosis.steps.length > 0 && (
        <div className="rounded-3xl bg-[#18181B] border-2 border-[#27272A] p-5 sm:p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="text-sm font-black uppercase text-[#F4F4F5] tracking-wide flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C7FF3D]" />
              Step-by-Step Instructions ({diagnosis.steps.length})
            </h3>
            <span className="text-[11px] text-[#A1A1AA]">Follow in order</span>
          </div>

          <div className="space-y-3">
            {diagnosis.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#111113] border border-[#27272A] space-y-2 hover:border-[#71717A] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C7FF3D] text-[#09090B] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-[#F4F4F5]">
                      {step.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyStep(step.instruction, idx)}
                    aria-label={copiedIndex === idx ? `Copied step ${idx + 1}` : `Copy instruction for step ${idx + 1}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A1A1AA] hover:text-[#C7FF3D] bg-[#18181B] px-2.5 py-1 rounded-full border border-[#27272A] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C7FF3D]"
                    title="Copy instruction"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-[#C7FF3D]" />
                        <span className="text-[#C7FF3D]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pl-0 sm:pl-8 text-xs font-mono text-[#F4F4F5] bg-[#09090B] p-3 rounded-xl border border-[#27272A]/70 break-words">
                  {step.instruction}
                </div>
              </div>
            ))}
          </div>

          {/* Verification Instruction (Section 9) */}
          {diagnosis.verification && (
            <div className="p-4 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-xs space-y-1">
              <span className="font-bold text-[#22D3EE] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                How to verify this fix
              </span>
              <p className="text-[#F4F4F5] leading-relaxed">
                {diagnosis.verification}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. Verification Loop: "Did Bhondu fix it?" */}
      {!isLowConfidence && !isResolved && (
        <div className="rounded-3xl bg-[#111113] border-2 border-[#27272A] p-6 space-y-4 text-center">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-[#F4F4F5]">
              Did Bhondu fix it?
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              Never claim “fixed” without evidence. Let us know what happened!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
            <button
              type="button"
              id="verify-fixed-btn"
              onClick={() => setVerificationFeedback("yep")}
              aria-label="Confirm problem is fixed"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-black text-sm bg-[#C7FF3D] text-[#09090B] border-2 border-[#C7FF3D] shadow-[0_4px_0_0_#84B512] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C7FF3D]"
            >
              <span>🗿</span>
              <span>Yep, fixed!</span>
            </button>

            <button
              type="button"
              id="verify-unresolved-btn"
              onClick={() => {
                setVerificationFeedback("nope");
                setShowFollowUpUpload(true);
              }}
              aria-label="Report problem is still unresolved"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-black text-sm bg-[#18181B] text-[#FB7185] border-2 border-[#FB7185]/40 hover:bg-[#FB7185]/10 active:translate-y-0.5 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FB7185]"
            >
              <span>😭</span>
              <span>Nope, still cooked</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Success Celebration State (🗿 Yep clicked or diagnosed as resolved) */}
      {isResolved && (
        <div className="p-8 rounded-3xl bg-[#C7FF3D]/10 border-2 border-[#C7FF3D]/40 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#C7FF3D] text-[#09090B] flex items-center justify-center mx-auto shadow-lg shadow-[#C7FF3D]/20">
            <PartyPopper className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#F4F4F5]">
              Bhondu fixed it! 🗿
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
              No technical essays. No condescending forum replies. Your system is back in action.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="lime"
              size="md"
              onClick={onReset}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Troubleshoot another error
            </Button>
          </div>
        </div>
      )}

      {/* 7. Follow-up Screenshot Intake Loop (😭 Nope clicked) */}
      {showFollowUpUpload && !isResolved && (
        <div className="rounded-3xl bg-[#18181B] border-2 border-[#8B5CF6]/50 p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <h3 className="text-sm font-bold text-[#F4F4F5]">
                Send Follow-up Screenshot
              </h3>
            </div>
            <button
              onClick={() => setShowFollowUpUpload(false)}
              className="text-xs text-[#A1A1AA] hover:text-white"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Take a screenshot of the new screen or remaining error message so Bhondu can determine whether the previous step worked and adapt the solution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative border-2 border-dashed border-[#27272A] hover:border-[#8B5CF6] rounded-2xl p-6 text-center bg-[#111113] cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFollowUpFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
                id="followup-screenshot-input"
              />
              <UploadCloud className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2" />
              <span className="text-xs font-bold text-[#F4F4F5] block">
                {followUpFile ? followUpFile.name : "Select new screenshot"}
              </span>
              <span className="text-[10px] text-[#71717A]">
                PNG, JPG, WebP
              </span>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="followup-context-input"
                className="text-xs font-bold text-[#A1A1AA] block"
              >
                What happened after trying the steps?
              </label>
              <textarea
                id="followup-context-input"
                value={followUpContext}
                onChange={(e) => setFollowUpContext(e.target.value)}
                placeholder="e.g. 'I ran the kill command, but it gave error code 127' or 'still cooked'"
                rows={3}
                className="w-full bg-[#111113] border-2 border-[#27272A] focus:border-[#8B5CF6] rounded-xl p-2.5 text-xs text-[#F4F4F5] placeholder-[#71717A] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFollowUpUpload(false)}
            >
              Dismiss
            </Button>

            <Button
              variant="purple"
              size="sm"
              onClick={handleSendFollowUp}
              disabled={isSubmittingFollowUp || (!followUpPreview && !followUpContext.trim())}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {isSubmittingFollowUp ? "Analyzing new state..." : "Analyze new screen 🚀"}
            </Button>
          </div>
        </div>
      )}

      {/* 8. Reset to Upload / Start Over Action */}
      <div className="pt-2 flex items-center justify-between text-xs text-[#71717A]">
        <span>Ephemeral in-memory diagnosis</span>
        <button
          onClick={onReset}
          className="text-[#A1A1AA] hover:text-[#C7FF3D] underline cursor-pointer font-medium"
        >
          ← Start new diagnosis
        </button>
      </div>
    </div>
  );
};
