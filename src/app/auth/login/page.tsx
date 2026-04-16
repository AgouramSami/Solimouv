"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Une erreur est survenue. Vérifiez votre email et réessayez.");
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark px-4">
      {/* Logo */}
      <div className="mb-10">
        <Image src="/logo.svg" alt="Solimouv'" width={200} height={34} className="brightness-0 invert" />
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        {!sent ? (
          <>
            <h1 className="font-heading text-2xl font-bold text-brand-dark">
              Rejoindre Solimouv&apos;
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Entrez votre email — on vous envoie un lien magique, sans mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? "Envoi en cours…" : "Recevoir mon lien magique ✨"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              En continuant, vous acceptez notre{" "}
              <a href="/confidentialite" className="underline hover:text-gray-600">
                politique de confidentialité
              </a>
              .
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-3xl">
              📩
            </div>
            <h2 className="mt-4 font-heading text-xl font-bold text-brand-dark">
              Vérifiez vos emails !
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Un lien de connexion a été envoyé à{" "}
              <strong className="text-brand-dark">{email}</strong>
            </p>
            <p className="mt-3 text-xs text-gray-400">
              Pas reçu ? Vérifiez vos spams ou{" "}
              <button
                onClick={() => setSent(false)}
                className="text-brand-primary underline"
              >
                réessayez
              </button>
              .
            </p>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        <a href="/" className="hover:text-white transition-colors">
          ← Continuer sans compte
        </a>
      </p>
    </div>
  );
}
