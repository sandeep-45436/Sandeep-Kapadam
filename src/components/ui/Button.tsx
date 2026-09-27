import Link from "next/link";
import { cx } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "external";
  className?: string;
  external?: boolean;
};

const base =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-widest transition-colors duration-300";

const variants = {
  primary: "bg-accent text-bg hover:bg-fg",
  ghost: "border border-line text-fg hover:border-accent hover:text-accent",
  external: "border border-line text-fg hover:border-accent hover:text-accent",
};

export default function Button({ href, children, variant = "primary", className, external }: ButtonProps) {
  const cls = cx(base, variants[variant], className);
  const isExternal = external || href.startsWith("http");
  const arrow = variant !== "primary" ? "↗" : null;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span>{children}</span>
        {arrow && <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">{arrow}</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      {arrow && <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">{arrow}</span>}
    </Link>
  );
}
