import type { Metadata } from "next";
import { verifySession } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifySession();

  return (
    <>
      <AdminNav />
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 md:pt-28">
        {children}
      </main>
    </>
  );
}