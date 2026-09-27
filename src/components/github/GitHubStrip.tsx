"use client";

import { profile } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function GitHubStrip() {
  return (
    <section className="border-t border-slate-800/80 bg-slate-900 py-16">
      <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Code in the open
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Explore my public repositories, architecture designs, and open-source contributions on GitHub.
          </p>
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-all shadow-lg hover:shadow-cyan-500/10 group font-semibold text-sm"
        >
          <GithubIcon size={18} className="text-cyan-400" />
          <span>github.com/sandeep-45436</span>
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
