import { type NextRequest, NextResponse } from "next/server"
import { WhatsAppService } from "@/lib/integrations/whatsapp"

export async function GET(request: NextRequest) {
  // WhatsApp webhook verification
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "barberia_pro_webhook"

  if (mode === "subscribe" && token === verifyToken) {
    console.log("[WhatsApp Webhook] Verified successfully")
    return new NextResponse(challenge)
  }

  return new NextResponse("Forbidden", { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Process WhatsApp webhook
    console.log("[WhatsApp Webhook] Received:", JSON.stringify(body, null, 2))

    // Handle different webhook events
    if (body.entry && body.entry[0] && body.entry[0].changes) {
      const changes = body.entry[0].changes[0]

      if (changes.field === "messages") {
        const messages = changes.value.messages

        for (const message of messages || []) {
          // Process incoming message
          console.log(`[WhatsApp] Message from ${message.from}: ${message.text?.body}`)

          // Auto-reply logic
          if (message.text?.body?.toLowerCase().includes("agendar")) {
            await WhatsAppService.sendMessage(
              message.from,
              "Olá! Para agendar, acesse nosso site: https://barberia-pro.com/booking",
            )
          }
        }
      }

      if (changes.field === "message_status") {
        // Handle message status updates
        const statuses = changes.value.statuses

        for (const status of statuses || []) {
          console.log(`[WhatsApp] Message ${status.id} status: ${status.status}`)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[WhatsApp Webhook] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
