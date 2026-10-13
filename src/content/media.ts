/**
 * Media registry. Every file is a web derivative of a file in the client asset pack; `source` names
 * the original so each placement can be audited. Titles are the client's file names, tidied for
 * display (functional captions only, never promotional). Excerpts say so in the interface.
 * Posters are chosen operational frames (drone, jet and surface), never a logo or title card.
 * A changed file gets a new name (suffix = film timecode): /media is served as immutable.
 */

export type Film = {
  id: string;
  title: string;
  source: string;
  src: { large: string; small?: string };
  poster: string;
  /** Where the poster comes from, for the handover. */
  posterFrame: string;
  /** Duration of the file served on this page, in seconds. */
  duration: number;
  /** Duration of the original supplied film, when the page serves an excerpt. */
  fullDuration?: number;
  hasAudio: boolean;
  orientation: "landscape" | "portrait";
  description: string;
};

export const films = {
  /**
   * Hero: a silent 25 s loop cut on the film's own edits from C10-Use-Case-Shorts-Final-Horizontal.mp4
   * (film seconds 10.92–14.02, 19.92–21.62, 21.98–23.90, 32.34–34.90, 39.06–40.50, 43.95–46.36,
   * 61.30–68.70, 0.04–4.22). It leaves out the on-screen title cards and the end card. Served at
   * 1080p and 540p.
   */
  hero: {
    id: "c10-use-cases-background",
    title: "C10 Use Case Shorts",
    source: "C10-Use-Case-Shorts-Final-Horizontal.mp4",
    src: {
      large: "/media/video/hero-background-loop-1080.mp4",
      small: "/media/video/hero-background-loop-540.mp4",
    },
    poster: "/media/poster/hero-c10-use-cases.jpg",
    posterFrame: "First frame of the loop (film 00:10.9): the C10 rinsing a rooftop solar array",
    duration: 25,
    fullDuration: 83.4,
    hasAudio: false,
    orientation: "landscape",
    description: "The C10 at work: rinsing rooftop solar panels, façades, glazing and roof edges.",
  },
  montage: {
    id: "c10-short",
    title: "C10 Short",
    source: "C10 Short Low bitrate.mp4",
    src: { large: "/media/video/applications-c10-short-720.mp4" },
    poster: "/media/poster/applications-c10-short-0012.jpg",
    posterFrame: "Film frame 00:12: the C10 spraying a glass curtain wall",
    duration: 55.2,
    hasAudio: true,
    orientation: "landscape",
    description: "Montage of the C10 washing building façades, glazing, metal cladding and rooftop solar arrays.",
  },
  claddingPortrait: {
    id: "cladding-portrait",
    title: "Cladding wash, phone footage",
    source: "5f69a5e2-edb9-4dff-8bd8-14d3a8d570d0.MP4",
    src: { large: "/media/video/applications-uk-cladding-portrait.mp4" },
    poster: "/media/poster/applications-uk-cladding-portrait.jpg",
    posterFrame: "Film frame: the C10 high on a white composite-clad wall, its blue supply hose to the ground",
    duration: 38.6,
    hasAudio: false,
    orientation: "portrait",
    description:
      "Phone footage looking up at the C10 as it washes a tall wall of white composite cladding panels, its blue supply hose running down to the ground.",
  },
  fieldCladding: {
    id: "field-cladding",
    title: "Field footage, IMG_2236",
    source: "IMG_2236.MOV",
    src: { large: "/media/video/enquiry-uk-demonstration-loop.mp4" },
    poster: "/media/poster/enquiry-uk-demonstration.jpg",
    posterFrame: "Clip frame (film 00:04): the C10 spraying green corrugated steel cladding",
    duration: 24,
    fullDuration: 134,
    hasAudio: false,
    orientation: "landscape",
    description: "The C10 washing the green corrugated steel cladding of a large industrial building under a clear sky.",
  },
  systemIntroduction: {
    id: "c10-introduction",
    title: "C10 Introduction",
    source: "C10_Introduction_short.mp4",
    src: { large: "/media/video/system-c10-introduction-720.mp4" },
    poster: "/media/poster/system-c10-introduction-0146.jpg",
    posterFrame: "Film frame 01:46: the C10 holding off a building and spraying its façade (the film opens on a title card)",
    duration: 143.5,
    hasAudio: true,
    orientation: "landscape",
    description: "The Bionic Eye introduction to the C10: the drone in flight and cleaning façades, glazing and roofs.",
  },
  academy: {
    id: "c10-academy",
    title: "C10 Academy",
    source: "C10 Academy.mp4",
    src: { large: "/media/video/support-c10-academy-excerpt.mp4" },
    poster: "/media/poster/support-c10-academy.jpg",
    posterFrame: "Film frame: the C10 beside grey cladding",
    duration: 60,
    fullDuration: 304.3,
    hasAudio: true,
    orientation: "landscape",
    description: "ABZ Innovation C10 Academy film: a presenter-led explanation of the C10, intercut with flight and cleaning footage.",
  },
  cleanStation: {
    id: "clean-station-guide",
    title: "ABZ Clean Station, setup and operation guide",
    source: "ABZ Clean Station _ Full Setup & Operation Guide.mp4",
    src: { large: "/media/video/support-clean-station-excerpt.mp4" },
    poster: "/media/poster/support-clean-station-0022.jpg",
    posterFrame: "Film frame 00:22: the Clean Station ground unit, tanks and pump",
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
    posterFrame: "Film frame: the technician at the open rear of the van, hose reel and pressure unit behind him",
    duration: 60,
    fullDuration: 657.2,
    hasAudio: true,
    orientation: "landscape",
    description:
      "Walkthrough of The Bionic Eye cleaning van: the presenter explains the hose reel, pressure unit and water system fitted in the rear of the van.",
  },
} satisfies Record<string, Film>;

export type Photo = { src: string; width: number; height: number; source: string; alt: string };

export const photos = {
  productSide: {
    src: "/media/img/render-c10-side.jpg",
    width: 2400,
    height: 1074,
    source: "C10-2.png",
    alt: "Studio side view of the ABZ Innovation C10 with arms unfolded, the carbon spray lance mounted beneath the frame and the yellow hose coupling at the rear.",
  },
  facade: {
    src: "/media/img/field-rendered-wall.jpg",
    width: 2048,
    height: 1378,
    source: "865A0018.jpg",
    alt: "The C10 hovering beside a rendered building facade between two tall windows, its lance throwing a fine spray across the wall.",
  },
  solar: {
    src: "/media/img/app-solar-panel-cleaning.jpg",
    width: 960,
    height: 1200,
    source: "C10-Use-Case-Shorts-Final-Horizontal.mp4 @ 00:16.5",
    alt: "The C10 hovering above a rooftop solar array, its lance spraying the panels while the yellow supply hose runs back across the roof.",
  },
  demonstration: {
    src: "/media/img/field-uk-demonstration.jpg",
    width: 2400,
    height: 1800,
    source: "IMG_2240.JPG",
    alt: "Two people standing on gravel watch the C10 spray the roofline of a green corrugated steel building, the red supply hose coiled across the yard.",
  },
} as const satisfies Record<string, Photo>;

export function formatTime(seconds: number) {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function filmLength(film: Film) {
  return film.fullDuration
    ? `Excerpt, ${formatTime(film.duration)} of ${formatTime(film.fullDuration)}`
    : formatTime(film.duration);
}
