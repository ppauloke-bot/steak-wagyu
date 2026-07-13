import LogoKiln from "./LogoKiln";

/**
 * Closing footer — a giant display-serif statement, then the brand lockup with
 * a reservation call-to-action, over the warm ember glow.
 */
export default function ClosingFooter() {
  return (
    <footer
      id="reserve"
      className="grain relative overflow-hidden bg-char px-6 py-28 md:px-10 md:py-40"
    >
      <div className="ember-glow pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-amber/40" />
          <span className="text-[11px] font-medium uppercase tracking-eyebrow text-ash">
            The Reservation
          </span>
        </div>

        {/* Closing statement */}
        <h2 className="max-w-4xl font-display text-[13vw] font-black leading-[0.9] tracking-[-0.02em] text-bone md:text-[7rem]">
          Forty-five days
          <br />
          for four minutes<span className="text-amber">.</span>
        </h2>

        <div className="mt-24 flex flex-col gap-12 border-t border-white/10 pt-14 md:flex-row md:items-end md:justify-between">
          {/* Brand lockup */}
          <div className="flex items-center gap-4">
            <LogoKiln size={44} />
            <span className="font-display text-4xl font-medium uppercase tracking-wordmark text-bone">
              Kiln
            </span>
          </div>

          {/* Reservation CTA */}
          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="text-[11px] uppercase tracking-[0.3em] text-ash">
              Ready for the table?
            </p>
            <a
              href="mailto:reserve@kiln.dining"
              className="inline-flex items-center gap-3 rounded-[3px] bg-amber px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-char transition-opacity hover:opacity-90"
            >
              Reserve <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 text-[10px] uppercase tracking-[0.25em] text-ash/60 md:flex-row md:items-center md:justify-between">
          <span>© 2026 KILN. All rights reserved.</span>
          <span>Twelve seats · One seating nightly</span>
        </div>
      </div>
    </footer>
  );
}
