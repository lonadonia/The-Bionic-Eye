"use client";

import type { ReactNode } from "react";

export const INTEREST_EVENT = "tbe:interest";

/** Link to the enquiry form that pre-selects the chosen service in "Interested in". */
export function ServiceLink({ serviceId, className, children }: { serviceId: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#enquiry"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<string>(INTEREST_EVENT, { detail: serviceId }))}
    >
      {children}
    </a>
  );
}
