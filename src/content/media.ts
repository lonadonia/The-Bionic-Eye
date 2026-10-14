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
  /** The complete supplied film (01:23, with its own title cards and sound), opened from the hero. */
  heroFull: {
    id: "c10-use-cases-full",
    title: "C10 Use Case Shorts",
    source: "C10-Use-Case-Shorts-Final-Horizontal.mp4",
    src: { large: "/media/video/hero-c10-use-cases-full-720.mp4" },
    poster: "/media/poster/hero-c10-use-cases.jpg",
    posterFrame: "Film 00:10.9: the C10 rinsing a rooftop solar array (first frame of the hero loop)",
    duration: 83.4,
    hasAudio: true,
    orientation: "landscape",
    description: "The complete film: the C10 cleaning solar panels, façades, roofs and gutters, with the film's own title cards.",
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
  /** The guide's closing flight sequence (film 05:10–05:49): the C10 working on its supply hose. */
  stationOperation: {
    id: "clean-station-operation",
    title: "ABZ Clean Station, setup and operation guide",
    source: "ABZ Clean Station _ Full Setup & Operation Guide.mp4",
    src: { large: "/media/video/system-clean-station-operation-excerpt.mp4" },
    poster: "/media/img/system-operation-0516.jpg",
    posterFrame: "Film frame 05:16: the C10 holding off a rendered wall, its jet on the wall and its hose to the ground",
    duration: 39.4,
    fullDuration: 349.4,
    hasAudio: true,
    orientation: "landscape",
    description: "The closing flight sequence of the ABZ Clean Station guide: the C10 washing building walls on its supply hose.",
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
  facade: {
    src: "/media/img/app-facade-glazing.jpg",
    width: 2000,
    height: 1125,
    source: "C10 3.jpg (6000 × 3376)",
    alt: "The C10 high above the street beside an office building, its lance spraying the stone facade and the ribbon of windows under a deep blue sky, its supply hose hanging to the ground.",
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
  ready: {
    src: "/media/img/support-c10-ready.jpg",
    width: 1600,
    height: 1200,
    source: "IMG_2224.JPG (4032 × 3024)",
    alt: "The C10 standing on a wet gravel yard with its arms unfolded, the lance and nozzle mounted beneath the frame and a red hose connected.",
  },
  /** Close crop of C10-7.png (studio macro, source region 2880 × 2160 px at 2592, 1944). */
  nozzleStudio: {
    src: "/media/img/detail-c10-nozzle-studio.jpg",
    width: 1200,
    height: 900,
    source: "C10-7.png (8640 × 5760)",
    alt: "Studio close-up beneath the C10: the carbon lance ending in its orange-collared nozzle, the yellow hose and its coupling, between the landing-gear legs.",
  },
  /** Native-resolution crop of 865A0018.jpg (1024 × 768 px at 512, 512). */
  nozzleOperation: {
    src: "/media/img/detail-c10-nozzle-operation.jpg",
    width: 1024,
    height: 768,
    source: "865A0018.jpg (2048 × 1378)",
    alt: "The C10's lance beside a rendered wall, a jet of water leaving the nozzle and fanning out across the render.",
  },
  /** ABZ Clean Station guide, film frame 05:16 (3840 × 2160 source frame). */
  operation: {
    src: "/media/img/system-operation-0516.jpg",
    width: 2880,
    height: 1620,
    source: "ABZ Clean Station _ Full Setup & Operation Guide.mp4 @ 05:16",
    alt: "The C10 hovering in a courtyard of rendered industrial walls, its jet striking the wall at left while its red hose coupling and green supply hose run down to the ground.",
  },
  /** ABZ Clean Station guide, film frame 00:22, cropped clear of the guide's corner logo. */
  cleanStation: {
    src: "/media/img/system-clean-station-0022.jpg",
    width: 1800,
    height: 1108,
    source: "ABZ Clean Station _ Full Setup & Operation Guide.mp4 @ 00:22",
    alt: "The ABZ Clean Station ground unit in its steel frame: a hose reel and motor at upper left, a pump with pressure gauge below, a tank with the ABZ logo, a tall blue vessel and white water-treatment units.",
  },
} as const satisfies Record<string, Photo>;

export type ProductView = {
  id: string;
  photo: Photo;
  /** The nozzle, as a fraction of the image box, where it is clearly visible in this view. */
  nozzle?: { x: number; y: number };
};

/**
 * Real studio photographs of the C10 (8640 × 5760 sources), each cropped to the same 16:10 canvas
 * on the photographs' own pure-white background, so the stage height never changes between views.
 * The nozzle position was measured on each photograph; the three-quarter view hides it, so it has none.
 */
export const productViews = [
  {
    id: "side",
    photo: {
      src: "/media/img/product-c10-side.jpg",
      width: 1920,
      height: 1200,
      source: "C10-2.png",
      alt: "Studio side view of the ABZ Innovation C10 with its arms unfolded, the carbon lance and nozzle mounted beneath the frame and the yellow hose and red coupling at the rear.",
    },
    nozzle: { x: 0.884, y: 0.551 },
  },
  {
    id: "three-quarter",
    photo: {
      src: "/media/img/product-c10-three-quarter.jpg",
      width: 1920,
      height: 1200,
      source: "C10-5.png",
      alt: "Studio three-quarter view of the ABZ Innovation C10 from the front left, showing all four arms and propellers, the landing gear and the yellow hose with its red coupling.",
    },
  },
  {
    id: "front",
    photo: {
      src: "/media/img/product-c10-front.jpg",
      width: 1920,
      height: 1200,
      source: "C10.png",
      alt: "Studio front view of the ABZ Innovation C10, looking along the lance to the orange-collared nozzle between the landing-gear legs.",
    },
    nozzle: { x: 0.516, y: 0.82 },
  },
] as const satisfies readonly ProductView[];

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
