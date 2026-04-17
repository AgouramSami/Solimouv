import AppBottomNav from "@/components/AppBottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F4F2]">
      <main className="pb-24">{children}</main>
      <AppBottomNav />
    </div>
  );
}
