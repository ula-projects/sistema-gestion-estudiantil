import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-64 border-r bg-white min-h-screen">
          {/* AdminSidebar */}
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
