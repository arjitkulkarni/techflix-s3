import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_META, FESTIVAL } from "@/data/config";

export const metadata: Metadata = {
  metadataBase: new URL(FESTIVAL.siteUrl),
  title: SITE_META.title,
  description: SITE_META.description,
  keywords: SITE_META.keywords,
  authors: [{ name: "DSU-ACM Student Chapter" }],
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    url: FESTIVAL.siteUrl,
    siteName: `${FESTIVAL.name} ${FESTIVAL.season}`,
    images: [{ url: SITE_META.ogImage, width: 1200, height: 630, alt: `${FESTIVAL.name} ${FESTIVAL.season}` }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: [SITE_META.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE_META.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
