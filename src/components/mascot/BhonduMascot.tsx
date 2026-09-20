"use client";

import React from "react";
import { MascotState } from "@/lib/types";

interface BhonduMascotProps {
  state?: MascotState;
  className?: string;
  size?: number;
}

export const BhonduMascot: React.FC<BhonduMascotProps> = ({
  state = "confused",
  className = "",
  size = 140,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Bhondu mascot in ${state} state`}
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Subtle dynamic backdrop glow */}
        {state === "analyzing" && (
          <circle
            cx="80"
            cy="80"
            r="65"
            fill="#8B5CF6"
            className="animate-ping opacity-20"
          />
        )}
        {state === "solved" && (
          <circle
            cx="80"
            cy="80"
            r="65"
            fill="#C7FF3D"
            className="animate-pulse opacity-25"
          />
        )}
        {state === "warning" && (
          <circle
            cx="80"
            cy="80"
            r="65"
            fill="#FBBF24"
            className="animate-pulse opacity-20"
          />
        )}

        {/* Tiny Body & Legs */}
        <g id="body-group">
          {/* Feet */}
          <ellipse cx="68" cy="144" rx="10" ry="6" fill="#18181B" stroke="#27272A" strokeWidth="3" />
          <ellipse cx="92" cy="144" rx="10" ry="6" fill="#18181B" stroke="#27272A" strokeWidth="3" />
          
          {/* Small chunky hoodie body */}
          <path
            d="M58 116 C58 106, 102 106, 102 116 L106 138 C106 142, 54 142, 54 138 Z"
            fill="#18181B"
            stroke="#27272A"
            strokeWidth="3.5"
          />

          {/* Hoodie drawstrings with Bhondu Lime tips */}
          <line x1="74" y1="120" x2="73" y2="132" stroke="#71717A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="73" cy="133" r="2.5" fill="#C7FF3D" />
          <line x1="86" y1="120" x2="87" y2="132" stroke="#71717A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="87" cy="133" r="2.5" fill="#C7FF3D" />
        </g>

        {/* BIG HEAD (Signature Bhondu silhouette: big goofy rounded bean) */}
        <g id="head-group">
          {/* Mascot Head Shadow/Base */}
          <rect
            x="32"
            y="28"
            width="96"
            height="86"
            rx="42"
            fill="#C7FF3D"
            stroke="#111113"
            strokeWidth="4"
          />

          {/* Cheek blush spots */}
          <ellipse cx="44" cy="78" rx="6" ry="3.5" fill="#A3E635" opacity="0.6" />
          <ellipse cx="116" cy="78" rx="6" ry="3.5" fill="#A3E635" opacity="0.6" />

          {/* STATE-SPECIFIC ACCESSORIES & EXPRESSIONS */}

          {/* 1. CONFUSED STATE */}
          {state === "confused" && (
            <g id="state-confused">
              {/* Floating question mark sticker */}
              <g transform="translate(108, 14) rotate(12)">
                <rect x="0" y="0" width="26" height="26" rx="7" fill="#8B5CF6" stroke="#111113" strokeWidth="2" />
                <text x="13" y="19" fill="#F4F4F5" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
              </g>

              {/* Eyes: One big spiral/swirl, one wide eye */}
              <circle cx="58" cy="66" r="13" fill="#111113" />
              <circle cx="56" cy="63" r="4.5" fill="#FFFFFF" />
              
              {/* Spiral in right eye */}
              <circle cx="100" cy="66" r="10" fill="#111113" />
              <path
                d="M96 66 A4 4 0 0 1 103 64 A3 3 0 0 1 101 68"
                stroke="#C7FF3D"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Tilted confused mouth */}
              <path
                d="M68 88 Q78 82 92 89"
                stroke="#111113"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sweat drop on forehead */}
              <path
                d="M48 42 C48 38 52 35 52 35 C52 35 56 38 56 42 C56 44.5 54.2 46 52 46 C49.8 46 48 44.5 48 42 Z"
                fill="#22D3EE"
                stroke="#111113"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* 2. ANALYZING STATE */}
          {state === "analyzing" && (
            <g id="state-analyzing">
              {/* Tech Visor / Scanner across eyes */}
              <rect
                x="40"
                y="54"
                width="80"
                height="24"
                rx="8"
                fill="#111113"
                stroke="#8B5CF6"
                strokeWidth="3"
              />
              {/* Cyan scanning radar line */}
              <rect
                x="44"
                y="63"
                width="72"
                height="5"
                rx="2"
                fill="#22D3EE"
                className="animate-pulse"
              />
              <circle cx="80" cy="65.5" r="4" fill="#C7FF3D" />

              {/* Focused small mouth */}
              <line x1="72" y1="90" x2="88" y2="90" stroke="#111113" strokeWidth="3.5" strokeLinecap="round" />

              {/* Head-mounted WiFi/Antenna */}
              <line x1="80" y1="28" x2="80" y2="14" stroke="#111113" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="80" cy="11" r="5" fill="#22D3EE" stroke="#111113" strokeWidth="2.5" />
              <path d="M72 7 C76 4 84 4 88 7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 3. DETECTIVE STATE */}
          {state === "detective" && (
            <g id="state-detective">
              {/* Detective / Sherlock Hat */}
              <path
                d="M40 32 C48 16 112 16 120 32 L132 36 C132 36 100 32 80 32 C60 32 28 36 28 36 Z"
                fill="#8B5CF6"
                stroke="#111113"
                strokeWidth="3.5"
              />
              <rect x="52" y="16" width="56" height="18" rx="6" fill="#6D28D9" stroke="#111113" strokeWidth="2.5" />
              <rect x="74" y="24" width="12" height="6" fill="#C7FF3D" />

              {/* Eyes */}
              <circle cx="60" cy="66" r="9" fill="#111113" />
              <circle cx="58" cy="64" r="3.5" fill="#FFFFFF" />
              <circle cx="98" cy="66" r="9" fill="#111113" />
              <circle cx="96" cy="64" r="3.5" fill="#FFFFFF" />

              {/* Smart smirking mouth */}
              <path
                d="M72 86 Q80 94 90 87"
                stroke="#111113"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Magnifying Glass floating in hand */}
              <g transform="translate(100, 72) rotate(20)">
                <circle cx="18" cy="18" r="15" fill="rgba(34, 211, 238, 0.25)" stroke="#111113" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="11" stroke="#22D3EE" strokeWidth="2" fill="none" />
                <line x1="29" y1="29" x2="43" y2="43" stroke="#111113" strokeWidth="5" strokeLinecap="round" />
                <line x1="29" y1="29" x2="43" y2="43" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* 4. WARNING STATE */}
          {state === "warning" && (
            <g id="state-warning">
              {/* Construction / Safety Yellow Helmet */}
              <path
                d="M40 34 C44 14 116 14 120 34 Z"
                fill="#FBBF24"
                stroke="#111113"
                strokeWidth="3.5"
              />
              <path d="M34 33 L126 33" stroke="#111113" strokeWidth="4" strokeLinecap="round" />
              <line x1="79" y1="18" x2="79" y2="33" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />

              {/* Anxious / Cautious Eyes */}
              <ellipse cx="60" cy="66" rx="10" ry="12" fill="#111113" />
              <circle cx="62" cy="62" r="4" fill="#FFFFFF" />
              <ellipse cx="98" cy="66" rx="10" ry="12" fill="#111113" />
              <circle cx="100" cy="62" r="4" fill="#FFFFFF" />

              {/* Wavy nervous mouth */}
              <path
                d="M68 88 Q74 84 80 88 T92 88"
                stroke="#111113"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Caution Badge sticker */}
              <g transform="translate(14, 18) rotate(-14)">
                <polygon points="16,2 30,28 2,28" fill="#FBBF24" stroke="#111113" strokeWidth="2.5" />
                <text x="16" y="24" fill="#111113" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">!</text>
              </g>
            </g>
          )}

          {/* 5. SOLVED STATE */}
          {state === "solved" && (
            <g id="state-solved">
              {/* Cool Guy 8-bit / Thug-life style shades or party confetti */}
              <g transform="translate(42, 54)">
                <path
                  d="M0 0 H34 L28 18 H6 Z"
                  fill="#111113"
                  stroke="#C7FF3D"
                  strokeWidth="2"
                />
                <path
                  d="M42 0 H76 L70 18 H48 Z"
                  fill="#111113"
                  stroke="#C7FF3D"
                  strokeWidth="2"
                />
                <line x1="32" y1="4" x2="44" y2="4" stroke="#111113" strokeWidth="3" />
                {/* Sunglasses shine */}
                <line x1="8" y1="5" x2="22" y2="15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="5" x2="64" y2="15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Big Happy Wide Smile with tongue */}
              <path
                d="M60 84 Q80 104 100 84 Z"
                fill="#111113"
                stroke="#111113"
                strokeWidth="3"
              />
              <path
                d="M72 94 Q80 99 88 94 Z"
                fill="#FB7185"
              />

              {/* Sparkle stars */}
              <g transform="translate(18, 20)">
                <path d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z" fill="#C7FF3D" />
              </g>
              <g transform="translate(126, 32) scale(0.75)">
                <path d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z" fill="#22D3EE" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
