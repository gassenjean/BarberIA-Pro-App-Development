"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Scissors, ArrowLeft, ArrowRight, MapPin, Star, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import BarberSelection from "./barber-selection"
import ServiceSelection from "./service-selection"
import DateTimeSelection from "./datetime-selection"
import BookingConfirmation from "./booking-confirmation"

interface BookingFlowProps {
  barbershop: any
}

export default function BookingFlow({ barbershop }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedBarber, setSelectedBarber] = useState<any>(null)
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null)

  const steps = [
    { number: 1, title: "Barbeiro", description: "Escolha seu barbeiro" },
    { number: 2, title: "Serviços", description: "Selecione os serviços" },
    { number: 3, title: "Data e Hora", description: "Escolha quando" },
    { number: 4, title: "Confirmação", description: "Finalize o agendamento" },
  ]

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0)
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0)

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedBarber !== null
      case 2:
        return selectedServices.length > 0
      case 3:
        return selectedDateTime !== null
      default:
        return true
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/booking" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-white" />
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-serif">BarberIA Pro</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Barbershop Info */}
        <Card className="glass border-white/10 mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-white text-2xl mb-2">{barbershop.name}</CardTitle>
                <CardDescription className="text-gray-300 mb-4">{barbershop.description}</CardDescription>

                <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{barbershop.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white">4.8</span>
                    <span>(127 avaliações)</span>
                  </div>
                </div>
              </div>

              {barbershop.logo_url && (
                <Avatar className="w-20 h-20 border-2 border-white/20">
                  <AvatarImage src={barbershop.logo_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                    {barbershop.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-white/10 text-gray-400 border border-white/20"
                    }
                  `}
                >
                  {step.number}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${currentStep >= step.number ? "text-white" : "text-gray-400"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-12 h-0.5 mx-4 transition-all duration-300
                      ${currentStep > step.number ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-white/20"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <BarberSelection
              barbers={barbershop.barbers}
              selectedBarber={selectedBarber}
              onSelectBarber={setSelectedBarber}
            />
          )}
          {currentStep === 2 && (
            <ServiceSelection
              services={barbershop.services}
              selectedServices={selectedServices}
              onSelectServices={setSelectedServices}
            />
          )}
          {currentStep === 3 && (
            <DateTimeSelection
              barbershop={barbershop}
              selectedBarber={selectedBarber}
              selectedServices={selectedServices}
              selectedDateTime={selectedDateTime}
              onSelectDateTime={setSelectedDateTime}
            />
          )}
          {currentStep === 4 && (
            <BookingConfirmation
              barbershop={barbershop}
              selectedBarber={selectedBarber}
              selectedServices={selectedServices}
              selectedDateTime={selectedDateTime}
              totalPrice={totalPrice}
              totalDuration={totalDuration}
            />
          )}
        </div>

        {/* Summary and Navigation */}
        {currentStep < 4 && (
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {selectedServices.length > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-green-400">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-bold text-lg">R$ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">{totalDuration} min</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === 3 ? "Finalizar" : "Próximo"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
