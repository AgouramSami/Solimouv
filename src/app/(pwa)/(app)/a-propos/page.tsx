import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — Solimouv'",
  description: "Up Sport! est une association qui croit au pouvoir du sport pour créer du lien social, lutter contre les discriminations et favoriser l'insertion.",
};

const valeurs = [
  {
    titre: "Inclusion Totale",
    desc: "Des séances adaptées PMR, LGBTQIA+ friendly et pour tous les âges. Personne n'est laissé sur le banc.",
    icon: "/figma-assets/home/sports/sport-rugby.png",
    iconSide: "right",
  },
  {
    titre: "Sécurité & Respect",
    desc: "Un cadre bienveillant garanti par nos coachs certifiés pour une pratique en toute sérénité.",
    icon: "/figma-assets/home/sports/sport-badminton.png",
    iconSide: "left",
  },
  {
    titre: "Bienveillance",
    desc: "Un espace où chacun·e peut pratiquer sans jugement, à son propre rythme. L'entraide prime sur la performance.",
    icon: "/figma-assets/home/sports/sport-tennis.png",
    iconSide: "right",
  },
  {
    titre: "Gratuité totale",
    desc: "L'accès au sport ne devrait jamais être un privilège. Toutes les activités Solimouv' sont 100% gratuites.",
    icon: "/figma-assets/home/sports/sport-bowling.png",
    iconSide: "left",
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div className="bg-white px-5 pt-10 pb-6 text-center border-b border-gray-100">
        <p className="font-body text-sm text-[#474194] font-medium mb-1">Festival</p>
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="mx-auto h-8 w-auto mb-1" />
        <p className="font-body text-xs text-gray-400">Par UpSport</p>
      </div>

      {/* ── Intro ── */}
      <div className="px-5 pt-6 pb-2">
        <p className="font-body text-[15px] text-[#050505] leading-relaxed text-center">
          UpSport est une association qui croit au pouvoir du sport pour créer du lien social,
          lutter contre les discriminations et favoriser l&apos;insertion.
        </p>
      </div>

      {/* ── Nos valeurs ── */}
      <div className="px-5 py-6">
        <h2 className="font-heading text-2xl font-bold text-[#050505] text-center mb-6">
          Nos valeurs
        </h2>

        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
          {valeurs.map((v) => (
            <div key={v.titre}
              className="relative rounded-3xl border border-gray-200 bg-white px-6 py-6 text-center shadow-sm overflow-visible">
              {/* Icon overflowing */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 ${v.iconSide === "right" ? "-right-4" : "-left-4"}`}
              >
                <img
                  src={v.icon}
                  alt=""
                  className="h-16 w-16 object-contain drop-shadow-sm"
                />
              </div>

              <h3 className="font-heading text-[17px] font-bold text-[#050505] mb-2">
                {v.titre}
              </h3>
              <p className="font-body text-[13px] text-gray-500 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats édition 1 ── */}
      <div className="mx-5 mb-6 rounded-3xl bg-[#474194] px-6 py-6 text-white md:mx-auto md:max-w-2xl">
        <h3 className="font-heading text-lg font-bold mb-4 text-center">Solimouv&apos; — Édition 1</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-heading text-2xl font-black">500+</p>
            <p className="font-body text-xs text-white/70 mt-1">Participants</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-black">13</p>
            <p className="font-body text-xs text-white/70 mt-1">Associations</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-black">92%</p>
            <p className="font-body text-xs text-white/70 mt-1">Reviendraient</p>
          </div>
        </div>
      </div>

      {/* ── Mascots banner ── */}
      <div className="bg-[#474194] px-5 py-10 flex items-end justify-center gap-4 overflow-hidden">
        <img src="/figma-assets/home/sports/sport-badminton.png" alt="" className="h-20 w-auto object-contain -rotate-12 opacity-90" />
        <img src="/figma-assets/home/sports/sport-tennis.png"   alt="" className="h-24 w-auto object-contain" />
        <img src="/figma-assets/home/sports/sport-bowling.png"  alt="" className="h-20 w-auto object-contain rotate-12 opacity-90" />
      </div>

      {/* ── Footer links ── */}
      <footer className="bg-[#474194] px-5 pb-10 pt-2">
        <img src="/figma-assets/home/logo-white.svg" alt="Solimouv'" className="mx-auto h-6 w-auto mb-6" />
        <nav className="flex flex-col items-center gap-3 font-body text-[15px] text-white/80">
          <Link href="/contact" className="hover:text-white transition">Contactez-nous</Link>
          <Link href="/programme" className="hover:text-white transition">A l&apos;affiche</Link>
          <Link href="/associations" className="hover:text-white transition">Associations</Link>
          <Link href="/a-propos" className="hover:text-white transition">A Propos</Link>
        </nav>
        <div className="mt-6 border-t border-white/20 pt-5 flex flex-col items-center gap-2">
          <Link href="/confidentialite" className="font-body text-xs text-white/50 underline hover:text-white/80 transition">
            Politique de confidentialité
          </Link>
          <Link href="/cgu" className="font-body text-xs text-white/50 underline hover:text-white/80 transition">
            Conditions d&apos;utilisation
          </Link>
          <p className="font-body text-xs text-white/40 mt-1">© 2026 Solimouv. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
