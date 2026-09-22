"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IndianMemeBadge, TapeSticker, DoodleStar } from "@/components/comic/Doodles";
import {
  Code2,
  Globe,
  Monitor,
  Smartphone,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Terminal,
} from "lucide-react";

interface CategoryCard {
  id: string;
  title: string;
  tag: string;
  description: string;
  examples: string[];
  icon: React.ReactNode;
  rotate: string;
  badgeType: "arre-bhai" | "ye-kya-hai" | "abey-ruk" | "jugaad" | "chill-bhai";
  accentBorder: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "coding",
    title: "CODING & DEV",
    tag: "NODE • REACT • DOCKER",
    description: "Port collisions, Next.js hydration mismatches, npm install timeouts, and broken dependencies.",
    examples: ["EADDRINUSE: :::3000", "Module not found", "Git Merge Conflict"],
    icon: <Code2 className="w-6 h-6 text-[#C7FF3D]" />,
    rotate: "-3deg",
    badgeType: "arre-bhai",
    accentBorder: "border-[#C7FF3D]",
  },
  {
    id: "browser",
    title: "BROWSER RED SCREENS",
    tag: "CHROME • CORS • SSL",
    description: "Blocked by CORS policy, ERR_CERT_AUTHORITY_INVALID, 403 Forbidden, and broken cookies.",
    examples: ["CORS Missing Header", "SSL Handshake Failed", "Localhost Refused"],
    icon: <Globe className="w-6 h-6 text-[#22D3EE]" />,
    rotate: "2.5deg",
    badgeType: "ye-kya-hai",
    accentBorder: "border-[#22D3EE]",
  },
  {
    id: "windows",
    title: "WINDOWS & SYSTEM",
    tag: "BSOD • DLL • PATH",
    description: "VCRUNTIME140.dll missing, PATH environment variables broken, or Blue Screen watchdog alerts.",
    examples: ["MSVCP140.dll missing", "'cmd' is not recognized", "Port 80 blocked"],
    icon: <Monitor className="w-6 h-6 text-[#FB7185]" />,
    rotate: "-2deg",
    badgeType: "abey-ruk",
    accentBorder: "border-[#FB7185]",
  },
  {
    id: "android",
    title: "ANDROID & MOBILE",
    tag: "GRADLE • ADB • EMULATOR",
    description: "Gradle build failed, ADB device unauthorized, SDK location not found, or memory leaks.",
    examples: ["Gradle Sync Failed", "Device Unauthorized", "JVM Out Of Memory"],
    icon: <Smartphone className="w-6 h-6 text-[#8B5CF6]" />,
    rotate: "3deg",
    badgeType: "jugaad",
    accentBorder: "border-[#8B5CF6]",
  },
  {
    id: "portals",
    title: "COLLEGE & GOVT ERP",
    tag: "CSRF • CAPTCHA • TIMEOUT",
    description: "Session expired right before 11:59 PM deadline, Captcha failed 5 times, or PDF upload error.",
    examples: ["Session Timeout 403", "Captcha Invalid", "File exceeds 100KB"],
    icon: <GraduationCap className="w-6 h-6 text-[#FBBF24]" />,
    rotate: "-1.5deg",
    badgeType: "chill-bhai",
    accentBorder: "border-[#FBBF24]",
  },
];

export const CategoriesComicScene: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="categories" className="py-20 sm:py-28 relative overflow-hidden bg-[#09090B]">
      
      {/* Top Continuous Marquee Ribbon (DesignBomb Style) */}
      <div className="w-full bg-[#C7FF3D] py-3 text-[#09090B] font-black uppercase text-xs sm:text-sm tracking-wider select-none overflow-hidden -rotate-1 shadow-comic mb-16">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>BAS SCREENSHOT BHE 💀</span>
          <span>•</span>
          <span>NO DEGREE REQUIRED</span>
          <span>•</span>
          <span>NEXT.JS • PYTHON • DOCKER • WINDOWS</span>
          <span>•</span>
          <span>ZERO CORPORATE JARGON</span>
          <span>•</span>
          <span>JUGAAD ACTIVATED ⚡</span>
          <span>•</span>
          <span>WE ARE SO BACK 🗿</span>
          <span>•</span>
          <span>BAS SCREENSHOT BHE 💀</span>
          <span>•</span>
          <span>NO DEGREE REQUIRED</span>
          <span>•</span>
          <span>NEXT.JS • PYTHON • DOCKER • WINDOWS</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#C7FF3D]">
              04 / PROBLEM CATEGORIES
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F4F5]">
            If It Shows An Error, <br />
            <span className="text-[#C7FF3D]">Bhondu Can Read It.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA]">
            An art-directed gallery of every annoying software tantrum BhonduFix solves daily.
          </p>
        </div>

        {/* Art-Directed Floating Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              whileHover={{
                scale: shouldReduceMotion ? 1 : 1.03,
                rotate: "0deg",
                transition: { duration: 0.2 },
              }}
              style={{
                transform: shouldReduceMotion ? "none" : `rotate(${cat.rotate})`,
              }}
              className={`relative rounded-3xl bg-[#111113] border-2 ${cat.accentBorder} p-6 shadow-comic-lg flex flex-col justify-between group cursor-pointer transition-shadow hover:shadow-[10px_10px_0_0_#000000]`}
            >
              {/* Tape Sticker on Top Corner */}
              <div className="absolute -top-3 right-8 pointer-events-none">
                <TapeSticker rotate="2deg" width={70} height={16} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#18181B] border-2 border-[#27272A] flex items-center justify-center shadow-comic">
                    {cat.icon}
                  </div>
                  <IndianMemeBadge type={cat.badgeType} rotate="-3deg" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#F4F4F5] tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#A1A1AA]">
                    {cat.tag}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {cat.description}
                </p>

                {/* Example Pills */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                    Common triggers:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.examples.map((ex) => (
                      <span
                        key={ex}
                        className="px-2 py-0.5 rounded-md bg-[#09090B] border border-[#27272A] text-[11px] font-mono text-[#F4F4F5]"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 mt-4 border-t border-[#27272A] flex items-center justify-between text-xs font-bold text-[#C7FF3D]">
                <span>DROP SCREENSHOT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
