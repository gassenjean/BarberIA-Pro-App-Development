import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import BookingFlow from "@/components/booking/booking-flow"

interface BookingDetailPageProps {
  params: {
    barbershopId: string
  }
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()

  // Get barbershop with barbers and services
  const { data: barbershop } = await supabase
    .from("barbershops")
    .select(
      `
      *,
      barbers (
        id,
        profile_id,
        specialties,
        bio,
        experience_years,
        rating,
        total_reviews,
        profiles (
          full_name,
          avatar_url
        )
      ),
      services (
        id,
        name,
        description,
        price,
        duration,
        category
      )
    `,
    )
    .eq("id", params.barbershopId)
    .eq("is_active", true)
    .single()

  if (!barbershop) {
    notFound()
  }

  return <BookingFlow barbershop={barbershop} />
}
