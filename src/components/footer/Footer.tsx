import { profile, navLinks } from "@/data/profile";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
            SK
          </div>
          <div>
            <p className="text-white font-bold text-sm">{profile.name}</p>
            <p className="text-slate-400 text-xs">{profile.title}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <p suppressHydrationWarning className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <a
            href="#hero"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center gap-1.5 text-xs font-medium"
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
            <span className="hidden sm:inline">Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
