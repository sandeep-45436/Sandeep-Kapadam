"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { profile, navLinks } from "@/data/profile";
import { Menu, X, ArrowUpRight, Phone, Mail, Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactModalOpen(false);
    };
    if (contactModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contactModalOpen]);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                SK
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent hidden sm:inline-block">
                {profile.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 font-medium text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Hire Me
                <ArrowUpRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-slate-200 hover:text-cyan-400 font-medium text-base py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setContactModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/20"
              >
                Hire Me
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Pop-up Quick Contact Modal */}
      {contactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          <div
            onClick={() => setContactModalOpen(false)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          <div className="relative z-10 w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20 animate-pop-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  DIRECT CONTACT
                </span>
                <h3 className="text-xl font-black text-white mt-1">Let&apos;s Build Together</h3>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {/* Phone Row */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <a
                  href="tel:9347040216"
                  className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 transition-colors text-sm font-semibold"
                >
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Phone size={17} />
                  </div>
                  <span>{profile.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText("9347040216", "phone")}
                  className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                  title="Copy Phone"
                >
                  {copied === "phone" ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Email Row */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 transition-colors text-sm font-semibold truncate"
                >
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail size={17} />
                  </div>
                  <span className="truncate">{profile.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText(profile.email, "email")}
                  className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors shrink-0"
                  title="Copy Email"
                >
                  {copied === "email" ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </div>

            {/* Jump to Form Button */}
            <a
              href="#contact"
              onClick={() => setContactModalOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
            >
              Open Full Contact Form
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
