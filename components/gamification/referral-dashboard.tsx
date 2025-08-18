"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Share2, Users, Gift, TrendingUp } from "lucide-react"
import { GamificationEngine, type UserPoints } from "@/lib/gamification/referral-system"

interface ReferralDashboardProps {
  userId: string
}

export function ReferralDashboard({ userId }: ReferralDashboardProps) {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null)
  const [referralCode, setReferralCode] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [userId])

  const loadUserData = async () => {
    setLoading(true)
    try {
      const points = await GamificationEngine.simulateUserPoints(userId)
      const code = GamificationEngine.generateReferralCode(userId)

      setUserPoints(points)
      setReferralCode(code)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    // In a real app, show a toast notification
  }

  const shareReferralCode = () => {
    const message = `Conheça o BarberIA Pro! Use meu código ${referralCode} e ganhe desconto no primeiro agendamento. https://barberia-pro.com/ref/${referralCode}`

    if (navigator.share) {
      navigator.share({
        title: "BarberIA Pro - Indicação",
        text: message,
      })
    } else {
      navigator.clipboard.writeText(message)
    }
  }

  if (loading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle>Sistema de Indicações</CardTitle>
          <CardDescription>Carregando seus dados...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Seus Pontos
          </CardTitle>
          <CardDescription>Acompanhe seu progresso e nível</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">{userPoints?.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total de Pontos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">Nível {userPoints?.currentLevel}</div>
              <div className="text-sm text-muted-foreground">Nível Atual</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">#{userPoints?.rank}</div>
              <div className="text-sm text-muted-foreground">Ranking</div>
            </div>
            <div className="text-center space-y-2">
              <Badge className="text-lg px-3 py-1">
                {userPoints && GamificationEngine.getLevelBadge(userPoints.currentLevel)}
              </Badge>
              <div className="text-sm text-muted-foreground">Badge</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Code */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Seu Código de Indicação
          </CardTitle>
          <CardDescription>Compartilhe e ganhe pontos por cada novo cliente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={referralCode} readOnly className="font-mono text-lg" />
            <Button variant="outline" onClick={copyReferralCode}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button onClick={shareReferralCode}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-semibold text-orange-600">{userPoints?.referralPoints}</div>
              <div className="text-xs text-muted-foreground">Pontos por Indicação</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-blue-600">50</div>
              <div className="text-xs text-muted-foreground">Pontos por Uso</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-green-600">15%</div>
              <div className="text-xs text-muted-foreground">Desconto Indicado</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-yellow-500" />
            Recompensas Disponíveis
          </CardTitle>
          <CardDescription>Troque seus pontos por benefícios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
              <div>
                <div className="font-medium">Desconto 20% no próximo corte</div>
                <div className="text-sm text-muted-foreground">100 pontos</div>
              </div>
              <Button variant="outline" size="sm" disabled={!userPoints || userPoints.totalPoints < 100}>
                Resgatar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
              <div>
                <div className="font-medium">Corte + Barba grátis</div>
                <div className="text-sm text-muted-foreground">500 pontos</div>
              </div>
              <Button variant="outline" size="sm" disabled={!userPoints || userPoints.totalPoints < 500}>
                Resgatar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
              <div>
                <div className="font-medium">Tratamento premium</div>
                <div className="text-sm text-muted-foreground">1000 pontos</div>
              </div>
              <Button variant="outline" size="sm" disabled={!userPoints || userPoints.totalPoints < 1000}>
                Resgatar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
