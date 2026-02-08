"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="flex h-screen bg-background text-foreground">
      {!isLoginPage && <AdminSidebar />}
      <main className={`flex-1 overflow-y-auto ${!isLoginPage ? "p-8" : ""}`}>
        {children}
      </main>
    </div>
  );
}
