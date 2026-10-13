"use client";

import type { ReactNode } from "react";
import { SELECT_SERVICE_EVENT } from "./support-selector";

/** In-page link to Full service support that also selects the named service there. */
export function SelectServiceLink({ serviceId, className, children }: { serviceId: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#support"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: serviceId }))}
    >
      {children}
    </a>
  );
}
