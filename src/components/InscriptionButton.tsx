"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  activiteId: string;
  titre: string;
  placesDisponibles: number;
}

export default function InscriptionButton({ activiteId, titre, placesDisponibles }: Props) {
  const supabase = createClient();
  const [loading, setLoading]     = useState(false);
  const [inscrit, setInscrit]     = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [userId, setUserId]       = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      // Vérifier si déjà inscrit
      const { data } = await supabase
        .from("inscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("activite_id", activiteId)
        .eq("statut", "confirme")
        .maybeSingle();
      if (data) setInscrit(true);
    });
  }, [activiteId]);

  async function handleInscrire() {
    if (!userId || inscrit || placesDisponibles <= 0) return;
    setLoading(true);

    const { error } = await supabase
      .from("inscriptions")
      .insert({ user_id: userId, activite_id: activiteId, statut: "confirme" });

    if (!error) {
      setInscrit(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }
    setLoading(false);
  }

  const complet = placesDisponibles <= 0;

  return (
    <>
      {/* ── Toast ── */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl bg-[#2e7e33] px-5 py-3.5 shadow-xl text-white animate-in slide-in-from-bottom-4 duration-300">
          <span className="text-lg">✅</span>
          <div>
            <p className="font-body font-semibold text-sm">Vous êtes bien inscrit !</p>
            <p className="font-body text-xs text-white/70">{titre}</p>
          </div>
        </div>
      )}

      {/* ── Bouton ── */}
      {inscrit ? (
        <span className="text-xs font-semibold text-[#2e7e33]">
          ✓ Inscrit·e
        </span>
      ) : complet ? (
        <span className="text-xs font-semibold text-red-400">Complet</span>
      ) : (
        <button
          onClick={handleInscrire}
          disabled={loading}
          className="text-xs font-semibold text-[#474194] hover:underline disabled:opacity-50 transition"
        >
          {loading ? "…" : "S'inscrire →"}
        </button>
      )}
    </>
  );
}
