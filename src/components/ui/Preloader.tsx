"use client";

import { useEffect, useState, useRef } from "react";

const BOOT_STEPS = [
  "INITIALIZING QUANTUM RUNTIME [V8+WASM]",
  "CONNECTING NEXUSIQ HYBRID VECTOR BUS [QDRANT]",
  "ALLOCATING ZERO-EGRESS MEMORY [TOOLFORGE]",
  "ENGAGING NEURAL SYNAPSE ROUTERS & LANGGRAPH",
  "SYSTEM ARCHITECTURE 100% OPERATIONAL",
];

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテト0123456789%#@$*&{}[]<>";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [displayText, setDisplayText] = useState(BOOT_STEPS[0]);
  const [isDone, setIsDone] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [telemetry, setTelemetry] = useState({ latency: "0.8ms", mem: "64MB", fps: "60" });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scramble / Decrypt text effect when step changes
  useEffect(() => {
    const target = BOOT_STEPS[activeStep];
    let iteration = 0;
    const scrambleInterval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return target[index];
            }
            if (char === " ") return " ";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(scrambleInterval);
      }
      iteration += 2;
    }, 25);

    return () => clearInterval(scrambleInterval);
  }, [activeStep]);

  const startBootSequence = () => {
    setIsDone(false);
    setIsUnmounted(false);
    setProgress(0);
    setActiveStep(0);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setIsDone(true), 350);
          setTimeout(() => setIsUnmounted(true), 1250);
          return 100;
        }

        const delta = Math.floor(Math.random() * 8) + 4;
        const nextVal = Math.min(prev + delta, 100);

        if (nextVal > 85) setActiveStep(4);
        else if (nextVal > 65) setActiveStep(3);
        else if (nextVal > 40) setActiveStep(2);
        else if (nextVal > 15) setActiveStep(1);

        setTelemetry({
          latency: `${(0.6 + (nextVal / 100) * 0.4).toFixed(1)}ms`,
          mem: `${Math.floor(48 + (nextVal / 100) * 80)}MB`,
          fps: "60",
        });

        return nextVal;
      });
    }, 40);
  };

  useEffect(() => {
    startBootSequence();

    // Listen for custom replay event from Hero or Navigation
    const handleReplay = () => {
      startBootSequence();
    };
    window.addEventListener("portfolio-replay-boot", handleReplay);

    // Keyboard shortcuts: ESC or Space to skip, 'B' to replay
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        setIsDone(true);
        setTimeout(() => setIsUnmounted(true), 500);
      } else if ((e.key === "b" || e.key === "B") && isUnmounted) {
        startBootSequence();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("portfolio-replay-boot", handleReplay);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isUnmounted) return null;

  // Circular progress calculation (r = 54, circumference = 2 * PI * 54 = ~339.29)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      role="status"
      aria-label="Loading futuristic portfolio"
      className="fixed inset-0 z-[9999] select-none overflow-hidden"
    >
      {/* Top Hydraulic Shutter Door */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#060913] border-b-2 border-cyan-400/40 transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto ${
          isDone ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.2),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Top Edge Neon Arc Flare */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8]" />
      </div>

      {/* Bottom Hydraulic Shutter Door */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#060913] border-t-2 border-cyan-400/40 transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto ${
          isDone ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Bottom Edge Neon Arc Flare */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8]" />
      </div>

      {/* Holographic Center Command Cockpit */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-500 pointer-events-auto ${
          isDone ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        {/* Laser Sweep Beam */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] animate-laser-scan-v pointer-events-none shadow-[0_0_25px_rgba(56,189,248,0.8)]" />

        {/* Ambient Shockwave Pulse upon reaching completion */}
        {progress >= 95 && (
          <div className="absolute w-72 h-72 rounded-full border border-cyan-400/50 animate-shockwave pointer-events-none" />
        )}

        {/* Gyroscopic Concentric HUD Rings */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-6 flex items-center justify-center">
          {/* Outer Dashed Radar Ring with Compass Ticks */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-cyan-500/20" />

          {/* SVG Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="text-slate-800/80 stroke-current"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="text-cyan-400 stroke-current transition-all duration-150 ease-out"
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))",
              }}
            />
          </svg>

          {/* Counter-Rotating Middle Ring */}
          <div
            className="absolute inset-5 rounded-full border-2 border-t-cyan-400 border-r-indigo-500 border-b-transparent border-l-blue-400 animate-spin-reverse-slow"
          />

          {/* Inner Hexagonal Holographic Core */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[2px] shadow-[0_0_35px_rgba(56,189,248,0.5)] animate-cyber-pulse">
            <div className="w-full h-full bg-[#080d1a] rounded-2xl flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent tracking-tighter">
                SK
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/90 -mt-1 font-bold">
                SYSTEM CORE
              </span>
            </div>
          </div>

          {/* Orbiting Quantum Photons */}
          <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
        </div>

        {/* Title Identity */}
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wider mb-1 text-center">
          SANDEEP KAPADAM
        </h1>
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-cyan-400 mb-6 text-center font-semibold">
          Full Stack &amp; AI Systems Engineer
        </p>

        {/* Dynamic 24-Band Audio-Visual Equalizer */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-6 h-8">
          {[35, 65, 45, 80, 55, 95, 70, 85, 40, 90, 75, 60, 85, 50, 95, 65, 75, 45, 90, 55, 80, 40, 70, 50].map(
            (val, idx) => (
              <div
                key={idx}
                className="w-1 bg-gradient-to-t from-blue-500 via-cyan-400 to-white rounded-full transition-all duration-100 shadow-[0_0_6px_rgba(56,189,248,0.5)]"
                style={{
                  height: `${isDone ? 4 : Math.max(5, (val * progress) / 100)}px`,
                }}
              />
            )
          )}
        </div>

        {/* Telemetry Command Box */}
        <div className="w-full max-w-lg bg-[#0b1222]/95 rounded-2xl border border-cyan-500/40 p-5 shadow-[0_0_50px_rgba(56,189,248,0.2)] backdrop-blur-2xl">
          {/* Decrypted Phase Text */}
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span className="text-cyan-300 flex items-center gap-2 truncate pr-2 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              {displayText}
            </span>
            <span className="text-xl font-black text-white font-mono shrink-0 tracking-tight">
              {progress}%
            </span>
          </div>

          {/* Dual Layer Glowing Progress Track */}
          <div className="w-full bg-slate-950 rounded-full h-2.5 p-0.5 border border-slate-800 overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_15px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Telemetry Micro Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block">LATENCY</span>
              <span className="text-cyan-400 font-bold">{telemetry.latency}</span>
            </div>
            <div className="text-center">
              <span className="text-slate-500 block">RAM ALLOCATED</span>
              <span className="text-indigo-400 font-bold">{telemetry.mem}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">GPU FRAME</span>
              <span className="text-emerald-400 font-bold">{telemetry.fps} FPS</span>
            </div>
          </div>

          {/* Quick Skip & Replay Notice */}
          <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-500">
            <span>PRESS [ESC] TO SKIP • [B] TO REPLAY</span>
            <button
              type="button"
              onClick={() => {
                setIsDone(true);
                setTimeout(() => setIsUnmounted(true), 400);
              }}
              className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors pointer-events-auto underline"
            >
              Skip Intro →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
