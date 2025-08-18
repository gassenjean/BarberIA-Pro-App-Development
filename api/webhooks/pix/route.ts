import { type NextRequest, NextResponse } from "next/server"
import { PixService } from "@/lib/integrations/pix"
import { WhatsAppService } from "@/lib/integrations/whatsapp"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Process PIX webhook
    console.log("[PIX Webhook] Received:", JSON.stringify(body, null, 2))

    const webhook = await PixService.processWebhook(body)

    if (webhook.status === "paid") {
      // Payment confirmed - update appointment and send WhatsApp confirmation
      const supabase = createClient()

      // Find appointment by PIX ID (in a real app, you'd have this relationship)
      const { data: appointment } = await supabase
        .from("appointments")
        .select("*, profiles(*), services(*)")
        .eq("pix_payment_id", webhook.pixId)
        .single()

      if (appointment) {
        // Update appointment status
        await supabase.from("appointments").update({ status: "confirmed", paid: true }).eq("id", appointment.id)

        // Send WhatsApp confirmation
        if (appointment.profiles?.phone) {
          await WhatsAppService.sendPaymentConfirmation(
            appointment.profiles.phone,
            appointment.profiles.full_name || "Cliente",
            webhook.amount,
            appointment.services?.name || "Serviço",
          )
        }

        console.log(`[PIX] Appointment ${appointment.id} confirmed and notification sent`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PIX Webhook] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
