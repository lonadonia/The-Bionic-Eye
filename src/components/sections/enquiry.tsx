import { enquiry, site } from "@/content/copy";
import { films } from "@/content/media";
import { EnquiryForm } from "../enquiry-form";
import { Globe, Mail, Phone } from "../icons";
import { SectionHead } from "../section-head";
import { AmbientVideo } from "../video/ambient-video";

/** Typesetting only: stops a compound from breaking at its hyphen. The text is unchanged. */
function KeepTogether({ text, phrase }: { text: string; phrase: string }) {
  const at = text.indexOf(phrase);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="whitespace-nowrap">{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}

/** Section 06 — calm finish: the form is primary; real UK field footage and direct lines support it. */
export function Enquiry() {
  const contacts = [
    { icon: Phone, ...site.phone },
    { icon: Mail, ...site.email },
    { icon: Globe, ...site.shop },
  ];

  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="on-ink chapter">
      <div className="shell">
        <SectionHead index={enquiry.index} label={enquiry.label} aside={site.dealerLine} />

        <div className="grid-12 mt-10 gap-y-12 lg:mt-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <h2 id="enquiry-heading" className="t-h2 max-w-[15ch]" data-reveal>
              <KeepTogether text={enquiry.heading} phrase="high-altitude" />
            </h2>

            <div className="mt-10 border-t border-white/20 pt-5" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
              <p className="t-label text-fog">{enquiry.contactLead.replace(":", "")}</p>
              <ul className="mt-3 grid">
                {contacts.map(({ icon: Icon, display, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex min-h-12 items-center gap-4 font-display text-[clamp(1.0625rem,0.98rem+0.4vw,1.3125rem)] font-semibold tracking-[-0.012em] transition-colors hover:text-signal-bright"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      <Icon size={19} className="shrink-0 text-signal-bright" />
                      <span className="link">{display}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 lg:mt-12" data-reveal style={{ ["--reveal-delay" as string]: "160ms" }}>
              <AmbientVideo
                film={films.enquiryDemonstration}
                frameClass="aspect-[16/10]"
                sizes="(min-width: 90rem) 532px, (min-width: 64rem) 40vw, 100vw"
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <div className="rounded-[2px] bg-white p-5 text-ink shadow-[0_1px_0_rgb(255_255_255/0.06),0_24px_60px_-28px_rgb(0_0_0/0.6)] sm:p-8 lg:sticky lg:top-24 lg:p-10">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
