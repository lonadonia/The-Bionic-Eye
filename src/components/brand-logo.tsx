/* eslint-disable @next/next/no-img-element -- vector logo served as-is; next/image adds nothing for SVG */

type LogoProps = {
  tone?: "ink" | "white";
  withTagline?: boolean;
  className?: string;
};

/**
 * The Bionic Eye logo, converted losslessly from the supplied BionicEyeLogoLarge*.ai artwork.
 * Lockup without tagline mirrors the header usage on thebioniceye.co.uk and the C10 datasheet;
 * the tagline lockup ("UNMANNED & UNMATCHED") is reserved for the footer sign-off.
 */
export function BrandLogo({ tone = "ink", withTagline = false, className }: LogoProps) {
  const file = withTagline ? `tbe-lockup-tagline-${tone}.svg` : `tbe-lockup-${tone}.svg`;
  const [w, h] = withTagline ? [2286, 1415] : [2286, 1240];
  return (
    <img
      src={`/media/brand/${file}`}
      width={w}
      height={h}
      alt={withTagline ? "The Bionic Eye — Unmanned & Unmatched" : "The Bionic Eye"}
      className={className}
      decoding="async"
    />
  );
}
