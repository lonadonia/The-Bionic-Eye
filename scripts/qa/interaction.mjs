// Functional QA: drives the real page and asserts behaviour. Prints PASS / FAIL / SKIP per check.
// SKIP is reported (never PASS) when the browser cannot decode H.264 (open-source Chromium), so
// playback is only claimed where it actually ran. Nothing is ever submitted to a real endpoint.
//
// Usage: node scripts/qa/interaction.mjs http://localhost:3000/ [out.json]
//        HERO_TEST_WEBM=hero.webm node scripts/qa/interaction.mjs …   (see below; Chromium without H.264)
// Needs: npm i --no-save playwright-core axe-core; CHROME_PATH or Google Chrome.
import { chromium } from "playwright-core";
import fs from "node:fs";
import { createRequire } from "node:module";

const url = process.argv[2];
const outFile = process.argv[3];
const withQuery = (q) => url + (url.includes("?") ? "&" : "?") + q;
const axeSrc = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }),
  headless: true,
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
      await new Promise((r) => setTimeout(r, 60));
    }
  });
const settle = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve) => {
        let last = -1;
        let still = 0;
        const t0 = performance.now();
        const tick = () => {
          still = scrollY === last ? still + 1 : 0;
          last = scrollY;
          if (still >= 12 || performance.now() - t0 > 6000) resolve(scrollY);
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
  );
const headerOverlap = (page, sel) =>
  page.evaluate((sel) => {
    const header = document.querySelector(".site-header").getBoundingClientRect();
    const el = document.querySelector(sel).getBoundingClientRect();
    return { headerBottom: Math.round(header.bottom), targetTop: Math.round(el.top) };
  }, sel);

// Browsers without H.264 (open-source Chromium) can still exercise the hero logic: set HERO_TEST_WEBM
// to a VP9 transcode of the loop and it is served in place of the MP4 (test-only; never shipped).
const heroWebm = process.env.HERO_TEST_WEBM;
const useWebm = async (ctx) => {
  if (!heroWebm) return;
  await ctx.route(/hero-background-loop-\d+\.mp4/, (r) => r.fulfill({ status: 200, contentType: "video/webm", body: fs.readFileSync(heroWebm) }));
  await ctx.addInitScript(() => {
    new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => n.tagName === "SOURCE" && n.removeAttribute("type")))).observe(document, {
      childList: true,
      subtree: true,
    });
  });
};

