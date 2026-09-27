import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { ExternalLink, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="min-h-screen bg-slate-950 pt-24 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800/80 py-16 sm:py-20 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="container-custom relative z-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {project.duration}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="mt-2 text-xl font-medium text-cyan-400/90">{project.subtitle}</p>
          <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-300">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-slate-900 text-slate-300 text-xs font-medium rounded-lg border border-slate-800"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all"
              >
                <span>Launch Live Application</span>
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl font-semibold text-sm transition-all"
              >
                <GithubIcon size={16} />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Featured Preview Image */}
      <section className="py-12 border-b border-slate-800/80">
        <div className="container-custom">
          <div className="relative aspect-video max-h-[500px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 border-b border-slate-800/80">
        <div className="container-custom grid gap-10 md:grid-cols-2">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              The Problem
            </h2>
            <p className="leading-relaxed text-slate-300 text-base">{project.problem}</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              The Solution
            </h2>
            <p className="leading-relaxed text-slate-300 text-base">{project.solution}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-slate-800/80">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Key Features & Capabilities
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5"
              >
                <CheckCircle2 size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-16 border-b border-slate-800/80">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            System Architecture
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.architecture.map((node, i) => (
              <div
                key={node}
                className="relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:border-cyan-500/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-cyan-400">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < project.architecture.length - 1 && (
                    <span className="font-mono text-xs text-slate-500 hidden lg:inline">→ Next</span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-base text-white">{node}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Impact */}
      <section className="py-16 border-b border-slate-800/80">
        <div className="container-custom grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Technical Challenges</h2>
            <ul className="space-y-4">
              {project.challenges.map((c, i) => (
                <li
                  key={i}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-300 text-sm leading-relaxed"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Verified Impact</h2>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300 text-base leading-relaxed">
              <p>{project.impact}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Footer Nav */}
      <section className="py-16">
        <div className="container-custom flex items-center justify-between">
          <Link
            href="/#projects"
            className="text-slate-400 hover:text-white font-medium text-sm transition-colors"
          >
            ← View All Projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-lg transition-colors group"
          >
            <span>Next: {next.title}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </article>
  );
}
