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
  Maximize2,
  Minimize2,
  RotateCw,
  Copy,
  Check,
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

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

  const handleCopyUrl = () => {
    if (!project.liveUrl) return;
    navigator.clipboard.writeText(project.liveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      {/* High-blur dark backdrop with glowing cyber grid */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050811]/92 backdrop-blur-2xl transition-opacity duration-300"
      />

      {/* Pop-up Modal Holographic Command Cockpit */}
      <div
        className={`relative z-10 w-full flex flex-col bg-[#0b1325]/95 border border-cyan-400/50 rounded-3xl shadow-[0_0_80px_rgba(56,189,248,0.25)] overflow-hidden animate-pop-modal-3d backdrop-blur-3xl transition-all duration-300 ${
          isFullscreen ? "max-w-[98vw] h-[96vh]" : "max-w-5xl max-h-[92vh]"
        }`}
      >
        {/* Animated Cyber Border Beam (light tracing the perimeter) */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_75deg,#38bdf8_90deg,#818cf8_105deg,transparent_130deg,transparent_360deg)] animate-border-beam opacity-40" />
        </div>

        {/* Modal Window Top Header */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-slate-800 bg-[#070d1a]/95">
          <div className="flex items-center gap-3">
            {/* Category Tag */}
            <span className="px-3 py-1 bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
              <Zap size={13} className="text-cyan-400" />
              {project.category}
            </span>
            <span className="text-xs text-emerald-400 font-mono hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Production Live
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prev / Next Project Switchers */}
            {onSelectProject && (
              <div className="flex items-center bg-[#0e172a] border border-slate-700/80 rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={() => onSelectProject(prevProject)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Previous project (←)"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Next project (→)"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Toggle Fullscreen Expand */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors hidden sm:inline-flex"
              title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Open External Site Button */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/25"
              >
                Launch App
                <ExternalLink size={13} />
              </a>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Close modal (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 pt-3 pb-2 bg-[#060a14]/60 border-b border-slate-800/80 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Overview &amp; Problem
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Sparkles size={14} className="text-cyan-300" />
              Live Interactive Emulator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Cpu size={14} className="text-cyan-300" />
              Architecture &amp; Features
            </button>
          </div>

          {/* Device viewport toggle */}
          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center gap-1 bg-[#0e172a] border border-slate-700/80 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "desktop"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Monitor size={14} /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "mobile"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="relative z-10 flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Hero Banner inside Modal */}
              <div className="relative h-60 sm:h-76 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] via-[#070d1a]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 id="modal-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-cyan-300 font-semibold text-sm sm:text-base mt-1">
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
                    className="px-3 py-1 bg-slate-900/90 text-cyan-300 text-xs font-mono font-medium rounded-lg border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#070e1c]/90 border border-red-500/25 shadow-lg">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-red-400 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    Problem Addressed
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.problem}</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#070e1c]/90 border border-cyan-500/25 shadow-lg">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-400 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Engineered Solution
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Measurable Production Impact Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0b1428] to-cyan-950/40 border border-cyan-500/35 flex items-start gap-4 shadow-xl">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Production Impact
                  </h4>
                  <p className="text-sm text-cyan-200/95 mt-1 leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="space-y-4">
              {/* Browser Simulated Toolbar */}
              <div className="flex items-center justify-between bg-[#070d1a] p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2 truncate max-w-xs sm:max-w-md">
                  <span className="flex gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </span>
                  <span className="font-mono text-cyan-400 truncate bg-[#0d172c] px-3 py-1 rounded-lg border border-slate-800">
                    {project.liveUrl}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIframeKey((prev) => prev + 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Reload live emulator frame"
                  >
                    <RotateCw size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                    title="Copy live link"
                  >
                    {copiedUrl ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold bg-[#0d172c] px-3 py-1 rounded-lg border border-slate-800"
                  >
                    Open Tab <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="flex justify-center bg-[#060a14]/90 rounded-2xl p-4 border border-slate-800 shadow-inner">
                {deviceMode === "desktop" ? (
                  <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-[#070b16]">
                    <iframe
                      key={iframeKey}
                      src={project.liveUrl}
                      title={`${project.title} Desktop Preview`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  /* Mobile Device Simulator Frame */
                  <div className="relative w-[360px] h-[550px] rounded-[44px] border-4 border-slate-800 bg-[#070b16] shadow-2xl overflow-hidden p-2.5 flex flex-col">
                    <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block mr-1" />
                    </div>
                    <div className="flex-1 rounded-[32px] overflow-hidden bg-slate-950">
                      <iframe
                        key={iframeKey}
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
                      className="p-4 rounded-xl bg-[#070e1c]/90 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
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
                      className="p-4 rounded-xl bg-[#070e1c]/90 border border-slate-800 text-xs font-mono text-cyan-300 flex flex-col justify-between"
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
        <div className="relative z-10 px-5 sm:px-7 py-3.5 bg-[#070d1a]/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
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
