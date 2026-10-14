/**
 * Brand ornaments. Three shapes drawn from The Bionic Eye's own mark without redrawing it:
 * - IrisRings: concentric lens rings with four aperture arcs, after the eye's turning crescents.
 * - WingCurve: a long sweeping line, after the wing strokes either side of the eye.
 * - WaveEdge: the same sweep used as a curved edge where a light section meets a dark one.
 * Plus DotField, a fine technical dot matrix. All are decorative (aria-hidden), carry no figures,
 * coordinates or markers, take their colour from CSS (currentColor) and never sit under body copy.
 */

type DecorProps = { className?: string };

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
};

/** Four arcs of `span` degrees on radius r, starting at `start` and every 90°. */
const aperture = (r: number, start: number, span: number) =>
  [0, 90, 180, 270].map((o) => `M ${polar(r, start + o)} A ${r} ${r} 0 0 1 ${polar(r, start + o + span)}`).join(" ");

export function IrisRings({ className = "" }: DecorProps) {
  return (
    <svg className={`decor decor-iris ${className}`} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke">
        <circle r="98" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle r="86" strokeWidth="1" strokeDasharray="1 5" vectorEffect="non-scaling-stroke" opacity="0.8" />
        <path d={aperture(70, 12, 62)} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle r="52" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.7" />
        <path d={aperture(36, 57, 48)} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle r="20" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.6" />
      </g>
      <circle r="3.5" fill="currentColor" />
    </svg>
  );
}

export function WingCurve({ className = "" }: DecorProps) {
  return (
    <svg className={`decor decor-wing ${className}`} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M-20 118 C 240 126 430 36 720 60 S 1180 138 1460 34" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d="M-20 134 C 250 140 440 56 720 78 S 1190 152 1460 54" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
    </svg>
  );
}

/**
 * Curved transition into a dark section: the band takes the colour of the section above, the
 * swept shape the colour of the section below, with a cyan line along the sweep.
 */
export function WaveEdge({ className = "", flip = false }: DecorProps & { flip?: boolean }) {
  const curve = "M0 70 C 260 70 470 10 760 10 S 1210 54 1440 26";
  return (
    <div className={`wave-edge ${flip ? "wave-edge--flip" : ""} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
        <path className="wave-edge__fill" d={`${curve} L1440 96 L0 96 Z`} />
        <path className="wave-edge__line" d={curve} fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/**
 * The hero's lower edge: the wing sweep cut across the bottom of the film. Below the curve is the
 * colour of the next section; a cyan line (with a fainter second line, like the mark's paired
 * strokes) runs along it and draws itself once on arrival (CSS only; static with reduced motion).
 */
export function HeroWave({ className = "" }: DecorProps) {
  const curve = "M0 30 C 300 30 560 84 860 74 S 1260 22 1440 40";
  const echo = "M0 46 C 300 46 560 96 860 88 S 1260 38 1440 56";
  return (
    <div className={`hero-wave ${className}`} aria-hidden="true">
      <svg className="hero-wave__fill" viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
        <path d={`${curve} L1440 98 L0 98 Z`} />
      </svg>
      <svg className="hero-wave__line" viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
        <path d={curve} fill="none" vectorEffect="non-scaling-stroke" />
        <path className="hero-wave__echo" d={echo} fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export function DotField({ className = "" }: DecorProps) {
  return <span className={`decor decor-dots ${className}`} aria-hidden="true" />;
}
