"use client";

import type { ReactNode } from "react";

export const INTEREST_EVENT = "tbe:interest";
export const SELECT_SERVICE_EVENT = "tbe:select-service";

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

/** Link to "Full service support" that also opens the named service there. */
export function ServiceSelectLink({ serviceId, className, children }: { serviceId: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#full-service-support"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: serviceId }))}
    >
      {children}
    </a>
  );
}
