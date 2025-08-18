// WhatsApp Business API Integration
export interface WhatsAppMessage {
  id: string
  to: string
  type: "text" | "template" | "interactive"
  content: string
  status: "sent" | "delivered" | "read" | "failed"
  timestamp: Date
}

export interface WhatsAppTemplate {
  name: string
  language: string
  components: {
    type: "header" | "body" | "footer" | "button"
    text?: string
    parameters?: string[]
  }[]
}

export class WhatsAppService {
  private static baseUrl = "https://graph.facebook.com/v18.0"
  private static phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  private static accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  static async sendMessage(to: string, message: string): Promise<WhatsAppMessage> {
    // Simulate WhatsApp API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const whatsappMessage: WhatsAppMessage = {
      id: `wamid.${Date.now()}`,
      to,
      type: "text",
      content: message,
      status: "sent",
      timestamp: new Date(),
    }

    console.log(`[WhatsApp] Mensagem enviada para ${to}: ${message}`)
    return whatsappMessage
  }

  static async sendAppointmentConfirmation(
    phoneNumber: string,
    customerName: string,
    serviceName: string,
    dateTime: Date,
    barberName: string,
    barbershopName: string,
    pixCode: string,
  ): Promise<WhatsAppMessage> {
    const message = `🔔 *Confirmação de Agendamento - ${barbershopName}*

Olá ${customerName}! 👋

Seu agendamento foi confirmado:
📅 *Data:* ${dateTime.toLocaleDateString("pt-BR")}
🕐 *Horário:* ${dateTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
✂️ *Serviço:* ${serviceName}
👨‍💼 *Barbeiro:* ${barberName}

💳 *Pagamento PIX:*
\`${pixCode}\`

Para confirmar, realize o pagamento PIX acima. Você receberá uma confirmação automática.

📍 *Endereço:* Rua das Barbearias, 123 - Centro

Dúvidas? Responda esta mensagem!`

    return this.sendMessage(phoneNumber, message)
  }

  static async sendPaymentConfirmation(
    phoneNumber: string,
    customerName: string,
    amount: number,
    serviceName: string,
  ): Promise<WhatsAppMessage> {
    const message = `✅ *Pagamento Confirmado!*

Olá ${customerName}!

Seu pagamento de *R$ ${amount.toFixed(2)}* foi confirmado com sucesso!

🎯 *Serviço:* ${serviceName}
💰 *Valor:* R$ ${amount.toFixed(2)}

Seu agendamento está garantido! Nos vemos em breve! 😊

*BarberIA Pro* - Sua barbearia inteligente`

    return this.sendMessage(phoneNumber, message)
  }

  static async sendReminder(
    phoneNumber: string,
    customerName: string,
    serviceName: string,
    dateTime: Date,
    barberName: string,
  ): Promise<WhatsAppMessage> {
    const message = `⏰ *Lembrete de Agendamento*

Olá ${customerName}!

Lembrando que você tem um agendamento amanhã:

📅 *Data:* ${dateTime.toLocaleDateString("pt-BR")}
🕐 *Horário:* ${dateTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
✂️ *Serviço:* ${serviceName}
👨‍💼 *Barbeiro:* ${barberName}

Confirme sua presença respondendo *SIM* ou reagende respondendo *REAGENDAR*.

Até amanhã! 👋`

    return this.sendMessage(phoneNumber, message)
  }

  static async sendCancellation(
    phoneNumber: string,
    customerName: string,
    serviceName: string,
    dateTime: Date,
  ): Promise<WhatsAppMessage> {
    const message = `❌ *Agendamento Cancelado*

Olá ${customerName},

Seu agendamento foi cancelado:

📅 *Data:* ${dateTime.toLocaleDateString("pt-BR")}
🕐 *Horário:* ${dateTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
✂️ *Serviço:* ${serviceName}

Se foi um engano, entre em contato conosco para reagendar.

*BarberIA Pro* - Sempre à disposição!`

    return this.sendMessage(phoneNumber, message)
  }
}
