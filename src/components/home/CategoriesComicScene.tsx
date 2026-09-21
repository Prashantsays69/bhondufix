"use client";

import React from "react";
import { motion } from "framer-motion";
import { ComicSticker, HandwrittenNote, DoodleStar } from "@/components/comic/Doodles";
import { Terminal, Globe, Laptop, Smartphone, GraduationCap, PlusCircle } from "lucide-react";

export const CategoriesComicScene: React.FC = () => {
  const categories = [
    {
      icon: <Terminal className="w-6 h-6 text-[#C7FF3D]" />,
      name: "Coding & Dev Errors",
      desc: "Port collisions, npm package drama, Git rebase terror, and cryptic node backtraces.",
      accent: "#C7FF3D",
      sticker: "TOP REQUEST 💻",
      variant: "lime" as const,
      rotate: "-1.5deg",
      colSpan: "lg:col-span-4",
    },
    {
      icon: <Globe className="w-6 h-6 text-[#22D3EE]" />,
      name: "Browser & Web Glitches",
      desc: "CORS blocks, 403 Forbidden, broken cookies, and payment portal gateway timeouts.",
      accent: "#22D3EE",
      sticker: "NO PANIC 🌐",
      variant: "cyan" as const,
      rotate: "1.5deg",
      colSpan: "lg:col-span-4",
    },
    {
      icon: <Laptop className="w-6 h-6 text-[#8B5CF6]" />,
      name: "Windows & Desktop Apps",
      desc: "Missing DLL files, zombie background tasks, driver bugs, and admin permissions.",
      accent: "#8B5CF6",
      sticker: "SAFE STEPS 🪟",
      variant: "purple" as const,
      rotate: "-2deg",
      colSpan: "lg:col-span-4",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#FBBF24]" />,
      name: "Android Device Issues",
      desc: "Developer options, ADB debugging bridges, permission locks, and storage puzzles.",
      accent: "#FBBF24",
      sticker: "MOBILE 📱",
      variant: "dark" as const,
      rotate: "1deg",
      colSpan: "lg:col-span-6",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#FB7185]" />,
      name: "College Portals",
      desc: "Clunky government ERPs, registration session timeouts, and attendance gateways.",
      accent: "#FB7185",
      sticker: "11:59 PM DEADLINE 🎓",
      variant: "rose" as const,
      rotate: "-1deg",
      colSpan: "lg:col-span-6",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2">
          <ComicSticker text="WHAT CAN YOU DROP RIGHT NOW?" variant="lime" rotate="2deg" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F4F5] uppercase">
          Errors Bhondu Eats For Breakfast
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          Focused strictly on high-impact errors where real users get stuck daily.
        </p>
      </div>

      {/* Asymmetric Comic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, rotate: 0, transition: { duration: 0.15 } }}
            style={{ transform: `rotate(${cat.rotate})` }}
            className={`${cat.colSpan} rounded-3xl bg-[#111113] border-2 border-[#27272A] p-6 space-y-4 shadow-[4px_4px_0_0_#18181B] hover:border-[#F4F4F5]/40 transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <div
                style={{ borderColor: cat.accent }}
                className="p-3 rounded-2xl bg-[#18181B] border-2 shadow-inner"
              >
                {cat.icon}
              </div>
              <ComicSticker text={cat.sticker} variant={cat.variant} rotate={i % 2 === 0 ? "3deg" : "-3deg"} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-[#F4F4F5] tracking-tight">{cat.name}</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">{cat.desc}</p>
            </div>

            <div className="pt-2 border-t border-[#27272A]/50 flex items-center justify-between text-[10px] text-[#71717A] font-mono">
              <span>Ready for screenshot</span>
              <DoodleStar size={14} color={cat.accent} />
            </div>
          </motion.div>
        ))}

        {/* Coming Soon Asymmetric Tile */}
        <div className="lg:col-span-12 rounded-3xl bg-[#18181B]/40 border-2 border-dashed border-[#27272A] p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <PlusCircle className="w-5 h-5 text-[#A1A1AA]" />
          <p className="text-xs text-[#A1A1AA] font-mono">
            <strong>More coming soon:</strong> Payments & banking errors, tax forms, and browser extensions.
          </p>
        </div>
      </div>
    </section>
  );
};
