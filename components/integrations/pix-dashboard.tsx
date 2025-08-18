"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { QrCode, CreditCard, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react"
import { PixService, type PixPayment } from "@/lib/integrations/pix"

export function PixDashboard() {
  const [payments, setPayments] = useState<PixPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [newPayment, setNewPayment] = useState({
    amount: "",
    description: "",
  })

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    setLoading(true)
    // Simulate loading payments
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockPayments: PixPayment[] = [
      {
        id: "pix_001",
        amount: 45.0,
        description: "Corte + Barba - João Silva",
        pixCode: "00020126580014BR.GOV.BCB.PIX...",
        qrCode: "data:image/png;base64,sample",
        status: "paid",
        customerId: "customer_001",
        appointmentId: "apt_001",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        paidAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 28 * 60 * 1000),
      },
      {
        id: "pix_002",
        amount: 25.0,
        description: "Corte Masculino - Pedro Costa",
        pixCode: "00020126580014BR.GOV.BCB.PIX...",
        qrCode: "data:image/png;base64,sample",
        status: "pending",
        customerId: "customer_002",
        appointmentId: "apt_002",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
      {
        id: "pix_003",
        amount: 35.0,
        description: "Barba + Sobrancelha - Carlos Souza",
        pixCode: "00020126580014BR.GOV.BCB.PIX...",
        qrCode: "data:image/png;base64,sample",
        status: "expired",
        customerId: "customer_003",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ]

    setPayments(mockPayments)
    setLoading(false)
  }

  const createPayment = async () => {
    if (!newPayment.amount || !newPayment.description) return

    const payment = await PixService.createPixPayment(
      Number.parseFloat(newPayment.amount),
      newPayment.description,
      "customer_new",
    )

    setPayments([payment, ...payments])
    setNewPayment({ amount: "", description: "" })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "expired":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-600 border-green-200"
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
      case "expired":
        return "bg-red-500/10 text-red-600 border-red-200"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200"
    }
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/10">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Recebido</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500/10">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendente</p>
                <p className="text-2xl font-bold text-yellow-600">R$ {totalPending.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transações</p>
                <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Payment */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-blue-500" />
            Criar Novo PIX
          </CardTitle>
          <CardDescription>Gere um novo código PIX para pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor (R$)</label>
              <Input
                type="number"
                step="0.01"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Input
                value={newPayment.description}
                onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                placeholder="Descrição do pagamento"
              />
            </div>
          </div>
          <Button onClick={createPayment} disabled={!newPayment.amount || !newPayment.description}>
            Gerar PIX
          </Button>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>Acompanhe todos os pagamentos PIX</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-3 p-4 rounded-lg border">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card/30">
                  <div className="flex items-center gap-2">{getStatusIcon(payment.status)}</div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{payment.description}</span>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status === "paid" ? "Pago" : payment.status === "pending" ? "Pendente" : "Expirado"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {payment.createdAt.toLocaleString("pt-BR")}
                      {payment.paidAt && ` • Pago em ${payment.paidAt.toLocaleString("pt-BR")}`}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-lg">R$ {payment.amount.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{payment.id}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
