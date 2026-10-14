/**
 * Interface labels: functional text for controls, captions that name a supplied file or what a
 * real photograph shows, form validation and status messages. None of it describes the C10's
 * performance or The Bionic Eye's services; approved product wording lives only in copy.ts.
 * Part names used on images ("Nozzle", "ABZ Clean Station") are the contest copy's own term
 * ("at the nozzle") and the supplied guide's title.
 */

export const ui = {
  header: {
    home: "The Bionic Eye, back to top",
    menu: "Menu",
    close: "Close",
    menuTitle: "Menu",
    external: "(opens our online store in a new tab)",
  },
  film: {
    play: "Play film",
    pause: "Pause film",
    heroName: "background film",
    watchFull: "Watch the full film",
    close: "Close film",
    withSound: "with sound",
    excerpt: (part: string, whole: string) => `Excerpt, ${part} of ${whole}`,
  },
  applications: {
    listLabel: "Applications",
  },
  system: {
    specsLabel: "Specification",
    viewsLabel: "Choose a view of the C10",
    views: { side: "Side", "three-quarter": "Three-quarter", front: "Front" } as Record<string, string>,
    nozzle: "Nozzle",
    inOperation: "In operation",
    studio: "Studio photograph",
    sceneLabel: "Choose what the cleaning-system pictures show",
    scene: ["In operation", "Nozzle", "With the Clean Station"],
    cleanStation: "ABZ Clean Station",
    frame: (time: string) => `Film frame ${time}`,
  },
  support: {
    selectorLabel: "Service areas",
    coveredBy: "Covered in",
    clipsLabel: "Support films",
  },
  form: {
    required: "required",
    sending: "Sending…",
    errors: {
      name: "Enter your name.",
      email: "Enter your email address.",
      emailFormat: "Enter an email address in the format name@company.co.uk.",
      telephone: "Enter a telephone number using digits, spaces and + only.",
    },
    summary: (n: number) => (n === 1 ? "Check this field:" : `Check these ${n} fields:`),
    /** Shown only after a valid submission: this prototype has no form handler and must not imply delivery. */
    notConnected: "This preview is not connected to a form handler, so nothing has been sent. Please use the telephone number or email address instead.",
  },
} as const;
