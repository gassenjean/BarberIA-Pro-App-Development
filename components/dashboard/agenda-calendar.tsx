"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

interface AgendaCalendarProps {
  barbershopId?: string
}

export default function AgendaCalendar({ barbershopId }: AgendaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Mock appointments data
  const appointments = [
    { id: 1, time: "09:00", client: "João Silva", service: "Corte + Barba", status: "confirmado" },
    { id: 2, time: "10:30", client: "Pedro Santos", service: "Corte Masculino", status: "agendado" },
    { id: 3, time: "14:00", client: "Carlos Lima", service: "Barba Completa", status: "confirmado" },
    { id: 4, time: "15:30", client: "Rafael Costa", service: "Combo", status: "em_andamento" },
    { id: 5, time: "17:00", client: "Lucas Oliveira", service: "Corte Masculino", status: "agendado" },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

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

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card className="glass border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Agenda
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth("prev")}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-white font-medium min-w-[140px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth("next")}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <button
                key={index}
                onClick={() => date && setSelectedDate(date)}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
                  ${date ? "hover:bg-white/10" : ""}
                  ${isToday(date) ? "bg-blue-500 text-white font-bold" : ""}
                  ${isSelected(date) && !isToday(date) ? "bg-white/20 text-white" : ""}
                  ${date && !isToday(date) && !isSelected(date) ? "text-gray-300" : ""}
                  ${!date ? "text-transparent cursor-default" : ""}
                `}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Appointments */}
      <Card className="glass border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Agendamentos - {selectedDate.toLocaleDateString("pt-BR")}</CardTitle>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-medium">{appointment.time}</span>
                    <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                  </div>
                  <p className="text-gray-300 font-medium">{appointment.client}</p>
                  <p className="text-gray-400 text-sm">{appointment.service}</p>
                </div>
              </div>
            ))}
            {appointments.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum agendamento para este dia</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
