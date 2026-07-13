"use client";

import { useEffect, useState } from "react";
import LogoKiln from "./LogoKiln";

const NAV = [
  { label: "The Cut", href: "#cut" },
  { label: "The Age", href: "#age" },
  { label: "The Sear", href: "#sear" },
  { label: "The Table", href: "#table" },
];

/**
 * Editorial fixed header (reference: dot + serif wordmark · centered nav ·
 * meta + bordered reservation button). Transparent over the hero, then a
 * quiet char blur with a hairline once scrolled.
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
          ? "border-b border-white/[0.06] bg-char/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5">
          <LogoKiln size={22} />
          <span className="font-display text-xl font-medium uppercase tracking-wordmark text-bone">
            Kiln
          </span>
        </a>

        {/* Center nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[11px] font-medium uppercase tracking-[0.22em] text-ash transition-colors hover:text-bone"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Meta + book */}
        <div className="flex items-center gap-5">
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-ash lg:inline">
            Tonight — 7<span className="lowercase">pm</span>
          </span>
          <a
            href="#reserve"
            className="rounded-[3px] border border-amber/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber transition-colors hover:bg-amber hover:text-char"
          >
            Reserve
          </a>
        </div>
      </div>
    </header>
  );
}
