import { enquiry, footer } from "@/content/copy";
import { EnquiryForm } from "../enquiry-form";
import { SectionIntro } from "../section-intro";

/**
 * Enquiry: the supplied closing paragraph beside the form (5/7). The form is the visual focus;
 * no secondary footage repeats a scene shown higher on the page. Direct lines use the supplied
 * footer wording.
 */
export function Enquiry() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="on-deep section">
      <div className="shell grid-12 gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:pr-10">
          <SectionIntro id="enquiry-heading" heading={enquiry.heading} />
          <p className="t-lede mt-[var(--intro-gap)] text-white/90">{enquiry.closing}</p>
          <div className="t-body mt-8 grid gap-1 border-t border-deep-line pt-6 text-on-deep-2">
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
          <div className="form-card">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
