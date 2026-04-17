"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { Home, Info, Calendar, Users, Mail } from "lucide-react";

const mobileLinks = [
  { href: "/",            icon: Home,     label: "Accueil" },
  { href: "/programme",   icon: Calendar, label: "Programme" },
  { href: "/associations",icon: Users,    label: "Associations" },
  { href: "/a-propos",    icon: Info,     label: "À propos" },
  { href: "/contact",     icon: Mail,     label: "Contact" },
];

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/programme", label: "Programme" },
  { href: "/associations", label: "Associations" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Solimouv' — accueil"
        >
          <Image
            src="/figma-assets/logo.png"
            alt="Solimouv'"
            width={160}
            height={28}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  pathname === link.href
                    ? "text-brand-primary"
                    : "text-gray-600"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <UserMenu />

        {/* Mobile burger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className="sr-only">{open ? "Fermer" : "Menu"}</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-light hover:text-brand-primary ${
                    pathname === link.href
                      ? "bg-brand-light text-brand-primary"
                      : "text-gray-700"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link href="/programme" onClick={() => setOpen(false)} className="btn-primary w-full text-sm">
                Je participe
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>

    {/* Mobile : bottom bar — pattern PWA natif */}
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-gray-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm"
      aria-label="Navigation principale"
    >
      {mobileLinks.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex min-h-[56px] min-w-[56px] flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-[10px] font-medium transition-colors ${
              isActive ? "text-brand-primary" : "text-gray-400"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
