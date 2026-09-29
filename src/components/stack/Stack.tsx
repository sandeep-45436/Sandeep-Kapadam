"use client";

import { useState } from "react";
import { techSkills, type TechSkill, type SkillCategoryKey } from "@/data/skills";
import TechModal from "./TechModal";
import {
  BrainCircuit,
  Code2,
  Database,
  Cpu,
  Sparkles,
  Zap,
  ShieldCheck,
  Terminal,
  Layers,
  Search,
  CheckCircle2,
  ExternalLink,
  Flame,
  Workflow,
  FileCode2,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BrainCircuit,
  Code2,
  Database,
  Cpu,
  Sparkles,
  Zap,
  ShieldCheck,
  Terminal,
  Layers,
  Workflow,
  FileCode2,
  GitBranch,
  ArrowUpRight,
};

export default function Stack() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(null);

  const categories: { key: SkillCategoryKey; label: string; icon: React.ElementType }[] = [
    { key: "all", label: "All Systems", icon: Flame },
    { key: "ai", label: "AI & Multi-Agent RAG", icon: BrainCircuit },
    { key: "frontend", label: "Frontend & WebGL", icon: Code2 },
    { key: "wasm", label: "In-Browser WASM", icon: ShieldCheck },
    { key: "backend", label: "Backend & DB", icon: Database },
    { key: "tools", label: "DevOps & Cloud", icon: Layers },
  ];

  const filteredSkills = techSkills.filter((skill) => {
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.project && skill.project.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section-padding bg-[#070b16]/90 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        aria-hidden
        className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu size={14} className="text-cyan-400" />
            Verified Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Production{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Hardened technologies and frameworks engineered across autonomous university RAG systems and privacy-first in-browser suites. Click any technology for an architectural deep-dive popup.
          </p>
        </div>

        {/* Controls: Category Filter Tabs & Live Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-white" : "text-cyan-400"} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.iconName] || Code2;
            return (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className="group relative rounded-2xl p-5 bg-[#0b1325]/80 border border-slate-800 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Line: Icon & Tier Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors shadow-inner">
                      <Icon size={20} />
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${
                        skill.tier === "Production Lead"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : skill.tier === "Core Architecture"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                      }`}
                    >
                      {skill.tier}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <Sparkles size={14} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Tag: Featured Project */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Inspect Spec:</span>
                  <span className="text-cyan-400 font-semibold inline-flex items-center gap-1 group-hover:underline">
                    Dossier Popup
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            No technologies match &ldquo;{searchQuery}&rdquo;. Try another search term.
          </div>
        )}
      </div>

      {/* Holographic Technology Dossier Modal Popup */}
      <TechModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </section>
  );
}
