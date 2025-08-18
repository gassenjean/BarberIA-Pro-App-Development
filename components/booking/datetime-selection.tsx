"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

interface DateTimeSelectionProps {
  barbershop: any
  selectedBarber: any
  selectedServices: any[]
  selectedDateTime: { date: Date; time: string } | null
  onSelectDateTime: (dateTime: { date: Date; time: string } | null) => void
}

export default function DateTimeSelection({
  barbershop,
  selectedBarber,
  selectedServices,
  selectedDateTime,
  onSelectDateTime,
}: DateTimeSelectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9
    const endHour = 18
    const interval = 30 // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }

    return slots
  }

  // Mock unavailable slots (would come from database)
  const unavailableSlots = ["09:00", "10:30", "14:00", "15:30"]

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

  const isPastDate = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    // Reset time selection when date changes
    if (selectedDateTime && selectedDateTime.date.toDateString() !== date.toDateString()) {
      onSelectDateTime(null)
    }
  }

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onSelectDateTime({ date: selectedDate, time })
    }
  }

  const days = getDaysInMonth(currentDate)
  const timeSlots = generateTimeSlots()
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
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 font-serif">Escolha Data e Horário</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card className="glass border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Selecione a Data
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
                  onClick={() => date && !isPastDate(date) && handleDateSelect(date)}
                  disabled={!date || isPastDate(date)}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
                    ${date && !isPastDate(date) ? "hover:bg-white/10 cursor-pointer" : "cursor-not-allowed"}
                    ${isToday(date) ? "bg-blue-500 text-white font-bold" : ""}
                    ${isSelected(date) && !isToday(date) ? "bg-white/20 text-white" : ""}
                    ${date && !isToday(date) && !isSelected(date) && !isPastDate(date) ? "text-gray-300" : ""}
                    ${isPastDate(date) ? "text-gray-600" : ""}
                    ${!date ? "text-transparent cursor-default" : ""}
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horários Disponíveis
            </CardTitle>
            {selectedDate && (
              <p className="text-gray-300">
                {selectedDate.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => {
                  const isUnavailable = unavailableSlots.includes(time)
                  const isSelectedTime = selectedDateTime?.time === time

                  return (
                    <Button
                      key={time}
                      variant={isSelectedTime ? "default" : "outline"}
                      size="sm"
                      disabled={isUnavailable}
                      onClick={() => handleTimeSelect(time)}
                      className={`
                        ${
                          isSelectedTime
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                        }
                        ${isUnavailable ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      {time}
                    </Button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Selecione uma data para ver os horários disponíveis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
