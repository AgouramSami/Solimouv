"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Navigation principale"
      >
        <Link href="/" className="flex items-center" aria-label="Solimouv' — accueil">
          <Image src="/figma-assets/logo.png" alt="Solimouv'" width={160} height={28} priority />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-600 hover:text-[#474194] transition-colors"
          >
            Se connecter
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full bg-[#474194] px-4 py-2 text-sm font-semibold text-white transition active:scale-95 hover:bg-[#3a3578]"
          >
            Je participe
          </Link>
        </div>
      </nav>
    </header>
  );
}
