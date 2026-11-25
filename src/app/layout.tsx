import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileCraft Dental | Crafting Confidence, One Smile at a Time",
  description:
    "Premium dental care in San Francisco. Book your appointment online. Teeth whitening, implants, aligners, and more with 15,000+ happy patients.",
  keywords: [
    "dental clinic",
    "dentist San Francisco",
    "teeth whitening",
    "dental implants",
    "cosmetic dentistry",
  ],
  openGraph: {
    title: "SmileCraft Dental",
    description: "Premium dental care. 15,000+ happy smiles.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmileCraft Dental",
    description: "Premium dental care. 15,000+ happy smiles.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { if (localStorage.getItem('smilecraft:theme') === 'dark' || (!localStorage.getItem('smilecraft:theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.documentElement.classList.add('dark'); } } catch {}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "SmileCraft Dental",
              description:
                "Premium dental care in San Francisco. 15,000+ happy patients.",
              url: "https://smilecraft.dental",
              telephone: "+1-555-123-4567",
              email: "hello@smilecraft.dental",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Bright Smile Ave, Suite 200",
                addressLocality: "San Francisco",
                addressRegion: "CA",
                postalCode: "94102",
                addressCountry: "US",
              },
              openingHours: [
                "Mo-Fr 08:00-19:00",
                "Sa 09:00-17:00",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "15000",
              },
            }),
          }}
        />
      </head>
      <body
        className="font-sans antialiased bg-cream dark:bg-dark text-teal dark:text-cream"
        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
