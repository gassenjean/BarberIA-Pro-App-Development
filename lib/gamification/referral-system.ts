// Sistema de indicações e gamificação
export interface ReferralCode {
  id: string
  code: string
  userId: string
  barbershopId: string
  uses: number
  maxUses: number
  reward: number
  isActive: boolean
  createdAt: Date
  expiresAt: Date
}

export interface UserPoints {
  userId: string
  totalPoints: number
  currentLevel: number
  referralPoints: number
  loyaltyPoints: number
  achievementPoints: number
  rank: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  points: number
  category: "referral" | "loyalty" | "performance" | "milestone"
  requirement: number
  isUnlocked: boolean
}

export interface LeaderboardEntry {
  userId: string
  userName: string
  avatar?: string
  points: number
  level: number
  rank: number
  badge: string
}

export class GamificationEngine {
  static generateReferralCode(userId: string): string {
    const prefix = "BARBER"
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}${randomPart}`
  }

  static calculateLevel(points: number): number {
    // Level progression: 0-99 = Level 1, 100-299 = Level 2, etc.
    if (points < 100) return 1
    if (points < 300) return 2
    if (points < 600) return 3
    if (points < 1000) return 4
    if (points < 1500) return 5
    return Math.floor(points / 500) + 1
  }

  static getLevelBadge(level: number): string {
    if (level >= 10) return "🏆 Mestre"
    if (level >= 7) return "💎 Diamante"
    if (level >= 5) return "🥇 Ouro"
    if (level >= 3) return "🥈 Prata"
    return "🥉 Bronze"
  }

  static getAchievements(): Achievement[] {
    return [
      {
        id: "first_referral",
        name: "Primeiro Indicado",
        description: "Faça sua primeira indicação",
        icon: "👥",
        points: 50,
        category: "referral",
        requirement: 1,
        isUnlocked: false,
      },
      {
        id: "referral_master",
        name: "Mestre das Indicações",
        description: "Indique 10 novos clientes",
        icon: "🎯",
        points: 500,
        category: "referral",
        requirement: 10,
        isUnlocked: false,
      },
      {
        id: "loyal_customer",
        name: "Cliente Fiel",
        description: "Complete 5 agendamentos",
        icon: "⭐",
        points: 100,
        category: "loyalty",
        requirement: 5,
        isUnlocked: false,
      },
      {
        id: "vip_status",
        name: "Status VIP",
        description: "Alcance 1000 pontos",
        icon: "👑",
        points: 200,
        category: "milestone",
        requirement: 1000,
        isUnlocked: false,
      },
      {
        id: "monthly_champion",
        name: "Campeão do Mês",
        description: "Seja o #1 do ranking mensal",
        icon: "🏅",
        points: 300,
        category: "performance",
        requirement: 1,
        isUnlocked: false,
      },
    ]
  }

  static async simulateUserPoints(userId: string): Promise<UserPoints> {
    // Simulate user points calculation
    const basePoints = Math.floor(Math.random() * 2000) + 100
    const referralPoints = Math.floor(Math.random() * 500)
    const loyaltyPoints = Math.floor(Math.random() * 800)
    const achievementPoints = Math.floor(Math.random() * 300)

    const totalPoints = basePoints + referralPoints + loyaltyPoints + achievementPoints
    const currentLevel = this.calculateLevel(totalPoints)
    const rank = Math.floor(Math.random() * 50) + 1

    return {
      userId,
      totalPoints,
      currentLevel,
      referralPoints,
      loyaltyPoints,
      achievementPoints,
      rank,
    }
  }

  static async generateLeaderboard(): Promise<LeaderboardEntry[]> {
    // Simulate leaderboard data
    const names = [
      "João Silva",
      "Maria Santos",
      "Pedro Costa",
      "Ana Oliveira",
      "Carlos Souza",
      "Lucia Ferreira",
      "Roberto Lima",
      "Fernanda Alves",
      "Marcos Pereira",
      "Julia Rodrigues",
    ]

    return names
      .map((name, index) => {
        const points = Math.floor(Math.random() * 1500) + 500
        const level = this.calculateLevel(points)

        return {
          userId: `user_${index + 1}`,
          userName: name,
          points,
          level,
          rank: index + 1,
          badge: this.getLevelBadge(level),
        }
      })
      .sort((a, b) => b.points - a.points)
  }
}
