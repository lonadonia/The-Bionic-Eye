import { cta, nav } from "@/content/copy";
import { ui } from "@/content/ui";
import { BrandLogo } from "./brand-logo";
import { HeaderNav } from "./header-nav";

/**
 * Sticky dark header with a constant height (no layout shift, no state swap while scrolling).
 * The hairline divider separates it from light sections it passes over. Navigation labels are the
 * supplied ones; the drawer takes over below 1184px, where the real labels would crowd.
 */
export function SiteHeader() {
  return (
    <header className="site-header on-deep">
      <div className="shell site-header__bar">
        <a href="#top" className="shrink-0" aria-label={ui.header.home}>
          <BrandLogo tone="white" className="site-header__logo" />
        </a>
        <HeaderNav items={nav} cta={cta.demonstration} />
      </div>
    </header>
  );
}
