/**
 * Interface labels — functional UI text proposed by the designer (buttons, captions, filter, states).
 * Nothing here is product copy or a claim about the C10 or The Bionic Eye's services; approved
 * product wording stays in copy.ts and specs.ts. Pending client review like every other UI label.
 */

export const ui = {
  hero: {
    secondary: { label: "View specifications", href: "#specifications" },
    filmLabel: "C10 Use Case Shorts",
    pause: "Pause background film",
    play: "Play background film",
  },
  system: {
    filmCaption: "With sound",
    stillCaption: (timestamp: string) => `Frame from C10 Introduction, ${timestamp}`,
    photoCaption: "Field photograph",
    capabilitiesShort: { radar: "Radar", rtk: "RTK", washing: "Washing system" },
  },
  specs: {
    label: "Specifications",
    filterLabel: "Find a specification",
    clear: "Clear",
    total: (n: number, groups: number) => `${n} specifications in ${groups} groups`,
    matches: (n: number, total: number, q: string) =>
      n === 0 ? `No specification matches “${q}”.` : `${n} of ${total} specifications match “${q}”.`,
    noneHint: "Check the spelling, or download the datasheet.",
    annotationsLabel: "Parts shown",
    groupCount: (n: number) => (n === 1 ? "1 item" : `${n} items`),
  },
  support: {
    enquire: (service: string) => `Enquire about ${service}`,
    pendingTitle: "Service details to follow",
    pendingText: "The Bionic Eye will supply the approved description of this service before publication.",
    related: "Related: Operating legally",
    filmsHeading: "From The Bionic Eye",
  },
  legal: {
    sourcePrefix: "Source:",
    pendingLabel: "Copy pending",
  },
  form: {
    sending: "Sending…",
  },
} as const;
