// AI-powered insights and analytics for barbershops
export interface AIInsight {
  id: string
  type: "optimization" | "prediction" | "recommendation" | "alert"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  actionable: boolean
  data?: any
  createdAt: Date
}

export interface CustomerBehavior {
  customerId: string
  preferredServices: string[]
  preferredTimes: string[]
  averageSpending: number
  loyaltyScore: number
  riskOfChurn: number
  nextVisitPrediction: Date
}

// Simulated AI insights - in production, this would connect to real AI APIs
export class AIInsightsEngine {
  static async generateDailyInsights(barbershopId: string): Promise<AIInsight[]> {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const insights: AIInsight[] = [
      {
        id: "1",
        type: "optimization",
        title: "Otimização de Horários",
        description: "Seus horários de 14h-16h têm 23% menos agendamentos. Considere oferecer promoções neste período.",
        impact: "high",
        actionable: true,
        data: { timeSlot: "14:00-16:00", occupancyRate: 0.77 },
        createdAt: new Date(),
      },
      {
        id: "2",
        type: "prediction",
        title: "Previsão de Demanda",
        description: "Baseado no histórico, espere 35% mais agendamentos na próxima sexta-feira.",
        impact: "medium",
        actionable: true,
        data: { predictedIncrease: 0.35, date: "Friday" },
        createdAt: new Date(),
      },
      {
        id: "3",
        type: "recommendation",
        title: "Serviços Populares",
        description: "Corte + Barba está em alta. 67% dos clientes que fazem corte também pedem barba.",
        impact: "medium",
        actionable: true,
        data: { service: "Corte + Barba", conversionRate: 0.67 },
        createdAt: new Date(),
      },
      {
        id: "4",
        type: "alert",
        title: "Clientes em Risco",
        description: "3 clientes VIP não agendam há mais de 30 dias. Considere entrar em contato.",
        impact: "high",
        actionable: true,
        data: { riskCustomers: 3, daysSinceLastVisit: 30 },
        createdAt: new Date(),
      },
    ]

    return insights
  }

  static async analyzeCustomerBehavior(customerId: string): Promise<CustomerBehavior> {
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      customerId,
      preferredServices: ["Corte Masculino", "Barba"],
      preferredTimes: ["10:00", "14:00", "16:00"],
      averageSpending: 45.5,
      loyaltyScore: 8.5,
      riskOfChurn: 0.15,
      nextVisitPrediction: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    }
  }

  static async generateServiceRecommendations(customerId: string): Promise<string[]> {
    // Simulate AI recommendation engine
    await new Promise((resolve) => setTimeout(resolve, 600))

    const recommendations = [
      "Tratamento Capilar Premium",
      "Corte + Barba Combo",
      "Hidratação Facial",
      "Sobrancelha Masculina",
    ]

    return recommendations.slice(0, 2) // Return top 2 recommendations
  }

  static async optimizeSchedule(barbershopId: string, date: Date): Promise<any> {
    // Simulate schedule optimization
    await new Promise((resolve) => setTimeout(resolve, 1200))

    return {
      suggestedSlots: [
        { time: "09:00", reason: "Alto potencial de conversão" },
        { time: "11:00", reason: "Horário preferido pelos clientes VIP" },
        { time: "15:00", reason: "Baixa ocupação, ideal para promoções" },
      ],
      efficiency: 0.87,
      revenueProjection: 1250.0,
    }
  }
}
