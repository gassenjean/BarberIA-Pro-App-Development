import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors, Calendar, Users, TrendingUp, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="glass max-w-md">
          <CardHeader>
            <CardTitle className="text-white text-center">Connect Supabase to get started</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Check if user is already logged in
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-serif">BarberIA Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in-up">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 border-blue-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            O Futuro das
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Barbearias
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sistema completo de agendamento com IA generativa, insights inteligentes e integração WhatsApp. Transforme
            sua barbearia em um negócio digital de alta performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg animate-pulse-glow"
              >
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">Recursos Inteligentes</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tecnologia de ponta para revolucionar a gestão da sua barbearia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="glass border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Agenda Inteligente</CardTitle>
              <CardDescription className="text-gray-300">
                Sistema de agendamento com IA que otimiza horários e reduz cancelamentos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">WhatsApp Integrado</CardTitle>
              <CardDescription className="text-gray-300">
                Confirmações automáticas, lembretes e atendimento via WhatsApp Business
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass border-white/10 hover:border-green-500/30 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Insights de IA</CardTitle>
              <CardDescription className="text-gray-300">
                Análises comportamentais e sugestões para aumentar sua receita
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass border-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Sistema de Indicações</CardTitle>
              <CardDescription className="text-gray-300">
                Gamificação com códigos únicos, ranking e recompensas automáticas
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass border-white/10 hover:border-red-500/30 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Pagamento PIX</CardTitle>
              <CardDescription className="text-gray-300">
                Confirmação instantânea de pagamentos via PIX integrado
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass border-white/10 hover:border-indigo-500/30 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Dashboard Premium</CardTitle>
              <CardDescription className="text-gray-300">
                Interface moderna com KPIs em tempo real e design glassmorphism
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass border-white/10 text-center p-12">
          <CardContent>
            <h2 className="text-4xl font-bold text-white mb-4 font-serif">Pronto para Revolucionar sua Barbearia?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de barbeiros que já transformaram seus negócios com nossa plataforma inteligente.
            </p>
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-lg"
              >
                Começar Agora - É Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold font-serif">BarberIA Pro</span>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-4">
            © 2025 BarberIA Pro. Transformando barbearias com inteligência artificial.
          </p>
        </div>
      </footer>
    </div>
  )
}
