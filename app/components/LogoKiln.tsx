import { useId } from "react";

type LogoKilnProps = {
  size?: number;
  className?: string;
};

/**
 * KILN mark — a precise, symmetric ember. An outer flame drawn as a thin
 * warm-gradient stroke with a low-fill body, a solid amber inner ember for
 * negative-space contrast, and a detached spark above the tip. Built on a
 * 24-grid so it stays crisp at any size.
 */
export default function LogoKiln({ size = 30, className }: LogoKilnProps) {
  const uid = useId().replace(/:/g, "");
  const grad = `kiln-grad-${uid}`;

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
      <defs>
        <linearGradient id={grad} x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2C078" />
          <stop offset="0.5" stopColor="#E7A24A" />
          <stop offset="1" stopColor="#D9663B" />
        </linearGradient>
      </defs>

      {/* detached spark */}
      <circle cx="12" cy="1.7" r="0.9" fill={`url(#${grad})`} />

      {/* outer flame — thin stroke, faint warm body */}
      <path
        d="M12 3.4c2.9 4.3 5.4 6.6 5.4 10.8a5.4 5.4 0 0 1-10.8 0c0-2.9 1.5-4.9 2.5-6.4 0.8 1.3 1.2 2.1 2 2.5-0.4-2.5 0-5.4 0.9-7.5Z"
        fill={`url(#${grad})`}
        fillOpacity="0.1"
        stroke={`url(#${grad})`}
        strokeWidth="1.05"
        strokeLinejoin="round"
      />

      {/* inner ember — solid */}
      <path
        d="M12 12.4c1.15 1.2 1.75 2.15 1.75 3.4a1.75 1.75 0 0 1-3.5 0c0-1.15 0.7-1.95 1.75-3.4Z"
        fill={`url(#${grad})`}
      />
    </svg>
  );
}
