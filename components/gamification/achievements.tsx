"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Lock } from "lucide-react"
import { GamificationEngine, type Achievement } from "@/lib/gamification/referral-system"

interface AchievementsProps {
  userId: string
}

export function Achievements({ userId }: AchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAchievements()
  }, [userId])

  const loadAchievements = async () => {
    setLoading(true)
    try {
      const allAchievements = GamificationEngine.getAchievements()

      // Simulate some unlocked achievements
      const updatedAchievements = allAchievements.map((achievement, index) => ({
        ...achievement,
        isUnlocked: Math.random() > 0.6, // 40% chance of being unlocked
      }))

      setAchievements(updatedAchievements)
    } catch (error) {
      console.error("Erro ao carregar conquistas:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "referral":
        return "bg-blue-500/10 text-blue-600 border-blue-200"
      case "loyalty":
        return "bg-green-500/10 text-green-600 border-green-200"
      case "performance":
        return "bg-purple-500/10 text-purple-600 border-purple-200"
      case "milestone":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "referral":
        return "Indicação"
      case "loyalty":
        return "Fidelidade"
      case "performance":
        return "Performance"
      case "milestone":
        return "Marco"
      default:
        return "Geral"
    }
  }

  if (loading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
          <CardDescription>Carregando conquistas...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse p-4 rounded-lg border">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length
  const totalPoints = achievements.filter((a) => a.isUnlocked).reduce((sum, a) => sum + a.points, 0)

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Conquistas
        </CardTitle>
        <CardDescription>
          {unlockedCount} de {achievements.length} conquistas desbloqueadas • {totalPoints} pontos ganhos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progresso Geral</span>
              <span>{Math.round((unlockedCount / achievements.length) * 100)}%</span>
            </div>
            <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
          </div>

          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  achievement.isUnlocked
                    ? "bg-card/50 border-green-200 shadow-sm"
                    : "bg-card/20 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.isUnlocked ? achievement.icon : "🔒"}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <Badge className={getCategoryColor(achievement.category)}>
                        {getCategoryLabel(achievement.category)}
                      </Badge>
                      {achievement.isUnlocked && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">+{achievement.points} pontos</span>
                      {!achievement.isUnlocked && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          Bloqueado
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
