"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, TrendingUp, Clock, Star } from "lucide-react"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    // Simulate real-time KPI data
    const mockData: KPIData = {
      todayAppointments: 8,
      todayRevenue: 420.0,
      totalClients: 156,
      averageRating: 4.8,
      completionRate: 92,
      nextAppointment: "14:30 - João Silva",
    }
    setKpiData(mockData)
  }, [barbershopId])

  const kpiCards = [
    {
      title: "Agendamentos Hoje",
      value: kpiData.todayAppointments,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      badge: "+2 desde ontem",
      badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    {
      title: "Receita do Dia",
      value: `R$ ${kpiData.todayRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      badge: "+15% vs ontem",
      badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    {
      title: "Total de Clientes",
      value: kpiData.totalClients,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      badge: "+5 este mês",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    {
      title: "Avaliação Média",
      value: kpiData.averageRating.toFixed(1),
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      badge: "Excelente",
      badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
    {
      title: "Taxa de Conclusão",
      value: `${kpiData.completionRate}%`,
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600",
      badge: "+3% este mês",
      badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    {
      title: "Próximo Agendamento",
      value: kpiData.nextAppointment,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      badge: "Em 2h 15min",
      badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
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
