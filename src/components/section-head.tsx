type SectionHeadProps = {
  index: string;
  /** Chapter label; omit when the section's own heading already says the same words. */
  label?: string;
  aside?: React.ReactNode;
  className?: string;
};

/** The recurring rule that opens every chapter: index, label, and an optional right-hand note. */
export function SectionHead({ index, label, aside, className = "" }: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`}>
      <p className="section-head__label t-label">
        <span className="section-head__index">{index}</span>
        {label ? <span>{label}</span> : null}
      </p>
      {aside ? <div className="section-head__aside hidden sm:block">{aside}</div> : null}
    </div>
  );
}
