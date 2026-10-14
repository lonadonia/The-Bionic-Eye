import type { ReactNode } from "react";

type SectionIntroProps = {
  id: string;
  heading: string;
  children?: ReactNode;
  className?: string;
};

/** Section introduction: the cyan accent rule (motif 1) aligned to the H2. */
export function SectionIntro({ id, heading, children, className = "" }: SectionIntroProps) {
  return (
    <div className={`section-intro ${className}`}>
      <span className="accent-rule" aria-hidden="true" />
      <h2 id={id} className="t-h2">
        {heading}
      </h2>
      {children}
    </div>
  );
}
