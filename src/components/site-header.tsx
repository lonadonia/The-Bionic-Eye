import { BrandLogo } from "./brand-logo";
import { HeaderNav } from "./header-nav";
import { cta, nav, site } from "@/content/copy";

/**
 * Fixed header. Over the hero film it is transparent with a white lockup; once the page scrolls it
 * settles into a solid paper bar and compresses from 80 to 68px. Because it is fixed, the height
 * change never moves the page. State lives on <html data-top> (see layout.tsx and HeaderNav).
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__bar">
        <a href="#top" className="shrink-0" aria-label={`${site.company} — back to top`}>
          <BrandLogo className="site-header__logo" />
        </a>
        <p className="site-header__page hidden min-[1360px]:block">{site.pageName}</p>
        <HeaderNav items={nav} cta={cta} phone={site.phone} email={site.email} />
      </div>
    </header>
  );
}
