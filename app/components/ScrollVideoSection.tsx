"use client";

import { useEffect, useRef, useState } from "react";

export type ChapterStat = { value: string; unit?: string; label: string };

export type Chapter = {
  /** Scroll progress (0–1) at which this chapter becomes active. */
  startProgress: number;
  /** Scroll progress (0–1) at which this chapter hands off to the next. */
  endProgress: number;
  /** Two-digit chapter index, e.g. "01". */
  number: string;
  /** Short uppercase eyebrow label, e.g. "THE CUT". */
  label: string;
  /** Giant display-serif word for the chapter, e.g. "Marbled." */
  word: string;
  /** One- or two-line body caption. */
  caption: string;
  /** Optional metrics strip shown bottom-right. */
  stats?: ChapterStat[];
  /** Optional CTA pill label (used on the closing chapter). */
  cta?: string;
  /** Optional anchor id for header nav. */
  anchor?: string;
};

type ScrollVideoSectionProps = {
  videoSrc: string;
  /** Optional VP9 webm source, preferred by browsers that support it. */
  videoWebm?: string;
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
 * Scroll-scrub video section (shared architecture-site component), styled as an
 * editorial cinematic ad. A tall spacer gives scroll distance; a pinned viewport
 * holds the video and drives `video.currentTime` from a smoothed rAF loop. Each
 * chapter cross-fades a giant serif word, eyebrow, body copy, an optional
 * metrics strip and CTA, plus a ghost number. A right-edge temperature gauge and
 * a bottom bar both track scrub position. Falls back to a warm ember gradient if
 * the video is unavailable.
 */
export default function ScrollVideoSection({
  videoSrc,
  videoWebm,
  containerHeightVh = 400,
  chapters,
}: ScrollVideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

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

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * 0.14;
      const p = smoothProgress.current;

      if (barRef.current) barRef.current.style.transform = `scaleX(${clamp(p, 0, 1)})`;
      if (gaugeRef.current) gaugeRef.current.style.transform = `scaleY(${clamp(p, 0, 1)})`;
      if (tempRef.current) {
        tempRef.current.textContent = `${Math.round(120 + p * 140)}°`;
      }

      const v = videoRef.current;
      if (v && v.duration && !Number.isNaN(v.duration)) {
        const t = p * (v.duration - 0.04);
        if (Math.abs(v.currentTime - t) > 0.008) {
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

  const active = chapters[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${containerHeightVh}vh` }}
    >
      {/* Anchor targets for header nav */}
      {chapters.map((c) =>
        c.anchor ? (
          <span
            key={c.anchor}
            id={c.anchor}
            className="absolute left-0"
            style={{ top: `${c.startProgress * 100}%` }}
          />
        ) : null,
      )}

      <div className="grain sticky top-0 h-screen w-full overflow-hidden bg-char">
        {/* Media layer */}
        {videoFailed ? (
          <div className="absolute inset-0 bg-char" />
        ) : (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => e.currentTarget.pause()}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Warm ember glow + cinematic scrims */}
        <div className="ember-glow pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char via-char/15 to-char/50" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_70px_rgba(11,10,9,0.75)]" />

        {/* Chapter counter, top-right under header */}
        <div className="absolute right-6 top-[92px] z-20 text-right md:right-10">
          <span className="font-sans text-[11px] tabular-nums tracking-[0.3em] text-ash">
            <span className="text-amber">{active?.number}</span>
            <span className="text-ash/50">
              {" "}
              / {chapters[chapters.length - 1]?.number}
            </span>
          </span>
        </div>

        {/* Ghost number watermark */}
        <div className="pointer-events-none absolute right-2 top-1/2 z-0 -translate-y-1/2 md:right-10">
          <span className="font-display text-[34vh] font-black leading-none text-white/[0.03]">
            {active?.number}
          </span>
        </div>

        {/* Right-edge temperature gauge */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-ash [writing-mode:vertical-rl]">
            Core Temp
          </span>
          <div className="relative h-40 w-[3px] overflow-hidden rounded-full bg-white/10">
            <div
              ref={gaugeRef}
              className="absolute inset-x-0 bottom-0 h-full origin-bottom bg-gradient-to-t from-ember to-amber will-change-transform"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          <span
            ref={tempRef}
            className="font-sans text-[11px] tabular-nums tracking-[0.15em] text-amber"
          >
            120°
          </span>
        </div>

        {/* Editorial content — one cross-fading block per chapter */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="relative mx-auto h-[52vh] max-w-[1400px] px-6 md:px-10">
            {chapters.map((chapter, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={chapter.number}
                  aria-hidden={!isActive}
                  className={`absolute inset-x-6 bottom-14 transition-all duration-[850ms] ease-out md:inset-x-10 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <div className="flex items-end justify-between gap-8">
                    {/* Left: eyebrow + giant word + body */}
                    <div className="max-w-2xl">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-[11px] font-semibold tabular-nums tracking-[0.3em] text-amber">
                          {chapter.number}
                        </span>
                        <span className="h-px w-8 bg-amber/40" />
                        <span className="text-[11px] font-medium uppercase tracking-eyebrow text-ash">
                          {chapter.label}
                        </span>
                      </div>

                      <h2 className="font-display text-[15vw] font-black leading-[0.86] tracking-[-0.02em] text-bone md:text-[8.5rem]">
                        {chapter.word}
                      </h2>

                      <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-bone/75 md:text-lg">
                        {chapter.caption}
                      </p>

                      {chapter.cta ? (
                        <a
                          href="#reserve"
                          className="mt-8 inline-flex items-center gap-3 rounded-[3px] bg-amber px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-char transition-opacity hover:opacity-90"
                        >
                          {chapter.cta}
                          <span aria-hidden>→</span>
                        </a>
                      ) : null}
                    </div>

                    {/* Right: metrics strip */}
                    {chapter.stats ? (
                      <div className="hidden shrink-0 grid-cols-3 gap-x-8 border-t border-white/10 pt-4 lg:grid">
                        {chapter.stats.map((s) => (
                          <div key={s.label} className="min-w-[84px]">
                            <div className="font-display text-3xl font-bold leading-none text-bone">
                              {s.value}
                              {s.unit ? (
                                <span className="ml-0.5 font-display text-lg italic text-amber">
                                  {s.unit}
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-2 text-[9px] uppercase tracking-[0.2em] text-ash">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom scrub bar */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-gradient-to-r from-ember to-amber will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
