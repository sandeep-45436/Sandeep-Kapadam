export default function HeroFallback({ accent = "#d6ff4f" }: { accent?: string }) {
  return (
    <div
      role="img"
      aria-label="Abstract geometric composition representing an interactive 3D visual"
      className="relative mx-auto aspect-square w-full max-w-lg"
    >
      <div
        className="absolute inset-[12%] rotate-45 rounded-3xl border transition-transform duration-700 hover:rotate-[60deg]"
        style={{ borderColor: `${accent}66` }}
      />
      <div
        className="absolute inset-[24%] -rotate-12 rounded-full border opacity-70"
        style={{ borderColor: `${accent}44` }}
      />
      <div
        className="absolute inset-[36%] rounded-full opacity-90"
        style={{ background: `radial-gradient(circle at 35% 35%, ${accent}55, transparent 65%)` }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-muted">360° · interactive</span>
      </div>
    </div>
  );
}
