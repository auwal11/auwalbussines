import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/admin/dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== "authenticated") {
    redirect("/hidden-portal")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="pt-16">{children}</main>
    </div>
  )
}
