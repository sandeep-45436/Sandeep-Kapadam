import type { SkillItem } from "@/data/skills";

export default function SkillBar({ skill }: { skill: SkillItem }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
        <span className="text-slate-200">{skill.name}</span>
        <span className="text-cyan-400 font-mono text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}
