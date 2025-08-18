"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown } from "lucide-react"
import { GamificationEngine, type LeaderboardEntry } from "@/lib/gamification/referral-system"

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    setLoading(true)
    try {
      const data = await GamificationEngine.generateLeaderboard()
      setLeaderboard(data)
    } catch (error) {
      console.error("Erro ao carregar ranking:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Award className="h-4 w-4 text-gray-500" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-card border"
    }
  }

  if (loading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle>Ranking de Pontos</CardTitle>
          <CardDescription>Carregando ranking...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-3 p-3 rounded-lg border">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
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
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Ranking de Pontos
        </CardTitle>
        <CardDescription>Top 10 usuários com mais pontos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.slice(0, 10).map((entry) => (
            <div
              key={entry.userId}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${getRankColor(
                entry.rank,
              )}`}
            >
              <div className="flex items-center gap-2 min-w-[60px]">
                {getRankIcon(entry.rank)}
                <span className="font-bold text-lg">#{entry.rank}</span>
              </div>

              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {entry.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="font-medium">{entry.userName}</div>
                <div className="text-sm opacity-80">Nível {entry.level}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg">{entry.points.toLocaleString()}</div>
                <Badge variant="secondary" className="text-xs">
                  {entry.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
