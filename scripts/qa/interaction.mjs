// Functional QA: drives the real page in Chrome and asserts behaviour. Prints PASS/FAIL per check.
import { chromium } from "playwright-core";
import fs from "node:fs";
import { createRequire } from "node:module";

const url = process.argv[2];
const outFile = process.argv[3];
const axeSrc = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const results = [];
const check = (id, ok, detail = "") => {
  results.push({ id, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${id}${detail ? "  - " + detail : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const axeRun = async (page) => {
  await page.addScriptTag({ content: axeSrc });
  return page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) }));
  });
};

// ---------- Desktop 1440, motion allowed ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(url, { waitUntil: "load" });
  await sleep(2500);
  const hero = await page.evaluate(() => {
    const v = document.querySelector("#top video");
    return {
      paused: v.paused,
      muted: v.muted,
      t: Number(v.currentTime.toFixed(2)),
      src: v.currentSrc.split("/").pop(),
      decorative: v.getAttribute("aria-hidden"),
    };
  });
  check("QA-HERO-AUTOPLAY", !hero.paused && hero.muted && hero.t > 0.3 && /hero-background-loop-1080/.test(hero.src), JSON.stringify(hero));
  check("QA-HERO-DECORATIVE", hero.decorative === "true", `aria-hidden=${hero.decorative}`);

  const ui = await page.evaluate(() => ({
    ranges: document.querySelectorAll("#top input[type=range]").length,
    lists: document.querySelectorAll("#top .hero ol").length,
    playerText: /Sound off|Elapsed|Chapters in this film|C10 Use Case Shorts/.test(document.querySelector("#top .hero").innerText),
    buttons: document.querySelectorAll("#top .hero button").length,
  }));
  check("QA-HERO-NO-PLAYER-UI", ui.ranges === 0 && ui.lists === 0 && !ui.playerText && ui.buttons === 1, JSON.stringify(ui));

  await page.getByRole("button", { name: "Pause background film" }).click();
  await sleep(300);
  check("QA-HERO-PAUSE", await page.evaluate(() => document.querySelector("#top video").paused));
  await page.getByRole("button", { name: "Play background film" }).click();
  await sleep(600);
  check("QA-HERO-RESUME", await page.evaluate(() => !document.querySelector("#top video").paused));

  await page.locator("#the-system").scrollIntoViewIfNeeded();
  await sleep(900);
  const offscreenPaused = await page.evaluate(() => document.querySelector("#top video").paused);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1200);
  const resumed = await page.evaluate(() => !document.querySelector("#top video").paused);
  check("QA-HERO-OFFSCREEN-PAUSE", offscreenPaused && resumed, `paused off-screen=${offscreenPaused}, resumed on return=${resumed}`);

  await page.locator("#full-service-support").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 200));
  await sleep(700);
  const current = await page.evaluate(() => document.querySelector('header nav a[aria-current="location"]')?.textContent);
  check("QA-NAV-SCROLLSPY", current === "Full service support", `current=${current}`);

  await page.locator("#full-service-support a", { hasText: "Training" }).click();
  await sleep(900);
  const interest = await page.evaluate(() => document.querySelector("#enquiry select").value);
  check("QA-SERVICE-PRESELECT", interest === "training", `select=${interest}`);

  await page.locator("#enquiry form button[type=submit]").click();
  await sleep(300);
  const errs = await page.evaluate(() => ({
    invalid: document.querySelectorAll('#enquiry [aria-invalid="true"]').length,
    alert: !!document.querySelector('#enquiry [role="alert"]'),
    focus: document.activeElement?.getAttribute("role"),
  }));
  check("QA-FORM-VALIDATION", errs.invalid === 2 && errs.alert && errs.focus === "alert", JSON.stringify(errs));

  await page.locator('#enquiry input[name="name"]').fill("Test Facilities Manager");
  await page.locator('#enquiry input[name="email"]').fill("not-an-email");
  await page.locator("#enquiry form button[type=submit]").click();
  await sleep(200);
  const emailErr = await page.evaluate(() => document.querySelector('#enquiry input[name="email"]').getAttribute("aria-invalid"));
  check("QA-FORM-EMAIL-FORMAT", emailErr === "true");

  await page.locator('#enquiry input[name="email"]').fill("fm@example.co.uk");
  await page.locator("#enquiry form button[type=submit]").click();
  await sleep(300);
  const done = await page.evaluate(() => document.querySelector('#enquiry [role="status"]')?.textContent || "");
  check("QA-FORM-PREVIEW-STATE", /nothing has been sent/.test(done) && /Training/.test(done), done.slice(0, 100));

  await page.locator("#full-service-support").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /^Play .*C10 Academy/ }).click();
  await sleep(1800);
  const w = await page.evaluate(() => {
    const v = document.querySelector("#full-service-support video");
    return v ? { controls: v.controls, paused: v.paused, muted: v.muted, t: Number(v.currentTime.toFixed(2)), focused: document.activeElement === v } : null;
  });
  check("QA-WATCH-VIDEO", !!w && w.controls && !w.paused && !w.muted && w.focused, JSON.stringify(w));

  const pdf = await page.request.get(new URL("/downloads/C10_Datasheet.pdf", url).toString());
  check("QA-DATASHEET-PDF", pdf.status() === 200 && pdf.headers()["content-type"].includes("pdf"), `${pdf.status()} ${pdf.headers()["content-type"]}`);

  const s = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    order: [...document.querySelectorAll("main > section")].map((x) => x.id),
    lang: document.documentElement.lang,
    imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
    robots: document.querySelector('meta[name="robots"]')?.content,
  }));
  check("QA-ONE-H1", s.h1 === 1, `h1=${s.h1}`);
  check("QA-SECTION-ORDER", s.order.join(",") === "top,applications,the-system,full-service-support,operating-legally,enquiry", s.order.join(" > "));
  check("QA-LANG-EN-GB", s.lang === "en-GB");
  check("QA-IMG-ALT", s.imgsNoAlt === 0, `missing=${s.imgsNoAlt}`);
  check("QA-NOINDEX-PREVIEW", /noindex/.test(s.robots || ""), s.robots);

  await page.goto(url, { waitUntil: "load" });
  const axe = await axeRun(page);
  check("QA-AXE-WCAG-AA-1440", axe.length === 0, axe.length ? JSON.stringify(axe) : "0 violations");
  check("QA-NO-CONSOLE-ERRORS-1440", errors.length === 0, errors.slice(0, 3).join(" | "));
  await ctx.close();
}

