// Error monitoring and logging
export interface ErrorReport {
  message: string
  stack?: string
  userId?: string
  url?: string
  userAgent?: string
  timestamp: Date
  severity: "low" | "medium" | "high" | "critical"
  context?: Record<string, any>
}

export class Monitoring {
  private static isEnabled = process.env.NODE_ENV === "production"

  static reportError(
    error: Error | string,
    context?: Record<string, any>,
    severity: ErrorReport["severity"] = "medium",
  ) {
    const errorReport: ErrorReport = {
      message: typeof error === "string" ? error : error.message,
      stack: typeof error === "object" ? error.stack : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      timestamp: new Date(),
      severity,
      context,
    }

    if (this.isEnabled) {
      // In production, send to error monitoring service
      // Examples: Sentry, Bugsnag, LogRocket, etc.
      console.error("[Monitoring]", errorReport)
    } else {
      console.error("[Dev Error]", errorReport)
    }
  }

  static reportPerformance(metric: string, value: number, context?: Record<string, any>) {
    if (!this.isEnabled) return

    console.log("[Performance]", {
      metric,
      value,
      context,
      timestamp: new Date(),
    })
  }

  static reportBusinessMetric(metric: string, value: number, context?: Record<string, any>) {
    console.log("[Business Metric]", {
      metric,
      value,
      context,
      timestamp: new Date(),
    })
  }
}

// Global error handler
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    Monitoring.reportError(event.error || event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })

  window.addEventListener("unhandledrejection", (event) => {
    Monitoring.reportError(`Unhandled Promise Rejection: ${event.reason}`, {
      type: "unhandledrejection",
    })
  })
}
