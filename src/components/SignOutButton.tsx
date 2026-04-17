"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full rounded-full border border-red-200 py-3.5 text-sm font-semibold text-red-500 transition active:scale-95 hover:bg-red-50"
    >
      Se déconnecter
    </button>
  );
}
