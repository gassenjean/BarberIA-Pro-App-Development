"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, AlertTriangle, Target, Sparkles, Brain } from "lucide-react"
import { AIInsightsEngine, type AIInsight } from "@/lib/ai/insights"

interface AIInsightsPanelProps {
  barbershopId: string
}

export function AIInsightsPanel({ barbershopId }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInsights()
  }, [barbershopId])

  const loadInsights = async () => {
    setLoading(true)
    try {
      const dailyInsights = await AIInsightsEngine.generateDailyInsights(barbershopId)
      setInsights(dailyInsights)
    } catch (error) {
      console.error("Erro ao carregar insights:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "optimization":
        return <Target className="h-4 w-4" />
      case "prediction":
        return <TrendingUp className="h-4 w-4" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-600 border-red-200"
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
      case "low":
        return "bg-green-500/10 text-green-600 border-green-200"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200"
    }
  }

  if (loading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Insights de IA
          </CardTitle>
          <CardDescription>Carregando análises inteligentes...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Insights de IA
            </CardTitle>
            <CardDescription>Análises inteligentes para otimizar seu negócio</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadInsights}>
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-600">{getInsightIcon(insight.type)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact === "high" ? "Alto" : insight.impact === "medium" ? "Médio" : "Baixo"} Impacto
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  {insight.actionable && (
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Tomar Ação
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
