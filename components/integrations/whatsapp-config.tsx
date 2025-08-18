"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Settings, CheckCircle, AlertCircle } from "lucide-react"

export function WhatsAppConfig() {
  const [config, setConfig] = useState({
    phoneNumberId: "",
    accessToken: "",
    webhookUrl: "",
    autoConfirmation: true,
    reminderEnabled: true,
    reminderHours: 24,
  })
  const [isConnected, setIsConnected] = useState(false)
  const [testing, setTesting] = useState(false)

  const handleSave = async () => {
    // Simulate saving configuration
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsConnected(true)
  }

  const testConnection = async () => {
    setTesting(true)
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTesting(false)
    setIsConnected(true)
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-500" />
          Configuração WhatsApp Business
        </CardTitle>
        <CardDescription>Configure a integração com WhatsApp para notificações automáticas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="font-medium">Status da Conexão</span>
          </div>
          <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "Conectado" : "Desconectado"}</Badge>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumberId">Phone Number ID</Label>
            <Input
              id="phoneNumberId"
              value={config.phoneNumberId}
              onChange={(e) => setConfig({ ...config, phoneNumberId: e.target.value })}
              placeholder="Insira o Phone Number ID do WhatsApp Business"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessToken">Access Token</Label>
            <Input
              id="accessToken"
              type="password"
              value={config.accessToken}
              onChange={(e) => setConfig({ ...config, accessToken: e.target.value })}
              placeholder="Insira o Access Token"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              value={config.webhookUrl}
              onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
              placeholder="https://seu-dominio.com/api/webhooks/whatsapp"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Configurações de Notificação</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Confirmação Automática</Label>
              <p className="text-sm text-muted-foreground">Enviar confirmação automática após agendamento</p>
            </div>
            <Switch
              checked={config.autoConfirmation}
              onCheckedChange={(checked) => setConfig({ ...config, autoConfirmation: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Lembretes Automáticos</Label>
              <p className="text-sm text-muted-foreground">Enviar lembretes antes do agendamento</p>
            </div>
            <Switch
              checked={config.reminderEnabled}
              onCheckedChange={(checked) => setConfig({ ...config, reminderEnabled: checked })}
            />
          </div>

          {config.reminderEnabled && (
            <div className="space-y-2">
              <Label htmlFor="reminderHours">Lembrete (horas antes)</Label>
              <Input
                id="reminderHours"
                type="number"
                value={config.reminderHours}
                onChange={(e) => setConfig({ ...config, reminderHours: Number.parseInt(e.target.value) })}
                min="1"
                max="72"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Salvar Configuração
          </Button>
          <Button variant="outline" onClick={testConnection} disabled={testing}>
            {testing ? <AlertCircle className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
            {testing ? "Testando..." : "Testar Conexão"}
          </Button>
        </div>

        {isConnected && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">WhatsApp Business conectado com sucesso!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              As notificações automáticas estão ativas e funcionando corretamente.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
