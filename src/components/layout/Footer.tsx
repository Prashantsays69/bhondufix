import React from "react";
import { Shield, Sparkles, Terminal, Heart, ExternalLink } from "lucide-react";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.76-.79 1.76-1.76a1.76 1.76 0 0 0-3.52 0c0 .97.79 1.76 1.76 1.76M5.07 18.5h2.79v-8.37H5.07v8.37z" />
  </svg>
);

const LinktreeIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className={className}>
    <path d="m13.736 5.853 4.005-4.117 2.325 2.38-4.2 4.007h5.908v3.305h-5.937l4.229 4.108-2.325 2.38-4.005-4.117v7.974h-3.472v-7.974l-4.005 4.117-2.325-2.38 4.229-4.108H2.226v-3.305h5.908l-4.2-4.007 2.325-2.38 4.005 4.117V0h3.472v5.853z" />
  </svg>
);

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

        {/* Compact BhonduFix Creator Section */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-[#111113] border-2 border-[#27272A] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#C7FF3D]/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-[#8B5CF6]/5 blur-3xl rounded-full pointer-events-none" />

          <div className="text-center md:text-left space-y-1.5 z-10">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-black text-sm sm:text-base text-[#F4F4F5] tracking-tight">
                Built by Prashant 🗿
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C7FF3D]/10 text-[#C7FF3D] border border-[#C7FF3D]/25 font-mono">
                creator
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] max-w-lg leading-relaxed">
              Made with too much caffeine, questionable debugging decisions, and AI 💀
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 z-10 w-full sm:w-auto">
            <a
              href="https://github.com/Prashantsays69"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#F4F4F5] bg-[#18181B] border border-[#27272A] hover:border-[#C7FF3D] hover:text-[#C7FF3D] hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D]"
              aria-label="Prashant's GitHub profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://instagram.com/iam_prash99"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#F4F4F5] bg-[#18181B] border border-[#27272A] hover:border-[#FB7185] hover:text-[#FB7185] hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB7185]"
              aria-label="Prashant's Instagram profile"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/in/prashant-ratnala/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#F4F4F5] bg-[#18181B] border border-[#27272A] hover:border-[#22D3EE] hover:text-[#22D3EE] hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
              aria-label="Prashant's LinkedIn profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://linktr.ee/byprash"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#F4F4F5] bg-[#18181B] border border-[#27272A] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              aria-label="Prashant's Linktree"
            >
              <LinktreeIcon className="w-3.5 h-3.5" />
              <span>Linktree</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} BhonduFix. Correctness → Safety → Clarity → Speed → Personality.</p>
        </div>
      </div>
    </footer>
  );
};
