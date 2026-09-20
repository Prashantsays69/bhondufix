"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, ArrowRight } from "lucide-react";

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
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30">
                v1.0 MVP
              </span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] hidden sm:block font-medium">
              Bas screenshot bhe 🚀
            </p>
          </div>
        </Link>

        {/* Right Nav Elements */}
        <nav aria-label="Quick Actions" className="flex items-center gap-2 sm:gap-4">
          <Badge variant="cyan" size="sm" dot className="hidden md:inline-flex">
            AI Vision Online
          </Badge>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#A1A1AA] bg-[#18181B] px-3 py-1.5 rounded-full border border-[#27272A]">
            <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
            <span className="font-medium">Zero credentials stored</span>
          </div>

          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#C7FF3D] text-[#09090B] border border-[#C7FF3D] hover:brightness-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D]"
          >
            <span>Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
