/**
 * Approved page copy — single source of truth.
 *
 * Source: "Asset Cleaning page: contest copy" (The Bionic Eye Ltd, October 2026), stored as
 * design-handoff/the-bionic-eye-asset-cleaning/source-reference/Asset_Cleaning_Contest_Copy.pdf.
 * Its instruction: "Use this text exactly as written. Do not rewrite it or add claims, figures,
 * logos or testimonials." Every visitor-facing product, service, regulatory and company string
 * below is copied from it character for character. The only typesetting change is the
 * typographic apostrophe (’) in place of the PDF's straight one.
 *
 * Source keys (comments): PDF §n = numbered section of the contest copy; ANN = contest
 * announcement (section names, "Book a demonstration", the five service areas). Where the two
 * differ, the documented working choice is recorded in docs/ASSET_CLEANING_REFINEMENT_2.md §3.
 *
 * Rich text: a paragraph may be split into parts so a phrase can be emphasised; the parts always
 * join back to the exact source sentence (checked by `joinRich` in development and by
 * scripts/qa/copy-audit.mjs).
 */

export type Rich = readonly (string | { em: string })[];

export const joinRich = (parts: Rich) => parts.map((p) => (typeof p === "string" ? p : p.em)).join("");

export const site = {
  company: "The Bionic Eye Ltd", // PDF footer
  pageName: "Asset cleaning", // ANN ("Asset Cleaning page")
  phone: { display: "+44 1753 655886", href: "tel:+441753655886" }, // PDF footer
  email: { display: "info@thebioniceye.co.uk", href: "mailto:info@thebioniceye.co.uk" }, // PDF footer
  shop: { href: "https://shop.thebioniceye.co.uk" }, // destination of "Shop (links to our online store)"; address from C10 Brochure p.14
} as const;

export type NavItem = { label: string; href: string; external?: boolean };

/**
 * PDF "HEADER NAVIGATION": Solutions | Support | Regulation | Sectors | About Us | Contact | Shop.
 * The prototype is a single page, so labels that have matching content here are anchored to it;
 * Solutions and About Us point at the page top and the company details in the footer until the
 * Phase 1 site map supplies real pages (recorded in the handover, not shown to visitors).
 */
