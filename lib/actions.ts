"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Sign in action
export async function signIn(prevState: any, formData: FormData) {
  console.log("[v0] signIn action called")

  if (!formData) {
    console.log("[v0] Form data is missing")
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  console.log("[v0] Login attempt for email:", email)

  if (!email || !password) {
    console.log("[v0] Email or password missing")
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    console.log("[v0] Attempting Supabase signInWithPassword")
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      console.log("[v0] Supabase auth error:", error.message)
      if (error.message.includes("Invalid login credentials")) {
        return { error: "Email ou senha incorretos. Verifique suas credenciais." }
      }
      if (error.message.includes("Email not confirmed")) {
        return { error: "Por favor, confirme seu email antes de fazer login." }
      }
      return { error: error.message }
    }

    console.log("[v0] Login successful, user:", data.user?.email)

    return { success: true, user: data.user }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { error: "Erro inesperado. Tente novamente em alguns instantes." }
  }
}

// Sign up action
export async function signUp(prevState: any, formData: FormData) {
  console.log("[v0] signUp action called")

  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")
  const role = formData.get("role") || "cliente"

  if (!email || !password || !fullName) {
    return { error: "All fields are required" }
  }

  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
        data: {
          full_name: fullName.toString(),
          role: role.toString(),
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Create profile in our custom table
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: email.toString(),
        full_name: fullName.toString(),
        role: role.toString(),
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
      }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign out action
export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}
