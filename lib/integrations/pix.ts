// PIX Payment Integration
export interface PixPayment {
  id: string
  amount: number
  description: string
  pixCode: string
  qrCode: string
  status: "pending" | "paid" | "expired" | "cancelled"
  customerId: string
  appointmentId?: string
  createdAt: Date
  paidAt?: Date
  expiresAt: Date
}

export interface PixWebhook {
  id: string
  pixId: string
  status: "paid" | "cancelled"
  amount: number
  paidAt: Date
  payerDocument: string
  payerName: string
}

export class PixService {
  private static apiKey = process.env.PIX_API_KEY
  private static baseUrl = "https://api.pix-provider.com/v1"

  static generatePixCode(amount: number, description: string): string {
    // Generate a simplified PIX code (in production, use proper PIX format)
    const timestamp = Date.now().toString(36)
    const amountStr = amount.toFixed(2).replace(".", "")
    return `00020126580014BR.GOV.BCB.PIX0136${timestamp}520400005303986540${amountStr.padStart(10, "0")}5802BR5925BARBERIA PRO LTDA6009SAO PAULO62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  }

  static async createPixPayment(
    amount: number,
    description: string,
    customerId: string,
    appointmentId?: string,
  ): Promise<PixPayment> {
    // Simulate PIX payment creation
    await new Promise((resolve) => setTimeout(resolve, 800))

    const pixCode = this.generatePixCode(amount, description)
    const qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==` // Placeholder QR code

    const payment: PixPayment = {
      id: `pix_${Date.now()}`,
      amount,
      description,
      pixCode,
      qrCode,
      status: "pending",
      customerId,
      appointmentId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    }

    console.log(`[PIX] Pagamento criado: R$ ${amount.toFixed(2)} - ${description}`)
    return payment
  }

  static async checkPaymentStatus(pixId: string): Promise<PixPayment | null> {
    // Simulate payment status check
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate random payment confirmation (30% chance)
    const isPaid = Math.random() > 0.7

    if (isPaid) {
      return {
        id: pixId,
        amount: 45.0,
        description: "Corte + Barba",
        pixCode: "sample_pix_code",
        qrCode: "sample_qr_code",
        status: "paid",
        customerId: "customer_123",
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        paidAt: new Date(),
        expiresAt: new Date(Date.now() + 20 * 60 * 1000),
      }
    }

    return null
  }

  static async processWebhook(webhookData: any): Promise<PixWebhook> {
    // Process PIX webhook notification
    const webhook: PixWebhook = {
      id: webhookData.id || `webhook_${Date.now()}`,
      pixId: webhookData.pixId,
      status: webhookData.status,
      amount: webhookData.amount,
      paidAt: new Date(webhookData.paidAt),
      payerDocument: webhookData.payerDocument,
      payerName: webhookData.payerName,
    }

    console.log(`[PIX Webhook] Pagamento ${webhook.status}: R$ ${webhook.amount.toFixed(2)}`)
    return webhook
  }

  static async refundPayment(pixId: string, amount: number, reason: string): Promise<boolean> {
    // Simulate refund process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(`[PIX] Estorno processado: R$ ${amount.toFixed(2)} - ${reason}`)
    return true
  }
}
