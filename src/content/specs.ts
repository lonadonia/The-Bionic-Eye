/**
 * "Specifications of C10" — transcribed verbatim from C10_Datasheet.pdf (The Bionic Eye), EU column.
 * Row order, labels, values, punctuation and footnote markers follow the datasheet exactly,
 * including source quirks that need client confirmation (e.g. "LoRA", "25,5", "fix / tiltable").
 * The US column is intentionally not shown on this UK page (see handoff: its flow-rate conversion
 * "30.6 gal/min" does not match 11.6 l/min and should be corrected by the client).
 * Nothing here is inferred or added.
 */

export type SpecRow = { label: string; value: string; mark?: "*" | "**" };
export type SpecGroup = { id: string; title: string; page: number; rows: SpecRow[] };

export const specTitle = "Specifications of C10";

export const specGroups: SpecGroup[] = [
  {
    id: "general-specifications",
    title: "General specifications",
    page: 1,
    rows: [
      { label: "Payload", value: "High-pressure cleaning system" }, // source label reads "Payload:" — trailing colon dropped (typesetting)
      { label: "Max. take-off weight", value: "29 kg" },
      { label: "Total weight (with battery)", value: "17.3 kg", mark: "*" },
      { label: "Total weight (without battery)", value: "13 kg", mark: "*" },
      { label: "Maximum characteristic dimension", value: "2290 mm", mark: "**" },
      { label: "Dimensions (arms & propellers unfolded) with Spray lance (L x W x H)", value: "2060 x 1600 x 600 mm" },
      { label: "Dimensions (arms and propellers folded) with Spray lance (L x W x H)", value: "1170 x 540 x 600 mm" },
      { label: "Dimensions (arms and propellers folded) without Spray lance (L x W x H)", value: "770 x 540 x 600 mm" },
      { label: "Maximum flight time", value: "18 min" },
      { label: "GPS", value: "GPS, GLONASS, Galileo, BeiDou" },
      { label: "Hovering precision", value: "±10 cm (RTK) ±1.5 m (without RTK)" },
      { label: "Heading", value: "Dual-RTK" },
      { label: "Rotor dimensions", value: "30 x 11" },
      { label: "Battery type", value: "Li-Po Smart" },
      { label: "Battery capacity", value: "16000 mAh" },
      { label: "Battery voltage (nominal)", value: "44.4V" },
      { label: "Battery weight", value: "4.2 kg" },
      { label: "Battery charging time", value: "min. 11 minutes" },
      { label: "Battery charger channels", value: "4 ports (2 balance)" },
      { label: "Battery charger power", value: "3000 W" },
      { label: "Camera", value: "Wide angle, vertically adjustable (0-180°)" },
      { label: "Camera resolution", value: "FHD" },
      { label: "Effective signal range of RC", value: "~3.5 km" },
      { label: "Intrusion protection", value: "Limited water and dust resistance" },
    ],
  },
  {
    id: "cleaning-system",
    title: "Cleaning system",
    page: 2,
    rows: [
      { label: "Spray lance", value: "Removable for transport" },
      { label: "Spray lance extension range", value: "± 180 mm" },
      { label: "Spray nozzle", value: "25°" },
      { label: "Spray nozzle holder compatibility", value: "M18 x 1.5" },
      { label: "Nozzle holder", value: "fix / tiltable" },
      { label: "Hose length", value: "optional 30 m / 60 m" },
    ],
  },
  {
    id: "high-pressure-system",
    title: "High Pressure system (optional)",
    page: 2,
    rows: [
      { label: "Cleaning system", value: "Kärcher HD 7/17 M PLUS" },
      { label: "Flow rate", value: "11.6 l/min" },
      { label: "Working pressure", value: "170 / 17 bar/MPa" },
      { label: "Max. pressure", value: "255 / 25,5 bar/MPa" },
      { label: "Water inlet", value: "3/4\"" },
      { label: "Type", value: "Electric" },
      { label: "Supply voltage", value: "3 Phase / 400 V / 50 Hz" },
      { label: "Weight (with accessories)", value: "32 kg" },
      { label: "Weight incl. packaging", value: "36 kg" },
      { label: "Dimensions (L x W x H)", value: "455 x 400 x 700 mm" },
    ],
  },
  {
    id: "frequency-bands",
    title: "Frequency bands",
    page: 3,
    rows: [
      { label: "Radio Control and Telemetry", value: "2.4GHz" },
      { label: "WLAN", value: "2.4GHz" },
      { label: "LoRA", value: "862–1020 MHz" },
    ],
  },
  {
    id: "flight",
    title: "Flight",
    page: 3,
    rows: [
      { label: "Max. pitch angle", value: "17°" },
      { label: "Max. level speed", value: "3 m/s" },
      { label: "Max. flight altitude (AMSL)", value: "4500 m" },
      { label: "Max. flight altitude (AGL)", value: "120 m" },
      { label: "Max. tolerable wind speed", value: "10 m/s" },
    ],
  },
];

export const specFootnotes = [
  { mark: "*", text: "The weight parameters vary by ±1kg according to the final product configuration" },
  { mark: "**", text: "Maximum distance between the tips of two opposite propellers" },
] as const;

/**
 * Headline figures: an unedited selection of datasheet rows (label + value exactly as above).
 * Only rows that no other supplied source contradicts are promoted here. Weights, dimensions,
 * pressure and flow differ between this datasheet and the brochure (pp. 4, 8, 9) and the
 * C10 Introduction film, so they stay in the full table only until the client confirms them.
 */
export const keyFigures: { label: string; value: string }[] = [
  { label: "Maximum flight time", value: "18 min" },
  { label: "Max. tolerable wind speed", value: "10 m/s" },
  { label: "Effective signal range of RC", value: "~3.5 km" },
  { label: "Battery charging time", value: "min. 11 minutes" },
];

export const datasheet = {
  href: "/downloads/C10_Datasheet.pdf",
  label: "Datasheet", // UI
  meta: "PDF · 368 KB", // UI
};
