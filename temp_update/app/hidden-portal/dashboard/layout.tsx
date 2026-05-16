import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SidebarNav } from "@/components/cyber-os/sidebar-nav"

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
    <div className="min-h-screen bg-[#020409]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 md:ml-64 overflow-auto bg-[#020409]">{children}</main>
      </div>
    </div>
  )
}
