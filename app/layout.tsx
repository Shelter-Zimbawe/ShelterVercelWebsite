import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const SITE_URL = "https://shelter.co.zw";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shelter Zimbabwe | Buy Residential Stands & Land in Harare",
    template: "%s | Shelter Zimbabwe",
  },
  description:
    "Shelter Zimbabwe — Zimbabwe's trusted property developer. Buy residential stands and land in Harare. Rockview Park, Adelaide Park, Mabvuku Chizhanje and more. Flexible payment plans. 40+ years experience.",
  keywords: [
    "Shelter Zimbabwe",
    "stands for sale Harare",
    "residential stands Zimbabwe",
    "buy land Zimbabwe",
    "housing stands Harare",
    "Rockview Park stands",
    "Adelaide Park stands",
    "Mabvuku Chizhanje",
    "property developer Zimbabwe",
    "stands for sale Zimbabwe",
    "land for sale Harare",
    "affordable housing Zimbabwe",
    "superstructures Zimbabwe",
    "KUMBI Zimbabwe",
    "shelter.co.zw",
  ],
  authors: [{ name: "Shelter Zimbabwe", url: SITE_URL }],
  creator: "Shelter Zimbabwe",
  publisher: "Shelter Zimbabwe",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: SITE_URL,
    siteName: "Shelter Zimbabwe",
    title: "Shelter Zimbabwe | Buy Residential Stands & Land in Harare",
    description:
      "Zimbabwe's trusted property developer. Residential stands in Harare with flexible payment plans. 40+ years of delivering homes.",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Shelter Zimbabwe — Residential Stands and Land in Harare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shelter Zimbabwe | Buy Residential Stands & Land in Harare",
    description:
      "Zimbabwe's trusted property developer. Residential stands in Harare with flexible payment plans.",
    images: ["/og-image.jpeg"],
  },
  icons: {
    icon: "/icon.jpeg",
    shortcut: "/icon.jpeg",
    apple: "/icon.jpeg",
  },
  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Shelter Zimbabwe",
  alternateName: "Shelter Incorporated",
  description:
    "Zimbabwe's trusted residential property developer. Specialising in stands and land sales in Harare, superstructures, and the KUMBI densification product. Over 40 years delivering quality housing.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.jpeg`,
  image: `${SITE_URL}/og-image.jpeg`,
  telephone: "+263242774455",
  email: "sales@shelter.co.zw",
  foundingDate: "1984",
  address: {
    "@type": "PostalAddress",
    streetAddress: "95 Five Avenue, Shelter House",
    addressLocality: "Harare",
    addressRegion: "Harare Province",
    addressCountry: "ZW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -17.8252,
    longitude: 31.0335,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+263242774455",
      contactType: "sales",
      areaServed: "ZW",
      availableLanguage: ["English", "Shona", "Ndebele"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+263719551234",
      contactType: "customer support",
      contactOption: "WhatsApp",
    },
  ],
  sameAs: [
    "https://www.facebook.com/shelterzim",
    "https://www.linkedin.com/company/shelterzimbabwe",
    "https://www.tiktok.com/@shelterzimbabwe",
  ],
  areaServed: {
    "@type": "Country",
    name: "Zimbabwe",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Stands & Property",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "LandForm", name: "Rockview Park Stands" } },
      { "@type": "Offer", itemOffered: { "@type": "LandForm", name: "Adelaide Park Stands" } },
      { "@type": "Offer", itemOffered: { "@type": "LandForm", name: "Mabvuku Chizhanje" } },
      { "@type": "Offer", itemOffered: { "@type": "LandForm", name: "Lendy Park Marondera Stands" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <ScrollProgressBar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
