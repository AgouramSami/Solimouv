import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Solimouv' — Le festival du sport pour tous",
  description:
    "Rejoignez Solimouv', le festival du sport inclusif organisé par Up Sport! à Paris. Initiations, ateliers, rencontres — pour tous, sans exception.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <Navigation />
      <main id="main-content" className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
