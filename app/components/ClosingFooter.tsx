import LogoKiln from "./LogoKiln";

/**
 * Closing footer following the architecture-site pattern: a large closing
 * statement, then the brand lockup with a reservation call-to-action.
 */
export default function ClosingFooter() {
  return (
    <footer id="reserve" className="relative bg-char px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        {/* Closing statement */}
        <h2
          id="menu"
          className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-bone md:text-7xl"
        >
          Forty-five days
          <br />
          <span className="text-ember">for four minutes.</span>
        </h2>

        <div className="mt-24 flex flex-col gap-12 border-t border-white/10 pt-14 md:flex-row md:items-end md:justify-between">
          {/* Brand lockup */}
          <div id="room" className="flex items-center gap-4">
            <LogoKiln size={40} />
            <span className="font-display text-3xl font-bold uppercase tracking-wordmark text-bone">
              Kiln
            </span>
          </div>

          {/* Reservation CTA */}
          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="text-sm uppercase tracking-[0.3em] text-ash">
              Ready for the table?
            </p>
            <a
              href="mailto:reserve@kiln.dining"
              className="rounded-full bg-ember px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-char transition-opacity hover:opacity-90"
            >
              Reserve
            </a>
          </div>
        </div>

        <p className="mt-20 text-xs uppercase tracking-[0.25em] text-ash/60">
          © 2026 KILN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
