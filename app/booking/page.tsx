import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, Star, Phone, Scissors } from "lucide-react"
import Link from "next/link"

export default async function BookingPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()

  // Get all active barbershops with their barbers
  const { data: barbershops } = await supabase
    .from("barbershops")
    .select(
      `
      *,
      barbers (
        id,
        profile_id,
        specialties,
        rating,
        total_reviews,
        profiles (
          full_name,
          avatar_url
        )
      )
    `,
    )
    .eq("is_active", true)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-serif">BarberIA Pro</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif">Encontre sua Barbearia</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Agende seu horário com os melhores barbeiros da região
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barbershops?.map((barbershop) => (
            <Card
              key={barbershop.id}
              className="glass border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-white text-xl mb-2">{barbershop.name}</CardTitle>
                    <CardDescription className="text-gray-300 mb-3">{barbershop.description}</CardDescription>

                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{barbershop.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Phone className="w-4 h-4" />
                      <span>{barbershop.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">4.8</span>
                      <span className="text-gray-400 text-sm">(127 avaliações)</span>
                    </div>
                  </div>

                  {barbershop.logo_url && (
                    <Avatar className="w-16 h-16 border-2 border-white/20">
                      <AvatarImage src={barbershop.logo_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {barbershop.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Barbers */}
                <div className="space-y-3 mb-4">
                  <h4 className="text-white font-medium">Barbeiros:</h4>
                  {barbershop.barbers?.slice(0, 2).map((barber: any) => (
                    <div key={barber.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <Avatar className="w-8 h-8 border border-white/20">
                        <AvatarImage src={barber.profiles?.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          {barber.profiles?.full_name?.charAt(0) || "B"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{barber.profiles?.full_name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-gray-400 text-xs">{barber.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(barbershop.barbers?.length || 0) > 2 && (
                    <p className="text-gray-400 text-sm">+{(barbershop.barbers?.length || 0) - 2} barbeiros</p>
                  )}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {barbershop.barbers?.[0]?.specialties?.slice(0, 3).map((specialty: string) => (
                    <Badge
                      key={specialty}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Opening Hours */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Seg-Sex: 9h-18h | Sáb: 8h-17h</span>
                </div>
              </CardHeader>

              <CardContent>
                <Link href={`/booking/${barbershop.id}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    Agendar Horário
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!barbershops || barbershops.length === 0) && (
          <div className="text-center py-12">
            <Scissors className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhuma barbearia encontrada</h3>
            <p className="text-gray-400">Volte em breve para ver as barbearias disponíveis.</p>
          </div>
        )}
      </main>
    </div>
  )
}
