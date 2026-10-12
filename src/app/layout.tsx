import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hero, site } from "@/content/copy";
import "./globals.css";

// Manrope: headings, figures and interface labels. DM Sans: body, captions and form text.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
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
  themeColor: "#111719",
  width: "device-width",
  initialScale: 1,
};

/*
 * Runs before first paint and records whether the page starts at the top, so the header can sit
 * transparently over the hero film without flashing its solid state first. Without JavaScript the
 * attribute is never set and the header simply stays solid and readable.
 */
const headerStateScript = `document.documentElement.dataset.top=String(window.scrollY<8)`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headerStateScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
