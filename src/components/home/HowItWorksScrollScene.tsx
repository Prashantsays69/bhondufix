"use client";

import React from "react";
import { motion } from "framer-motion";
import { ComicSticker, HandwrittenNote, DoodleStar } from "@/components/comic/Doodles";
import { Camera, Eye, ListOrdered, CheckCircle } from "lucide-react";

export const HowItWorksScrollScene: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: <Camera className="w-6 h-6 text-[#C7FF3D]" />,
      title: "Bas Screenshot Bhe",
      tagline: "Drop it like it's hot",
      description:
        "Take a screenshot of the broken error dialog, red terminal line, or frozen portal. Paste straight from clipboard (Ctrl + V).",
      sticker: "📸 SNIP & DROP",
      stickerVariant: "lime" as const,
      accentColor: "#C7FF3D",
    },
    {
      step: "02",
      icon: <Eye className="w-6 h-6 text-[#22D3EE]" />,
      title: "Bhondu Decodes",
      tagline: "Visual OCR + Multimodal AI",
      description:
        "Bhondu inspects the visible buttons, error logs, and context in-memory to diagnose what genuinely happened.",
      sticker: "👁️ OCR VISION",
      stickerVariant: "cyan" as const,
      accentColor: "#22D3EE",
    },
    {
      step: "03",
      icon: <ListOrdered className="w-6 h-6 text-[#8B5CF6]" />,
      title: "Plain English Steps",
      tagline: "Zero technical essays",
      description:
        "Get 2–3 exact, numbered steps. Choose Bhondu Mode for hilarious analogies or Normal Mode for concise instructions.",
      sticker: "🗿 NO JARGON",
      stickerVariant: "purple" as const,
      accentColor: "#8B5CF6",
    },
    {
      step: "04",
      icon: <CheckCircle className="w-6 h-6 text-[#FB7185]" />,
      title: "Verify or Loop",
      tagline: "Evidence-based relief",
      description:
        "Did it fix the problem? If yes, celebrate! If still cooked, drop the new screen and Bhondu adapts without losing context.",
      sticker: "✅ WE ARE SO BACK",
      stickerVariant: "rose" as const,
      accentColor: "#FB7185",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2">
          <ComicSticker text="THE 4-STEP LOOP" variant="lime" rotate="-3deg" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F4F5] uppercase">
          How Bhondu Saves Your Sanity
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          No 40-page PDFs. No condescending StackOverflow moderators. Just 4 clean beats.
        </p>
      </div>

      {/* 4 Staggered Comic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, idx) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.15 } }}
            className="rounded-3xl bg-[#111113] border-2 border-[#27272A] p-6 space-y-4 relative flex flex-col justify-between shadow-[4px_4px_0_0_#18181B] hover:border-[#F4F4F5]/40 transition-colors"
          >
            {/* Top Row: Number badge + Floating Sticker */}
            <div className="flex items-center justify-between">
              <div
                style={{ borderColor: item.accentColor }}
                className="w-12 h-12 rounded-2xl bg-[#18181B] border-2 flex items-center justify-center font-mono font-black text-base text-[#F4F4F5] shadow-inner"
              >
                {item.step}
              </div>
              <ComicSticker
                text={item.sticker}
                variant={item.stickerVariant}
                rotate={idx % 2 === 0 ? "-4deg" : "4deg"}
              />
            </div>

            {/* Icon + Title */}
            <div className="space-y-2">
              <div className="p-3 w-fit rounded-2xl bg-[#18181B] border border-[#27272A]">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-[#F4F4F5] tracking-tight">{item.title}</h3>
              <p className="text-[11px] font-mono font-semibold" style={{ color: item.accentColor }}>
                {item.tagline}
              </p>
              <p className="text-xs text-[#A1A1AA] leading-relaxed pt-1">{item.description}</p>
            </div>

            {/* Footer accent note */}
            <div className="pt-2 border-t border-[#27272A]/50 flex items-center justify-between text-[10px] text-[#71717A]">
              <span>Step {idx + 1} of 4</span>
              <DoodleStar size={14} color={item.accentColor} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
