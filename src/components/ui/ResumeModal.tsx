"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";
import { X, Download, ExternalLink, Mail, Phone, MapPin, Briefcase, GraduationCap, CheckCircle2, Sparkles, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-6"
    >
      {/* High-blur backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050811]/92 backdrop-blur-2xl transition-opacity duration-300"
      />

      {/* Holographic Resume Dossier Modal */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#0b1325]/95 border border-cyan-400/50 rounded-3xl shadow-[0_0_80px_rgba(56,189,248,0.25)] overflow-hidden animate-pop-modal-3d backdrop-blur-3xl">
        {/* Animated Cyber Border Beam */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_75deg,#38bdf8_90deg,#818cf8_105deg,transparent_130deg,transparent_360deg)] animate-border-beam opacity-30" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070d1a]/95">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300">
              <FileText size={18} />
            </span>
            <div>
              <h3 className="text-lg font-black text-white">{profile.name} — Curriculum Vitae</h3>
              <p className="text-xs text-cyan-400 font-mono">{profile.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}?subject=Resume%20Inquiry%20for%20${encodeURIComponent(profile.name)}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25"
            >
              <Download size={14} /> Request Full PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Executive Summary */}
          <div className="p-5 rounded-2xl bg-[#070e1c] border border-cyan-500/25">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 flex items-center gap-2">
              <Sparkles size={14} /> Executive Technical Profile
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Full Stack &amp; AI Systems Engineer specializing in multi-agent autonomous architectures (LangGraph, Qdrant hybrid vector retrieval), zero-upload in-browser WebAssembly engineering, and reactive 3D WebGL experiences. Proven track record deploying ALITS Campus Intelligence serving 3,500+ active users.
            </p>
          </div>

          {/* Quick Contact & Telemetry */}
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <Mail size={16} className="text-cyan-400 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <Phone size={16} className="text-cyan-400 shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <MapPin size={16} className="text-cyan-400 shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <GithubIcon size={16} className="text-cyan-400 shrink-0" />
              <span>github.com/sandeep-45436</span>
            </div>
          </div>

          {/* Flagship Production Engineering */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-3 flex items-center gap-2">
              <Briefcase size={14} className="text-cyan-400" /> Flagship Production Deployments
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#070e1c] border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm">NexusIQ — Campus Intelligence &amp; Multi-Agent RAG</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">3,500+ Users</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  LangGraph cyclic routing, Qdrant hybrid vector index, BM25 sparse search, 100% citation provenance, deployed across 9 academic departments at ALITS.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070e1c] border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm">ToolForge — Privacy-First In-Browser Media Suite</span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Zero Cloud Egress</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  100% in-browser WebAssembly memory buffers, HTML5 Canvas 2D engine, instant compression with zero server egress and zero storage risk.
                </p>
              </div>
            </div>
          </div>

          {/* Core Technical Arsenal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-3 flex items-center gap-2">
              <GraduationCap size={14} className="text-cyan-400" /> Technical Arsenal
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "LangGraph Multi-Agent",
                "Qdrant Vector DB",
                "Next.js 16 (App Router)",
                "React 19",
                "TypeScript",
                "Python (FastAPI)",
                "WebAssembly (WASM)",
                "Three.js WebGL",
                "PostgreSQL",
                "Tailwind CSS v4",
                "Docker",
                "Vercel Edge",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-slate-900 text-cyan-300 text-xs font-mono rounded-lg border border-slate-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-6 py-4 bg-[#070d1a]/95 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Available for immediate contract &amp; full-time engineering roles.
          </span>
          <a
            href={`mailto:${profile.email}?subject=Interview%20Invitation%20for%20${encodeURIComponent(profile.name)}`}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25"
          >
            Direct Contact
          </a>
        </div>
      </div>
    </div>
  );
}
