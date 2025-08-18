import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "BarberIA Pro - Sistema Inteligente para Barbearias",
    template: "%s | BarberIA Pro",
  },
  description:
    "MicroSaaS completo para barbearias brasileiras com IA generativa, agendamento online, WhatsApp Business, pagamentos PIX e sistema de gamificação.",
  keywords: [
    "barbearia",
    "agendamento online",
    "sistema para barbearia",
    "whatsapp business",
    "pagamento pix",
    "ia generativa",
    "saas barbearia",
    "gestão barbearia",
    "barbershop software",
    "brasil",
  ],
  authors: [{ name: "BarberIA Pro Team" }],
  creator: "BarberIA Pro",
  publisher: "BarberIA Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "BarberIA Pro - Sistema Inteligente para Barbearias",
    description:
      "MicroSaaS completo para barbearias brasileiras com IA generativa, agendamento online, WhatsApp Business e pagamentos PIX.",
    siteName: "BarberIA Pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BarberIA Pro - Sistema Inteligente para Barbearias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BarberIA Pro - Sistema Inteligente para Barbearias",
    description: "MicroSaaS completo para barbearias brasileiras com IA generativa e agendamento online.",
    images: ["/og-image.png"],
    creator: "@barberia_pro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BarberIA Pro",
  },
  category: "business",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BarberIA Pro",
              description: "Sistema inteligente para gestão de barbearias",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
              author: {
                "@type": "Organization",
                name: "BarberIA Pro Team",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen">
        {children}
      </body>
    </html>
  )
}
