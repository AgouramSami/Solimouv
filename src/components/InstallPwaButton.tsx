"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPwaButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (installed) {
    return (
      <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
        Ouvrir l&apos;app
      </Link>
    );
  }

  if (prompt) {
    return (
      <button
        onClick={async () => {
          await prompt.prompt();
          const { outcome } = await prompt.userChoice;
          if (outcome === "accepted") setInstalled(true);
          setPrompt(null);
        }}
        className="btn-primary text-base px-8 py-4"
      >
        Installer l&apos;app
      </button>
    );
  }

  // Fallback (iOS Safari, desktop) — lien direct vers l'app
  return (
    <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
      Accéder à l&apos;app
    </Link>
  );
}
