"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Scissors, LogOut, Settings, Bell } from "lucide-react"
import { signOut } from "@/lib/actions"

interface DashboardHeaderProps {
  user: any
  profile: any
  barbershop: any
}

export default function DashboardHeader({ user, profile, barbershop }: DashboardHeaderProps) {
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  return (
    <Card className="glass-dark border-white/10 rounded-none border-x-0 border-t-0">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Welcome */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-serif">BarberIA Pro</h1>
                {barbershop && <p className="text-sm text-gray-400">{barbershop.name}</p>}
              </div>
            </div>

            <div className="hidden md:block">
              <h2 className="text-xl text-white">
                Olá, <span className="font-semibold">{profile?.full_name || user.email}</span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {profile?.role === "barbeiro" ? "Barbeiro" : "Cliente"}
                </Badge>
                <span className="text-sm text-gray-400">
                  {new Date().toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-white/20">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getInitials(profile?.full_name || user.email)}
                </AvatarFallback>
              </Avatar>

              <form action={signOut}>
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
