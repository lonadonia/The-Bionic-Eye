import { BrandLogo } from "./brand-logo";
import { HeaderNav } from "./header-nav";
import { cta, nav, site } from "@/content/copy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md supports-[backdrop-filter]:bg-paper/90">
      <div className="shell flex h-[68px] items-center gap-6 lg:h-[88px] xl:gap-8">
        <a href="#top" className="shrink-0" aria-label={`${site.company} — back to top`}>
          <BrandLogo className="h-[44px] w-auto lg:h-[58px]" />
        </a>
        <p className="t-label muted hidden border-l border-line pl-6 min-[1360px]:block">{site.pageName}</p>
        <HeaderNav items={nav} cta={cta} phone={site.phone} email={site.email} />
      </div>
    </header>
  );
}
