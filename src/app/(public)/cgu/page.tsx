import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  robots: { index: false, follow: false },
};

export default function CguPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/auth/login" className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-dark">
        ← Retour
      </Link>
      <h1 className="font-heading text-3xl font-bold text-brand-dark mb-8">
        Conditions Générales d&apos;Utilisation
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation
            de l&apos;application Solimouv&apos; éditée par l&apos;association Up Sport! (ci-après « l&apos;Association »).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">2. Acceptation</h2>
          <p>
            L&apos;utilisation de l&apos;application implique l&apos;acceptation pleine et entière des présentes CGU.
            Si vous n&apos;acceptez pas ces conditions, vous ne pouvez pas utiliser l&apos;application.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">3. Compte utilisateur</h2>
          <p>
            La création d&apos;un compte est nécessaire pour accéder aux fonctionnalités personnalisées de l&apos;application.
            Vous vous engagez à fournir des informations exactes et à maintenir la confidentialité de vos identifiants.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">4. Données personnelles</h2>
          <p>
            Les données collectées (email, prénom, préférences sportives) sont utilisées uniquement dans le cadre
            du festival Solimouv&apos; et ne sont pas revendues à des tiers. Voir notre{" "}
            <Link href="/confidentialite" className="underline text-brand-dark">politique de confidentialité</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">5. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur l&apos;application (textes, images, logos, icônes) sont la
            propriété exclusive d&apos;Up Sport! ou de ses partenaires et sont protégés par le droit d&apos;auteur.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">6. Limitation de responsabilité</h2>
          <p>
            L&apos;Association ne pourra être tenue responsable des dommages directs ou indirects résultant de
            l&apos;utilisation de l&apos;application ou de l&apos;impossibilité d&apos;y accéder.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">7. Modification des CGU</h2>
          <p>
            L&apos;Association se réserve le droit de modifier les présentes CGU à tout moment.
            Les utilisateurs seront informés par email en cas de modification substantielle.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">8. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU, vous pouvez nous contacter via{" "}
            <Link href="/contact" className="underline text-brand-dark">la page contact</Link>.
          </p>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          Dernière mise à jour : avril 2026 — Up Sport! · Association loi 1901
        </p>
      </div>
    </div>
  );
}
