import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { ReferralDashboard } from "@/components/gamification/referral-dashboard"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { Achievements } from "@/components/gamification/achievements"

export default async function GamificationPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  let barbershop = null
  if (profile?.role === "barbeiro") {
    const { data } = await supabase.from("barbershops").select("*").eq("owner_id", user.id).single()
    barbershop = data
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader user={user} profile={profile} barbershop={barbershop} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sistema de Gamificação
            </h1>
            <p className="text-muted-foreground">Ganhe pontos, desbloqueie conquistas e compete no ranking</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ReferralDashboard userId={user.id} />
              <Achievements userId={user.id} />
            </div>
            <div>
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
