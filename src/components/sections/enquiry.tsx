import { enquiry, site } from "@/content/copy";
import { films } from "@/content/media";
import { EnquiryForm } from "../enquiry-form";
import { Globe, Mail, Phone } from "../icons";
import { SectionHead } from "../section-head";
import { AmbientVideo } from "../video/ambient-video";

export function Enquiry() {
  const contacts = [
    { icon: Phone, ...site.phone },
    { icon: Mail, ...site.email },
    { icon: Globe, ...site.shop },
  ];

  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="on-ink section">
      <div className="shell">
        <SectionHead index={enquiry.index} label={enquiry.label} aside={site.dealerLine} />

        <div className="grid-12 mt-8 gap-y-12 lg:mt-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <h2 id="enquiry-heading" className="t-h2 max-w-[14ch]" data-reveal>
              {enquiry.heading}
            </h2>

            <div className="mt-10 border-t border-paper/55 pt-5" data-reveal>
              <p className="t-label text-fog">{enquiry.contactLead.replace(":", "")}</p>
              <ul className="mt-4 grid gap-1">
                {contacts.map(({ icon: Icon, display, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex min-h-12 items-center gap-4 text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-semibold tracking-[-0.01em] [font-stretch:104%] hover:text-signal-bright"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      <Icon size={20} className="shrink-0 text-signal-bright" />
                      <span className="link">{display}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 lg:mt-12" data-reveal>
              <AmbientVideo film={films.enquiryDemonstration} frameClass="aspect-[16/10]" />
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8" data-reveal>
            <div className="on-paper p-5 sm:p-8 lg:sticky lg:top-28">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
