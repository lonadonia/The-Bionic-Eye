import { enquiry, footer } from "@/content/copy";
import { BrandMark } from "../brand-mark";
import { DotField, IrisRings } from "../decor";
import { EnquiryForm } from "../enquiry-form";
import { SectionIntro } from "../section-intro";

/**
 * Enquiry: a dark close. The supplied closing paragraph and direct lines sit beside a white form
 * card; a cropped eye watermark and a cyan plane behind the card's top edge tie it to the hero and
 * the system chapter without touching the form's contrast. Direct lines use the supplied footer
 * wording.
 */
export function Enquiry() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="on-deep section enquiry">
      <BrandMark className="enquiry__mark" />
      <div className="shell grid-12 gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:pr-10">
          <SectionIntro id="enquiry-heading" heading={enquiry.heading} />
          <p className="t-lede enquiry__closing">{enquiry.closing}</p>
          <div className="t-body enquiry__lines">
            <p>
              {footer.telephone.lead}
              <a className="link" href={footer.telephone.link.href}>
                {footer.telephone.link.display}
              </a>
              {footer.telephone.trail}
            </p>
            <p>
              {footer.email.lead}
              <a className="link" href={footer.email.link.href}>
                {footer.email.link.display}
              </a>
              {footer.email.trail}
            </p>
          </div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <div className="form-wrap">
            <span className="form-wrap__plane" aria-hidden="true" />
            <IrisRings className="form-wrap__iris" />
            <DotField className="form-wrap__dots" />
            <div className="form-card">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
