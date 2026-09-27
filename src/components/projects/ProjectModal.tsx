"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import {
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export default function ProjectModal({ project, onClose, onSelectProject }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "preview" | "architecture">("overview");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onSelectProject && prevProject) onSelectProject(prevProject);
      if (e.key === "ArrowRight" && onSelectProject && nextProject) onSelectProject(nextProject);
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, onSelectProject, prevProject, nextProject]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      {/* High-blur dark backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity duration-300"
      />

      {/* Pop-up Modal Window */}
      <div className="relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden animate-pop-in backdrop-blur-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={13} className="text-cyan-400" />
              {project.category}
            </span>
            <span className="text-xs text-emerald-400 font-mono hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Production Deployed
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prev / Next Switchers */}
            {onSelectProject && (
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                <button
                  onClick={() => onSelectProject(prevProject)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Previous project (←)"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => onSelectProject(nextProject)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Next project (→)"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
              >
                Open Live Site
                <ExternalLink size={13} />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Close modal (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 bg-slate-950/50 border-b border-slate-800/80 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Overview &amp; Problem
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Sparkles size={14} className="text-cyan-300" />
              Live Interactive Emulator
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Cpu size={14} className="text-cyan-300" />
              Architecture &amp; Features
            </button>
          </div>

          {/* Device switcher when on preview tab */}
          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setDeviceMode("desktop")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "desktop"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Monitor size={14} /> Desktop
              </button>
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "mobile"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Hero Banner inside Modal */}
              <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 id="modal-title" className="text-3xl sm:text-4xl font-black text-white">
                      {project.title}
                    </h2>
                    <p className="text-cyan-300 font-medium text-sm sm:text-base mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-500/30 shrink-0 self-start sm:self-auto"
                    >
                      Test Live App <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-800/90 text-cyan-300 text-xs font-mono font-medium rounded-lg border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-red-500/20">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-red-400 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    Problem Addressed
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.problem}</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/20">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-400 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Engineered Solution
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Measurable Production Impact Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/30 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Production Impact
                  </h4>
                  <p className="text-sm text-cyan-200/90 mt-1 leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-mono text-cyan-400 truncate max-w-xs sm:max-w-md">
                  {project.liveUrl}
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold shrink-0 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800"
                >
                  Open in New Window <ExternalLink size={13} />
                </a>
              </div>

              {/* Viewport Emulator Frame */}
              <div className="flex justify-center bg-slate-950/90 rounded-2xl p-4 border border-slate-800 shadow-inner">
                {deviceMode === "desktop" ? (
                  <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <iframe
                      src={project.liveUrl}
                      title={`${project.title} Desktop Preview`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  /* Mobile Device Simulator Frame */
                  <div className="relative w-[360px] h-[550px] rounded-[40px] border-4 border-slate-800 bg-slate-950 shadow-2xl overflow-hidden p-2 flex flex-col">
                    <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0" />
                    <div className="flex-1 rounded-[28px] overflow-hidden bg-slate-900">
                      <iframe
                        src={project.liveUrl}
                        title={`${project.title} Mobile Preview`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider font-bold text-white mb-3 flex items-center gap-2">
                  <Cpu size={18} className="text-cyan-400" />
                  Key Features &amp; Capabilities
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                    >
                      <CheckCircle2 size={17} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wider font-bold text-white mb-3 font-mono">
                  Multi-Tier System Architecture
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.architecture.map((layer, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-cyan-300 flex flex-col justify-between"
                    >
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">
                        Layer {idx + 1}
                      </span>
                      <span className="font-semibold text-white">{layer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Actions */}
        <div className="px-6 py-4 bg-slate-950/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
              >
                <GithubIcon size={16} /> GitHub Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25"
              >
                Launch App <ExternalLink size={14} />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Full Deep Dive Case Study
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