// ---------- Desktop 1440, motion allowed ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await useWebm(ctx);
  const page = await ctx.newPage();
  const errors = [];
  const posts = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(m.text());
  });
  page.on("request", (r) => r.method() !== "GET" && posts.push(`${r.method()} ${r.url()}`));
  await page.goto(url, { waitUntil: "load" });
  await sleep(1500);
  const h264 = Boolean(heroWebm) || (await page.evaluate(() => document.createElement("video").canPlayType('video/mp4; codecs="avc1.42E01E"') !== ""));

  // Structure and order
  const structure = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    h1Text: document.querySelector("h1")?.textContent,
    order: Array.from(document.querySelectorAll("main > section")).map((s) => s.id),
    lang: document.documentElement.lang,
  }));
  check("QA-ONE-H1", structure.h1 === 1 && structure.h1Text === "Facade and structure cleaning without access equipment.", structure.h1Text);
  check(
    "QA-SECTION-ORDER",
    structure.order.join(",") === "top,applications,system,support,regulation,evidence,enquiry",
    structure.order.join(" → "),
  );
  check("QA-LANG-EN-GB", structure.lang === "en-GB", structure.lang);

  // Hero
  const hero = await page.evaluate(() => {
    const img = document.querySelector("#top .hero__poster");
    const v = document.querySelector("#top video");
    return {
      poster: img.complete && img.naturalWidth > 0,
      priority: img.getAttribute("fetchpriority"),
      posterSrc: decodeURIComponent(img.currentSrc),
      videoHidden: v.getAttribute("aria-hidden"),
      muted: v.muted,
      inline: v.playsInline,
      sources: Array.from(v.querySelectorAll("source")).map((s) => s.getAttribute("src")),
      control: document.querySelector("#top .hero__control--toggle")?.textContent.trim(),
      ctas: Array.from(document.querySelectorAll("#top a.btn")).map((a) => [a.textContent.trim(), a.getAttribute("href")]),
      paragraphs: document.querySelectorAll("#top .hero__intro p").length,
    };
  });
  check("QA-HERO-POSTER", hero.poster && hero.priority === "high" && /hero-c10-use-cases/.test(hero.posterSrc), hero.posterSrc.split("url=")[1]?.split("&")[0]);
  check("QA-HERO-FILM-SOURCE", hero.sources.every((s) => /hero-background-loop-(1080|540)\.mp4$/.test(s)) && hero.muted && hero.inline, hero.sources.join(", "));
  check("QA-HERO-COPY-COMPLETE", hero.paragraphs === 2, `${hero.paragraphs} paragraphs`);
  check("QA-HERO-ONE-CTA", hero.ctas.length === 1 && hero.ctas[0][0] === "Book a demonstration" && hero.ctas[0][1] === "#enquiry", JSON.stringify(hero.ctas));
  if (h264) {
    await page.waitForFunction(() => !document.querySelector("#top video").paused, null, { timeout: 8000 }).catch(() => undefined);
    const playing = await page.evaluate(() => !document.querySelector("#top video").paused);
    await page.click("#top .hero__control--toggle");
    await sleep(200);
    const paused = await page.evaluate(() => document.querySelector("#top video").paused);
    const label = (await page.textContent("#top .hero__control--toggle")).trim();
    check(
      "QA-HERO-AUTOPLAY-AND-PAUSE",
      playing && paused && label.startsWith("Play film"),
      `playing=${playing} paused=${paused} label=${label}${heroWebm ? " (VP9 stand-in for the MP4)" : ""}`,
    );
    await page.click("#top .hero__control--toggle"); // resume for the remaining checks
  } else {
    check("QA-HERO-AUTOPLAY-AND-PAUSE", null, "browser cannot decode H.264, not tested here");
  }
  // Without decodable video the control must not claim playback.
  check("QA-HERO-CONTROL-HONEST", heroWebm || h264 ? Boolean(hero.control) : hero.control?.startsWith("Play film"), hero.control);

  // Media viewer: "Watch the full film" opens the complete supplied film in a modal dialog
  await page.click("#top .hero__control--full");
  await sleep(500);
  const dlg = await page.evaluate(() => {
    const d = document.querySelector("#top dialog[open]");
    const v = d?.querySelector("video");
    return { open: Boolean(d), modal: d?.matches(":modal"), src: v?.getAttribute("src"), controls: v?.controls, focusInside: Boolean(d?.contains(document.activeElement)) };
  });
  await page.keyboard.press("Escape");
  await sleep(300);
  const dlgClosed = await page.evaluate(() => ({
    closed: !document.querySelector("#top dialog[open]"),
    videoGone: !document.querySelector("#top dialog video"),
    focusBack: document.activeElement?.classList.contains("hero__control--full"),
  }));
  check(
    "QA-HERO-FULL-FILM",
    dlg.open && dlg.modal && /hero-c10-use-cases-full-720\.mp4$/.test(dlg.src ?? "") && dlg.controls && dlg.focusInside && dlgClosed.closed && dlgClosed.videoGone && dlgClosed.focusBack,
    JSON.stringify({ ...dlg, ...dlgClosed }),
  );

  // Header and navigation
  const navInfo = await page.evaluate(() => ({
    labels: Array.from(document.querySelectorAll(".site-nav a")).map((a) => a.textContent.trim().replace(/\s*\(.*\)$/, "")),
    shop: (() => {
      const a = Array.from(document.querySelectorAll(".site-nav a")).find((x) => x.textContent.includes("Shop"));
      return { href: a?.href, target: a?.target };
    })(),
    headerH: document.querySelector(".site-header").getBoundingClientRect().height,
    sticky: getComputedStyle(document.querySelector(".site-header")).position,
  }));
  check(
    "QA-NAV-LABELS",
    navInfo.labels.join("|") === "Solutions|Support|Regulation|Sectors|About Us|Contact|Shop",
    navInfo.labels.join(" | "),
  );
  check("QA-NAV-SHOP", navInfo.shop.href === "https://shop.thebioniceye.co.uk/" && navInfo.shop.target === "_blank", JSON.stringify(navInfo.shop));
  check("QA-HEADER-STICKY", navInfo.sticky === "sticky" && navInfo.headerH === 84, `${navInfo.sticky}, ${navInfo.headerH}px`);
  await page.evaluate(() => window.scrollTo(0, 2400));
  await sleep(300);
  const headerAfter = await page.evaluate(() => document.querySelector(".site-header").getBoundingClientRect());
  check("QA-HEADER-NO-SHIFT", headerAfter.top === 0 && headerAfter.height === 84, `top ${headerAfter.top}, height ${headerAfter.height}`);

  for (const [label, target] of [
    ["Support", "#support"],
    ["Regulation", "#regulation"],
    ["Sectors", "#applications"],
    ["Contact", "#enquiry"],
  ]) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click(`.site-nav a:has-text("${label}")`);
    await sleep(200);
    await settle(page);
    const o = await headerOverlap(page, target);
    check(`QA-NAV-${label.toUpperCase()}`, Math.abs(o.targetTop - o.headerBottom) <= 2, JSON.stringify(o));
  }

  // Hero CTA reaches the form below the sticky header
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(200);
  await page.click("#top a.btn-primary");
  await sleep(200);
  await settle(page);
  const cta = await headerOverlap(page, "#enquiry form");
  check("QA-CTA-REACHES-FORM", cta.targetTop >= cta.headerBottom && cta.targetTop < 900, JSON.stringify(cta));

  // Supporting films: click-to-watch swaps to native controls; nothing loads before
  const before = await page.evaluate(() => document.querySelectorAll("main video:not(#top video)").length);
  await page.locator(".film-strip figure button").nth(1).scrollIntoViewIfNeeded();
  await page.locator(".film-strip figure button").nth(1).click();
  await sleep(400);
  const watch = await page.evaluate(() => {
    const v = document.querySelector(".film-strip video");
    return v ? { controls: v.controls, focused: document.activeElement === v, src: v.getAttribute("src") } : null;
  });
  check("QA-WATCH-VIDEO", before === 0 && watch?.controls && watch.focused && /system-c10-introduction-720/.test(watch.src), JSON.stringify({ before, watch }));

  // Every supplied film is reachable: six inline viewers and three media-viewer buttons (plus the hero loop)
  const reach = await page.evaluate(() => ({
    inline: document.querySelectorAll("main .is-playable, main figure video").length,
    dialogs: Array.from(document.querySelectorAll("main button[aria-haspopup=dialog]")).map((b) => b.textContent.trim().replace(/\s+/g, " ").slice(0, 40)),
  }));
  check("QA-ALL-FILMS-REACHABLE", reach.inline === 6 && reach.dialogs.length === 3, JSON.stringify(reach));

  // Product explorer: three real views on one fixed stage, radio semantics, nozzle callout only where visible
  await page.locator(".explorer").scrollIntoViewIfNeeded();
  await sleep(1200);
  const stageH0 = await page.evaluate(() => Math.round(document.querySelector(".stage__canvas").getBoundingClientRect().height));
  await page.click(".views__option >> nth=2");
  await sleep(400);
  const ex1 = await page.evaluate(() => ({
    radios: document.querySelectorAll('.views [role="radio"]').length,
    checked: document.querySelector('.views [aria-checked="true"]')?.textContent.trim(),
    active: Array.from(document.querySelectorAll(".stage__img")).map((i) => i.dataset.active).join(),
    alt: document.querySelector('.stage__img[data-active="true"]')?.getAttribute("alt")?.slice(0, 24),
    callouts: Array.from(document.querySelectorAll(".stage .callout")).map((c) => (c.hasAttribute("data-hidden") ? "hidden" : "shown")).join(),
    stageH: Math.round(document.querySelector(".stage__canvas").getBoundingClientRect().height),
  }));
  check(
    "QA-EXPLORER-VIEWS",
    ex1.radios === 3 && ex1.checked === "Front" && ex1.active === "false,false,true" && /front view/.test(ex1.alt) && ex1.callouts === "hidden,shown" && ex1.stageH === stageH0,
    JSON.stringify(ex1),
  );
  await page.keyboard.press("ArrowLeft");
  await sleep(350);
  const ex2 = await page.evaluate(() => ({
    focus: document.activeElement.textContent.trim(),
    view: document.querySelector(".stage__view").textContent,
    callouts: Array.from(document.querySelectorAll(".stage .callout")).map((c) => (c.hasAttribute("data-hidden") ? "hidden" : "shown")).join(),
  }));
  check("QA-EXPLORER-KEYBOARD", ex2.focus === "Three-quarter" && ex2.view === "Three-quarter" && ex2.callouts === "hidden,hidden", JSON.stringify(ex2));
  const specs = await page.evaluate(() => Array.from(document.querySelectorAll("#system dl > div")).map((d) => [d.querySelector("dt").textContent, d.querySelector("dd").textContent]));
  check(
    "QA-SPECS-EXACT",
    JSON.stringify(specs) ===
      JSON.stringify([
        ["Working height", "Over 60 metres"],
        ["Flow rate", "Up to 15 litres per minute"],
        ["Working pressure", "Around 170 bar at the nozzle, up to 255 bar at peak"],
        ["Collision avoidance", "Radar, with standoff control"],
        ["Maximum take-off mass", "29 kg"],
      ]),
    specs.map((x) => x.join(": ")).join(" | "),
  );

  // Cleaning-system scene: pins, steps through three views by scroll, controls work, then releases
  const storyTop = await page.evaluate(() => document.querySelector(".story").getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 400), storyTop);
  await sleep(400);
  const seen = [];
  const positions = [];
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 140);
    await sleep(160);
    seen.push(await page.evaluate(() => document.querySelector(".story__stage").dataset.view ?? "-"));
    positions.push(await page.evaluate(() => getComputedStyle(document.querySelector(".story")).position));
  }
  const pinned = positions.includes("fixed") ? "fixed" : positions.at(-1);
  // Back to the start of the pinned range, then use the controls without scrolling.
  await page.evaluate(() => {
    const spacer = document.querySelector(".story").parentElement;
    const header = document.querySelector(".site-header").offsetHeight;
    window.scrollTo({ top: spacer.getBoundingClientRect().top + scrollY - header - 24 + 40, behavior: "instant" });
  });
  await sleep(900);
  await page.click(".story__control >> nth=2");
  await sleep(900);
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await sleep(900);
  const manual = await page.evaluate(() => ({
    pos: getComputedStyle(document.querySelector(".story")).position,
    view: document.querySelector(".story__stage").dataset.view,
    checked: Array.from(document.querySelectorAll(".story__control")).map((c) => c.getAttribute("aria-checked")).join(),
    focus: document.activeElement?.textContent.trim(),
  }));
  await page.mouse.wheel(0, 2000);
  await sleep(900);
  const after = await page.evaluate(() => ({ pos: getComputedStyle(document.querySelector(".story")).position, view: document.querySelector(".story__stage").dataset.view }));
  const order = [...new Set(seen.filter((v) => v !== "-"))].join(">");
  check(
    "QA-STORY-SCENE",
    order === "0>1>2" && pinned === "fixed" && manual.pos === "fixed" && manual.view === "0" && manual.checked === "true,false,false" && /In operation/.test(manual.focus) && after.pos !== "fixed" && after.view === "2",
    JSON.stringify({ order, pinned, manual, after }),
  );
  await page.locator(".story__caption--station .film-btn").scrollIntoViewIfNeeded();
  await page.click(".story__caption--station .film-btn");
  await sleep(500);
  const sdlg = await page.evaluate(() => document.querySelector(".story dialog[open] video")?.getAttribute("src"));
  await page.click(".story dialog[open] .viewer__close");
  await sleep(300);
  check("QA-STORY-FILM", /support-clean-station-excerpt\.mp4$/.test(sdlg ?? "") && !(await page.evaluate(() => document.querySelector(".story dialog[open]"))), sdlg);

  // Support selector
  await page.locator("#support").scrollIntoViewIfNeeded();
  await page.click('#support [role="radio"]:has-text("Training")');
  await sleep(300);
  const sel1 = await page.evaluate(() => ({
    checked: document.querySelector('#support [role="radio"][aria-checked="true"]').textContent.trim(),
    active: Array.from(document.querySelectorAll("#support .supply__para")).map((p) => p.dataset.active),
    visible: Array.from(document.querySelectorAll("#support .supply__para")).every((p) => p.getBoundingClientRect().height > 0),
  }));
  const media1 = await page.evaluate(() => {
    const layer = document.querySelector('#support .support__layer[data-active="true"]');
    return { playable: Boolean(layer?.querySelector(".is-playable")), others: document.querySelectorAll("#support .support__layer[inert]").length };
  });
  check(
    "QA-SUPPORT-SELECT",
    sel1.checked === "Training" && sel1.active.join() === "false,true,false" && sel1.visible && media1.playable && media1.others === 2,
    JSON.stringify({ ...sel1, ...media1 }),
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await sleep(250);
  const sel2 = await page.evaluate(() => ({
    checked: document.querySelector('#support [role="radio"][aria-checked="true"]').textContent.trim(),
    focus: document.activeElement.textContent.trim(),
    active: Array.from(document.querySelectorAll("#support .supply__para")).map((p) => p.dataset.active),
  }));
  check("QA-SUPPORT-KEYBOARD", sel2.checked === "Enhanced warranty option" && sel2.focus === sel2.checked && sel2.active.join() === "false,false,true", JSON.stringify(sel2));
  await page.keyboard.press("Home");
  await sleep(150);
  check("QA-SUPPORT-HOME", (await page.evaluate(() => document.activeElement.textContent.trim())) === "Sales");

  // "How authorisation works" opens OA support
  await page.locator("#regulation a.btn").scrollIntoViewIfNeeded();
  await page.click("#regulation a.btn");
  await sleep(200);
  await settle(page);
  const oa = await page.evaluate(() => ({
    checked: document.querySelector('#support [role="radio"][aria-checked="true"]').textContent.trim(),
    hash: location.hash,
  }));
  check("QA-AUTHORISATION-LINK", oa.checked === "Operational Authorisation support" && oa.hash === "#support", JSON.stringify(oa));

  // Form: labels, validation, no fake success, nothing sent
  await page.locator("#enquiry form").scrollIntoViewIfNeeded();
  const labels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#enquiry form label")).map((l) => l.firstChild.textContent.trim()),
  );
  check("QA-FORM-FIELDS", labels.join("|") === "Name|Company|Email|Telephone|Sites or work involved", labels.join(" | "));
  const submitLabel = (await page.textContent('#enquiry button[type="submit"]')).trim();
  check("QA-FORM-SUBMIT-LABEL", submitLabel === "Discuss a requirement", submitLabel);
  const controls = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#enquiry .field__input")).map((i) => Math.round(i.getBoundingClientRect().height)),
  );
  check("QA-FORM-CONTROL-HEIGHT", controls.slice(0, 4).every((h) => h >= 52 && h <= 56) && controls[4] >= 150, controls.join(", "));
  await page.click('#enquiry button[type="submit"]');
  await sleep(300);
  const v1 = await page.evaluate(() => ({
    summaryFocused: document.activeElement?.getAttribute("role") === "alert",
    invalid: Array.from(document.querySelectorAll('#enquiry [aria-invalid="true"]')).map((i) => i.name),
  }));
  check("QA-FORM-REQUIRED", v1.summaryFocused && v1.invalid.join() === "name,email", JSON.stringify(v1));
  await page.fill('#enquiry input[name="name"]', "Test Person");
  await page.fill('#enquiry input[name="email"]', "not-an-email");
  await page.click('#enquiry button[type="submit"]');
  await sleep(300);
  const v2 = await page.evaluate(() => Array.from(document.querySelectorAll('#enquiry [aria-invalid="true"]')).map((i) => i.name));
  check("QA-FORM-EMAIL-FORMAT", v2.join() === "email", v2.join());
  await page.fill('#enquiry input[name="email"]', "test@example.co.uk");
  await page.fill('#enquiry textarea[name="sites"]', "A long description of several sites ".repeat(12));
  await page.click('#enquiry button[type="submit"]');
  await sleep(400);
  const v3 = await page.evaluate(() => ({
    status: document.querySelector('#enquiry [role="status"]')?.textContent ?? "",
    focused: document.activeElement?.getAttribute("role") === "status",
  }));
  check("QA-FORM-NO-FAKE-SUCCESS", /not connected/.test(v3.status) && !/thank|success|received/i.test(v3.status) && v3.focused, v3.status);
  check("QA-FORM-NOTHING-SENT", posts.length === 0, posts.join(", ") || "no non-GET requests");

  // Every rendered line of text is accounted for (contest copy, announcement labels, UI labels, film titles)
  await scrollThrough(page);
  check("QA-NO-CONSOLE-ERRORS", errors.length === 0, errors.slice(0, 3).join(" | "));
  const axe = await axeRun(page);
  check("QA-AXE-1440", axe.length === 0, axe.map((v) => `${v.id} (${v.n}) ${v.sample.join(", ")}`).join("; ") || "0 violations");
  await ctx.close();
}

