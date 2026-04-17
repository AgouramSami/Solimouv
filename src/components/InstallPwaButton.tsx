"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Mode = "installed" | "prompt" | "ios" | "fallback";

function detectMode(): Mode {
  if (window.matchMedia("(display-mode: standalone)").matches) return "installed";
  const ua = navigator.userAgent;
  const isIos = /iphone|ipad|ipod/i.test(ua) && !(window as unknown as Record<string, unknown>).MSStream;
  if (isIos) return "ios";
  return "fallback";
}

export default function InstallPwaButton() {
  const [mode, setMode] = useState<Mode>("fallback");
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    setMode(detectMode());

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setMode("prompt");
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (mode === "installed") {
    return (
      <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
        Ouvrir l&apos;app
      </Link>
    );
  }

  if (mode === "prompt" && prompt) {
    return (
      <button
        onClick={async () => {
          await prompt.prompt();
          const { outcome } = await prompt.userChoice;
          if (outcome === "accepted") setMode("installed");
          setPrompt(null);
        }}
        className="btn-primary text-base px-8 py-4"
      >
        Installer l&apos;app
      </button>
    );
  }

  if (mode === "ios") {
    return (
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setShowIosHint((v) => !v)}
          className="btn-primary text-base px-8 py-4"
        >
          Installer l&apos;app
        </button>
        {showIosHint && (
          <div className="rounded-2xl bg-white/15 px-5 py-4 text-sm text-white text-left max-w-xs space-y-1">
            <p className="font-semibold mb-2">Pour installer sur iPhone / iPad :</p>
            <p>1. Appuie sur <span className="font-bold">⎙ Partager</span> dans Safari</p>
            <p>2. Sélectionne <span className="font-bold">« Sur l&apos;écran d&apos;accueil »</span></p>
            <p>3. Confirme en tapant <span className="font-bold">« Ajouter »</span></p>
          </div>
        )}
        <Link href="/auth/login" className="text-sm text-white/70 underline underline-offset-2">
          Continuer sans installer
        </Link>
      </div>
    );
  }

  // Fallback — autres navigateurs sans support beforeinstallprompt
  return (
    <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
      Accéder à l&apos;app
    </Link>
  );
}
