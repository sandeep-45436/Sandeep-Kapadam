export default function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent hover:text-accent">
      {label}
    </span>
  );
}
