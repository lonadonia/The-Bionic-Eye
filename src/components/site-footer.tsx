import { footer } from "@/content/copy";
import { BrandLogo } from "./brand-logo";
import { WingCurve } from "./decor";

/**
 * Footer: four readable groups of supplied information (identity and operating address, contact,
 * specialist brands, authorisation), then the company registration line with the registered office,
 * kept distinct from the operating address. No promotional buttons, logos or newsletter.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer on-deep border-t border-deep-line">
      <WingCurve className="site-footer__wing" />
      <div className="shell grid-12 gap-y-10 py-14 lg:py-16">
        <div id="about" className="col-span-4 md:col-span-4 lg:col-span-4">
          <BrandLogo tone="white" withTagline className="h-auto w-[148px]" />
          <p className="mt-6 max-w-[22rem]">{footer.address}</p>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <p>
            {footer.telephone.lead}
            <a className="link" href={footer.telephone.link.href}>
              {footer.telephone.link.display}
            </a>
            {footer.telephone.trail}
          </p>
          <p className="mt-1">
            {footer.email.lead}
            <a className="link" href={footer.email.link.href}>
              {footer.email.link.display}
            </a>
            {footer.email.trail}
          </p>
          <p className="mt-7">
            <strong>{footer.brandsLabel}:</strong>
          </p>
          <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-white" aria-label={footer.brandsLabel}>
            {footer.brands.map((b, i) => (
              <li key={b} className="flex gap-3 whitespace-nowrap">
                {b}
                {i < footer.brands.length - 1 ? (
                  <span aria-hidden="true" className="text-on-deep-2">
                    |
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <p className="text-white">{footer.operator}</p>
          <p className="mt-4">{footer.approval}</p>
        </div>
      </div>

      <div className="border-t border-deep-line">
        <div className="shell py-6 text-[0.875rem]">
          <p>{footer.registration}</p>
        </div>
      </div>
    </footer>
  );
}
