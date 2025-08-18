// Analytics and monitoring utilities
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: Date
}

export class Analytics {
  private static isEnabled = process.env.ENABLE_ANALYTICS === "true"

  static track(event: AnalyticsEvent) {
    if (!this.isEnabled) return

    // In production, integrate with your analytics provider
    console.log("[Analytics]", {
      ...event,
      timestamp: event.timestamp || new Date(),
    })

    // Example integrations:
    // - Google Analytics 4
    // - Mixpanel
    // - PostHog
    // - Amplitude
  }

  static identify(userId: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return

    console.log("[Analytics] Identify:", { userId, properties })
  }

  static page(pageName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return

    console.log("[Analytics] Page:", { pageName, properties })
  }

  // Business-specific events
  static trackAppointmentCreated(appointmentId: string, barbershopId: string, serviceId: string) {
    this.track({
      name: "appointment_created",
      properties: {
        appointmentId,
        barbershopId,
        serviceId,
      },
    })
  }

  static trackPaymentCompleted(paymentId: string, amount: number, method: string) {
    this.track({
      name: "payment_completed",
      properties: {
        paymentId,
        amount,
        method,
      },
    })
  }

  static trackReferralUsed(referralCode: string, newUserId: string) {
    this.track({
      name: "referral_used",
      properties: {
        referralCode,
        newUserId,
      },
    })
  }
}
