import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paramètres" };

export default function ParametresPage() {
  return (
    <div className="px-5 pt-10">
      <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto mb-6" />
      <h1 className="font-heading text-2xl font-bold text-brand-dark">Paramètres</h1>
      <p className="mt-2 text-sm text-gray-500">Notifications, confidentialité, déconnexion.</p>
    </div>
  );
}
