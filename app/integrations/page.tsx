import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { WhatsAppConfig } from "@/components/integrations/whatsapp-config"
import { PixDashboard } from "@/components/integrations/pix-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function IntegrationsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  let barbershop = null
  if (profile?.role === "barbeiro") {
    const { data } = await supabase.from("barbershops").select("*").eq("owner_id", user.id).single()
    barbershop = data
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader user={user} profile={profile} barbershop={barbershop} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Integrações
            </h1>
            <p className="text-muted-foreground">Configure WhatsApp Business e sistema de pagamentos PIX</p>
          </div>

          <Tabs defaultValue="whatsapp" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="whatsapp">WhatsApp Business</TabsTrigger>
              <TabsTrigger value="pix">Pagamentos PIX</TabsTrigger>
            </TabsList>

            <TabsContent value="whatsapp" className="space-y-6">
              <WhatsAppConfig />
            </TabsContent>

            <TabsContent value="pix" className="space-y-6">
              <PixDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
