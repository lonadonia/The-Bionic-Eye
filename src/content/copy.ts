/**
 * Approved page copy — single source of truth.
 *
 * Rule for this file: every visible marketing string is quoted verbatim from a client source.
 * The only permitted changes are (a) British spelling localisation, logged in
 * design-handoff/the-bionic-eye-asset-cleaning/01_CLIENT_BRIEF_ANALYSIS.md, and (b) typesetting
 * (sentence case for headings set in capitals in the source, typographic apostrophes/quotes).
 *
 * Source keys:
 *   BRO p.N  = "C10 Brochure.pdf" (ABZ Innovation, 2026 C10 Cleaning Drone product catalogue), page N
 *   DS  p.N  = "C10_Datasheet.pdf" (The Bionic Eye, "Specifications of C10"), page N
 *   BRIEF    = contest brief (section names, CTA label, service list, company descriptor)
 *   FILM t   = on-screen title card in "C10-Use-Case-Shorts-Final-Horizontal.mp4" at time t
 *
 * Strings marked UI are functional interface labels (controls, form labels, status messages),
 * proposed by the designer and pending client approval — they carry no product claims.
 */

export const site = {
  company: "The Bionic Eye Ltd", // BRIEF §1
  dealerLine: "UK and Ireland dealer for ABZ Innovation", // BRIEF §1 — confirm preferred wording
  pageName: "Asset cleaning", // BRIEF §1 ("Asset Cleaning page")
  phone: { display: "+44 1753 655886", href: "tel:+441753655886" }, // BRO p.14
  email: { display: "info@thebioniceye.co.uk", href: "mailto:info@thebioniceye.co.uk" }, // BRO p.14
  shop: { display: "shop.thebioniceye.co.uk", href: "https://shop.thebioniceye.co.uk" }, // BRO p.14
  contactHeading: "Find more about us", // BRO p.14
} as const;

export const cta = {
  label: "Book a demonstration", // BRIEF §3.1
  href: "#enquiry",
} as const;

/** In-page navigation uses the section names exactly as given in the brief (§3). */
export const nav = [
  { id: "applications", index: "02", label: "Applications" },
  { id: "the-system", index: "03", label: "The system" },
  { id: "full-service-support", index: "04", label: "Full service support" },
  { id: "operating-legally", index: "05", label: "Operating legally" },
  { id: "enquiry", index: "06", label: "Enquiry" },
] as const;

export const hero = {
  index: "01",
  kicker: "Meet the ABZ Innovation C10", // BRO p.2
  heading: ["Clean smarter,", "safer, higher"], // BRO p.2 — set in sentence case
  intro:
    "The C10 is a purpose-built industrial cleaning drone engineered to carry high-pressure cleaning lances to elevated surfaces while keeping all heavy equipment—pumps, hoses, and water sources—securely on the ground.", // BRO p.3
  triad: ["No Scaffolding.", "No Height Risks.", "No Compromise."], // BRO p.3
} as const;

export type Application = {
  id: string;
  label: string;
  image: string;
  alt: string;
};

export const applications = {
  index: "02",
  label: "Applications", // BRIEF §3.2
  heading: "Access the Inaccessible", // BRO p.5
  lede: "Perfectly suitable for hard-to-reach areas where traditional machinery cannot fit.", // BRO p.5
  items: [
    {
      id: "solar-panel-cleaning",
      label: "Solar panel cleaning", // FILM 00:06.8
      image: "/media/img/app-solar-panel-cleaning.jpg",
      alt: "The C10 hovering above a rooftop solar array, its lance spraying the panels while the supply hose runs back across the roof.",
    },
    {
      id: "facade-cleaning",
      label: "Façade cleaning", // FILM 00:24.2 (card reads "FACADE CLEANING"; brochure spelling "façade" used)
      image: "/media/img/app-facade-cleaning.jpg",
      alt: "The C10 against a deep blue sky, spraying the stone cladding and glazing of a multi-storey building from its tethered hose.",
    },
    {
      id: "roof-moss-removal",
      label: "Roof moss removal", // FILM 00:40.6
      image: "/media/img/app-roof-moss-removal.jpg",
      alt: "The C10 hovering low over a moss-covered corrugated roof, a high-pressure jet lifting the growth from the tiles.",
    },
    {
      id: "gutter-cleaning",
      label: "Gutter cleaning", // FILM 00:59.6
      image: "/media/img/app-gutter-cleaning.jpg",
      alt: "The C10 flying alongside the roof edge of an industrial unit, spraying down into the red gutter below a solar-covered roof.",
    },
  ] satisfies Application[],
  versatility: {
    lead: "Versatility", // BRO p.4 and p.7 (bold lead-in "Versatility:")
    points: [
      "Compatible with Osmosis (RO) water for streak-free glass cleaning and specialised nozzles for complex surfaces.", // BRO p.4 — "specialized" localised
      "The payload includes interchangeable nozzle holders (straight and tilting) to adapt to different architectural features.", // BRO p.7
    ],
  },
} as const;

