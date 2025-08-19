"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Scissors } from "lucide-react"
import Link from "next/link"
import { signIn } from "@/lib/actions"

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
          Entrando...
        </>
      ) : (
        "Entrar"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    console.log("[v0] LoginForm useEffect triggered, state:", state)
    if (state?.success) {
      console.log("[v0] Login successful, redirecting to dashboard immediately")
      window.location.replace("/dashboard") // Using window.location.replace for immediate redirect without setTimeout
    } else if (state?.error) {
      console.log("[v0] Login error:", state.error)
    }
  }, [state])

  console.log("[v0] LoginForm render, current state:", state)

  return (
    <Card className="w-full max-w-md glass border-white/10">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white font-serif">BarberIA Pro</span>
        </div>
        <CardTitle className="text-3xl font-semibold text-white">Bem-vindo de volta</CardTitle>
        <CardDescription className="text-gray-300 text-lg">Entre na sua conta para continuar</CardDescription>
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
              Login realizado com sucesso! Redirecionando...
            </div>
          )}

          <div className="space-y-4">
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
          </div>

          <SubmitButton />

          <div className="text-center text-gray-400">
            Não tem uma conta?{" "}
            <Link href="/auth/sign-up" className="text-blue-400 hover:text-blue-300 hover:underline">
              Cadastre-se
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
