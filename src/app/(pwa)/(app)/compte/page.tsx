import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mon compte" };

export default function ComptePage() {
  return (
    <div className="px-5 pt-10">
      <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto mb-6" />
      <h1 className="font-heading text-2xl font-bold text-brand-dark">Mon compte</h1>
      <p className="mt-2 text-sm text-gray-500">Gérez votre profil et vos préférences.</p>
    </div>
  );
}
