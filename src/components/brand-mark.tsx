/* eslint-disable @next/next/no-img-element -- vector artwork served as-is */

/**
 * The supplied eye symbol (from BionicEyeLogoLargeWhite.ai, unaltered, original 2286 × 943
 * proportions) used as a large, low-opacity watermark in dark areas. Decorative only.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/media/brand/tbe-symbol-white.svg"
      width={2286}
      height={943}
      alt=""
      aria-hidden="true"
      decoding="async"
      loading="lazy"
      className={`brand-mark ${className}`}
    />
  );
}
