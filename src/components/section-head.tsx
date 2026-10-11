type SectionHeadProps = {
  index: string;
  label: string;
  aside?: React.ReactNode;
  className?: string;
};

/** The recurring index rule that opens every section: "02 — Applications". */
export function SectionHead({ index, label, aside, className = "" }: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`}>
      <p className="t-label flex items-baseline gap-3">
        <span className="section-head__index t-index">{index}</span>
        <span>{label}</span>
      </p>
      {aside ? <div className="t-label muted hidden text-right sm:block">{aside}</div> : null}
    </div>
  );
}
