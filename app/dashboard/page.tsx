import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import KPICards from "@/components/dashboard/kpi-cards"
import AgendaCalendar from "@/components/dashboard/agenda-calendar"
import TodayAppointments from "@/components/dashboard/today-appointments"
import PerformanceChart from "@/components/dashboard/performance-chart"
import { AIInsightsPanel } from "@/components/ai/ai-insights-panel"
import { ReferralDashboard } from "@/components/gamification/referral-dashboard"
import { Leaderboard } from "@/components/gamification/leaderboard"

export default async function DashboardPage() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  // Get the user from the server
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get user's barbershop if they are a barber
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
          {/* KPIs */}
          <KPICards barbershopId={barbershop?.id} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar - Takes 2 columns */}
            <div className="lg:col-span-2">
              <AgendaCalendar barbershopId={barbershop?.id} />
            </div>

            {/* Today's Appointments - Takes 1 column */}
            <div className="lg:col-span-1">
              <TodayAppointments barbershopId={barbershop?.id} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <AIInsightsPanel barbershopId={barbershop?.id || "demo"} />
            <Leaderboard />
          </div>

          {/* Gamification Dashboard */}
          <ReferralDashboard userId={user.id} />

          {/* Performance Chart */}
          <PerformanceChart barbershopId={barbershop?.id} />
        </div>
      </main>
    </div>
  )
}
