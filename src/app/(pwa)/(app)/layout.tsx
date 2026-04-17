import { createClient } from "@/lib/supabase/server";
import AppBottomNav from "@/components/AppBottomNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.role === "admin";
  }

  return (
    <div className="min-h-screen bg-[#F5F4F2]">
      <main className="pb-28">{children}</main>
      <AppBottomNav isAdmin={isAdmin} />
    </div>
  );
}
