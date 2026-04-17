"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, NavIcon } from "./AppBottomNav";

export default function AppTopNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <header
      className="hidden md:flex sticky top-0 z-40 items-center bg-[#faf9f5]/95 backdrop-blur-sm border-b border-black/6 px-6 lg:px-10 h-[70px]"
      aria-label="Navigation principale"
    >
      {/* Logo */}
      <Link href="/home" className="mr-8 shrink-0">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto" />
      </Link>

      {/* Nav tabs */}
      <nav className="flex items-center gap-2 flex-1">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const isCompte = href === "/compte";
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2.5 rounded-full px-4 py-2 transition-all ${
                active
                  ? "bg-[#474194]/10"
                  : "hover:bg-black/5"
              }`}
            >
              <div className="relative shrink-0" style={{ opacity: active ? 1 : 0.6 }}>
                <NavIcon Icon={Icon} size={30} />
                {isCompte && isAdmin && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d81d61] text-[9px] font-bold text-white leading-none">
                    A
                  </span>
                )}
              </div>
              <span
                className={`font-[Author,sans-serif] text-[15px] whitespace-nowrap transition-colors ${
                  active ? "text-[#474194] font-medium" : "text-[#474194]/60"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Right: admin shortcut */}
      {isAdmin && (
        <Link
          href="/admin"
          className="ml-4 shrink-0 rounded-full border border-[#d81d61] px-4 py-1.5 text-sm font-semibold text-[#d81d61] hover:bg-[#d81d61] hover:text-white transition-colors"
        >
          Admin →
        </Link>
      )}
    </header>
  );
}
