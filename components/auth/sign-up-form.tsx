"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Scissors } from "lucide-react"
import Link from "next/link"
import { signUp } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Criando conta...
        </>
      ) : (
        "Criar Conta"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null)

  return (
    <Card className="w-full max-w-md glass border-white/10">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white font-serif">BarberIA Pro</span>
        </div>
        <CardTitle className="text-3xl font-semibold text-white">Criar conta</CardTitle>
        <CardDescription className="text-gray-300 text-lg">Comece sua jornada digital</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
              {state.error}
            </div>
          )}

          {state?.success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
              {state.success}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Nome Completo
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Seu nome completo"
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 h-12"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 h-12"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-white/5 border-white/20 text-white focus:border-blue-500 h-12"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                Tipo de Conta
              </label>
              <Select name="role" defaultValue="barbeiro">
                <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-blue-500 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="barbeiro" className="text-white hover:bg-white/10">
                    Barbeiro/Proprietário
                  </SelectItem>
                  <SelectItem value="cliente" className="text-white hover:bg-white/10">
                    Cliente
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SubmitButton />

          <div className="text-center text-gray-400">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 hover:underline">
              Entrar
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
