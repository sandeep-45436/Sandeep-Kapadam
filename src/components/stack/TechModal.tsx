"use client";

import { useEffect } from "react";
import { type TechSkill } from "@/data/skills";
import { X, ExternalLink, Cpu, CheckCircle2, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface TechModalProps {
  skill: TechSkill | null;
  onClose: () => void;
}

export default function TechModal({ skill, onClose }: TechModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (skill) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
    >
      {/* High-blur backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050811]/90 backdrop-blur-xl transition-opacity duration-300"
      />

      {/* Holographic Popup Window */}
      <div className="relative z-10 w-full max-w-xl bg-[#0b1325]/95 border border-cyan-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(56,189,248,0.25)] overflow-hidden animate-pop-modal-3d backdrop-blur-2xl">
        {/* Subtle glowing border beam */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_75deg,#38bdf8_90deg,#818cf8_105deg,transparent_130deg,transparent_360deg)] animate-border-beam opacity-30" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${
                skill.tier === "Production Lead"
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                  : skill.tier === "Core Architecture"
                  ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40"
                  : "bg-indigo-500/15 text-indigo-300 border-indigo-500/40"
              }`}
            >
              {skill.tier}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              CATEGORY: {skill.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 py-6 space-y-5">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 inline-flex">
                <Cpu size={22} />
              </span>
              {skill.name}
            </h3>
            <p className="text-sm text-cyan-300 font-medium mt-2 leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Architecture Dossier Card */}
          <div className="p-5 rounded-2xl bg-[#070e1c] border border-cyan-500/25 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-2 font-mono">
              <Zap size={14} /> Production Engineering Role
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Implemented in hardened production workloads to achieve low latency, high concurrency, and strict precision standards. Engineered with modular abstractions for seamless testability and cloud-edge synergy.
            </p>
          </div>

          {/* Project Link if available */}
          {skill.project && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                  Deployed Live In Flagship System
                </span>
                <span className="text-sm font-bold text-white">{skill.project}</span>
              </div>
              <a
                href="#projects"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
              >
                Inspect Project <ArrowRight size={13} />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