export const system = {
  index: "03",
  label: "The system", // BRIEF §3.3
  heading: "Engineered for precision", // BRO p.6 ("TECHNOLOGY: ENGINEERED FOR PRECISION")
  lede: "The C10 isn’t just a drone; it’s a precision instrument. The drone is equipped with advanced avionics designed specifically for stability near structures.", // BRO p.6
  radar: {
    title: "Automatic Radar-Controlled Distance System", // BRO p.6
    body: "Precision is key. The C10 features a front-mounted radar that measures the distance to the wall with an accuracy of 2–6 cm (≈ 0.8–2.4 in).", // BRO p.6
    points: [
      {
        lead: "How it works:",
        text: "The pilot sets a “Desired Distance” (e.g., 1.5 metres (≈ 4.9 ft)). The drone automatically maintains this position relative to the surface, ensuring even cleaning.", // BRO p.6 — "meters" localised
      },
      {
        lead: "Emergency Push:",
        text: "If the drone detects it is too close to the wall (e.g., due to a wind gust), the system automatically pushes the drone back to a safe distance (up to 2 metres (≈ 6.6 ft)) and switches to manual loiter mode for safety.", // BRO p.6 — "meters" localised
      },
    ],
  },
  rtk: {
    title: "RTK Positioning for Centimetre Precision", // BRO p.7 — "Centimeter" localised
    body: "For environments requiring maximum stability, the C10 supports Emlid RTK base stations and Network RTK (NTRIP). This allows the drone to use GNSS for altitude hold rather than barometers, preventing vertical drift in fluctuating pressure zones.", // BRO p.7
  },
  washing: {
    title: "Optimised Washing System", // BRO p.7 — "Optimized" localised
    lead: "Capacity:",
    text: "The system is engineered to handle the weight of the water-filled hose up to a working height of 60 metres (≈ 196.9 ft).", // BRO p.7 — "meters" localised
  },
  workflow: {
    heading: "Workflow: A smarter way to work", // BRO p.10
    intro: "Professional efficiency in three steps.", // BRO p.10
    steps: [
      { title: "Setup", text: "The team positions the ground unit centrally. No heavy lifts, no scaffolding." }, // BRO p.10
      { title: "Launch", text: "The pilot ascends to the target height while the helper manages the pressure unit." }, // BRO p.10
      {
        title: "Clean",
        text: "The pilot engages the radar-based automatic distance control. The drone locks onto the façade, delivering a consistent, high-pressure wash while the operator monitors via HD FPV camera.", // BRO p.10
      },
    ],
  },
} as const;

export type Service = { id: string; index: string; title: string; note?: string };

export const support = {
  index: "04",
  label: "Full service support", // BRIEF §3.4
  heading: "Full service support", // BRIEF §3.4
  services: [
    {
      id: "sales",
      index: "01",
      title: "Sales", // BRIEF §3.4
      note: "All prices are indicative, please ask for your custom tailored quote from our representative.", // BRO p.14
    },
    { id: "operational-authorisation-support", index: "02", title: "Operational Authorisation support" }, // BRIEF §3.4
    { id: "training", index: "03", title: "Training" }, // BRIEF §3.4
    { id: "servicing", index: "04", title: "Servicing" }, // BRIEF §3.4
    { id: "enhanced-warranty-option", index: "05", title: "Enhanced warranty option" }, // BRIEF §3.4
  ] satisfies Service[],
} as const;

export const legal = {
  index: "05",
  label: "Operating legally", // BRIEF §3.5
  heading: "Operating legally", // BRIEF §3.5
  statement: { lead: "Remote ID:", text: "Dronetag DRI module (EU/US compliant)" }, // BRO p.9
  statementSource: "ABZ Innovation C10 product catalogue, p. 9", // UI citation
  crossRef: { label: "Operational Authorisation support", href: "#full-service-support" }, // BRIEF §3.4
  // Design placeholder — NOT client copy. Rendered as a visible dependency flag.
  pending: "Approved regulatory wording to be supplied by The Bionic Eye before publication.",
} as const;

export const enquiry = {
  index: "06",
  label: "Enquiry", // BRIEF §3.6
  heading: "Ready to rethink high-altitude cleaning?", // BRO p.11
  contactLead: "Contact us:", // BRO p.11
} as const;
