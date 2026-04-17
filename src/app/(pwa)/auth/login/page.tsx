"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import SportIcon from "@/components/icons/SportIcon";

type Mode = "splash" | "login" | "signup";

const GoogleIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.4.07 2.38.78 3.2.8 1.22-.24 2.38-1 3.67-.9 1.58.13 2.77.8 3.54 2.04-3.25 1.96-2.73 6.14.59 7.34-.45 1.18-1.05 2.36-3 3.6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

function Logo() {
  return (
    <img
      src="/figma-assets/logo.png"
      alt="SoliMouv'"
      className="mx-auto h-7 w-auto"
    />
  );
}

function SocialButtons({ onGoogle }: { onGoogle: () => void }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onGoogle}
        className="flex flex-1 items-center justify-center rounded-full border border-gray-200 py-4 transition hover:bg-gray-50 active:scale-95"
        aria-label="Continuer avec Google"
      >
        <GoogleIcon />
      </button>
      <button
        className="flex flex-1 items-center justify-center rounded-full border border-gray-200 py-4 transition hover:bg-gray-50 active:scale-95"
        aria-label="Continuer avec Apple"
      >
        <AppleIcon />
      </button>
      <button
        className="flex flex-1 items-center justify-center rounded-full border border-gray-200 py-4 transition hover:bg-gray-50 active:scale-95"
        aria-label="Continuer avec Facebook"
      >
        <FacebookIcon />
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-sm text-gray-400">ou</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = true,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-brand-dark">
        {label}{required && <span className="text-brand-red">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-gray-200 px-5 py-3.5 text-sm placeholder-gray-400 transition focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark"
      />
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("splash");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [cguAccepted, setCguAccepted] = useState(false);
  const [emailOptin, setEmailOptin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const supabase = createClient();

  function reset() {
    setError("");
    setLoading(false);
  }

  async function handleGoogle() {
    reset();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      window.location.href = "/home";
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!cguAccepted) {
      setError("Vous devez accepter les CGU pour continuer.");
      return;
    }
    setLoading(true);
    setError("");
    const fullName = `${prenom.trim()} ${nom.trim()}`.trim();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          prenom: prenom.trim(),
          nom: nom.trim(),
          age: age ? parseInt(age) : null,
          email_optin: emailOptin,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.user && !data.session) {
      setCheckEmail(true);
    } else {
      // Webhook Make — inscription initiale (questions vides, complétées à l'onboarding)
      const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
      if (webhookUrl && data.user) {
        const now = new Date();
        const prenomVal = prenom.trim();
        const nomVal = nom.trim();
        const slug = (prenomVal + nomVal).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10);
        const dateTag = `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth() + 1).padStart(2, "0")}`;
        const optinDate = emailOptin
          ? `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
          : "";
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: nomVal,
            prenom: prenomVal,
            id_compte: `${slug}${dateTag}`,
            age: age ? parseInt(age) : null,
            email: data.user.email ?? "",
            optin_email: emailOptin ? "oui" : "non",
            date_optin: optinDate,
            question_1: "",
            categorie_email: "",
            question_2: "",
            question_3: "",
            question_4: "",
            question_5: "",
          }),
        }).catch(() => {});
      }
      window.location.href = "/onboarding";
    }
  }

  /* ── Écran confirmation email ── */
  if (checkEmail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <Logo />
        <div className="mt-12 text-center">
          <div className="text-6xl">📩</div>
          <h1 className="font-heading mt-6 text-2xl font-bold text-brand-dark">
            Vérifiez vos emails
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Un lien de confirmation a été envoyé à{" "}
            <strong className="text-brand-dark">{email}</strong>.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Vérifiez vos spams si nécessaire.
          </p>
          <button
            onClick={() => { setCheckEmail(false); setMode("signup"); reset(); }}
            className="mt-8 text-sm text-brand-dark underline"
          >
            ← Modifier l&apos;adresse
          </button>
        </div>
      </div>
    );
  }

  /* ── Splash ── */
  if (mode === "splash") {
    return (
      <div className="flex min-h-screen flex-col bg-white px-6 pt-12">
        <Logo />
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative w-64 h-64">
            <SportIcon sport="Tennis" className="absolute inset-0 m-auto h-40 w-auto" />
          </div>
          <h1 className="font-heading mt-2 text-center text-4xl font-bold text-brand-dark">
            Bonjour&nbsp;!
          </h1>
          <p className="mt-4 max-w-xs text-center text-sm text-gray-500">
            Rejoins le festival du sport inclusif de Paris — pour tous, sans exception.
          </p>
        </div>
        <div className="mb-12 space-y-4">
          <button
            onClick={() => setMode("login")}
            className="btn-primary w-full py-4 text-base"
          >
            Se connecter
          </button>
          <button
            onClick={() => setMode("signup")}
            className="w-full py-2 text-sm text-brand-dark underline underline-offset-2"
          >
            S&apos;inscrire
          </button>
        </div>
      </div>
    );
  }

  /* ── Login ── */
  if (mode === "login") {
    return (
      <div className="flex min-h-screen flex-col bg-white px-6 pt-12 pb-8 overflow-y-auto">
        <Logo />
        <div className="mt-10 flex-1">
          <h1 className="font-heading text-3xl font-bold text-brand-dark leading-tight">
            Content de vous revoir
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Connectez-vous pour commencer votre aventure.
          </p>

          <div className="mt-8 space-y-4">
            <SocialButtons onGoogle={handleGoogle} />
            <Divider />

            <form onSubmit={handleLogin} className="space-y-4">
              <InputField
                label="Email"
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={setEmail}
              />
              <InputField
                label="Mot de passe"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={setPassword}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Rester connecté
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-brand-green hover:underline"
                >
                  Mot de passe oublié&nbsp;?
                </button>
              </div>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-base disabled:opacity-50"
              >
                {loading ? "Connexion…" : "Se connecter"}
              </button>
            </form>

            <button
              onClick={() => { setMode("signup"); reset(); }}
              className="w-full py-2 text-sm text-brand-dark underline underline-offset-2"
            >
              S&apos;inscrire
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Signup ── */
  return (
    <div className="flex min-h-screen flex-col bg-white px-6 pt-12 pb-8 overflow-y-auto">
      <Logo />
      <div className="mt-10 flex-1">
        <h1 className="font-heading text-3xl font-bold text-brand-dark leading-tight">
          Bienvenue&nbsp;!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Crée ton compte et commence à connecter, partager, rencontrer.
        </p>

        <div className="mt-8 space-y-4">
          <SocialButtons onGoogle={handleGoogle} />
          <Divider />

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Prénom"
                type="text"
                placeholder="Marie"
                value={prenom}
                onChange={setPrenom}
              />
              <InputField
                label="Nom"
                type="text"
                placeholder="Dupont"
                value={nom}
                onChange={setNom}
              />
            </div>
            <InputField
              label="Âge"
              type="number"
              placeholder="Ex : 28"
              value={age}
              onChange={setAge}
              required={false}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={setEmail}
            />
            <InputField
              label="Mot de passe"
              type="password"
              placeholder="Min. 6 caractères"
              value={password}
              onChange={setPassword}
            />

            {/* CGU */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cguAccepted}
                onChange={(e) => setCguAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
              />
              <span className="text-xs text-gray-600">
                J&apos;accepte les{" "}
                <a href="/cgu" className="font-medium text-brand-dark underline">
                  Conditions Générales d&apos;Utilisation
                </a>{" "}
                et la{" "}
                <a href="/confidentialite" className="font-medium text-brand-dark underline">
                  politique de confidentialité
                </a>
                .
              </span>
            </label>

            {/* Opt-in email */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailOptin}
                onChange={(e) => setEmailOptin(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
              />
              <span className="text-xs text-gray-600">
                Je souhaite recevoir les actualités et offres du festival par email.
              </span>
            </label>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base disabled:opacity-50"
            >
              {loading ? "Création du compte…" : "Créer mon compte"}
            </button>
          </form>

          <button
            onClick={() => { setMode("login"); reset(); }}
            className="w-full py-2 text-sm text-brand-dark underline underline-offset-2"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
