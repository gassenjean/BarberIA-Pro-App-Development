"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Scissors, Clock, DollarSign } from "lucide-react"

interface ServiceSelectionProps {
  services: any[]
  selectedServices: any[]
  onSelectServices: (services: any[]) => void
}

export default function ServiceSelection({ services, selectedServices, onSelectServices }: ServiceSelectionProps) {
  const handleServiceToggle = (service: any) => {
    const isSelected = selectedServices.some((s) => s.id === service.id)

    if (isSelected) {
      onSelectServices(selectedServices.filter((s) => s.id !== service.id))
    } else {
      onSelectServices([...selectedServices, service])
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "corte":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "barba":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "combo":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "sobrancelha":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  // Group services by category
  const servicesByCategory = services?.reduce(
    (acc, service) => {
      const category = service.category || "Outros"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(service)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 font-serif">Selecione os Serviços</h2>

      <div className="space-y-8">
        {Object.entries(servicesByCategory || {}).map(([category, categoryServices]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-white mb-4 capitalize">{category}</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {categoryServices.map((service) => {
                const isSelected = selectedServices.some((s) => s.id === service.id)

                return (
                  <Card
                    key={service.id}
                    className={`
                      glass border-white/10 cursor-pointer transition-all duration-300 hover:border-white/30
                      ${isSelected ? "border-blue-500 bg-blue-500/10" : ""}
                    `}
                    onClick={() => handleServiceToggle(service)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleServiceToggle(service)}
                              className="border-white/30"
                            />
                            <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                          </div>

                          {service.description && <p className="text-gray-300 text-sm mb-3">{service.description}</p>}

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2 text-green-400">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-bold">R$ {service.price.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration} min</span>
                            </div>
                          </div>

                          <Badge className={getCategoryColor(service.category)}>{service.category || "Serviço"}</Badge>
                        </div>

                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center ml-4">
                          <Scissors className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {(!services || services.length === 0) && (
        <div className="text-center py-12">
          <Scissors className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">Nenhum serviço disponível</h3>
          <p className="text-gray-400">Esta barbearia ainda não tem serviços cadastrados.</p>
        </div>
      )}
    </div>
  )
}
