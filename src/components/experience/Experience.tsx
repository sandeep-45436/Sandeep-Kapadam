"use client";

import { useState } from "react";
import { milestones, type Milestone } from "@/data/experience";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export default function Experience() {
  const [filter, setFilter] = useState<"all" | "engineering" | "education">("all");

  const filteredMilestones = milestones.filter(
    (m) => filter === "all" || m.type === filter
  );

  return (
    <section id="experience" className="section-padding bg-slate-900 border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu size={14} className="text-cyan-400" />
            Verified Career Provenance
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Experience &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Track record of designing, deploying, and leading production software systems and academic rigor.
          </p>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Flame size={14} /> Master Timeline
            </button>

            <button
              onClick={() => setFilter("engineering")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all ${
                filter === "engineering"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Briefcase size={14} /> Engineering Systems
            </button>

            <button
              onClick={() => setFilter("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all ${
                filter === "education"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <GraduationCap size={14} /> Education &amp; Honors
            </button>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Connecting Circuit Line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-blue-500 hidden sm:block opacity-40" />

          <div className="space-y-8 sm:space-y-12">
            {filteredMilestones.map((item, idx) => (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row gap-6 sm:gap-10 items-start group"
              >
                {/* Node Beacon (Desktop) */}
                <div className="hidden sm:flex relative items-center justify-center shrink-0 w-16 h-16 rounded-2xl bg-slate-950 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all z-10 mt-1">
                  {item.type === "engineering" ? (
                    <Briefcase size={22} className="text-cyan-400" />
                  ) : (
                    <GraduationCap size={22} className="text-cyan-400" />
                  )}
                  {/* Glowing core indicator */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-ping opacity-60" />
                </div>

                {/* Milestone Detail Card */}
                <div className="flex-1 w-full rounded-3xl bg-slate-950/80 border border-slate-800 group-hover:border-cyan-500/40 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 shadow-xl group-hover:shadow-2xl">
                  {/* Top Bar: Role, Org, Status & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
                            item.type === "engineering"
                              ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                              : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <MapPin size={12} /> {item.location}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-cyan-400 text-sm font-semibold mt-0.5">
                        {item.organization}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:self-start">
                      <span className="text-xs font-mono text-slate-300 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                        <Calendar size={13} className="text-cyan-400" />
                        {item.period}
                      </span>
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 text-slate-400 hover:text-slate-950 transition-colors border border-slate-800"
                          title="Open Live Platform"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Quantifiable Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                    {item.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center"
                      >
                        <p className="text-base sm:text-lg font-black text-cyan-300 font-mono">
                          {metric.value}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Deliverables & Achievements */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                      Key Engineering Deliverables:
                    </span>
                    {item.highlights.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-900 text-slate-300 text-xs font-mono rounded-lg border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
