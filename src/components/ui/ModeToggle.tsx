"use client";

import React from "react";
import { ExplanationMode } from "@/lib/types";
import { Sparkles, Terminal } from "lucide-react";

interface ModeToggleProps {
  mode: ExplanationMode;
  onToggle: (mode: ExplanationMode) => void;
  className?: string;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  mode,
  onToggle,
  className = "",
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onToggle("bhondu");
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onToggle("normal");
    }
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-[#18181B] border-2 border-[#27272A] shadow-inner select-none ${className}`}
      role="radiogroup"
      aria-label="Explanation Mode Toggle"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        role="radio"
        tabIndex={mode === "bhondu" ? 0 : -1}
        aria-checked={mode === "bhondu"}
        onClick={() => onToggle("bhondu")}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D] ${
          mode === "bhondu"
            ? "bg-[#C7FF3D] text-[#09090B] shadow-[0_2px_8px_rgba(199,255,61,0.3)]"
            : "text-[#A1A1AA] hover:text-[#F4F4F5]"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Bhondu Mode</span>
      </button>

      <button
        type="button"
        role="radio"
        tabIndex={mode === "normal" ? 0 : -1}
        aria-checked={mode === "normal"}
        onClick={() => onToggle("normal")}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
          mode === "normal"
            ? "bg-[#8B5CF6] text-white shadow-[0_2px_8px_rgba(139,92,246,0.3)]"
            : "text-[#A1A1AA] hover:text-[#F4F4F5]"
        }`}
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>Normal Mode</span>
      </button>
    </div>
  );
};
