import { cx } from "@/lib/utils";

export default function SectionHeading({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cx("reveal mb-14 flex items-baseline gap-4 md:mb-20", className)}>
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="heading-display text-3xl uppercase tracking-[0.2em] md:text-4xl lg:text-5xl">{title}</h2>
      <span aria-hidden className="mt-3 hidden h-px flex-1 bg-line md:block" />
    </div>
  );
}
