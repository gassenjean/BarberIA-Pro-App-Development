"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Award } from "lucide-react"

interface BarberSelectionProps {
  barbers: any[]
  selectedBarber: any
  onSelectBarber: (barber: any) => void
}

export default function BarberSelection({ barbers, selectedBarber, onSelectBarber }: BarberSelectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 font-serif">Escolha seu Barbeiro</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {barbers?.map((barber) => (
          <Card
            key={barber.id}
            className={`
              glass border-white/10 cursor-pointer transition-all duration-300 hover:border-white/30
              ${selectedBarber?.id === barber.id ? "border-blue-500 bg-blue-500/10" : ""}
            `}
            onClick={() => onSelectBarber(barber)}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 border-2 border-white/20">
                  <AvatarImage src={barber.profiles?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                    {barber.profiles?.full_name?.charAt(0) || "B"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <CardTitle className="text-white text-xl mb-2">{barber.profiles?.full_name}</CardTitle>

                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{barber.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({barber.total_reviews} avaliações)</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Award className="w-4 h-4" />
                    <span>{barber.experience_years} anos de experiência</span>
                  </div>

                  {barber.bio && <p className="text-gray-300 text-sm mb-3">{barber.bio}</p>}

                  <div className="flex flex-wrap gap-2">
                    {barber.specialties?.map((specialty: string) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {(!barbers || barbers.length === 0) && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">Nenhum barbeiro disponível</h3>
          <p className="text-gray-400">Esta barbearia ainda não tem barbeiros cadastrados.</p>
        </div>
      )}
    </div>
  )
}
