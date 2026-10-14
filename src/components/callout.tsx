type CalloutProps = {
  label: string;
  /** Position of the identified part, as fractions of the image box. */
  x: number;
  y: number;
  /** Which way the connector runs from the part to its label. */
  dir?: "right" | "left" | "down-left" | "up-right";
  hidden?: boolean;
  className?: string;
};

/**
 * Truthful callout: a ring on a part that is plainly visible in the photograph, a fine connector
 * and a label using the source's own term. Only placed where the part was identified on the image
 * itself; never used to guess where a sensor or other hidden component sits.
 */
export function Callout({ label, x, y, dir = "right", hidden = false, className = "" }: CalloutProps) {
  return (
    <span
      className={`callout callout--${dir} ${className}`}
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      data-hidden={hidden || undefined}
      aria-hidden="true"
      data-motion="callout"
    >
      <span className="callout__ring" />
      <span className="callout__line" />
      <span className="callout__label">{label}</span>
    </span>
  );
}
