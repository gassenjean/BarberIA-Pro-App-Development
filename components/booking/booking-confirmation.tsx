"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Clock, DollarSign, User, CreditCard, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingConfirmationProps {
  barbershop: any
  selectedBarber: any
  selectedServices: any[]
  selectedDateTime: { date: Date; time: string } | null
  totalPrice: number
  totalDuration: number
}

export default function BookingConfirmation({
  barbershop,
  selectedBarber,
  selectedServices,
  selectedDateTime,
  totalPrice,
  totalDuration,
}: BookingConfirmationProps) {
  const router = useRouter()
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "dinheiro">("pix")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate booking creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page
    router.push("/booking/success")
  }

  const canSubmit = clientInfo.name.trim() && clientInfo.phone.trim()

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 font-serif">Confirme seu Agendamento</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Resumo do Agendamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Barbershop */}
            <div>
              <h4 className="text-white font-medium mb-2">Barbearia</h4>
              <p className="text-gray-300">{barbershop.name}</p>
              <p className="text-gray-400 text-sm">{barbershop.address}</p>
            </div>

            <Separator className="bg-white/10" />

            {/* Barber */}
            <div>
              <h4 className="text-white font-medium mb-3">Barbeiro</h4>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border border-white/20">
                  <AvatarImage src={selectedBarber?.profiles?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {selectedBarber?.profiles?.full_name?.charAt(0) || "B"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{selectedBarber?.profiles?.full_name}</p>
                  <p className="text-gray-400 text-sm">{selectedBarber?.experience_years} anos de experiência</p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Services */}
            <div>
              <h4 className="text-white font-medium mb-3">Serviços</h4>
              <div className="space-y-3">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-white">{service.name}</p>
                      <p className="text-gray-400 text-sm">{service.duration} min</p>
                    </div>
                    <p className="text-green-400 font-medium">R$ {service.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Date & Time */}
            <div>
              <h4 className="text-white font-medium mb-3">Data e Horário</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {selectedDateTime?.date.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Clock className="w-4 h-4" />
                  <span>{selectedDateTime?.time}</span>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Total */}
            <div className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-white font-bold">Total</span>
              </div>
              <span className="text-green-400 font-bold">R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Duração total</span>
              </div>
              <span className="text-blue-400">{totalDuration} min</span>
            </div>
          </CardContent>
        </Card>

        {/* Client Info & Payment */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <Input
                  id="name"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp *
                </label>
                <Input
                  id="phone"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Observações (opcional)
                </label>
                <Textarea
                  id="notes"
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  placeholder="Alguma observação especial..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={paymentMethod === "pix" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("pix")}
                  className={`
                    h-16 flex flex-col items-center gap-2
                    ${
                      paymentMethod === "pix"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                    }
                  `}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm">PIX</span>
                </Button>

                <Button
                  variant={paymentMethod === "dinheiro" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("dinheiro")}
                  className={`
                    h-16 flex flex-col items-center gap-2
                    ${
                      paymentMethod === "dinheiro"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                    }
                  `}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">Dinheiro</span>
                </Button>
              </div>

              {paymentMethod === "pix" && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Pagamento via PIX</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Você receberá o código PIX via WhatsApp após a confirmação do agendamento.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Confirmando...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirmar Agendamento
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
