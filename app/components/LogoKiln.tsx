type LogoKilnProps = {
  /** Pixel size of the square flame mark. */
  size?: number;
  className?: string;
  /** Ember stroke color; defaults to the KILN ember-orange. */
  color?: string;
};

/**
 * KILN mark — a single continuous curved line suggesting a flame/ember
 * silhouette. Abstract and geometric, thin stroke, minimal fill. Not a
 * literal cartoon flame.
 */
export default function LogoKiln({
  size = 28,
  className,
  color = "#D9663B",
}: LogoKilnProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="KILN"
      className={className}
    >
      {/* One continuous stroke: a leaning flame silhouette that curls
          back on itself — read as ember, not campfire. */}
      <path
        d="M13.2 1.6c1.1 3.4-1.9 5.3-2.7 8.1-.6 2.1.4 3.6 1.9 3.8 1.6.2 2.7-1.1 2.5-2.7 1.9 1.7 2.8 4 1.9 6.4-1 2.7-3.8 4.4-6.7 4.1-3-.3-5.4-2.7-5.6-5.7-.2-3 1.4-5.2 3.1-7.3 1.9-2.3 3.6-4.4 2.6-7.6 1.2.2 2.3.5 3 .9Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.07"
      />
    </svg>
  );
}