// ---------- Phone 390, touch ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await sleep(800);
  const order = await page.evaluate(() => {
    const y = (s) => Math.round(document.querySelector(s).getBoundingClientRect().top);
    return { h1: y("#hero-heading"), media: y("#top .hero__media"), intro: y("#top .hero__intro"), cta: y("#top .hero__actions") };
  });
  check("QA-MOBILE-HERO-ORDER", order.h1 < order.media && order.media < order.intro && order.intro < order.cta, JSON.stringify(order));
  const ctaW = await page.evaluate(() => {
    const a = document.querySelector("#top .hero__actions .btn").getBoundingClientRect();
    return { w: Math.round(a.width), h: Math.round(a.height) };
  });
  check("QA-MOBILE-CTA-FULL-WIDTH", ctaW.w === 350 && ctaW.h >= 52, JSON.stringify(ctaW));

  const sys = await page.evaluate(() => {
    const y = (s) => Math.round(document.querySelector(s).getBoundingClientRect().top + scrollY);
    return {
      lede: y(".system__lede"),
      stage: y(".stage"),
      specs: y(".system__specs"),
      story: y(".story"),
      controls: document.querySelectorAll(".story__control").length,
      station: getComputedStyle(document.querySelector(".story__frame--station")).opacity,
    };
  });
  check(
    "QA-MOBILE-SYSTEM-ORDER",
    sys.lede < sys.stage && sys.stage < sys.specs && sys.specs < sys.story && sys.controls === 0 && sys.station === "1",
    JSON.stringify(sys),
  );

  // Menu: opens, traps focus, Escape closes and returns focus
  await page.tap(".site-header__menu");
  await sleep(200);
  const open = await page.evaluate(() => ({
    expanded: document.querySelector(".site-header__menu").getAttribute("aria-expanded"),
    dialog: Boolean(document.querySelector('#site-drawer[role="dialog"][aria-modal="true"]')),
    focusInside: document.querySelector("#site-drawer")?.contains(document.activeElement),
    labels: Array.from(document.querySelectorAll("#site-drawer nav a")).map((a) => a.textContent.trim().replace(/\s*\(.*\)$/, "")),
  }));
  check("QA-MENU-OPEN", open.dialog && open.focusInside && open.labels.length === 7, JSON.stringify(open));
  await page.keyboard.press("Escape");
  await sleep(200);
  const closed = await page.evaluate(() => ({
    gone: !document.querySelector("#site-drawer"),
    focusBack: document.activeElement?.classList.contains("site-header__menu"),
    expanded: document.querySelector(".site-header__menu").getAttribute("aria-expanded"),
  }));
  check("QA-MENU-ESCAPE", closed.gone && closed.focusBack && closed.expanded === "false", JSON.stringify(closed));
  await page.tap(".site-header__menu");
  await sleep(200);
  await page.tap('#site-drawer a:has-text("Contact")');
  await sleep(200);
  await settle(page);
  const nav = await headerOverlap(page, "#enquiry");
  check("QA-MENU-NAVIGATES", Math.abs(nav.targetTop - nav.headerBottom) <= 2, JSON.stringify(nav));

  // Touch targets
  const small = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main a, main button, header a, header button, main input, main textarea"))
      .filter((el) => el.getBoundingClientRect().width > 0)
      .filter((el) => !el.closest("p") || el.classList.contains("btn"))
      .map((el) => ({ el: el.className || el.tagName, w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) }))
      .filter((r) => r.w < 44 || r.h < 44),
  );
  check("QA-MOBILE-TARGETS-44", small.length === 0, small.length ? JSON.stringify(small.slice(0, 4)) : "all ≥ 44 × 44 (inline text links excluded)");

  // Touch: selector and a film viewer respond to taps (no hover dependence)
  await page.locator("#support .selector").scrollIntoViewIfNeeded();
  await page.tap('#support [role="radio"]:has-text("Servicing")');
  await sleep(250);
  const tapSel = await page.evaluate(() => ({
    checked: document.querySelector('#support [role="radio"][aria-checked="true"]').textContent.trim(),
    active: Array.from(document.querySelectorAll("#support .supply__para")).map((p) => p.dataset.active).join(),
  }));
  check("QA-MOBILE-SELECTOR-TAP", tapSel.checked === "Servicing" && tapSel.active === "false,false,true", JSON.stringify(tapSel));
  await page.locator("#support .support__van figure button").scrollIntoViewIfNeeded();
  await page.locator("#support .support__van figure button").tap();
  await sleep(300);
  const tapVid = await page.evaluate(() => Boolean(document.querySelector("#support .support__van video[controls]")));
  check("QA-MOBILE-VIDEO-TAP", tapVid, tapVid ? "native controls shown" : "no video element");

  await scrollThrough(page);
  const axe = await axeRun(page);
  check("QA-AXE-390", axe.length === 0, axe.map((v) => `${v.id} (${v.n}) ${v.sample.join(", ")}`).join("; ") || "0 violations");
  await ctx.close();
}

