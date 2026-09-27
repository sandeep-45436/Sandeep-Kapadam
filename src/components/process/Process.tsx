"use client";

import { processSteps } from "@/data/experience";

export default function Process() {
  return (
    <section id="process" className="section-padding bg-slate-950 border-t border-slate-800/80 relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Development{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            From architecture to production — how I design, develop, and deliver reliable software.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {processSteps.map((s) => (
            <div
              key={s.number}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/20 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  {s.number}
                </span>
                <h3 className="text-lg font-bold text-white mt-4 group-hover:text-cyan-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {s.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
