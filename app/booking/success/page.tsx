import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, MessageCircle, Home, Smartphone } from "lucide-react"
import Link from "next/link"

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="glass border-white/10 max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2 font-serif">Agendamento Confirmado!</CardTitle>
          <p className="text-gray-300 text-lg">Seu horário foi reservado com sucesso</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Detalhes do Agendamento</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Data</p>
                  <p className="text-white font-medium">Sexta-feira, 20 de Dezembro</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">Horário</p>
                  <p className="text-white font-medium">14:30</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-2">Barbearia Premium</p>
              <p className="text-white font-medium">João Silva - Corte + Barba</p>
              <p className="text-green-400 font-bold">R$ 50,00</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Próximos Passos:</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <MessageCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-green-400 font-medium">WhatsApp Enviado</p>
                  <p className="text-gray-300 text-sm">Você receberá uma confirmação via WhatsApp em alguns minutos</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">Código PIX</p>
                  <p className="text-gray-300 text-sm">O código PIX para pagamento será enviado via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-400 font-medium mb-2">Importante:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Chegue 5 minutos antes do horário agendado</li>
              <li>• Confirme o pagamento via PIX até 1 hora antes</li>
              <li>• Para cancelar, entre em contato via WhatsApp</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>

            <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Abrir WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
