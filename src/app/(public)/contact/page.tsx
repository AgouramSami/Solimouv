import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe Solimouv' et Up Sport! pour toute question sur le festival, les partenariats ou la participation.",
};

export default function ContactPage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          Contact
        </p>
        <h1 className="section-title mt-2">On est là pour vous</h1>
        <p className="mt-4 max-w-xl text-gray-600">
          Une question sur le festival, les ateliers, un partenariat ou vous souhaitez
          rejoindre le réseau ? Écrivez-nous.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Formulaire */}
          <section aria-labelledby="form-title">
            <h2 id="form-title" className="text-lg font-bold text-brand-dark">
              Envoyer un message
            </h2>

            {/* DCX / Make : ce formulaire doit être connecté à un scénario Make pour
                envoyer les messages à l'équipe Up Sport! par email */}
            <form
              className="mt-6 space-y-5"
              action="#" // ← DCX : remplacer par webhook Make ou API route
              method="POST"
              aria-label="Formulaire de contact"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom complet <span aria-label="champ requis">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span aria-label="champ requis">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="sujet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sujet
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                >
                  <option value="">Choisir un sujet</option>
                  <option value="participation">Participer au festival</option>
                  <option value="partenariat">Partenariat / Association</option>
                  <option value="benevolat">Devenir bénévole</option>
                  <option value="presse">Presse / Médias</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message <span aria-label="champ requis">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  placeholder="Votre message..."
                />
              </div>

              {/* RGPD */}
              <div className="flex items-start gap-3">
                <input
                  id="rgpd"
                  name="rgpd"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="rgpd" className="text-xs text-gray-500">
                  J&apos;accepte que mes données soient utilisées pour traiter ma demande
                  conformément à la{" "}
                  <a href="/confidentialite" className="underline hover:text-brand-primary">
                    politique de confidentialité
                  </a>
                  . <span aria-label="champ requis">*</span>
                </label>
              </div>

              <button type="submit" className="btn-primary w-full">
                Envoyer le message
              </button>
            </form>
          </section>

          {/* Infos directes */}
          <aside aria-labelledby="infos-title">
            <h2 id="infos-title" className="text-lg font-bold text-brand-dark">
              Informations
            </h2>
            <div className="mt-6 space-y-6">
              <div className="card">
                <p className="font-semibold text-brand-dark">Up Sport!</p>
                <p className="mt-1 text-sm text-gray-600">
                  Association sportive parisienne fondée en 2016.
                </p>
                <a
                  href="https://www.unispourlesport.paris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm font-medium text-brand-primary hover:underline"
                >
                  unispourlesport.paris ↗
                </a>
              </div>

              <div className="card">
                <p className="font-semibold text-brand-dark">Réseaux sociaux</p>
                <ul className="mt-3 space-y-2 text-sm" role="list">
                  <li>
                    <a
                      href="https://www.instagram.com/solimouv.festival/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:underline"
                    >
                      Instagram Solimouv&apos; ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/unispourlesport/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:underline"
                    >
                      Instagram Up Sport! ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/UpSport.UNis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:underline"
                    >
                      Facebook ↗
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card border-brand-primary border">
                <p className="font-semibold text-brand-primary">Festival Solimouv&apos;</p>
                <p className="mt-1 text-sm text-gray-600">
                  📍 Centre Sportif Charles Moureu, Paris
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  📅 Édition 2 — date à confirmer
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
