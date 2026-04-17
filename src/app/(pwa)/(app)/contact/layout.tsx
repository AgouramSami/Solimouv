import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Solimouv'",
  description: "Contactez l'équipe Solimouv' et Up Sport! pour toute question sur le festival, les partenariats ou la participation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
