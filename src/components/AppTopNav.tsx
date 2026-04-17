"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, NavIcon } from "./AppBottomNav";

export default function AppTopNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/home";

  // Icon size in the top nav: Figma icons scaled to 28px for desktop bar
  const ICON_SIZE = 28;

  return (
    <header
      className="hidden md:flex sticky top-0 z-40 items-center bg-[#faf9f5]/95 backdrop-blur-sm border-b border-black/6 px-[48px] h-[70px]"
      aria-label="Navigation principale"
    >
      {/* Logo — 178px wide as per Figma 392-4403 */}
      <Link href="/home" className="shrink-0" style={{ width: 178 }}>
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-[30px] w-auto" />
      </Link>

      {/* Nav tabs — Figma icons at 28px + label, centered */}
      <nav className="flex items-center justify-center gap-2 flex-1">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={active ? href : (isHome && href === "/home" ? "#festival" : href)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all ${
                active ? "bg-[#474194]/10" : "hover:bg-black/5"
              }`}
            >
              {/* Figma icon scaled to ICON_SIZE */}
              <div style={{ opacity: active ? 1 : 0.55 }}>
                <NavIcon Icon={Icon} size={ICON_SIZE} />
              </div>
              <span
                className={`font-[Author,sans-serif] whitespace-nowrap transition-colors ${
                  active ? "text-[#474194]" : "text-[#474194]/60"
                }`}
                style={{ fontSize: 15 }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0" style={{ width: 304 }}>
        <Link
          href="/compte"
          className="flex items-center justify-center rounded-full border border-[#050505] font-medium text-[#050505] hover:bg-black/5 transition"
          style={{ width: 148, height: 40, fontSize: 15 }}
        >
          Mon compte
        </Link>
        <Link
          href={isAdmin ? "/admin" : "/quiz"}
          className="flex items-center justify-center rounded-full bg-[#050505] font-semibold text-white hover:opacity-90 transition"
          style={{ width: 148, height: 40, fontSize: 15 }}
        >
          {isAdmin ? "Admin →" : "Trouve ton sport"}
        </Link>
      </div>
    </header>
  );
}
