"use client";

import { useEffect, useState } from "react";
import LogoKiln from "./LogoKiln";

const NAV_LINKS = [
  { label: "The Cut", href: "#cut" },
  { label: "The Room", href: "#room" },
  { label: "Menu", href: "#menu" },
];

/**
 * Fixed header following the architecture-site pattern: transparent over the
 * hero, then a quiet char-tinted blur once the page scrolls. KILN branded.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-char/70 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-3 group">
          <LogoKiln size={26} />
          <span className="font-display text-lg font-bold uppercase tracking-wordmark text-bone">
            Kiln
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-ash transition-colors hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserve"
          className="rounded-full border border-ember/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ember transition-colors hover:bg-ember hover:text-char"
        >
          Reserve
        </a>
      </div>
    </header>
  );
}
