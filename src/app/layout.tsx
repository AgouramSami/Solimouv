import type { Metadata, Viewport } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Heading font — placeholder Chunko Bold (DA : remplacer par la vraie police)
// Fredoka est la Google Font la plus proche du style chunky/arrondi ciblé
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solimouv.fr"), // ← à mettre à jour après déploiement
  title: {
    default: "Solimouv' — Le festival du sport pour tous",
    template: "%s | Solimouv'",
  },
  description:
    "Solimouv' est le festival du sport inclusif organisé par Up Sport! à Paris. Initiations sportives, ateliers, rencontres — pour tous, sans exception.",
  keywords: [
    "festival sport inclusif",
    "Solimouv",
    "Up Sport Paris",
    "sport pour tous",
    "handicap sport",
    "sport réfugiés",
    "inclusion sport",
    "Paris sport festival",
  ],
  authors: [{ name: "Up Sport!" }],
  creator: "Up Sport!",
  publisher: "Up Sport!",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://solimouv.fr",
    siteName: "Solimouv'",
    title: "Solimouv' — Le festival du sport pour tous",
    description:
      "Initiations sportives, ateliers de sensibilisation et rencontres pour tous les publics. Rejoignez le mouvement !",
    images: [
      {
        url: "/og-image.jpg", // ← DA : remplacer par visuel officiel
        width: 1200,
        height: 630,
        alt: "Solimouv' — Festival du sport inclusif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solimouv' — Le festival du sport pour tous",
    description:
      "Rejoignez le festival du sport inclusif organisé par Up Sport! à Paris.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#F97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fredoka.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Up Sport!",
              url: "https://www.unispourlesport.paris/",
              logo: "https://solimouv.fr/icons/icon-512.png",
              sameAs: [
                "https://www.instagram.com/unispourlesport/",
                "https://www.facebook.com/UpSport.UNis/",
                "https://www.instagram.com/solimouv.festival/",
              ],
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
