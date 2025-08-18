"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, User, Clock, DollarSign } from "lucide-react"
import { AIInsightsEngine, type CustomerBehavior } from "@/lib/ai/insights"

interface SmartRecommendationsProps {
  customerId?: string
}

export function SmartRecommendations({ customerId }: SmartRecommendationsProps) {
  const [behavior, setBehavior] = useState<CustomerBehavior | null>(null)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (customerId) {
      loadCustomerAnalysis()
    }
  }, [customerId])

  const loadCustomerAnalysis = async () => {
    if (!customerId) return

    setLoading(true)
    try {
      const [customerBehavior, serviceRecommendations] = await Promise.all([
        AIInsightsEngine.analyzeCustomerBehavior(customerId),
        AIInsightsEngine.generateServiceRecommendations(customerId),
      ])

      setBehavior(customerBehavior)
      setRecommendations(serviceRecommendations)
    } catch (error) {
      console.error("Erro ao carregar análise do cliente:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!customerId) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Recomendações Inteligentes
          </CardTitle>
          <CardDescription>Selecione um cliente para ver recomendações personalizadas</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Recomendações Inteligentes
          </CardTitle>
          <CardDescription>Analisando perfil do cliente...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Recomendações Inteligentes
        </CardTitle>
        <CardDescription>Baseado no comportamento e preferências do cliente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {behavior && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Score de Fidelidade
              </div>
              <div className="text-2xl font-bold text-green-600">{behavior.loyaltyScore}/10</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" />
                Gasto Médio
              </div>
              <div className="text-2xl font-bold text-blue-600">R$ {behavior.averageSpending.toFixed(2)}</div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium">Serviços Recomendados</h4>
          <div className="space-y-2">
            {recommendations.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-card/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="font-medium">{service}</span>
                </div>
                <Badge variant="secondary">IA</Badge>
              </div>
            ))}
          </div>
        </div>

        {behavior && (
          <div className="space-y-3">
            <h4 className="font-medium">Horários Preferidos</h4>
            <div className="flex flex-wrap gap-2">
              {behavior.preferredTimes.map((time) => (
                <Badge key={time} variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {time}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <Button className="w-full bg-transparent" variant="outline">
            Aplicar Recomendações
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
