"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header role="banner" className="sticky top-0 z-40 w-full border-b border-[#27272A]/80 bg-[#09090B]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D] rounded-2xl"
          aria-label="BhonduFix Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#C7FF3D] flex items-center justify-center font-black text-[#09090B] text-xl border-2 border-[#111113] shadow-[0_3px_0_0_#84B512] group-hover:-translate-y-0.5 transition-transform">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#F4F4F5]">
                Bhondu<span className="text-[#C7FF3D]">Fix</span>
              </span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] hidden sm:block font-medium">
              Bas screenshot bhe 💀
            </p>
          </div>
        </Link>

        {/* Right Nav Elements */}
        <nav aria-label="Quick Actions" className="flex items-center gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#C7FF3D] text-[#09090B] border border-[#C7FF3D] hover:brightness-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D]"
          >
            <span>Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
