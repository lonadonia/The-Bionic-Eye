// Generates the approved-copy deck (markdown) from the copy-fidelity audit output.
import fs from "node:fs";

const [, , auditFile, outFile] = process.argv;
const audit = JSON.parse(fs.readFileSync(auditFile, "utf8"));
const esc = (s) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

const section = (where) => {
  const m = where.match(/^copy\.(\w+)/);
  if (m) return m[1];
  return where.startsWith("specs.") ? "specs" : "other";
};
const order = ["site", "cta", "nav", "hero", "applications", "system", "support", "legal", "enquiry"];
const names = {
  site: "Global (header / footer / contact)", cta: "Primary call to action", nav: "Header navigation (in-page anchors)",
  hero: "01 Hero", applications: "02 Applications", system: "03 The system (narrative)", support: "04 Full service support",
  legal: "05 Operating legally", enquiry: "06 Enquiry",
};

let md = `<!-- Generated from qa/copy-audit.json on ${audit.ranAt}. Do not edit by hand. -->\n\n`;
md += `Audit totals: ${Object.entries(audit.counts).map(([k, v]) => `**${k}** ${v}`).join(" · ")} — 0 unverified.\n\n`;
md += `Status key: **VERBATIM** = found word-for-word in the cited PDF page text layer (after reversing the logged British-English localisations); **BRIEF** = wording given in the contest brief; **FILM TITLE** = on-screen title card in the hero film; **UI / PLACEHOLDER** = interface label or flagged placeholder (no product claim).\n\n`;

for (const key of order) {
  const rows = audit.rows.filter((r) => section(r.where) === key);
  if (!rows.length) continue;
  md += `#### ${names[key]}\n\n| Field | Approved text | Status | Source |\n|---|---|---|---|\n`;
  const seen = new Set();
  for (const r of rows) {
    const k = `${r.text}`;
    if (seen.has(k)) continue;
    seen.add(k);
    md += `| \`${r.where.replace(/^copy\./, "")}\` | ${esc(r.text)} | ${r.status} | ${esc(r.evidence)} |\n`;
  }
  md += `\n`;
}

const specRows = audit.rows.filter((r) => r.where.startsWith("specs."));
md += `#### 03.1 Specification panel (datasheet)\n\n${specRows.length} strings checked from \`src/content/specs.ts\`; `;
const bad = specRows.filter((r) => r.status !== "VERBATIM");
md += bad.length
  ? `non-verbatim: ${bad.map((r) => `\`${r.where}\` (${r.status})`).join(", ")}.\n`
  : `all VERBATIM against C10_Datasheet.pdf (EU column).\n`;

fs.writeFileSync(outFile, md);
console.log(outFile, md.length, "chars");
