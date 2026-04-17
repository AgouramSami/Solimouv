import { createClient } from "@/lib/supabase/server";
import AppBottomNav from "@/components/AppBottomNav";
import AppTopNav from "@/components/AppTopNav";

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
      {/* Desktop: sticky top nav */}
      <AppTopNav isAdmin={isAdmin} />
      {/* Content: bottom padding on mobile for bottom nav, none on desktop */}
      <main className="pb-[calc(80px+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>
      {/* Mobile: fixed bottom nav */}
      <AppBottomNav isAdmin={isAdmin} />
    </div>
  );
}
