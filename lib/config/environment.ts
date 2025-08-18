// Environment configuration and validation
export const config = {
  // App
  app: {
    name: "BarberIA Pro",
    version: "1.0.0",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    environment: process.env.NODE_ENV || "development",
  },

  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    jwtSecret: process.env.SUPABASE_JWT_SECRET!,
    redirectUrl: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Database
  database: {
    url: process.env.POSTGRES_URL!,
    prismaUrl: process.env.POSTGRES_PRISMA_URL!,
    nonPoolingUrl: process.env.POSTGRES_URL_NON_POOLING!,
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
  },

  // WhatsApp Business
  whatsapp: {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || "barberia_pro_webhook",
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/whatsapp`,
  },

  // PIX Payments
  pix: {
    apiKey: process.env.PIX_API_KEY,
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/pix`,
    merchantName: "BARBERIA PRO LTDA",
    merchantCity: "SAO PAULO",
  },

  // AI Services (for future integration)
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    groqApiKey: process.env.GROQ_API_KEY,
    grokApiKey: process.env.XAI_API_KEY,
  },

  // Features flags
  features: {
    enableAI: process.env.ENABLE_AI === "true",
    enableWhatsApp: process.env.ENABLE_WHATSAPP === "true",
    enablePIX: process.env.ENABLE_PIX === "true",
    enableGamification: process.env.ENABLE_GAMIFICATION !== "false", // enabled by default
    enableAnalytics: process.env.ENABLE_ANALYTICS === "true",
  },
}

// Validate required environment variables
export function validateEnvironment() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "POSTGRES_URL",
  ]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}

// Development helpers
export const isDevelopment = config.app.environment === "development"
export const isProduction = config.app.environment === "production"
export const isTest = config.app.environment === "test"
