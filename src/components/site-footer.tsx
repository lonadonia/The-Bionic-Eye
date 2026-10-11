import { cta, nav, site } from "@/content/copy";
import { BrandLogo } from "./brand-logo";
import { ArrowRight, ArrowUp } from "./icons";

export function SiteFooter() {
  return (
    <footer className="on-ink border-t border-ink-line">
      <div className="shell grid-12 gap-y-12 py-16 lg:py-20">
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <BrandLogo tone="white" withTagline className="h-auto w-[180px] lg:w-[210px]" />
          <p className="t-body mt-8 max-w-[22rem] text-fog">
            {site.company}
            <br />
            {site.dealerLine}
          </p>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <h2 className="t-label text-fog">{site.contactHeading}</h2>
          <ul className="mt-5 grid gap-3 text-[1.0625rem] font-semibold">
            <li>
              <a className="link" href={site.phone.href}>
                {site.phone.display}
              </a>
            </li>
            <li>
              <a className="link" href={site.email.href}>
                {site.email.display}
              </a>
            </li>
            <li>
              <a className="link" href={site.shop.href} target="_blank" rel="noopener">
                {site.shop.display}
              </a>
            </li>
          </ul>
          <a href={cta.href} className="btn btn-primary btn-compact mt-8">
            {cta.label}
            <ArrowRight size={18} />
          </a>
        </div>

        <nav aria-label="Footer — on this page" className="col-span-4 md:col-span-8 lg:col-span-4">
          <h2 className="t-label text-fog">{site.pageName}</h2>
          <ul className="mt-5 grid gap-0 border-t border-ink-line">
            {nav.map((item) => (
              <li key={item.id} className="border-b border-ink-line">
                <a href={`#${item.id}`} className="flex items-baseline gap-3 py-3 hover:text-signal-bright">
                  <span className="t-meta t-index text-signal-bright">{item.index}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-line">
        <div className="shell t-meta flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-fog">
          <p>© {site.company}</p>
          <p>Design preview for contest review — not a live website.</p>
          <a href="#top" className="inline-flex min-h-10 items-center gap-2 hover:text-paper">
            <ArrowUp size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
