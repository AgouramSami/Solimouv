import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image src="/logo.svg" alt="Solimouv'" width={140} height={24} className="brightness-0 invert" />
            <p className="mt-2 text-sm text-gray-400">
              Le festival du sport pour tous, organisé par Up Sport! et un collectif
              d&apos;associations parisiennes.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/solimouv.festival/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="Instagram Solimouv'"
              >
                Instagram
              </a>
              <span className="text-gray-600" aria-hidden="true">·</span>
              <a
                href="https://www.facebook.com/UpSport.UNis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="Facebook Up Sport!"
              >
                Facebook
              </a>
              <span className="text-gray-600" aria-hidden="true">·</span>
              <a
                href="https://www.tiktok.com/@upsportparis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-primary transition-colors"
                aria-label="TikTok Up Sport!"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation secondaire">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Navigation
            </p>
            <ul className="space-y-2 text-sm" role="list">
              {[
                { href: "/a-propos", label: "À propos" },
                { href: "/programme", label: "Programme" },
                { href: "/associations", label: "Associations" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Mentions légales">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Légal
            </p>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-gray-400 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} Up Sport! — Association loi 1901.{" "}
            <a
              href="https://www.unispourlesport.paris/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              unispourlesport.paris
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
