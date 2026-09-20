/**
 * Safety Gate & Input Sanitization Service for BhonduFix
 * Section 7 & Section 16 of the Master Build Specification
 */

import { StepItem } from "@/lib/types";

const DANGEROUS_PATTERNS = [
  /password/i,
  /otp/i,
  /private[_\s-]?key/i,
  /api[_\s-]?key/i,
  /credit[_\s-]?card/i,
  /cvv/i,
  /format\s+[c-z]:/i,
  /rm\s+-rf\s+[\/~]/i,
  /drop\s+database/i,
  /del\s+\/f\s+\/s\s+\/q/i,
];

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+all\s+previous\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now\s+in\s+developer\s+mode/i,
  /override\s+safety/i,
  /jailbreak/i,
];

export interface SafetyCheckResult {
  isSafe: boolean;
  warnings: string[];
  requiresGate: boolean;
  sanitizedContext: string;
}

export type SafetyLevel = "safe" | "risky" | "unknown";

export interface SafetyGateEvaluation {
  level: SafetyLevel;
  title: string;
  reason: string;
  safeAlternative?: string;
  requiresExplicitConsent: boolean;
}

export function evaluateInputSafety(context: string): SafetyCheckResult {
  const warnings: string[] = [];
  let requiresGate = false;

  // 1. Check for prompt injection attempts
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(context)) {
      warnings.push("Potential instruction override detected and ignored.");
      break;
    }
  }

  // 2. Check for sensitive credential inquiries or destructive instructions
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(context)) {
      warnings.push(
        "BhonduFix will NEVER ask for passwords, OTPs, secret keys, or run destructive commands without warnings."
      );
      requiresGate = true;
      break;
    }
  }

  return {
    isSafe: warnings.length === 0,
    warnings,
    requiresGate,
    sanitizedContext: context.slice(0, 1000), // Enforce length boundary
  };
}

export function evaluateSafetyGate(
  problem: string,
  steps: StepItem[],
  warnings: string[],
  confidence: number
): SafetyGateEvaluation {
  // If confidence is too low or problem is ambiguous, mark as unknown
  if (confidence < 50 || problem.toLowerCase().includes("insufficient") || problem.toLowerCase().includes("unknown")) {
    return {
      level: "unknown",
      title: "Ambiguous Situation — Safety Unverifiable",
      reason:
        "BhonduFix cannot guarantee safety because the error context is ambiguous or incomplete. Potentially risky actions are blocked until full context is provided.",
      requiresExplicitConsent: false,
    };
  }

  // Check for destructive commands in instructions or warnings
  const combinedText = [
    problem,
    ...warnings,
    ...steps.map((s) => `${s.title} ${s.instruction}`),
  ].join(" ").toLowerCase();

  const isDestructive =
    /rm\s+-rf|del\s+\/|format\s+[c-z]:|diskpart|drop\s+database|clean\s+install|factory\s+reset|registry|regedit|chmod\s+777|disable\s+firewall|taskkill\s+\/f/i.test(
      combinedText
    );

  if (isDestructive) {
    return {
      level: "risky",
      title: "Caution: Potentially Risky Action",
      reason:
        "This fix modifies system configuration, terminates system processes, or permanently removes files. A mistake could cause data loss.",
      safeAlternative:
        "Ensure you have a current backup of your work. Alternatively, verify process IDs before force-killing or test in a non-production directory.",
      requiresExplicitConsent: true,
    };
  }

  // Otherwise safe
  return {
    level: "safe",
    title: "Safe & Reversible Action",
    reason:
      "This solution uses standard, non-destructive troubleshooting steps supported by visual evidence.",
    requiresExplicitConsent: false,
  };
}

export function sanitizeAiOutputSteps(
  steps: { title: string; instruction: string }[],
  existingWarnings: string[]
): { steps: { title: string; instruction: string }[]; warnings: string[] } {
  const verifiedWarnings = [...existingWarnings];

  const sanitizedSteps = steps.map((step) => {
    if (/rm\s+-rf|del\s+\/s|diskpart|format\s+[c-z]:/i.test(step.instruction)) {
      if (!verifiedWarnings.some((w) => w.includes("destructive"))) {
        verifiedWarnings.unshift(
          "⚠️ Safety Notice: This action can delete files permanently. Ensure you have backed up important data first."
        );
      }
    }

    return {
      title: step.title.trim(),
      instruction: step.instruction.trim(),
    };
  });

  return {
    steps: sanitizedSteps,
    warnings: verifiedWarnings,
  };
}
