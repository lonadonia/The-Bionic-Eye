import { Applications } from "@/components/sections/applications";
import { Enquiry } from "@/components/sections/enquiry";
import { Hero } from "@/components/sections/hero";
import { Legal } from "@/components/sections/legal";
import { Support } from "@/components/sections/support";
import { System } from "@/components/sections/system";

/** Asset Cleaning — section order is mandated by the brief and must not change. */
export default function AssetCleaningPage() {
  return (
    <>
      <Hero />
      <Applications />
      <System />
      <Support />
      <Legal />
      <Enquiry />
    </>
  );
}
