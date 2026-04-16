"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

const GoogleIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError("Erreur lors de l'envoi. Vérifiez votre adresse email.");
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(
        "Google non disponible pour l'instant — utilisez le lien magique par email."
      );
      setGoogleLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-3xl">
            📩
          </div>
          <h2 className="mt-5 font-heading text-2xl font-bold text-brand-dark">
            Vérifiez vos emails !
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Un lien de connexion a été envoyé à{" "}
            <strong className="text-brand-dark">{email}</strong>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Vérifiez vos spams si vous ne le voyez pas.
          </p>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            className="mt-6 text-sm text-brand-primary underline"
          >
            ← Modifier l&apos;adresse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark px-4 py-12">
      {/* Logo */}
      <Image
        src="/logo.svg"
        alt="Solimouv'"
        width={180}
        height={30}
        className="mb-8 brightness-0 invert"
      />

      <div className="w-full max-w-sm">
        {/* Onglets */}
        <div className="mb-1 flex rounded-2xl bg-white/10 p-1">
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              mode === "signup"
                ? "bg-white text-brand-dark shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            S&apos;inscrire
          </button>
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              mode === "login"
                ? "bg-white text-brand-dark shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            Se connecter
          </button>
        </div>

        {/* Carte */}
        <div className="rounded-2xl bg-white p-7 shadow-xl">
          {mode === "signup" ? (
            <>
              <h1 className="font-heading text-2xl font-bold text-brand-dark">
                Créer mon compte
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Rejoignez Solimouv&apos; gratuitement — sans mot de passe.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-brand-dark">
                Content de vous revoir !
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Connectez-vous en 1 clic, sans mot de passe.
              </p>
            </>
          )}

          {/* Bouton Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[.98] disabled:opacity-50"
          >
            {googleLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            ) : (
              <GoogleIcon />
            )}
            {mode === "signup" ? "S'inscrire" : "Continuer"} avec Google
          </button>

          {/* Séparateur */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-400">ou par email</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* Formulaire email */}
          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@email.com"
                className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading
                ? "Envoi en cours…"
                : mode === "signup"
                ? "Recevoir mon lien d'inscription ✨"
                : "Recevoir mon lien de connexion ✨"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            En continuant, vous acceptez notre{" "}
            <a href="/confidentialite" className="underline hover:text-gray-600">
              politique de confidentialité
            </a>
            .
          </p>
        </div>

        {/* Lien retour */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <a href="/" className="transition-colors hover:text-white">
            ← Continuer sans compte
          </a>
        </p>
      </div>
    </div>
  );
}