// ---------- Mobile 390: skip link, drawer, spec collapse ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "load" });

  await sleep(1500);
  const mobileHero = await page.evaluate(() => {
    const v = document.querySelector("#top video");
    const toggle = document.querySelector("#top .hero-toggle").getBoundingClientRect();
    const cta = document.querySelector("#top .btn-primary").getBoundingClientRect();
    const overlap = !(toggle.right <= cta.left || toggle.left >= cta.right || toggle.bottom <= cta.top || toggle.top >= cta.bottom);
    return { src: v.currentSrc.split("/").pop(), playing: !v.paused, toggleOverlapsCta: overlap };
  });
  check("QA-HERO-MOBILE", /hero-background-loop-540/.test(mobileHero.src) && mobileHero.playing && !mobileHero.toggleOverlapsCta, JSON.stringify(mobileHero));

  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent);
  check("QA-SKIP-LINK-FIRST", skip === "Skip to content", `first focus=${skip}`);

  await page.getByRole("button", { name: "Menu" }).click();
  await sleep(200);
  const dlg = await page.evaluate(() => ({
    open: !!document.querySelector('[role="dialog"]'),
    focusInside: !!document.activeElement?.closest('[role="dialog"]'),
    overflow: document.body.style.overflow,
  }));
  check("QA-DRAWER-OPEN", dlg.open && dlg.focusInside && dlg.overflow === "hidden", JSON.stringify(dlg));
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  check("QA-DRAWER-FOCUS-TRAP", await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')));
  await page.keyboard.press("Escape");
  await sleep(150);
  const after = await page.evaluate(() => ({ closed: !document.querySelector('[role="dialog"]'), focus: document.activeElement?.textContent?.trim() }));
  check("QA-DRAWER-ESC-RETURNS-FOCUS", after.closed && after.focus === "Menu", JSON.stringify(after));

  const spec = await page.evaluate(() =>
    [...document.querySelectorAll('#the-system section[id^="spec-"] button[aria-expanded]')].map((b) => b.getAttribute("aria-expanded")),
  );
  check("QA-SPEC-MOBILE-COLLAPSE", spec[0] === "true" && spec.slice(1).every((x) => x === "false"), spec.join(","));
  await page.locator("#spec-cleaning-system button[aria-expanded]").click();
  const opened = await page.evaluate(
    () =>
      document.querySelector("#spec-cleaning-system button").getAttribute("aria-expanded") === "true" &&
      getComputedStyle(document.querySelector("#spec-cleaning-system dl")).display !== "none",
  );
  check("QA-SPEC-MOBILE-EXPAND", opened);

  const axe = await axeRun(page);
  check("QA-AXE-WCAG-AA-390", axe.length === 0, axe.length ? JSON.stringify(axe) : "0 violations");
  check("QA-NO-PAGE-ERRORS-390", errors.length === 0, errors.slice(0, 3).join(" | "));
  await ctx.close();
}

// ---------- Reduced motion: no autoplay, no reveal animation ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await sleep(1500);
  const rm = await page.evaluate(() => ({
    heroPaused: document.querySelector("#top video").paused,
    toggle: document.querySelector("#top .hero-toggle")?.getAttribute("aria-label"),
    anim: getComputedStyle(document.querySelector("[data-reveal]")).animationName,
  }));
  check("QA-REDUCED-MOTION", rm.heroPaused && rm.toggle === "Play background film" && rm.anim === "none", JSON.stringify(rm));
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ url, ranAt: new Date().toISOString(), results }, null, 2));
