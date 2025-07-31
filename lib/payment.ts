// Mock Stripe integration
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: "requires_payment_method" | "requires_confirmation" | "succeeded" | "canceled"
  client_secret: string
}

export interface PaymentMethod {
  id: string
  type: "card"
  card: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
}

export class PaymentService {
  static async createPaymentIntent(amount: number, currency = "usd"): Promise<PaymentIntent> {
    // Simulate API call to create payment intent
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Convert to cents
      currency,
      status: "requires_payment_method",
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  static async confirmPayment(
    paymentIntentId: string,
    paymentMethod: any,
  ): Promise<{ success: boolean; error?: string }> {
    // Simulate payment confirmation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock success (90% success rate)
    if (Math.random() > 0.1) {
      return { success: true }
    } else {
      return { success: false, error: "Payment failed. Please try again." }
    }
  }

  static async savePaymentMethod(customerId: string, paymentMethod: any): Promise<PaymentMethod> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      id: `pm_${Math.random().toString(36).substr(2, 9)}`,
      type: "card",
      card: {
        brand: "visa",
        last4: "4242",
        exp_month: 12,
        exp_year: 2025,
      },
    }
  }
}
