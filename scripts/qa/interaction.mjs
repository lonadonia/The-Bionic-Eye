// Functional QA: drives the real page in Chrome and asserts behaviour. Prints PASS/FAIL/SKIP per check.
// SKIP is reported (never PASS) when the browser cannot decode H.264 — e.g. open-source Chromium
// builds — so film playback checks are only claimed where they actually ran.
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
  const status = ok === null ? "SKIP" : ok ? "PASS" : "FAIL";
  results.push({ id, status, detail });
  console.log(`${status}  ${id}${detail ? "  - " + detail : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const axeRun = async (page) => {
  await page.addScriptTag({ content: axeSrc });
  return page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) }));
  });
};
const scrollThrough = (page) =>
  page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
  });

// ---------- Desktop 1440, motion allowed ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(m.text()); });
  await page.goto(url, { waitUntil: "load" });
  await sleep(2500);
  const h264 = await page.evaluate(() => document.createElement("video").canPlayType('video/mp4; codecs="avc1.42E01E"') !== "");

  const hero = await page.evaluate(() => {
    const v = document.querySelector("#top video");
    return { paused: v.paused, muted: v.muted, t: Number(v.currentTime.toFixed(2)), src: v.currentSrc.split("/").pop(), decorative: v.closest("[aria-hidden]")?.getAttribute("aria-hidden"), shown: v.dataset.started };
  });
  check("QA-HERO-AUTOPLAY", h264 ? !hero.paused && hero.muted && hero.t > 0.3 && /hero-background-loop-1080/.test(hero.src) && hero.shown === "true" : null, h264 ? JSON.stringify(hero) : "browser cannot decode H.264 — not tested here");
  check("QA-HERO-DECORATIVE", hero.decorative === "true", `aria-hidden=${hero.decorative}`);
  const poster = await page.evaluate(() => {
    const img = document.querySelector("#top .hero__poster");
    return { complete: img.complete && img.naturalWidth > 0, priority: img.getAttribute("fetchpriority"), loading: img.getAttribute("loading") };
  });
  check("QA-HERO-POSTER-FIRST", poster.complete && poster.priority === "high" && poster.loading !== "lazy", JSON.stringify(poster));
  const heroUi = await page.evaluate(() => ({
    ranges: document.querySelectorAll("#top input[type=range]").length,
    buttons: document.querySelectorAll("#top button").length,
    ctaInHero: !!document.querySelector('#top a.btn-primary[href="#enquiry"]'),
  }));
  check("QA-HERO-SINGLE-CONTROL", heroUi.ranges === 0 && heroUi.buttons === 1 && heroUi.ctaInHero, JSON.stringify(heroUi));
  if (h264) {
    await page.getByRole("button", { name: "Pause background film" }).click();
    await sleep(300);
    check("QA-HERO-PAUSE", await page.evaluate(() => document.querySelector("#top video").paused));
  } else check("QA-HERO-PAUSE", null, "no H.264 decoder");

  // Header: transparent over the film at the top, solid once scrolled.
  const topState = await page.evaluate(() => document.documentElement.dataset.top);
  await page.evaluate(() => window.scrollTo(0, 600));
  await sleep(400);
  const scrolledState = await page.evaluate(() => ({ top: document.documentElement.dataset.top, bg: getComputedStyle(document.querySelector(".site-header")).backgroundColor }));
  check("QA-HEADER-STATE", topState === "true" && scrolledState.top === "false" && scrolledState.bg !== "rgba(0, 0, 0, 0)", JSON.stringify({ topState, ...scrolledState }));

  // Reveals: after scrolling the whole page nothing remains hidden.
  await scrollThrough(page);
  await sleep(1200);
  const stuck = await page.evaluate(() => document.querySelectorAll('[data-reveal-state="pending"]').length);
  check("QA-REVEAL-COMPLETE", stuck === 0, `pending after full scroll=${stuck}`);

  // Capability story: the stage follows the narrative.
  const story = [];
  for (const i of [0, 1, 2]) {
    await page.evaluate((i) => document.querySelector(`[data-step="${i}"]`).scrollIntoView({ block: "center", behavior: "instant" }), i);
    await sleep(600);
    story.push(await page.evaluate(() => [...document.querySelectorAll(".story-stage__layer")].findIndex((l) => l.dataset.active === "true")));
  }
  const stageVisible = await page.evaluate(() => getComputedStyle(document.querySelector(".story-stage")).display !== "none");
  check("QA-STORY-STAGE-SYNC", stageVisible && story.join(",") === "0,1,2", `stage visible=${stageVisible}, active=${story.join(",")}`);
  await page.locator(".story-index__btn").first().click();
  await sleep(900);
  check("QA-STORY-INDEX-JUMP", (await page.evaluate(() => document.querySelector('.story-index__btn[aria-current="true"]')?.textContent)).includes("Radar"));

  await page.locator("#full-service-support").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 200));
  await sleep(700);
  const current = await page.evaluate(() => document.querySelector('header nav a[aria-current="location"]')?.textContent);
  check("QA-NAV-SCROLLSPY", current === "Full service support", `current=${current}`);

  // Support tabs: keyboard and pointer.
  const salesTab = page.getByRole("tab", { name: "Sales" });
  await salesTab.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await sleep(450);
  const tabState = await page.evaluate(() => ({
    selected: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent,
    focused: document.activeElement?.textContent,
    visiblePanels: [...document.querySelectorAll('[role="tabpanel"]')].filter((p) => getComputedStyle(p).visibility === "visible").length,
  }));
  check("QA-SUPPORT-TABS-KEYBOARD", tabState.selected === "Training" && tabState.focused === "Training" && tabState.visiblePanels === 1, JSON.stringify(tabState));
  await page.keyboard.press("End");
  check("QA-SUPPORT-TABS-END", (await page.evaluate(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent)) === "Enhanced warranty option");
  await page.getByRole("tab", { name: "Training" }).click();
  await sleep(450);
  await page.locator('[role="tabpanel"][data-active="true"] a', { hasText: "Enquire about Training" }).click();
  await sleep(900);
  const interest = await page.evaluate(() => document.querySelector("#enquiry select").value);
  check("QA-SERVICE-PRESELECT", interest === "training", `select=${interest}`);
  const anchor = await page.evaluate(() => ({ head: document.querySelector("#enquiry").getBoundingClientRect().top, header: document.querySelector(".site-header").getBoundingClientRect().bottom }));
  check("QA-ANCHOR-BELOW-HEADER", anchor.head >= anchor.header - 1, JSON.stringify(anchor));

  // Legal cross-reference opens the matching support tab.
  await page.locator("#operating-legally a", { hasText: "Operational Authorisation support" }).click();
  await sleep(900);
  check("QA-LEGAL-CROSSREF", (await page.evaluate(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent)) === "Operational Authorisation support");

  // Specification finder.
  const finder = page.getByLabel("Find a specification");
  await finder.fill("karcher");
  await sleep(400);
  const f1 = await page.evaluate(() => ({ rows: document.querySelectorAll("#specifications .spec-row").length, mark: document.querySelector("#specifications mark")?.textContent, live: document.querySelector('#specifications [aria-live]')?.textContent }));
  check("QA-SPEC-FILTER-ACCENTS", f1.rows === 1 && f1.mark === "Kärcher" && /1 of 48/.test(f1.live), JSON.stringify(f1));
  await finder.fill("zzzz");
  await sleep(300);
  const f2 = await page.evaluate(() => ({ rows: document.querySelectorAll("#specifications .spec-row").length, text: document.querySelector("#specifications").innerText.includes("No specification matches") }));
  check("QA-SPEC-FILTER-EMPTY", f2.rows === 0 && f2.text, JSON.stringify(f2));
  await finder.press("Escape");
  await sleep(300);
  check("QA-SPEC-FILTER-ESCAPE", (await page.evaluate(() => document.querySelectorAll("#specifications .spec-row").length)) === 48);

  // Form.
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
  await page.locator('#enquiry input[name="phone"]').focus();
  await sleep(200);
  const emailErr = await page.evaluate(() => document.querySelector('#enquiry input[name="email"]').getAttribute("aria-invalid"));
  check("QA-FORM-EMAIL-FORMAT", emailErr === "true");
  await page.locator('#enquiry input[name="email"]').fill("fm@example.co.uk");
  await page.locator("#enquiry form button[type=submit]").click();
  await sleep(300);
  const done = await page.evaluate(() => document.querySelector('#enquiry [role="status"]')?.textContent || "");
  check("QA-FORM-PREVIEW-STATE", /nothing has been sent/.test(done) && /Training/.test(done), done.slice(0, 100));

  // Click-to-watch film inside the Training panel.
  await page.getByRole("tab", { name: "Training" }).click();
  await sleep(450);
  await page.getByRole("button", { name: /Play film.*C10 Academy/ }).click();
  await sleep(1800);
  const w = await page.evaluate(() => {
    const v = document.querySelector('#full-service-support [role="tabpanel"][data-active="true"] video');
    return v ? { controls: v.controls, paused: v.paused, muted: v.muted, focused: document.activeElement === v } : null;
  });
  check("QA-WATCH-VIDEO", !!w && w.controls && !w.muted && w.focused && (h264 ? !w.paused : true), JSON.stringify(w) + (h264 ? "" : " (playback itself not verifiable without H.264)"));
  await page.getByRole("tab", { name: "Sales" }).click();
  await sleep(500);
  check("QA-WATCH-VIDEO-PAUSES-WHEN-HIDDEN", await page.evaluate(() => [...document.querySelectorAll("#full-service-support video")].every((v) => v.paused)));

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
  await scrollThrough(page);
  await sleep(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  const axe = await axeRun(page);
  check("QA-AXE-WCAG-AA-1440", axe.length === 0, axe.length ? JSON.stringify(axe) : "0 violations");
  check("QA-NO-CONSOLE-ERRORS-1440", errors.length === 0, errors.slice(0, 3).join(" | "));
  await ctx.close();
}

// ---------- Mobile 390: hero composition, skip link, drawer, support accordion, spec collapse ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "load" });
  await sleep(1500);
  const mobileHero = await page.evaluate(() => {
    const cta = document.querySelector("#top .btn-primary").getBoundingClientRect();
    const media = document.querySelector("#top .hero__media").getBoundingClientRect();
    const copy = document.querySelector("#top .hero__kicker").getBoundingClientRect();
    return { ctaAboveFold: cta.bottom <= innerHeight, mediaBottom: Math.round(media.bottom), copyTop: Math.round(copy.top) };
  });
  check("QA-HERO-MOBILE-COMPOSITION", mobileHero.ctaAboveFold && mobileHero.copyTop > mobileHero.mediaBottom * 0.8, JSON.stringify(mobileHero));

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

  const acc = page.locator("#full-service-support button[aria-expanded]", { hasText: "Servicing" });
  await acc.click();
  await sleep(200);
  const accState = await page.evaluate(() => {
    const btns = [...document.querySelectorAll("#full-service-support button[aria-expanded]")].filter((b) => b.offsetParent);
    return btns.map((b) => `${b.textContent}:${b.getAttribute("aria-expanded")}`);
  });
  check("QA-SUPPORT-ACCORDION", accState.filter((x) => x.endsWith(":true")).length === 1 && accState.includes("Servicing:true"), accState.join(" | "));

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
  const story = await page.evaluate(() => ({ stage: getComputedStyle(document.querySelector(".story-stage")).display, inline: getComputedStyle(document.querySelector(".story-inline-media")).display }));
  check("QA-STORY-MOBILE-STACKED", story.stage === "none" && story.inline !== "none", JSON.stringify(story));

  await scrollThrough(page);
  await sleep(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  const axe = await axeRun(page);
  check("QA-AXE-WCAG-AA-390", axe.length === 0, axe.length ? JSON.stringify(axe) : "0 violations");
  check("QA-NO-PAGE-ERRORS-390", errors.length === 0, errors.slice(0, 3).join(" | "));
  await ctx.close();
}

// ---------- Reduced motion: no autoplay, no entrance, no reveal states, stacked story ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await sleep(1500);
  const rm = await page.evaluate(() => ({
    heroPaused: document.querySelector("#top video").paused,
    toggle: document.querySelector("#top .film-ctl__btn")?.getAttribute("aria-label"),
    entrance: getComputedStyle(document.querySelector(".hero-in")).animationName,
    revealStates: document.querySelectorAll("[data-reveal-state]").length,
    stage: getComputedStyle(document.querySelector(".story-stage")).display,
  }));
  check("QA-REDUCED-MOTION", rm.heroPaused && rm.toggle === "Play background film" && rm.entrance === "none" && rm.revealStates === 0 && rm.stage === "none", JSON.stringify(rm));
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => r.status === "FAIL").length;
const skipped = results.filter((r) => r.status === "SKIP").length;
console.log(`\n${results.length - failed - skipped}/${results.length} checks passed, ${failed} failed, ${skipped} not testable here`);
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ url, ranAt: new Date().toISOString(), results }, null, 2));
