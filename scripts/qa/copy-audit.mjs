// Copy-fidelity audit. Every visitor-facing string in src/content/copy.ts is matched against the text
// layer of the contest copy PDF ("Asset Cleaning page: contest copy"). Matching ignores only case,
// whitespace/line breaks and apostrophe style (’ vs '). The few labels that come from the contest
// announcement rather than the PDF are classified from an explicit allow-list; anything else that
// does not match is reported as UNVERIFIED and fails the run.
//
// Usage: node scripts/qa/copy-audit.mjs [out.json]      (Node 22.18+; needs: npm i --no-save mupdf)
import * as mupdf from "mupdf";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pdfFile = path.join(root, "design-handoff/the-bionic-eye-asset-cleaning/source-reference/Asset_Cleaning_Contest_Copy.pdf");
const outFile = process.argv[2];

const norm = (s) =>
  s
    .replace(/[‘’ʼ]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const doc = mupdf.Document.openDocument(fs.readFileSync(pdfFile), "application/pdf");
let pdfText = "";
for (let i = 0; i < doc.countPages(); i++) pdfText += " " + doc.loadPage(i).toStructuredText("preserve-whitespace").asText();
pdfText = norm(pdfText);

const copy = await import(pathToFileURL(path.join(root, "src/content/copy.ts")).href);
const { site, nav, cta, hero, applications, system, support, regulation, evidence, enquiry, footer, joinRich } = copy;

/** Labels the contest announcement supplies (section names, hero CTA, service areas). */
const announcement = new Set(
  [
    cta.demonstration.label,
    site.pageName,
    support.heading,
    regulation.heading,
    enquiry.heading,
    ...support.services.map((s) => s.title),
  ].map(norm),
);

const strings = [
  ...nav.map((n, i) => [`nav[${i}]`, n.label]),
  ["cta.requirement", cta.requirement],
  ["cta.demonstration", cta.demonstration.label],
  ["hero.heading", hero.heading],
  ...hero.paragraphs.map((p, i) => [`hero.paragraphs[${i}]`, p]),
  ["applications.heading", applications.heading],
  ...applications.items.map((a) => [`applications.${a.id}`, a.text]),
  ["system.heading", system.heading],
  ...system.paragraphs.map((p, i) => [`system.paragraphs[${i}]`, p]),
  ["system.product", system.product],
  ...system.specs.flatMap((s) => [
    [`system.specs.${s.id}.label`, s.label],
    [`system.specs.${s.id}.value`, s.value],
    [`system.specs.${s.id}.typeset`, s.lines.map((l) => l.map((p) => p.text).join("")).join("")],
  ]),
  ["support.heading", support.heading],
  ["support.supplyHeading", support.supplyHeading],
  ...support.paragraphs.map((p) => [`support.paragraphs.${p.id}`, p.text]),
  ...support.services.map((s) => [`support.services.${s.id}`, s.title]),
  ["regulation.heading", regulation.heading],
  ...regulation.paragraphs.map((p, i) => [`regulation.paragraphs[${i}]`, joinRich(p)]),
  ["regulation.link", regulation.link],
  ["evidence.heading", evidence.heading],
  ["evidence.intro", evidence.intro],
  ...evidence.cases.map((c, i) => [`evidence.cases[${i}]`, joinRich(c)]),
  ["evidence.qualification", evidence.qualification],
  ["enquiry.heading", enquiry.heading],
  ["enquiry.closing", enquiry.closing],
  ...Object.entries(enquiry.fields).map(([k, v]) => [`enquiry.fields.${k}`, v]),
  ["enquiry.submit", enquiry.submit],
  ["footer.address", footer.address],
  ["footer.telephone", footer.telephone.lead + footer.telephone.link.display + footer.telephone.trail],
  ["footer.email", footer.email.lead + footer.email.link.display + footer.email.trail],
  ["footer.brands", `${footer.brandsLabel}: ${footer.brands.join(" | ")}`],
  ["footer.operator", footer.operator],
  ["footer.approval", footer.approval],
  ["footer.registration", footer.registration],
];

const rows = strings.map(([field, text]) => {
  const n = norm(text);
  const status = pdfText.includes(n) ? "VERBATIM" : announcement.has(n) ? "ANNOUNCEMENT" : "UNVERIFIED";
  return { field, text, status };
});

// The page must also carry every paragraph of the PDF that belongs to it (nothing dropped).
const required = [
  ...hero.paragraphs,
  ...system.paragraphs,
  ...support.paragraphs.map((p) => p.text),
  ...regulation.paragraphs.map(joinRich),
  evidence.intro,
  ...evidence.cases.map(joinRich),
  evidence.qualification,
  enquiry.closing,
  ...applications.items.map((a) => a.text),
];

const totals = rows.reduce((t, r) => ((t[r.status] = (t[r.status] ?? 0) + 1), t), {});
for (const r of rows) if (r.status !== "VERBATIM") console.log(`${r.status.padEnd(12)} ${r.field}: ${r.text}`);
console.log(`\n${rows.length} strings — ${Object.entries(totals).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
console.log(`Applications: ${applications.items.length} of 7 · Specifications: ${system.specs.length} of 5 · required paragraphs present: ${required.length}`);
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ source: path.relative(root, pdfFile), ranAt: new Date().toISOString(), totals, rows }, null, 2));
process.exit(totals.UNVERIFIED ? 1 : 0);
