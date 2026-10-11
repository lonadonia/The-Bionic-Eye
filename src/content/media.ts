/**
 * Media registry — every file here is a web-optimised derivative of a file in the client asset pack.
 * `source` names the original file so each placement is auditable (see 01_CLIENT_BRIEF_ANALYSIS.md,
 * "Asset-to-section map"). Titles are the client's own file names, tidied for display.
 * Excerpts are labelled as such in the UI; production should host full-length films (e.g. Vimeo/YouTube).
 */

export type Film = {
  id: string;
  title: string;
  source: string;
  src: { large: string; small?: string };
  poster: string;
  /** Duration of the file served on this page, in seconds. */
  duration: number;
  /** Duration of the original supplied film, when the page serves an excerpt. */
  fullDuration?: number;
  hasAudio: boolean;
  orientation: "landscape" | "portrait";
  description: string;
};

export const films = {
  hero: {
    id: "c10-use-cases",
    title: "C10 Use Case Shorts",
    source: "C10-Use-Case-Shorts-Final-Horizontal.mp4",
    src: {
      large: "/media/video/hero-c10-use-cases-1080.mp4",
      small: "/media/video/hero-c10-use-cases-540.mp4",
    },
    poster: "/media/poster/hero-c10-use-cases.jpg",
    duration: 83.4,
    hasAudio: true,
    orientation: "landscape",
    description:
      "ABZ Innovation film of the C10 at work: solar panel cleaning, façade cleaning, roof moss removal and gutter cleaning, each introduced by an on-screen title.",
  },
  applicationsMontage: {
    id: "c10-short",
    title: "C10 Short",
    source: "C10 Short Low bitrate.mp4",
    src: { large: "/media/video/applications-c10-short-720.mp4" },
    poster: "/media/poster/applications-c10-short.jpg",
    duration: 55.2,
    hasAudio: true,
    orientation: "landscape",
    description:
      "Montage of the C10 washing building façades, glazing, metal cladding and rooftop solar arrays.",
  },
  applicationsCladding: {
    id: "cladding-portrait",
    title: "Cladding wash",
    source: "5f69a5e2-edb9-4dff-8bd8-14d3a8d570d0.MP4",
    src: { large: "/media/video/applications-uk-cladding-portrait.mp4" },
    poster: "/media/poster/applications-uk-cladding-portrait.jpg",
    duration: 38.6,
    hasAudio: false,
    orientation: "portrait",
    description:
      "Phone footage looking up at the C10 as it washes a tall wall of white composite cladding panels, its blue supply hose running down to the ground.",
  },
  systemIntroduction: {
    id: "c10-introduction",
    title: "C10 Introduction",
    source: "C10_Introduction_short.mp4",
    src: { large: "/media/video/system-c10-introduction-720.mp4" },
    poster: "/media/poster/system-c10-introduction.jpg",
    duration: 143.5,
    hasAudio: true,
    orientation: "landscape",
    description:
      "The Bionic Eye introduction to the C10, with on-screen annotations of the cleaning system and its stability features.",
  },
  academy: {
    id: "c10-academy",
    title: "C10 Academy",
    source: "C10 Academy.mp4",
    src: { large: "/media/video/support-c10-academy-excerpt.mp4" },
    poster: "/media/poster/support-c10-academy.jpg",
    duration: 60,
    fullDuration: 304.3,
    hasAudio: true,
    orientation: "landscape",
    description: "ABZ Innovation C10 Academy film: a presenter-led explanation of the C10, intercut with flight and cleaning footage.",
  },
  cleanStation: {
    id: "clean-station-guide",
    title: "ABZ Clean Station – Full Setup & Operation Guide",
    source: "ABZ Clean Station _ Full Setup & Operation Guide.mp4",
    src: { large: "/media/video/support-clean-station-excerpt.mp4" },
    poster: "/media/poster/support-clean-station.jpg",
    duration: 75,
    fullDuration: 349.4,
    hasAudio: true,
    orientation: "landscape",
    description:
      "Step-by-step guide to the ABZ Clean Station ground unit: visual inspection and mechanical check, powering up and water connection.",
  },
  cleaningVan: {
    id: "tbe-cleaning-van",
    title: "TBE Cleaning Van",
    source: "TBE_Cleaning_Van-Compressed2.mp4",
    src: { large: "/media/video/support-tbe-cleaning-van-excerpt.mp4" },
    poster: "/media/poster/support-tbe-cleaning-van.jpg",
    duration: 60,
    fullDuration: 657.2,
    hasAudio: true,
    orientation: "landscape",
    description:
      "Walkthrough of The Bionic Eye cleaning van: the presenter explains the hose reel, pressure unit and water system fitted in the rear of the van.",
  },
  enquiryDemonstration: {
    id: "demonstration-loop",
    title: "Field footage",
    source: "IMG_2236.MOV",
    src: { large: "/media/video/enquiry-uk-demonstration-loop.mp4" },
    poster: "/media/poster/enquiry-uk-demonstration.jpg",
    duration: 24,
    fullDuration: 134,
    hasAudio: false,
    orientation: "landscape",
    description:
      "The C10 washing the green corrugated cladding of a large agricultural-style building under a clear blue sky.",
  },
} satisfies Record<string, Film>;

export const photos = {
  productSide: {
    src: "/media/img/render-c10-side.jpg",
    width: 2400,
    height: 1074,
    source: "C10-2.png",
    alt: "Studio side view of the ABZ Innovation C10 with arms unfolded, the carbon spray lance mounted beneath the frame and the yellow hose coupling at the rear.",
  },
  demonstration: {
    src: "/media/img/field-uk-demonstration.jpg",
    width: 2400,
    height: 1800,
    source: "IMG_2240.JPG",
    alt: "Two people standing on gravel watch the C10 spray the roofline of a green corrugated steel building, the red supply hose coiled across the yard.",
  },
  renderedWall: {
    src: "/media/img/field-rendered-wall.jpg",
    width: 2048,
    height: 1378,
    source: "865A0018.jpg",
    alt: "The C10 hovering beside a rendered wall between two tall windows, its lance throwing a fine spray across the surface.",
  },
} as const;

export function formatTime(seconds: number) {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
