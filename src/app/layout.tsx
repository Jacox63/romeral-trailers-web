import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/jost";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "./globals.css";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seoTitle, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.url}/`,
    siteName: site.name,
    title: site.seoTitle,
    description: site.description,
    images: [{ url: `${site.url}/og.jpg`, width: 1200, height: 630, alt: "Romeral Trailers · comedor Sake fabricado a medida" }],
  },
  twitter: { card: "summary_large_image", title: site.seoTitle, description: site.description, images: [`${site.url}/og.jpg`] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1719",
  width: "device-width",
  initialScale: 1,
};

/** Solo datos verificados (docs/business-research.md). Sin precios, horarios ni reseñas. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/apple-icon.png`,
  telephone: `+${contact.whatsappNumber}`,
  email: contact.email,
  address: { "@type": "PostalAddress", addressLocality: "Medellín", addressRegion: "Antioquia", addressCountry: "CO" },
  areaServed: { "@type": "Country", name: "Colombia" },
  sameAs: [contact.instagram, contact.facebook],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
