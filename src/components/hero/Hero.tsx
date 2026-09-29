"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import ResumeModal from "@/components/ui/ResumeModal";
import {
  ArrowRight,
  Download,
  MapPin,
  Mail,
  Phone,
  Star,
  GitCommit,
  GitPullRequest,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleReplayBoot = () => {
    window.dispatchEvent(new Event("portfolio-replay-boot"));
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-16 bg-gradient-to-b from-[#070a13]/80 via-[#0a1020]/70 to-[#070a13]/90 relative overflow-hidden"
    >
      {/* Interactive 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 pointer-events-auto opacity-40 z-0">
        <Hero3D />
      </div>

      <div className="container-custom relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center pointer-events-auto">
          {/* Availability & Replay Boot Sequence Badges */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for opportunities
            </div>

            <button
              type="button"
              onClick={handleReplayBoot}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d162a]/90 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] active:scale-95"
              title="Re-run futuristic boot sequence (or press B)"
            >
              <RotateCcw size={12} className="text-cyan-400 animate-spin-reverse-slow" />
              Replay Intro Sequence [B]
            </button>
          </div>

          {/* Profile Photo with Rotating Gradient Ring */}
          <div className="mb-8 relative flex justify-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52">
              {/* Rotating Gradient Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 animate-spin-slow blur-[1px]" />

              {/* Inner Frame */}
              <div className="absolute inset-[4px] rounded-full bg-slate-900" />

              {/* Real Profile Image */}
              <div className="absolute inset-[8px] rounded-full overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-800">
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  width={200}
                  height={200}
                  priority
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-1 -right-1 w-11 h-11 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white text-sm font-black">✓</span>
              </div>

              {/* Ambient Floating Dots */}
              <div className="absolute -top-2 -left-2 w-3.5 h-3.5 bg-cyan-400 rounded-full animate-float-slow shadow-md shadow-cyan-400/50" />
              <div className="absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-blue-500 rounded-full animate-float-slow shadow-md shadow-blue-500/50" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          {/* Role and Tagline */}
          <p className="text-lg sm:text-2xl text-slate-300 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            {profile.title} <span className="text-cyan-400">|</span> {profile.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center gap-2 group text-base"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#0d162a]/90 hover:bg-[#152342] border border-cyan-500/30 hover:border-cyan-400/60 text-slate-100 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-md text-base shadow-[0_0_20px_rgba(56,189,248,0.1)] active:scale-95"
            >
              <Download size={18} className="text-cyan-400" /> View CV / Resume Popup
            </button>
          </div>

          {/* Contact & Location Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon size={18} /> GitHub: <span className="text-slate-300 font-mono">sandeep-45436</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-cyan-400" /> {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Mail size={18} className="text-cyan-400" /> {profile.email}
            </a>
            <a
              href="tel:9347040216"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Phone size={18} className="text-cyan-400" /> {profile.phone}
            </a>
          </div>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-[#0b1325]/75 backdrop-blur-xl rounded-2xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Stats Badges */}
          <div className="mt-8 flex justify-center flex-wrap gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2 bg-[#0b1325]/60 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
              <Star className="text-yellow-400" size={17} />
              <span className="text-slate-200 font-medium">{profile.githubStats.stars}+ Stars</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0b1325]/60 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
              <GitCommit className="text-cyan-400" size={17} />
              <span className="text-slate-200 font-medium">{profile.githubStats.commits}+ Commits</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0b1325]/60 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
              <GitPullRequest className="text-emerald-400" size={17} />
              <span className="text-slate-200 font-medium">{profile.githubStats.prs}+ PRs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic Resume Dossier Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </section>
  );
}
