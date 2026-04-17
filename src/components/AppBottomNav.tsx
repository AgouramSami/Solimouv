"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconAccueil() {
  return (
    <div className="relative size-[46px]">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-home-bg.svg" />
      <div className="absolute" style={{ inset: "11.39% 19.6% 21.8% 19.61%" }}>
        <div className="absolute" style={{ inset: "-2.21% -2.43%" }}>
          <img alt="" className="block size-full max-w-none" src="/figma-assets/navbar/nav-home-vector.svg" />
        </div>
      </div>
    </div>
  );
}

function IconAssociation() {
  return (
    <div className="relative size-[46px]">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-asso-bg.svg" />
    </div>
  );
}

function IconCompte() {
  return (
    <div className="relative size-[46px]">
      <div
        className="absolute flex items-center justify-center"
        style={{ inset: "0 0 1.74% 0", containerType: "size" }}
      >
        <div
          style={{
            flexShrink: 0,
            height: "hypot(26.4078cqw, 73.5922cqh)",
            width: "hypot(73.5922cqw, 26.4078cqh)",
            transform: "rotate(-19.74deg)",
          }}
        >
          <div className="relative size-full">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-compte-v1.svg" />
          </div>
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ inset: "11.79% 0.95% 0 9.29%", containerType: "size" }}
      >
        <div
          style={{
            flexShrink: 0,
            height: "hypot(26.4078cqw, 73.5922cqh)",
            width: "hypot(73.5922cqw, 26.4078cqh)",
            transform: "rotate(-19.74deg)",
          }}
        >
          <div className="relative size-full">
            <div className="absolute" style={{ inset: "-1.57% -1.55%" }}>
              <img alt="" className="block size-full max-w-none" src="/figma-assets/navbar/nav-compte-v2.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute" style={{ inset: "44.57% 28.27% 39.27% 56.48%" }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-compte-v3.svg" />
      </div>
      <div className="absolute" style={{ inset: "45.13% 54.29% 39.64% 30.1%" }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-compte-v4.svg" />
      </div>
      <div className="absolute" style={{ inset: "52.43% 56.72% 40.62% 36.23%" }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-compte-v5.svg" />
      </div>
      <div className="absolute" style={{ inset: "53.41% 30.41% 39.64% 62.54%" }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-compte-v6.svg" />
      </div>
    </div>
  );
}

function IconParametres() {
  return (
    <div className="relative size-[46px]">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/navbar/nav-params-bg.svg" />
      <div className="absolute" style={{ inset: "18.59% 18.79% 18.23% 16.19%" }}>
        <div className="absolute" style={{ inset: "-3.19% -2.31% -2.89% -2.45%" }}>
          <img alt="" className="block size-full max-w-none" src="/figma-assets/navbar/nav-params-v1.svg" />
        </div>
      </div>
      <div className="absolute" style={{ inset: "41.51% 43.49% 41.42% 38.16%" }}>
        <div className="absolute" style={{ inset: "-8.66% -8.05% -8.67% -8.06%" }}>
          <img alt="" className="block size-full max-w-none" src="/figma-assets/navbar/nav-params-v2.svg" />
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { href: "/home",         label: "Accueil",    Icon: IconAccueil },
  { href: "/associations", label: "Association", Icon: IconAssociation },
  { href: "/compte",       label: "Mon compte",  Icon: IconCompte },
  { href: "/parametres",   label: "Paramètres",  Icon: IconParametres },
];

export default function AppBottomNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-[#faf9f5] pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigation principale"
    >
      <div className="flex items-center justify-around gap-9 px-14 pt-[15px] pb-[14px]">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const isCompte = href === "/compte";
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex flex-col items-center gap-0 transition-opacity"
              style={{ opacity: active ? 1 : 0.55 }}
            >
              <div className="relative">
                <Icon />
                {isCompte && isAdmin && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d81d61] text-[9px] font-bold text-white leading-none">
                    A
                  </span>
                )}
              </div>
              <span className="mt-0 font-[Author,sans-serif] text-[16px] leading-6 text-[#474194] text-center whitespace-nowrap">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
