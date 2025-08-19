"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, TrendingUp, Clock, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface KPICardsProps {
  barbershopId?: string
}

interface KPIData {
  todayAppointments: number
  todayRevenue: number
  totalClients: number
  averageRating: number
  completionRate: number
  nextAppointment: string
}

export default function KPICards({ barbershopId }: KPICardsProps) {
  const [kpiData, setKpiData] = useState<KPIData>({
    todayAppointments: 0,
    todayRevenue: 0,
    totalClients: 0,
    averageRating: 0,
    completionRate: 0,
    nextAppointment: "Nenhum agendamento",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRealKPIData() {
      if (!barbershopId) {
        setLoading(false)
        return
      }

      const supabase = createClient()
      const today = new Date().toISOString().split("T")[0]

      try {
        // Get today's appointments
        const { data: todayAppointments } = await supabase
          .from("appointments")
          .select("*, services(price)")
          .eq("barbershop_id", barbershopId)
          .gte("date", today)
          .lt("date", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0])

        // Get total unique clients
        const { data: allAppointments } = await supabase
          .from("appointments")
          .select("client_name")
          .eq("barbershop_id", barbershopId)

        // Get average rating from reviews
        const { data: reviews } = await supabase.from("reviews").select("rating").eq("barbershop_id", barbershopId)

        // Get next appointment
        const { data: nextAppointment } = await supabase
          .from("appointments")
          .select("time, client_name")
          .eq("barbershop_id", barbershopId)
          .gte("date", today)
          .eq("status", "agendado")
          .order("date", { ascending: true })
          .order("time", { ascending: true })
          .limit(1)

        // Calculate KPIs from real data
        const todayCount = todayAppointments?.length || 0
        const todayRevenue = todayAppointments?.reduce((sum, apt) => sum + (apt.services?.price || 0), 0) || 0
        const uniqueClients = new Set(allAppointments?.map((apt) => apt.client_name)).size
        const avgRating = reviews?.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0
        const completedToday = todayAppointments?.filter((apt) => apt.status === "concluido").length || 0
        const completionRate = todayCount > 0 ? Math.round((completedToday / todayCount) * 100) : 0
        const nextApt = nextAppointment?.[0]
          ? `${nextAppointment[0].time} - ${nextAppointment[0].client_name}`
          : "Nenhum agendamento"

        setKpiData({
          todayAppointments: todayCount,
          todayRevenue: todayRevenue,
          totalClients: uniqueClients,
          averageRating: avgRating,
          completionRate: completionRate,
          nextAppointment: nextApt,
        })
      } catch (error) {
        console.error("Error fetching KPI data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRealKPIData()
  }, [barbershopId])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="glass border-white/10 animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-600 rounded w-24"></div>
              <div className="w-10 h-10 bg-gray-600 rounded-lg"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-600 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const kpiCards = [
    {
      title: "Agendamentos Hoje",
      value: kpiData.todayAppointments,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      badge: kpiData.todayAppointments > 0 ? `${kpiData.todayAppointments} agendados` : "Nenhum hoje",
      badgeColor:
        kpiData.todayAppointments > 0
          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
          : "bg-gray-500/20 text-gray-300 border-gray-500/30",
    },
    {
      title: "Receita do Dia",
      value: `R$ ${kpiData.todayRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      badge: kpiData.todayRevenue > 0 ? "Receita atual" : "Sem receita hoje",
      badgeColor:
        kpiData.todayRevenue > 0
          ? "bg-green-500/20 text-green-300 border-green-500/30"
          : "bg-gray-500/20 text-gray-300 border-gray-500/30",
    },
    {
      title: "Total de Clientes",
      value: kpiData.totalClients,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      badge: kpiData.totalClients > 0 ? "Clientes únicos" : "Nenhum cliente",
      badgeColor:
        kpiData.totalClients > 0
          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
          : "bg-gray-500/20 text-gray-300 border-gray-500/30",
    },
    {
      title: "Avaliação Média",
      value: kpiData.averageRating > 0 ? kpiData.averageRating.toFixed(1) : "N/A",
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      badge: kpiData.averageRating > 0 ? "Baseado em avaliações" : "Sem avaliações",
      badgeColor:
        kpiData.averageRating > 0
          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
          : "bg-gray-500/20 text-gray-300 border-gray-500/30",
    },
    {
      title: "Taxa de Conclusão",
      value: `${kpiData.completionRate}%`,
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600",
      badge: kpiData.completionRate > 0 ? "Hoje" : "Sem dados",
      badgeColor:
        kpiData.completionRate > 0
          ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
          : "bg-gray-500/20 text-gray-300 border-gray-500/30",
    },
    {
      title: "Próximo Agendamento",
      value: kpiData.nextAppointment,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      badge: kpiData.nextAppointment !== "Nenhum agendamento" ? "Próximo" : "Agenda livre",
      badgeColor:
        kpiData.nextAppointment !== "Nenhum agendamento"
          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
          : "bg-gray-500/20 text-gray-300 border-gray-500/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpiCards.map((kpi, index) => (
        <Card
          key={index}
          className="glass border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">{kpi.title}</CardTitle>
            <div className={`w-10 h-10 bg-gradient-to-br ${kpi.color} rounded-lg flex items-center justify-center`}>
              <kpi.icon className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{kpi.value}</div>
            <Badge className={`${kpi.badgeColor} text-xs`}>{kpi.badge}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
