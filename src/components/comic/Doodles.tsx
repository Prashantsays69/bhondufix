"use client";

import React from "react";

// Hand-drawn wavy arrow pointing in directions
export const DoodleArrow = ({
  direction = "right",
  className = "",
  color = "#C7FF3D",
  width = 60,
  height = 36,
}: {
  direction?: "right" | "left" | "down" | "curve-right" | "curve-down";
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none drop-shadow-sm ${className}`}
    >
      {direction === "right" && (
        <>
          <path
            d="M4 22 C24 14, 46 26, 68 18"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 0"
          />
          <path
            d="M58 8 L72 18 L56 28"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === "curve-right" && (
        <>
          <path
            d="M8 8 C18 32, 48 38, 70 20"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M56 12 L72 20 L66 34"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === "curve-down" && (
        <>
          <path
            d="M12 4 C14 24, 44 26, 50 36"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M36 30 L50 38 L58 24"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === "left" && (
        <>
          <path
            d="M76 22 C56 14, 34 26, 12 18"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M22 8 L8 18 L24 28"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === "down" && (
        <>
          <path
            d="M40 4 C38 18, 42 24, 40 34"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M28 24 L40 36 L52 24"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

// Comic Speech Bubble with pointy cartoon tail
export const SpeechBubble = ({
  children,
  className = "",
  tailPosition = "bottom-left",
  bg = "bg-[#18181B]",
  borderColor = "border-[#27272A]",
  textColor = "text-[#F4F4F5]",
}: {
  children: React.ReactNode;
  className?: string;
  tailPosition?: "bottom-left" | "bottom-center" | "bottom-right" | "top-left" | "top-right";
  bg?: string;
  borderColor?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={`relative inline-block px-4 py-2.5 rounded-2xl ${bg} ${borderColor} border-2 ${textColor} font-bold text-xs sm:text-sm shadow-[4px_4px_0_0_#111113] select-none ${className}`}
    >
      {children}
      {/* Speech tail SVG */}
      {tailPosition === "bottom-left" && (
        <svg
          className="absolute -bottom-3 left-6 w-4 h-3.5 fill-[#18181B] stroke-[#27272A] stroke-2 overflow-visible"
          viewBox="0 0 16 14"
        >
          <path d="M0 0 L6 14 L16 0 Z" fill="inherit" stroke="inherit" />
        </svg>
      )}
      {tailPosition === "bottom-right" && (
        <svg
          className="absolute -bottom-3 right-6 w-4 h-3.5 fill-[#18181B] stroke-[#27272A] stroke-2 overflow-visible"
          viewBox="0 0 16 14"
        >
          <path d="M0 0 L10 14 L16 0 Z" fill="inherit" stroke="inherit" />
        </svg>
      )}
      {tailPosition === "top-left" && (
        <svg
          className="absolute -top-3 left-6 w-4 h-3.5 fill-[#18181B] stroke-[#27272A] stroke-2 overflow-visible"
          viewBox="0 0 16 14"
        >
          <path d="M0 14 L6 0 L16 14 Z" fill="inherit" stroke="inherit" />
        </svg>
      )}
    </div>
  );
};

// Playful Comic Sticker
export const ComicSticker = ({
  text,
  rotate = "-3deg",
  variant = "lime",
  className = "",
}: {
  text: string;
  rotate?: string;
  variant?: "lime" | "purple" | "cyan" | "rose" | "dark";
  className?: string;
}) => {
  const variantStyles = {
    lime: "bg-[#C7FF3D] text-[#09090B] border-[#111113] shadow-[3px_3px_0_0_#111113]",
    purple: "bg-[#8B5CF6] text-[#F4F4F5] border-[#111113] shadow-[3px_3px_0_0_#111113]",
    cyan: "bg-[#22D3EE] text-[#09090B] border-[#111113] shadow-[3px_3px_0_0_#111113]",
    rose: "bg-[#FB7185] text-[#09090B] border-[#111113] shadow-[3px_3px_0_0_#111113]",
    dark: "bg-[#18181B] text-[#F4F4F5] border-[#27272A] shadow-[3px_3px_0_0_#09090B]",
  };

  return (
    <span
      style={{ transform: `rotate(${rotate})` }}
      className={`inline-flex items-center gap-1 font-black uppercase text-[11px] sm:text-xs tracking-wider px-2.5 py-1 rounded-lg border-2 select-none hover:scale-105 transition-transform duration-150 ${variantStyles[variant]} ${className}`}
    >
      {text}
    </span>
  );
};

// Marker-style Handwritten Annotation
export const HandwrittenNote = ({
  children,
  color = "#A1A1AA",
  className = "",
  rotate = "-2deg",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  rotate?: string;
}) => {
  return (
    <span
      style={{ color, transform: `rotate(${rotate})` }}
      className={`inline-block font-mono text-[11px] sm:text-xs tracking-tight select-none italic font-semibold ${className}`}
    >
      {children}
    </span>
  );
};

// Doodle Star Burst
export const DoodleStar = ({
  className = "",
  color = "#C7FF3D",
  size = 20,
}: {
  className?: string;
  color?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={`inline-block pointer-events-none select-none ${className}`}
  >
    <path d="M12 0L14.5 8.5L23.5 12L14.5 15.5L12 24L9.5 15.5L0.5 12L9.5 8.5L12 0Z" />
  </svg>
);

// Washi Tape / Tape Strip Effect
export const TapeSticker = ({
  className = "",
  color = "rgba(199, 255, 61, 0.4)",
  width = 80,
  height = 20,
  rotate = "-4deg",
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  rotate?: string;
}) => (
  <div
    style={{
      width,
      height,
      backgroundColor: color,
      transform: `rotate(${rotate})`,
    }}
    className={`backdrop-blur-xs border-y border-dashed border-black/20 pointer-events-none select-none shadow-sm ${className}`}
  />
);

// Hand-drawn Scribble Circle
export const ScribbleCircle = ({
  className = "",
  color = "#C7FF3D",
  size = 64,
}: {
  className?: string;
  color?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={`pointer-events-none select-none ${className}`}
  >
    <path
      d="M20 50 C18 25, 75 18, 85 45 C95 72, 30 88, 15 65 C5 45, 40 22, 70 20"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="2 0"
    />
  </svg>
);

// High-voltage Indian Meme Badges
export const IndianMemeBadge = ({
  type,
  className = "",
  rotate = "-3deg",
}: {
  type:
    | "arre-bhai"
    | "kya-kar-raha-hai"
    | "ye-kya-hai"
    | "degree-nahi"
    | "bas-kar"
    | "abey-ruk"
    | "so-back"
    | "jugaad"
    | "chill-bhai"
    | "kaam-ho-gaya"
    | "error-again";
  className?: string;
  rotate?: string;
}) => {
  const configs: Record<
    string,
    { text: string; bg: string; textCol: string; border: string; shadow: string }
  > = {
    "arre-bhai": {
      text: "ARRE BHAI 💀",
      bg: "bg-[#FB7185]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "kya-kar-raha-hai": {
      text: "BHAI KYA KAR RAHA HAI 💀",
      bg: "bg-[#8B5CF6]",
      textCol: "text-[#F4F4F5]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "ye-kya-hai": {
      text: "YE KYA HO RAHA HAI 😵‍💫",
      bg: "bg-[#22D3EE]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "degree-nahi": {
      text: "DEGREE NAHI SCREENSHOT BHE 📜❌",
      bg: "bg-[#C7FF3D]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "bas-kar": {
      text: "BAS KAR BHAI 😭",
      bg: "bg-[#FB7185]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "abey-ruk": {
      text: "ABEY RUK ✋",
      bg: "bg-[#FBBF24]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "so-back": {
      text: "WE ARE SO BACK 🗿",
      bg: "bg-[#C7FF3D]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "jugaad": {
      text: "JUGAAD ACTIVATED ⚡",
      bg: "bg-[#8B5CF6]",
      textCol: "text-[#F4F4F5]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "chill-bhai": {
      text: "CHILL BHAI 🧊",
      bg: "bg-[#22D3EE]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "kaam-ho-gaya": {
      text: "KAAM HO GAYA ✨",
      bg: "bg-[#C7FF3D]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
    "error-again": {
      text: "ERROR AGAIN?! 💀",
      bg: "bg-[#FB7185]",
      textCol: "text-[#09090B]",
      border: "border-[#111113]",
      shadow: "shadow-[4px_4px_0_0_#111113]",
    },
  };

  const item = configs[type] || configs["arre-bhai"];

  return (
    <span
      style={{ transform: `rotate(${rotate})` }}
      className={`inline-flex items-center gap-1.5 font-black uppercase text-xs sm:text-sm tracking-wider px-3 py-1.5 rounded-xl border-2 select-none hover:scale-110 active:scale-95 transition-all duration-150 ${item.bg} ${item.textCol} ${item.border} ${item.shadow} ${className}`}
    >
      {item.text}
    </span>
  );
};
