// Copy-fidelity audit: every string in src/content/{copy,specs}.ts is checked against the text layer
// of the client PDFs. Localisation edits are reversed before matching; brief-derived and UI strings
// are classified from an explicit allow-list. Anything unmatched is reported as UNVERIFIED.
import * as mupdf from "mupdf";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [, , projectDir, assetDir, outFile] = process.argv;
const pdfs = {
  BRO: path.join(assetDir, "C10 Brochure.pdf"),
  DS: path.join(assetDir, "C10_Datasheet.pdf"),
};

const norm = (s) =>
  s
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/ /g, " ")
    .replace(/-\s*\n\s*/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

// Reverse the documented British-English localisations so the source (US spelling) can be matched.
const delocalise = (s) =>
  s
    .replace(/metres/g, "meters")
    .replace(/Metres/g, "Meters")
    .replace(/centimetre/gi, (m) => (m[0] === "C" ? "Centimeter" : "centimeter"))
    .replace(/Optimised/g, "Optimized")
    .replace(/specialised/g, "specialized");

const pages = {};
for (const [key, file] of Object.entries(pdfs)) {
  const doc = mupdf.Document.openDocument(fs.readFileSync(file), "application/pdf");
  pages[key] = [];
  for (let i = 0; i < doc.countPages(); i++) pages[key].push(norm(doc.loadPage(i).toStructuredText("preserve-whitespace").asText()));
}
const all = Object.entries(pages).flatMap(([k, ps]) => ps.map((t, i) => ({ src: `${k} p.${i + 1}`, t })));

const findIn = (needle) => {
  const hits = [];
  for (const p of all) if (p.t.includes(needle)) hits.push(p.src);
  return hits;
};

// Strings that come from the contest brief itself (section names, CTA, services, company line).
const BRIEF = new Set([
  "The Bionic Eye Ltd", "UK and Ireland dealer for ABZ Innovation", "Asset cleaning", "Book a demonstration",
  "Applications", "The system", "Full service support", "Operating legally", "Enquiry",
  "Sales", "Operational Authorisation support", "Training", "Servicing", "Enhanced warranty option",
]);
// Film title cards (on-screen text in the hero video), verified visually at the stated timestamps.
const FILM = new Set(["Solar panel cleaning", "Façade cleaning", "Roof moss removal", "Gutter cleaning"]);
// Functional/UI or flagged-placeholder strings (no product claims).
const UI = new Set([
  "Datasheet", "PDF · 368 KB", "ABZ Innovation C10 product catalogue, p. 9",
  "Approved regulatory wording to be supplied by The Bionic Eye before publication.",
]);

const copy = await import(pathToFileURL(path.join(projectDir, "src/content/copy.ts")).href);
const specs = await import(pathToFileURL(path.join(projectDir, "src/content/specs.ts")).href);

const strings = [];
const walk = (v, where) => {
  if (typeof v === "string") strings.push({ where, text: v });
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${where}.${k}`);
};
for (const [k, v] of Object.entries(copy)) walk(v, `copy.${k}`);
for (const [k, v] of Object.entries(specs)) walk(v, `specs.${k}`);

const SKIP_KEYS = /\.(id|href|image|alt|index|page|mark)$|\.(id|href)\b|\.phone\.href|\.email\.href|\.shop\.href/;
const rows = [];
for (const { where, text } of strings) {
  if (SKIP_KEYS.test(where)) continue;
  if (/\.alt$/.test(where)) continue;
  let status, evidence;
  const n = norm(delocalise(text));
  const hits = findIn(n);
  if (BRIEF.has(text)) { status = "BRIEF"; evidence = "contest brief"; }
  else if (hits.length) { status = "VERBATIM"; evidence = hits.join(", "); }
  else if (FILM.has(text)) { status = "FILM TITLE"; evidence = "hero film title card"; }
  else if (UI.has(text)) { status = "UI / PLACEHOLDER"; evidence = "designer UI label, flagged"; }
  else {
    // Sentence-case check for headings set in capitals in the source.
    const hitsCase = findIn(n.replace(/\s+/g, " "));
    status = hitsCase.length ? "VERBATIM" : "UNVERIFIED";
    evidence = hitsCase.join(", ") || "-";
  }
  rows.push({ where, text, status, evidence });
}

const counts = rows.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
for (const r of rows) if (r.status === "UNVERIFIED") console.log(`UNVERIFIED  ${r.where}  "${r.text}"`);
console.log(JSON.stringify(counts));
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ ranAt: new Date().toISOString(), counts, rows }, null, 2));
