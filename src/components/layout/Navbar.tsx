"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Pill Nav Bar */}
        <div
          className={`w-full flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#09090B]/85 backdrop-blur-xl border-[#27272A] shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              : "bg-[#111113]/70 backdrop-blur-md border-[#27272A]/70 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Brand Logo & Tag */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D] rounded-full pr-2"
            aria-label="BhonduFix Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C7FF3D] flex items-center justify-center font-black text-[#09090B] text-base sm:text-lg border-2 border-[#09090B] shadow-[2px_2px_0_0_#84B512] group-hover:scale-105 group-hover:rotate-[-4deg] transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base tracking-wider uppercase text-[#F4F4F5]">
                Bhondu<span className="text-[#C7FF3D]">Fix</span>
              </span>
            </div>
          </Link>

          {/* Quick Anchor Navigation */}
          <nav aria-label="Page Sections" className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-[#A1A1AA]">
            <a
              href="#how-it-works"
              className="hover:text-[#C7FF3D] transition-colors py-1 focus-visible:outline-none focus-visible:text-[#C7FF3D]"
            >
              How It Works
            </a>
            <a
              href="#decoder"
              className="hover:text-[#C7FF3D] transition-colors py-1 focus-visible:outline-none focus-visible:text-[#C7FF3D]"
            >
              Bhondu Mode
            </a>
            <a
              href="#categories"
              className="hover:text-[#C7FF3D] transition-colors py-1 focus-visible:outline-none focus-visible:text-[#C7FF3D]"
            >
              Categories
            </a>
          </nav>

          {/* CTA Button: WORKSPACE */}
          <div className="flex items-center gap-2">
            <Link
              href="/app"
              className="group inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-black uppercase tracking-wider bg-[#C7FF3D] text-[#09090B] border-2 border-[#C7FF3D] shadow-[2px_2px_0_0_#84B512] hover:shadow-[4px_4px_0_0_#84B512] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#84B512] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#09090B] group-hover:rotate-12 transition-transform" />
              <span>Workspace</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#09090B] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
