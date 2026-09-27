"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const steps = [
    "INITIALIZING SYSTEM CORE...",
    "BOOTING MULTI-AGENT RAG [NexusIQ]...",
    "MOUNTING IN-BROWSER WASM UTILITIES [ToolForge]...",
    "CONNECTING VECTOR GRAPHS & HYBRID SEARCH...",
    "SYSTEMS 100% OPERATIONAL",
  ];

  useEffect(() => {
    // Fast, punchy, high-impact counter ~1.8 seconds total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 300);
          setTimeout(() => setIsUnmounted(true), 1100);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 4;
        const nextVal = Math.min(prev + delta, 100);

        if (nextVal > 85) setActiveStep(4);
        else if (nextVal > 65) setActiveStep(3);
        else if (nextVal > 40) setActiveStep(2);
        else if (nextVal > 20) setActiveStep(1);

        return nextVal;
      });
    }, 45);

    // Allow user to skip immediately with ESC or Space
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        setIsDone(true);
        setTimeout(() => setIsUnmounted(true), 600);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
    >
      {/* Top Split Curtain */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-slate-950 border-b border-cyan-500/20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto ${
          isDone ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.15),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Bottom Split Curtain */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-slate-950 border-t border-cyan-500/20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto ${
          isDone ? "translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Ambient Bottom Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Main Holographic Centerpiece */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 pointer-events-auto ${
          isDone ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Laser Scanline */}
        <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm animate-scanline pointer-events-none" />

        {/* Gyroscopic Concentric Tech Rings */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-8 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-spin-slow" />
          
          {/* Middle Ring */}
          <div
            className="absolute inset-3 rounded-full border-2 border-t-cyan-400 border-r-indigo-500 border-b-transparent border-l-blue-500 animate-spin"
            style={{ animationDuration: "3s" }}
          />

          {/* Inner Glowing Center */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[1.5px] shadow-2xl shadow-cyan-500/50">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent tracking-tighter">
                SK
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400/80 -mt-0.5">
                DEV
              </span>
            </div>
          </div>

          {/* Orbiting particles */}
          <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400 animate-ping" />
        </div>

        {/* Title Identity */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider mb-1 text-center">
          SANDEEP KAPADAM
        </h1>
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-cyan-400 mb-6 text-center">
          Full Stack &amp; AI Systems Engineer
        </p>

        {/* Dynamic Equalizer Visualizer Bars */}
        <div className="flex items-center gap-1 mb-6 h-6">
          {[40, 75, 55, 90, 65, 85, 45, 95, 70, 60, 80, 50].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-cyan-300 rounded-full transition-all duration-150"
              style={{
                height: `${isDone ? 4 : Math.max(6, (h * progress) / 100)}px`,
              }}
            />
          ))}
        </div>

        {/* Progress Bar & Telemetry Box */}
        <div className="w-full max-w-md bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-2xl backdrop-blur-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-cyan-300 flex items-center gap-1.5 truncate pr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {steps[activeStep]}
            </span>
            <span className="text-lg font-black text-white font-mono">{progress}%</span>
          </div>

          {/* Glowing Progress Track */}
          <div className="w-full bg-slate-950 rounded-full h-2 p-0.5 border border-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-lg shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Quick Skip Prompt */}
          <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-500">
            <span>PRESS [ESC] OR CLICK TO SKIP</span>
            <button
              onClick={() => {
                setIsDone(true);
                setTimeout(() => setIsUnmounted(true), 500);
              }}
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors pointer-events-auto"
            >
              Skip Intro →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