// ---------- Reduced motion ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await useWebm(ctx);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await sleep(1500);
  await scrollThrough(page);
  await sleep(600);
  const rm = await page.evaluate(() => ({
    pending: Array.from(document.querySelectorAll("[data-motion], .story__frame, .story__caption"))
      .filter((el) => !el.closest('[data-hidden], .support__layer:not([data-active="true"]), .support__caption:not([data-active="true"])'))
      .filter((el) => getComputedStyle(el).opacity !== "1" || el.style.transform).length,
    scene: document.querySelectorAll(".story__control").length,
    videoPaused: document.querySelector("#top video").paused,
    videoNetwork: document.querySelector("#top video").networkState,
    smooth: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  check("QA-REDUCED-MOTION", rm.pending === 0 && rm.scene === 0 && rm.videoPaused && rm.smooth === "auto", JSON.stringify(rm));
  await ctx.close();
}

// ---------- Static capture state + no-JavaScript ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(withQuery("capture=1"), { waitUntil: "load" });
  await sleep(1200);
  await scrollThrough(page);
  const cap = await page.evaluate(() => ({
    flag: document.documentElement.dataset.capture,
    pending: Array.from(document.querySelectorAll("[data-motion], .story__frame, .story__caption"))
      .filter((el) => !el.closest('[data-hidden], .support__layer:not([data-active="true"]), .support__caption:not([data-active="true"])'))
      .filter((el) => getComputedStyle(el).opacity !== "1" || el.style.transform).length,
    header: getComputedStyle(document.querySelector(".site-header")).position,
    scene: document.querySelectorAll(".story__control").length,
    details: document.querySelectorAll(".detail img").length,
    heroVideo: getComputedStyle(document.querySelector("#top video")).display,
    specs: document.querySelectorAll("#system dl > div").length,
  }));
  check("QA-CAPTURE-STATE", cap.flag === "1" && cap.pending === 0 && cap.header === "relative" && cap.scene === 0 && cap.details === 2 && cap.heroVideo === "none" && cap.specs === 5, JSON.stringify(cap));
  await ctx.close();

  const noJs = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p2 = await noJs.newPage();
  await p2.goto(url, { waitUntil: "load" });
  await sleep(1200); // let the CSS-only hero entrance finish
  const nj = await p2.evaluate(() => ({
    hidden: Array.from(document.querySelectorAll("main *"))
      .filter((el) => !el.closest('[data-hidden], .support__layer:not([data-active="true"]), .support__caption:not([data-active="true"])'))
      .filter((el) => getComputedStyle(el).opacity === "0" && el.textContent.trim()).length,
    specs: document.querySelectorAll("#system dl > div").length,
    paragraphs: document.querySelectorAll("#support .supply__para").length,
  }));
  check("QA-NO-JS-CONTENT-VISIBLE", nj.hidden === 0 && nj.specs === 5 && nj.paragraphs === 3, JSON.stringify(nj));
  await noJs.close();
}

// ---------- Overflow at the six review widths ----------
{
  // 720 and 640 are 1440 and 1280 at 200% zoom.
  for (const w of [1440, 1280, 1024, 768, 720, 640, 390, 360]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 768 });
    const page = await ctx.newPage();
    await page.goto(withQuery("capture=1"), { waitUntil: "load" });
    const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    check(`QA-NO-OVERFLOW-${w}`, o.sw === o.cw, `${o.sw} / ${o.cw}`);
    await ctx.close();
  }
}

await browser.close();
const totals = results.reduce((t, r) => ((t[r.status] = (t[r.status] ?? 0) + 1), t), {});
console.log(`\n${results.length} checks — ${Object.entries(totals).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ url, ranAt: new Date().toISOString(), totals, results }, null, 2));
process.exit(totals.FAIL ? 1 : 0);
