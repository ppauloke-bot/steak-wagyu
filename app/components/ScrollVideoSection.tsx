"use client";

import { useEffect, useRef, useState } from "react";

export type Chapter = {
  /** Scroll progress (0–1) at which this chapter becomes active. */
  startProgress: number;
  /** Scroll progress (0–1) at which this chapter hands off to the next. */
  endProgress: number;
  /** Two-digit chapter index, e.g. "01". */
  number: string;
  /** Short uppercase label, e.g. "THE CUT". */
  label: string;
  /** One-line descriptive caption. */
  caption: string;
};

type ScrollVideoSectionProps = {
  videoSrc: string;
  /** Total scroll distance for the pinned section, in viewport heights. */
  containerHeightVh?: number;
  chapters: Chapter[];
};

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function chapterIndexFor(progress: number, chapters: Chapter[]) {
  for (let i = 0; i < chapters.length; i += 1) {
    const c = chapters[i];
    if (progress >= c.startProgress && progress < c.endProgress) return i;
  }
  return progress <= 0 ? 0 : chapters.length - 1;
}

/**
 * Scroll-scrub video section (shared architecture-site component).
 *
 * A tall spacer gives the section scroll distance; a pinned viewport holds the
 * video and drives `video.currentTime` from scroll progress via a smoothed rAF
 * loop. Numbered chapter captions cross-fade and a progress bar tracks scrub
 * position. If the video source is unavailable, a graceful ember gradient
 * stands in so the chapter timing still reads.
 */
export default function ScrollVideoSection({
  videoSrc,
  containerHeightVh = 400,
  chapters,
}: ScrollVideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  // Track scroll progress through the pinned section.
  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      targetProgress.current =
        scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Smoothed animation loop: lerp toward target, scrub video, update overlay.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * 0.12;
      const p = smoothProgress.current;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamp(p, 0, 1)})`;
      }

      const v = videoRef.current;
      if (v && v.duration && !Number.isNaN(v.duration)) {
        const t = p * (v.duration - 0.04);
        if (Math.abs(v.currentTime - t) > 0.01) {
          try {
            v.currentTime = t;
          } catch {
            /* seek can throw before the buffer is ready; ignore */
          }
        }
      }

      const idx = chapterIndexFor(p, chapters);
      setActiveIndex((prev) => (prev !== idx ? idx : prev));

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [chapters]);

  return (
    <section
      id="cut"
      ref={sectionRef}
      className="relative"
      style={{ height: `${containerHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-char">
        {/* Media layer */}
        {videoFailed ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 30% 20%, #3a1c10 0%, #1a0f0a 45%, #0a0908 100%)",
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              e.currentTarget.pause();
            }}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Cinematic vignette + bottom scrim for caption legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char via-char/10 to-char/40" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(10,9,8,0.7)]" />

        {/* Chapter counter (top-right) */}
        <div className="absolute right-6 top-24 text-right md:right-10">
          <span className="font-display text-sm tabular-nums tracking-[0.3em] text-ash">
            {chapters[activeIndex]?.number}
            <span className="text-ash/40"> / {chapters[chapters.length - 1]?.number}</span>
          </span>
        </div>

        {/* Chapter captions (bottom-left), cross-fading */}
        <div className="absolute bottom-16 left-6 right-6 md:left-10 md:max-w-2xl">
          <div className="relative h-40">
            {chapters.map((chapter, i) => {
              const active = i === activeIndex;
              return (
                <div
                  key={chapter.number}
                  aria-hidden={!active}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-5xl font-bold leading-none text-ember md:text-6xl">
                      {chapter.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-bone md:text-sm">
                      {chapter.label}
                    </span>
                  </div>
                  <p className="mt-5 max-w-xl text-lg font-light leading-snug text-bone/85 md:text-2xl">
                    {chapter.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrub progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-ember will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