export const nav: readonly NavItem[] = [
  { label: "Solutions", href: "#top" },
  { label: "Support", href: "#support" },
  { label: "Regulation", href: "#regulation" },
  { label: "Sectors", href: "#applications" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#enquiry" },
  { label: "Shop", href: site.shop.href, external: true },
];

export const cta = {
  /** ANN — the announcement requires this label on the hero. (PDF hero button: "Discuss a requirement".) */
  demonstration: { label: "Book a demonstration", href: "#enquiry" },
  /** PDF §1 and §7 button — used to submit the enquiry form. */
  requirement: "Discuss a requirement",
} as const;

export const hero = {
  heading: "Facade and structure cleaning without access equipment.", // PDF §1 headline
  paragraphs: [
    "Drone cleaning removes the requirement for scaffolding, cradles, powered access or rope teams across a substantial proportion of facade, glazing, cladding and roof maintenance. The work is carried out from ground level, and setup is measured in minutes rather than days.", // PDF §1 opening, para 1
    "It does not replace access equipment for every application. We identify where it does not before specifying a system.", // PDF §1 opening, para 2
  ],
} as const;

export type ApplicationItem = {
  id: string;
  /** Exact bullet text from PDF §3. */
  text: string;
  /** Trailing words of `text` set in a quieter style (still part of the same sentence). */
  qualifier?: string;
};

export const applications = {
  heading: "Applications", // ANN / PDF §3
  items: [
    { id: "facades", text: "Commercial and residential facades, and glass curtain walling" },
    { id: "solar", text: "Solar farms and rooftop arrays" },
    { id: "wind", text: "Wind turbine towers" },
    { id: "industrial", text: "Industrial silos, tanks and cladding" },
    { id: "heritage", text: "Heritage and listed structures" },
    { id: "graffiti", text: "Graffiti removal" },
    { id: "coating", text: "Surface coating and treatment, currently in development", qualifier: ", currently in development" },
  ] satisfies ApplicationItem[],
} as const;

export type SpecPart = { text: string; role: "qualifier" | "figure" | "unit" | "text" };
export type Spec = { id: string; label: string; value: string; lines: readonly (readonly SpecPart[])[] };

/** Typesetting only: the parts of every line, joined, reproduce `value` exactly. */
const spec = (id: string, label: string, value: string, lines: SpecPart[][]): Spec => ({ id, label, value, lines });

export const system = {
  heading: "The system", // ANN / PDF §2
  paragraphs: [
    "The ABZ Innovation C10 is the platform we have standardised on. It operates to over 60 metres, delivers up to 15 litres per minute at a working pressure around 170 bar at the nozzle, up to 255 bar at peak, and uses radar for collision avoidance and standoff control. Reverse osmosis water can be specified where surface finish, seals or painted surfaces require it.", // PDF §2 para 1
    "Maximum take-off mass is 29 kg. The sub 25 kg limit that applied under the earlier authorisation route is not required under UK SORA.", // PDF §2 para 2
  ],
  product: "ABZ Innovation C10", // PDF §2 (product name), used as the stage caption
  /** PDF §2 "Figures for the specification panel" — the only specifications on this page. */
  specs: [
    spec("working-height", "Working height", "Over 60 metres", [
      [
        { text: "Over ", role: "qualifier" },
        { text: "60", role: "figure" },
        { text: " metres", role: "unit" },
      ],
    ]),
    spec("flow-rate", "Flow rate", "Up to 15 litres per minute", [
      [
        { text: "Up to ", role: "qualifier" },
        { text: "15", role: "figure" },
        { text: " litres per minute", role: "unit" },
      ],
    ]),
    spec("working-pressure", "Working pressure", "Around 170 bar at the nozzle, up to 255 bar at peak", [
      [
        { text: "Around ", role: "qualifier" },
        { text: "170", role: "figure" },
        { text: " bar at the nozzle,", role: "unit" },
      ],
      [
        { text: " up to ", role: "qualifier" },
        { text: "255", role: "figure" },
        { text: " bar at peak", role: "unit" },
      ],
    ]),
    spec("collision-avoidance", "Collision avoidance", "Radar, with standoff control", [
      [{ text: "Radar, with standoff control", role: "text" }],
    ]),
    spec("mtom", "Maximum take-off mass", "29 kg", [
      [
        { text: "29", role: "figure" },
        { text: " kg", role: "unit" },
      ],
    ]),
  ] satisfies Spec[],
} as const;

export type SupportParagraph = { id: string; text: string };
export type SupportService = { id: string; title: string; paragraph: string };

export const support = {
  heading: "Full service support", // ANN
  supplyHeading: "What we supply", // PDF §4
  paragraphs: [
    { id: "supply", text: "The drone, pressure system and nozzle set specified against your surfaces." }, // PDF §4 para 1
    {
      id: "training",
      text: "Pilot training is available as an additional service, and we can advise on preparing the operations manual and supporting documentation required for CAA authorisation.",
    }, // PDF §4 para 2
    {
      id: "aftercare",
      text: "Parts are held in the United Kingdom, repairs are carried out in our own workshop, and the enhanced warranty option provides priority servicing and maintenance, with loan equipment where parts are unavailable. We also offer white label services, arranged in advance, giving clients additional capacity.",
    }, // PDF §4 para 3
  ] satisfies SupportParagraph[],
  /** ANN — the five service areas. Each points at the PDF §4 paragraph that covers it (kept whole). */
  services: [
    { id: "sales", title: "Sales", paragraph: "supply" },
    { id: "oa-support", title: "Operational Authorisation support", paragraph: "training" },
    { id: "training", title: "Training", paragraph: "training" },
    { id: "servicing", title: "Servicing", paragraph: "aftercare" },
    { id: "warranty", title: "Enhanced warranty option", paragraph: "aftercare" },
  ] satisfies SupportService[],
} as const;

export const regulation = {
  heading: "Operating legally", // ANN (PDF §5 is titled "Regulatory position")
  paragraphs: [
    [
      "Cleaning operations at height adjacent to structures fall within the Specific Category, which requires an Operational Authorisation from the Civil Aviation Authority. Since April 2025 these are granted through UK SORA.",
    ],
    [
      { em: "The Operational Authorisation is held by the operator and not the supplier." },
      " The Bionic Eye assists clients in attaining their own, drawing on the UK SORA authorisation we hold for cleaning operations with our own PowerWash system, obtained in January 2026, and on the applications we have supported since. The first client Operational Authorisation for the C10 has now been granted, in the client’s own name, with two further applications at final assessment.",
    ],
  ] satisfies Rich[], // PDF §5 paras 1–2
  link: "How authorisation works", // PDF §5 button
} as const;

export const evidence = {
  heading: "Proven in the field", // PDF §6
  intro: "ABZ Innovation’s case studies show what the C10 delivers in service.", // PDF §6 sentence 1
  cases: [
    ["A factory facade was cleaned at ", { em: "around 300 square metres an hour" }, " using chemical-free reverse osmosis water."],
    [
      "A roof carrying ten years of moss, ",
      { em: "about 550 square metres" },
      ", was cleared in ",
      { em: "roughly three hours" },
      " with no chemicals, and the system was set up and ready to fly in ",
      { em: "fifteen minutes" },
      ".",
    ],
  ] satisfies Rich[], // PDF §6 sentences 2–3
  qualification:
    "Figures are from ABZ Innovation case studies. Actual output varies with the surface, the level of soiling and site conditions.", // PDF §6
} as const;

export const enquiry = {
  heading: "Enquiry", // ANN (PDF §7 "Closing and enquiry")
  closing:
    "Send us the sites you intend to work on. We will identify which are straightforward under a standard authorisation, which require additional work, and which are unlikely to be viable, before any commitment is made.", // PDF §7
  fields: {
    name: "Name",
    company: "Company",
    email: "Email",
    telephone: "Telephone",
    sites: "Sites or work involved",
  }, // PDF §7 "Enquiry form fields"
  submit: cta.requirement, // PDF §7 button
} as const;

export const footer = {
  address: "The Bionic Eye, Bionic House, Hall Farm, Berry Lane, Chorleywood, WD3 5EX, United Kingdom.",
  /** "Telephone +44 1753 655886. Email info@thebioniceye.co.uk." — split only to link the number and address. */
  telephone: { lead: "Telephone ", link: site.phone, trail: "." },
  email: { lead: "Email ", link: site.email, trail: "." },
  brandsLabel: "Specialist brands",
  brands: ["FarmingByDrone", "PowerWash", "CleaningByDrone"],
  operator:
    "The Operational Authorisation is held by the operator and not the supplier. The Bionic Eye assists clients in attaining their own.",
  approval:
    "CAA approved since 2014. UK SORA authorisation held for cleaning operations with the PowerWash system since January 2026.",
  registration:
    "The Bionic Eye Ltd. Registered in England and Wales, company number 09053005. Registered office: 22 Wycombe End, Beaconsfield HP9 1NB.",
} as const;

if (process.env.NODE_ENV !== "production") {
  for (const s of system.specs) {
    const joined = s.lines.map((l) => l.map((p) => p.text).join("")).join("");
    if (joined !== s.value) throw new Error(`Spec typesetting changed the value of "${s.label}": "${joined}"`);
  }
  for (const item of applications.items) {
    if ("qualifier" in item && item.qualifier && !item.text.endsWith(item.qualifier)) {
      throw new Error(`Qualifier is not the end of "${item.text}"`);
    }
  }
}
