import React from "react";
import { Shield, Sparkles, Terminal, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#27272A] bg-[#09090B] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-extrabold text-lg text-[#F4F4F5]">
                Bhondu<span className="text-[#C7FF3D]">Fix</span>
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] max-w-md leading-relaxed mb-4">
              Tech support for people who don’t speak tech. Drop the confusing screen, get plain-English, safe instructions, and fix your computer without an engineering degree.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#71717A]">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#FB7185] fill-[#FB7185]" />
              <span>for every confused soul on the internet</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5] mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#C7FF3D]" />
              Safety Rules
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1AA]">
              <li>✓ No passwords or OTPs ever requested</li>
              <li>✓ No auto-executing scripts</li>
              <li>✓ Safety gates before risky actions</li>
              <li>✓ Ephemeral in-memory image analysis</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5] mb-3 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#22D3EE]" />
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1AA]">
              <li>• Coding errors & dev tools</li>
              <li>• Browser & website problems</li>
              <li>• Windows & desktop settings</li>
              <li>• Android device issues</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} BhonduFix. Correctness → Safety → Clarity → Speed → Personality.</p>
        </div>
      </div>
    </footer>
  );
};
