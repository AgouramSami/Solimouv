import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/auth/login" className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-dark">
        ← Retour
      </Link>
      <h1 className="font-heading text-3xl font-bold text-brand-dark mb-8">
        Politique de confidentialité
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est l&apos;association <strong>Up Sport!</strong>, association loi 1901,
            dont le siège social est situé à Paris.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">2. Données collectées</h2>
          <p>Lors de votre inscription et de l&apos;utilisation de l&apos;application, nous collectons :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Adresse email</li>
            <li>Nom et prénom (optionnel)</li>
            <li>Préférences sportives (via le questionnaire d&apos;onboarding)</li>
            <li>Situation personnelle (optionnel, à des fins de personnalisation)</li>
            <li>Données de navigation (pages visitées, interactions)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Gérer votre compte et personnaliser votre expérience</li>
            <li>Vous envoyer des informations sur le festival (si vous avez consenti)</li>
            <li>Améliorer l&apos;application et le festival</li>
            <li>Produire des statistiques anonymisées sur la fréquentation</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">4. Base légale</h2>
          <p>
            Le traitement est fondé sur votre consentement (art. 6.1.a RGPD) recueilli lors de la création
            de votre compte. Vous pouvez retirer votre consentement à tout moment.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">5. Destinataires</h2>
          <p>
            Vos données sont hébergées sur <strong>Supabase</strong> (infrastructure sécurisée). Elles ne sont
            pas vendues ni transmises à des tiers à des fins commerciales. Des sous-traitants techniques
            (Make/Integromat pour les automatisations) peuvent y accéder dans le cadre strict de leur mission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">6. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant la durée de vie de votre compte et supprimées dans un délai
            de 3 ans après votre dernière connexion, ou sur demande de votre part.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Rectification</strong> : corriger vos données inexactes</li>
            <li><strong>Suppression</strong> : demander la suppression de votre compte</li>
            <li><strong>Opposition</strong> : vous opposer à certains traitements</li>
            <li><strong>Portabilité</strong> : recevoir vos données dans un format structuré</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous via{" "}
            <Link href="/contact" className="underline text-brand-dark">la page contact</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-brand-dark">8. Cookies</h2>
          <p>
            L&apos;application utilise des cookies techniques nécessaires à son fonctionnement (session d&apos;authentification).
            Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé.
          </p>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          Dernière mise à jour : avril 2026 — Up Sport! · Association loi 1901
        </p>
      </div>
    </div>
  );
}
