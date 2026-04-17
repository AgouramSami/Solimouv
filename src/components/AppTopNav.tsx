"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppTopNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/home";

  return (
    <header className="hidden md:flex sticky top-0 z-40 items-center bg-[#faf9f5]/95 backdrop-blur-sm border-b border-black/6 px-[48px] h-[70px]">
      {/* Logo */}
      <Link href="/home" className="shrink-0" style={{ width: 178 }}>
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-[30px] w-auto" />
      </Link>

      {/* Nav links — centered, 120px each */}
      <nav className="flex items-center justify-center flex-1" aria-label="Navigation principale">
        {[
          { href: isHome ? "#festival" : "/home", label: "Festival" },
          { href: isHome ? "#programme" : "/home#programme", label: "Programme" },
          { href: isHome ? "#pour-vous" : "/home#pour-vous", label: "Pour vous" },
          { href: "/a-propos", label: "À propos" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="flex items-center justify-center text-[16px] font-medium text-[#050505] hover:opacity-60 transition-opacity"
            style={{ width: 120 }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Right action buttons */}
      <div className="flex items-center gap-2 shrink-0" style={{ width: 304 }}>
        <Link
          href="/compte"
          className="flex items-center justify-center rounded-full border border-[#050505] text-[16px] font-medium text-[#050505] hover:bg-black/5 transition"
          style={{ width: 148, height: 40 }}
        >
          Mon compte
        </Link>
        <Link
          href={isAdmin ? "/admin" : "/quiz"}
          className="flex items-center justify-center rounded-full bg-[#050505] text-[16px] font-semibold text-white hover:opacity-90 transition"
          style={{ width: 148, height: 40 }}
        >
          {isAdmin ? "Admin →" : "Se connecter"}
        </Link>
      </div>
    </header>
  );
}
