import { WaveEdge } from "@/components/decor";
import { Applications } from "@/components/sections/applications";
import { Enquiry } from "@/components/sections/enquiry";
import { Evidence } from "@/components/sections/evidence";
import { Hero } from "@/components/sections/hero";
import { Legal } from "@/components/sections/legal";
import { Support } from "@/components/sections/support";
import { System } from "@/components/sections/system";

/**
 * Asset cleaning. Section order: Hero → Applications → The system → Full service support →
 * Operating legally → Proven in the field → Enquiry (announcement order, with the contest copy's
 * "Proven in the field" kept between regulation and enquiry). Curved brand edges (WaveEdge) mark
 * the passages into and out of the two dark chapters.
 */
export default function AssetCleaningPage() {
  return (
    <>
      <Hero />
      <Applications />
      <WaveEdge className="wave-edge--into-deep" />
      <System />
      <WaveEdge className="wave-edge--out-of-deep" flip />
      <Support />
      <Legal />
      <Evidence />
      <WaveEdge className="wave-edge--into-deep" />
      <Enquiry />
    </>
  );
}
