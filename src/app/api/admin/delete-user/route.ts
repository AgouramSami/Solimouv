import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(request: Request) {
  // 1. Vérifier que le demandeur est bien admin
  const supabase = await createClient();
  const { data: { user: caller } } = await supabase.auth.getUser();

  if (!caller) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data: callerProfile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", caller.id)
    .single();

  if (callerProfile?.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  // 2. Récupérer l'id cible
  const { userId } = await request.json();

  if (!userId || typeof userId !== "string") {
    return NextResponse.json({ error: "userId manquant" }, { status: 400 });
  }

  // 3. Empêcher l'admin de se supprimer lui-même
  if (userId === caller.id) {
    return NextResponse.json({ error: "Vous ne pouvez pas supprimer votre propre compte." }, { status: 400 });
  }

  // 4. Supprimer via le client admin (service role)
  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
