"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const sujet = (form.elements.namedItem("sujet") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      setError("Webhook non configuré. Contactez l'administrateur.");
      setLoading(false);
      return;
    }

    try {
      const now = new Date();
      const dateStr = now.toLocaleDateString("fr-FR");

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          nom: name,
          email,
          sujet,
          message,
          date_contact: dateStr,
          // Champs CRM compatibles avec le schéma existant
          prenom: name.split(" ")[0] ?? name,
          question_1: sujet,
          question_2: message,
          question_3: "",
          question_4: "",
          question_5: "",
          categorie_email: sujet || "contact",
          optin_email: "non",
          date_optin: "",
          id_compte: `contact_${Date.now()}`,
          age: null,
        }),
      });

      setSent(true);
      form.reset();
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#474194] px-5 pt-10 pb-8 text-white">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="mx-auto h-6 w-auto brightness-0 invert mb-6" />
        <h1 className="font-heading text-2xl font-bold">Contact</h1>
        <p className="mt-1 text-sm text-white/70">On est là pour vous</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Formulaire */}
        <section>
          <h2 className="font-heading text-lg font-bold text-[#050505] mb-4">Envoyer un message</h2>

          {sent ? (
            <div className="rounded-2xl bg-[#474194]/10 border border-[#474194]/20 px-5 py-8 text-center">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-semibold text-[#474194]">Message envoyé !</p>
              <p className="text-sm text-gray-600 mt-1">Nous vous répondrons dans les plus brefs délais.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-sm text-[#474194] underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet <span className="text-[#d81d61]">*</span>
                </label>
                <input id="name" name="name" type="text" required autoComplete="name"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#474194] transition"
                  placeholder="Votre nom" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-[#d81d61]">*</span>
                </label>
                <input id="email" name="email" type="email" required autoComplete="email"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#474194] transition"
                  placeholder="votre@email.com" />
              </div>

              <div>
                <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <select id="sujet" name="sujet"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#474194] transition">
                  <option value="">Choisir un sujet</option>
                  <option value="participation">Participer au festival</option>
                  <option value="partenariat">Partenariat / Association</option>
                  <option value="benevolat">Devenir bénévole</option>
                  <option value="presse">Presse / Médias</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-[#d81d61]">*</span>
                </label>
                <textarea id="message" name="message" rows={4} required
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#474194] transition resize-none"
                  placeholder="Votre message..." />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input id="rgpd" name="rgpd" type="checkbox" required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300" />
                <span className="text-xs text-gray-500">
                  J&apos;accepte que mes données soient utilisées pour traiter ma demande
                  conformément à la{" "}
                  <a href="/confidentialite" className="underline hover:text-[#474194]">
                    politique de confidentialité
                  </a>. <span className="text-[#d81d61]">*</span>
                </span>
              </label>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#474194] py-4 text-sm font-semibold text-white transition active:scale-95 hover:bg-[#3a3578] disabled:opacity-60"
              >
                {loading ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </form>
          )}
        </section>

        {/* Infos */}
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#050505]">Informations</h2>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-semibold text-[#050505] text-sm">Up Sport!</p>
            <p className="mt-1 text-xs text-gray-600">Association sportive parisienne fondée en 2016.</p>
            <a href="https://www.unispourlesport.paris/" target="_blank" rel="noopener noreferrer"
              className="mt-2 block text-xs font-medium text-[#474194] hover:underline">
              unispourlesport.paris ↗
            </a>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-semibold text-[#050505] text-sm mb-2">Réseaux sociaux</p>
            <div className="space-y-1.5">
              {[
                { label: "Instagram Solimouv'", href: "https://www.instagram.com/solimouv.festival/" },
                { label: "Instagram Up Sport!", href: "https://www.instagram.com/unispourlesport/" },
                { label: "Facebook", href: "https://www.facebook.com/UpSport.UNis/" },
              ].map((rs) => (
                <a key={rs.label} href={rs.href} target="_blank" rel="noopener noreferrer"
                  className="block text-xs text-[#474194] hover:underline">
                  {rs.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#474194] p-4">
            <p className="font-semibold text-[#474194] text-sm">Festival Solimouv&apos;</p>
            <p className="mt-1 text-xs text-gray-600">📍 Centre Sportif Charles Moureu, Paris</p>
            <p className="mt-0.5 text-xs text-gray-600">📅 6 juin 2026</p>
          </div>
        </section>
      </div>
    </div>
  );
}
