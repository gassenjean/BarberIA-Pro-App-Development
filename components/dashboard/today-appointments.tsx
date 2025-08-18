"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Phone, MessageCircle } from "lucide-react"

interface TodayAppointmentsProps {
  barbershopId?: string
}

export default function TodayAppointments({ barbershopId }: TodayAppointmentsProps) {
  // Mock data for today's appointments
  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      client: "João Silva",
      phone: "(11) 99999-9999",
      service: "Corte + Barba",
      price: 50.0,
      status: "confirmado",
      avatar: null,
    },
    {
      id: 2,
      time: "10:30",
      client: "Pedro Santos",
      phone: "(11) 88888-8888",
      service: "Corte Masculino",
      price: 35.0,
      status: "agendado",
      avatar: null,
    },
    {
      id: 3,
      time: "14:00",
      client: "Carlos Lima",
      phone: "(11) 77777-7777",
      service: "Barba Completa",
      price: 25.0,
      status: "confirmado",
      avatar: null,
    },
    {
      id: 4,
      time: "15:30",
      client: "Rafael Costa",
      phone: "(11) 66666-6666",
      service: "Combo",
      price: 50.0,
      status: "em_andamento",
      avatar: null,
    },
    {
      id: 5,
      time: "17:00",
      client: "Lucas Oliveira",
      phone: "(11) 55555-5555",
      service: "Corte Masculino",
      price: 35.0,
      status: "agendado",
      avatar: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "agendado":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "em_andamento":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "concluido":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado"
      case "agendado":
        return "Agendado"
      case "em_andamento":
        return "Em Andamento"
      case "concluido":
        return "Concluído"
      default:
        return status
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="glass border-white/10 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Agendamentos de Hoje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-white/20">
                    <AvatarImage src={appointment.avatar || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {getInitials(appointment.client)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{appointment.client}</p>
                    <p className="text-gray-400 text-sm">{appointment.phone}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Horário:</span>
                  <span className="text-white font-medium">{appointment.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Serviço:</span>
                  <span className="text-white">{appointment.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Valor:</span>
                  <span className="text-green-400 font-medium">R$ {appointment.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          ))}

          {todayAppointments.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum agendamento para hoje</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
