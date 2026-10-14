import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { PageMotion } from "@/components/motion/page-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hero, site } from "@/content/copy";
import "./globals.css";

// One family for the whole page: Manrope (SIL Open Font License 1.1), variable weight axis,
// self-hosted by next/font. The page uses 400, 500, 600 and 700.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const deployedHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  ...(deployedHost ? { metadataBase: new URL(`https://${deployedHost}`) } : {}),
  title: `${site.pageName} — ABZ Innovation C10 | The Bionic Eye`,
  description: hero.paragraphs[0],
  // Internal prototype: keep it out of search indexes so it never competes with the client's site.
  robots: { index: false, follow: false },
  openGraph: {
    title: `${site.pageName} — ABZ Innovation C10 | The Bionic Eye`,
    description: hero.paragraphs[0],
    images: [{ url: "/media/poster/hero-c10-use-cases.jpg", width: 1920, height: 1080 }],
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#11191d",
  width: "device-width",
  initialScale: 1,
};

/*
 * Static capture state for screenshots and PDFs: `?capture=1` sets <html data-capture> before first
 * paint. CSS then drops animation, pending reveals and sticky positioning, and films stay on their
 * chosen posters. The design and content are unchanged.
 */
const captureScript = `if(/[?&]capture=1\\b/.test(location.search))document.documentElement.dataset.capture="1"`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: captureScript }} />
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
        <PageMotion />
      </body>
    </html>
  );
}
