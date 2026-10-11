import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hero, site } from "@/content/copy";
import "./globals.css";

// Archivo: the typeface of The Bionic Eye "Specifications of C10" datasheet. Variable weight + width.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const deployedHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  ...(deployedHost ? { metadataBase: new URL(`https://${deployedHost}`) } : {}),
  title: `${site.pageName} — ABZ Innovation C10 | The Bionic Eye`,
  description: hero.intro,
  // Contest design preview: keep it out of search indexes so it never competes with the client's site.
  robots: { index: false, follow: false },
  openGraph: {
    title: `${site.pageName} — ABZ Innovation C10 | The Bionic Eye`,
    description: hero.intro,
    images: [{ url: "/media/poster/hero-c10-use-cases.jpg", width: 1920, height: 1080 }],
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={archivo.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
