"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import {
  BrainCircuit,
  Cpu,
  Zap,
  ShieldCheck,
  Sparkles,
  Terminal,
  Activity,
  ArrowRight,
  Phone,
  Mail,
  Fingerprint,
  Radio,
  FileCode2,
  Workflow,
  CheckCircle2,
  Layers,
  Flame,
} from "lucide-react";

export default function About() {
  const [activeMode, setActiveMode] = useState<"ai" | "wasm" | "leadership">("ai");
  const [isScanning, setIsScanning] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Interactive Neural Particle Canvas in Background of About
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const nodeCount = 38;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes within distance
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3D Card tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="section-padding bg-slate-950 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Interactive Background Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"
      />

      {/* Cyber Grid Lines Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Pulsing Glow Orbs */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Futuristic HUD Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Radio size={14} className="text-cyan-400 animate-pulse" />
            BIOMETRIC DOSSIER // DECLASSIFIED
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4">
            Engineering{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              DNA
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Autonomous multi-agent RAG orchestrator, high-performance in-browser client engineer, and university systems architect.
          </p>
        </div>

        {/* Main Sci-Fi Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Futuristic Holographic Cyber ID Card (5 cols) */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="lg:col-span-5 relative rounded-[32px] p-1 bg-gradient-to-b from-cyan-400/50 via-slate-800 to-indigo-600/40 shadow-[0_0_50px_rgba(56,189,248,0.2)]"
          >
            {/* Holographic Badge Container */}
            <div className="bg-slate-950/95 rounded-[30px] p-6 sm:p-8 backdrop-blur-2xl border border-slate-800 relative overflow-hidden">
              {/* Sci-Fi Laser Scan Line (Sweeps up and down) */}
              <div
                className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] pointer-events-none transition-opacity duration-300 ${
                  isScanning ? "opacity-100 animate-scanline" : "opacity-0"
                }`}
              />

              {/* Top HUD Telemetry */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <div className="flex items-center gap-2">
                  <Fingerprint size={20} className="text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                    ID-SPEC // 9347040216
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsScanning(!isScanning)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                >
                  {isScanning ? "SCANNING ON" : "SCAN OFF"}
                </button>
              </div>

              {/* Photo Frame with HUD Overlay */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl mb-6 group">
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Cyber HUD Targeting Corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Clearance Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    CLEARANCE: LEVEL 5 (PROD)
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-mono text-slate-400 border border-slate-700">
                    2026.09
                  </span>
                </div>
              </div>

              {/* Identity Telemetry */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="text-sm font-mono text-cyan-400 font-semibold mt-0.5 flex items-center gap-1.5">
                    <Zap size={14} className="text-cyan-400" />
                    Full Stack &amp; AI Systems Architect
                  </p>
                </div>

                {/* Direct Comms Bar */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <a
                    href="tel:9347040216"
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 transition-colors flex items-center gap-2 truncate"
                  >
                    <Phone size={14} className="text-cyan-400 shrink-0" />
                    <span className="truncate">+91 9347040216</span>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 transition-colors flex items-center gap-2 truncate"
                  >
                    <Mail size={14} className="text-cyan-400 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive System Architecture Simulator (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Mode Selector Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
              <button
                onClick={() => setActiveMode("ai")}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shrink-0 ${
                  activeMode === "ai"
                    ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <BrainCircuit size={16} />
                01. Agentic AI &amp; RAG
              </button>

              <button
                onClick={() => setActiveMode("wasm")}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shrink-0 ${
                  activeMode === "wasm"
                    ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Zap size={16} />
                02. Client-Side WASM
              </button>

              <button
                onClick={() => setActiveMode("leadership")}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shrink-0 ${
                  activeMode === "leadership"
                    ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Flame size={16} />
                03. Production Provenance
              </button>
            </div>

            {/* Mode 1: Agentic AI & RAG Pipeline Card */}
            {activeMode === "ai" && (
              <div className="rounded-3xl bg-slate-900/70 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-pop-in shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <BrainCircuit size={22} />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-white">
                        Autonomous Multi-Agent Orchestration
                      </h4>
                      <p className="text-xs font-mono text-cyan-300">SYSTEM: NexusIQ Cognitive Engine</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    &lt;35ms Latency
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  I engineer multi-agent cognitive systems using <strong>LangGraph</strong> and <strong>Qdrant Hybrid Search</strong>. Unlike standard conversational bots that hallucinate academic rules, my architecture executes hierarchical routing, citation ground-truth validation, and headless PDF slide slicing.
                </p>

                {/* Visual Pipeline Flowchart */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Live Data Pipeline Flow
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
                      <span className="text-[10px] text-slate-500 block mb-1">STAGE 1</span>
                      User Intent Query
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300">
                      <span className="text-[10px] text-slate-500 block mb-1">STAGE 2</span>
                      LangGraph Router
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
                      <span className="text-[10px] text-slate-500 block mb-1">STAGE 3</span>
                      Qdrant Vector + BM25
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300">
                      <span className="text-[10px] text-emerald-400 block mb-1">STAGE 4</span>
                      100% Grounded Citation
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Stack: LangGraph, LangChain, Qdrant, FastAPI, Next.js</span>
                  <a
                    href="#projects"
                    className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
                  >
                    View Project <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* Mode 2: Client-Side WASM Utilities */}
            {activeMode === "wasm" && (
              <div className="rounded-3xl bg-slate-900/70 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-pop-in shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Zap size={22} />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-white">
                        Zero-Server In-Browser Engineering
                      </h4>
                      <p className="text-xs font-mono text-cyan-300">SYSTEM: ToolForge Document Suite</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    100% Privacy
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Traditional compressors force users to upload confidential identity papers and bank statements to remote cloud servers. I designed ToolForge to execute <strong>100% client-side inside browser memory</strong> using WebAssembly, `pdf-lib`, and HTML5 Canvas with zero backend server egress.
                </p>

                {/* WASM Pipeline Highlights */}
                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <p className="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">Zero Latency</p>
                    <p className="text-xs text-slate-300">Instant array-buffer processing without network queue delays.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <p className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">Absolute Privacy</p>
                    <p className="text-xs text-slate-300">Files never leave the user&apos;s device RAM. Zero data theft risk.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <p className="text-xs font-mono text-indigo-400 font-bold uppercase mb-1">$0 Server Bill</p>
                    <p className="text-xs text-slate-300">Pure static compute distributed across client CPUs.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Stack: pdf-lib, HTML5 Canvas, Next.js 16, TypeScript, Web APIs</span>
                  <a
                    href="#projects"
                    className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
                  >
                    View Project <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* Mode 3: Leadership & Impact */}
            {activeMode === "leadership" && (
              <div className="rounded-3xl bg-slate-900/70 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-pop-in shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Flame size={22} />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-white">
                        Production Provenance &amp; Scale
                      </h4>
                      <p className="text-xs font-mono text-cyan-300">ALITS University Deployment</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                    3,500+ Users
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  As the primary engineering architect behind ALITS cognitive campus infrastructure, I deployed systems serving 3,500+ students and 180+ faculty members across 9 engineering departments. I balance system reliability, sub-35ms vector search response times, and multi-tier access control.
                </p>

                {/* Production Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center font-mono">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-2xl font-black text-cyan-400">3,500+</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">Students</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-2xl font-black text-indigo-400">180+</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">Faculty</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-2xl font-black text-emerald-400">9</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">Departments</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-2xl font-black text-white">0%</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">Hallucinations</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Role: Lead Full Stack &amp; AI Systems Engineer</span>
                  <a
                    href="#contact"
                    className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
                  >
                    Initiate Collaboration <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* Quick Technical Competencies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <p className="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">Frontend</p>
                <p className="text-xs text-slate-300 font-medium">Next.js 16, React 19, TypeScript, Tailwind v4</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <p className="text-xs font-mono text-indigo-400 font-bold uppercase mb-1">AI / RAG</p>
                <p className="text-xs text-slate-300 font-medium">LangGraph, Qdrant, Dense/Sparse Embeddings</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <p className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">Backend</p>
                <p className="text-xs text-slate-300 font-medium">FastAPI, Python, PostgreSQL, Node.js</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <p className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">Security</p>
                <p className="text-xs text-slate-300 font-medium">100% In-Browser WASM, Zero-Leak Buffers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
