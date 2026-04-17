import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Solimouv'",
  description: "Contactez l'équipe Solimouv' et Up Sport! pour toute question sur le festival, les partenariats ou la participation.",
};

export default function ContactPage() {
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
          <form className="space-y-4" action="#" method="POST">
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

            <button type="submit"
              className="w-full rounded-full bg-[#474194] py-4 text-sm font-semibold text-white transition active:scale-95 hover:bg-[#3a3578]">
              Envoyer le message
            </button>
          </form>
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
