"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-slate-800 to-slate-900/60 hover:from-cyan-400/50 hover:via-indigo-500/40 hover:to-slate-800 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] flex flex-col justify-between hover:-translate-y-1.5">
      {/* Specular Inner Container */}
      <div className="bg-slate-950/90 rounded-[22px] overflow-hidden flex flex-col h-full backdrop-blur-xl border border-slate-800/80">
        {/* Project Image Container */}
        <div
          onClick={() => onOpenModal?.(project)}
          className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 cursor-pointer group/image"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover object-center group-hover/image:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Left: Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1.5 bg-slate-950/90 backdrop-blur-md rounded-full text-xs font-semibold text-cyan-300 border border-cyan-500/30 shadow-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              {project.category}
            </span>
          </div>

          {/* Top Right: External Action Icons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-950/80 backdrop-blur-md rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-700 shadow-md"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-950/80 backdrop-blur-md rounded-xl hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-all border border-cyan-500/40 shadow-md"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          {/* Hover Center Pop-up Trigger Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/50 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal?.(project);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-cyan-500/50 transition-transform hover:scale-105 active:scale-95 border border-cyan-300/40"
            >
              <Sparkles size={16} className="text-cyan-200" />
              Open Live Pop-up Emulator
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  onClick={() => onOpenModal?.(project)}
                  className="text-2xl sm:text-3xl font-black text-white hover:text-cyan-400 transition-colors cursor-pointer tracking-tight"
                >
                  {project.title}
                </h3>
                <p className="text-sm font-semibold text-cyan-400/90 mt-1">{project.subtitle}</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono shrink-0">
                ● Live
              </span>
            </div>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-slate-900/90 text-slate-300 text-xs font-mono font-medium rounded-lg border border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenModal?.(project)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Sparkles size={14} /> Quick Pop-up View
            </button>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white font-semibold text-xs sm:text-sm group/link transition-colors"
            >
              Deep Dive
              <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
