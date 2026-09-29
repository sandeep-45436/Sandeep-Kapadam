"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

export default function GlobalCyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Generate responsive cyber particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const colors = ["#38bdf8", "#818cf8", "#a855f7", "#34d399", "#60a5fa"];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Connect particles to mouse
      if (mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (distToMouse < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const grad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y);
            grad.addColorStop(0, p.color);
            grad.addColorStop(1, "rgba(56, 189, 248, 0.9)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - distToMouse / 160) * 1.4;
            ctx.stroke();

            // Gentle magnetic attraction to cursor
            p.vx += (mouse.x - p.x) * 0.00015;
            p.vy += (mouse.y - p.y) * 0.00015;
          }
        }
      }

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently at screen edges
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Speed dampening
        p.vx = Math.max(-1.2, Math.min(1.2, p.vx * 0.995));
        p.vy = Math.max(-1.2, Math.min(1.2, p.vy * 0.995));

        p.phase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.phase) * 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
            ctx.lineWidth = (1 - dist / 110) * 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Dynamic Cursor Spotlight / Specular Glow */}
      {mousePos.x > 0 && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-75 ease-out opacity-25 blur-[120px] pointer-events-none"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: "550px",
            height: "550px",
            background: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)",
          }}
        />
      )}

      {/* Atmospheric Luminous Nebulas / Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-600/12 rounded-full blur-[150px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[170px] animate-float-drift" />
      <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[160px] animate-float-slow" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[140px] animate-float-drift" />

      {/* Holographic Matrix Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,10,19,0.5)_100%)]" />

      {/* Interactive Particle Synapse Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Sci-Fi HUD Corner Telemetry Ticks */}
      <div className="absolute top-4 left-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-cyan-500/40 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" />
        SYS://NEXUSIQ_CORE.V8
      </div>
      <div className="absolute top-4 right-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-cyan-500/40 tracking-widest uppercase">
        VECTOR_SEARCH://QDRANT_HYBRID
      </div>
      <div className="absolute bottom-4 left-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-cyan-500/40 tracking-widest uppercase">
        WASM_ENGINE://ZERO_EGRESS
      </div>
      <div className="absolute bottom-4 right-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-cyan-500/40 tracking-widest uppercase">
        STATUS://100%_OPERATIONAL
      </div>
    </div>
  );
}
