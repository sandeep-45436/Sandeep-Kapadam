"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
    const mailBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-padding bg-slate-900 border-t border-slate-800/80 relative">
      {/* Pop-up Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-2xl shadow-cyan-500/40 animate-pop-toast border border-cyan-300">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              I&apos;m actively seeking opportunities to contribute and grow. Whether you have a question or an exciting project, let&apos;s talk!
            </p>
          </div>

          <div className="bg-slate-950/80 rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-800/80 backdrop-blur-xl grid md:grid-cols-5 gap-10">
            {/* Contact Info (2 cols) */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Get in touch</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Have a role, freelance project, or collaboration in mind? Reach out directly via email, phone, or social platforms.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <div className="flex items-center justify-between group">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 text-sm transition-colors truncate"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                      <Mail size={18} />
                    </div>
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(profile.email, "email")}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy email"
                  >
                    <Copy size={14} />
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between group">
                  <a
                    href="tel:9347040216"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 text-sm transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                      <Phone size={18} />
                    </div>
                    <span>{profile.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("9347040216", "phone number")}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy phone"
                  >
                    <Copy size={14} />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <span>{profile.location}</span>
                </div>

                {/* GitHub */}
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 text-sm transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <GithubIcon size={18} />
                  </div>
                  <span>github.com/sandeep-45436</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 text-sm transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <LinkedinIcon size={18} />
                  </div>
                  <span>linkedin.com/in/sandeepkumar</span>
                </a>
              </div>
            </div>


            {/* Form (3 cols) */}
            <form onSubmit={onSubmit} suppressHydrationWarning className="md:col-span-3 space-y-4">
              {sent && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Opening your email client... Thank you for reaching out!
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    suppressHydrationWarning
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    suppressHydrationWarning
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  type="text"
                  suppressHydrationWarning
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project Collaboration / Full-Stack Role"
                  className="w-full rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  suppressHydrationWarning
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, team, or opportunity..."
                  className="w-full rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                suppressHydrationWarning
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.99]"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
