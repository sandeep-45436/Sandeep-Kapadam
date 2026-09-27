"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** True once GSAP is registered — enables the CSS pre-hidden state safely. */
export function useGsapReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("gsap-ready");
    setReady(true);
  }, []);
  return ready;
}

/**
 * Scroll reveal: animates any child marked with .reveal inside the ref'd element.
 * Falls back to plain visibility under reduced motion.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const items = el.querySelectorAll<HTMLElement>(".reveal");
      ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      }, el);
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  return ref;
}

/** Wrapper that marks content for the section-level reveal. */
export function Reveal({ children, as: Tag = "div" }: { children: ReactNode; as?: "div" | "li" | "section" }) {
  return <Tag className="reveal">{children}</Tag>;
}
