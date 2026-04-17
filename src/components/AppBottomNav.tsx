"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings } from "lucide-react";

const MascotIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" className="h-7 w-7">
    <rect x="3" y="3" width="22" height="22" rx="6" stroke="white" strokeWidth="2" />
    <circle cx="10" cy="14" r="2.5" fill="#C11720" />
    <circle cx="18" cy="14" r="2.5" fill="#C11720" />
  </svg>
);

const navItems = [
  { href: "/home", label: "Accueil", Icon: ({ active }: { active: boolean }) => (
    <Home className="h-6 w-6" stroke="white" strokeWidth={active ? 2.5 : 1.8} />
  )},
  { href: "/associations", label: "Association", Icon: ({ active }: { active: boolean }) => (
    <Users className="h-6 w-6" stroke="white" strokeWidth={active ? 2.5 : 1.8} />
  )},
  { href: "/compte", label: "Mon compte", Icon: () => <MascotIcon /> },
  { href: "/parametres", label: "Paramètres", Icon: ({ active }: { active: boolean }) => (
    <Settings className="h-6 w-6" stroke="white" strokeWidth={active ? 2.5 : 1.8} />
  )},
];

export default function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-[#F5F4F2] pb-safe"
      aria-label="Navigation principale"
    >
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex flex-col items-center gap-1.5 min-w-[72px]"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 ${
                  active
                    ? "bg-[#474194] shadow-[0_4px_12px_rgba(71,65,148,0.35)] scale-105"
                    : "bg-[#474194]/85"
                }`}
              >
                <Icon active={active} />
              </div>
              <span
                className={`text-xs leading-none transition-colors ${
                  active ? "font-semibold text-[#474194]" : "font-medium text-[#474194]/70"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
