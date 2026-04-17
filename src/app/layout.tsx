import type { Metadata, Viewport } from "next";
import "./globals.css";
// Fonts chargées via CSS @import Fontshare (globals.css) : Cabinet Grotesk + Author

export const metadata: Metadata = {
  metadataBase: new URL("https://solimouv-git-vercel-react-server-70cd75-samis-projects-8dc87455.vercel.app"), // ← à mettre à jour après déploiement
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
    url: "https://solimouv-git-vercel-react-server-70cd75-samis-projects-8dc87455.vercel.app",
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
  themeColor: "#D81D61",
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
    <html lang="fr" data-scroll-behavior="smooth">
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
              logo: "https://solimouv-git-vercel-react-server-70cd75-samis-projects-8dc87455.vercel.app/icons/icon-512.png",
              sameAs: [
                "https://www.instagram.com/unispourlesport/",
                "https://www.facebook.com/UpSport.UNis/",
                "https://www.instagram.com/solimouv.festival/",
              ],
            }),
          }}
        />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
