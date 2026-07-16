import { stripeConfig } from "@/config/environment";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "processing" | "requires_payment_method" | "requires_action";
  client_secret?: string;
}

export interface ChargeResponse {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "failed" | "pending";
  receipt_url?: string;
}

export const paymentsApi = {
  // Create a payment intent on the backend
  async createPaymentIntent(
    amount: number,
    currency: string = "NGN",
    metadata?: Record<string, string>
  ): Promise<PaymentIntent> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, metadata }),
    });

    if (!response.ok) throw new Error("Failed to create payment intent");
    return response.json();
  },

  // Process a charge with card details (backend should use Stripe API key)
  async processPayment(
    amount: number,
    cardToken: string,
    email: string,
    metadata?: Record<string, string>
  ): Promise<ChargeResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/charge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        source: cardToken,
        email,
        metadata,
      }),
    });

    if (!response.ok) throw new Error("Payment failed");
    return response.json();
  },

  // Confirm a payment intent
  async confirmPayment(paymentIntentId: string, paymentMethod: string): Promise<PaymentIntent> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/confirm`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId, paymentMethod }),
      }
    );

    if (!response.ok) throw new Error("Payment confirmation failed");
    return response.json();
  },

  // Refund a charge
  async refundPayment(chargeId: string, amount?: number): Promise<ChargeResponse> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/refund`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chargeId, amount }),
      }
    );

    if (!response.ok) throw new Error("Refund failed");
    return response.json();
  },

  // Retrieve payment status
  async getPaymentStatus(paymentIntentId: string): Promise<PaymentIntent> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/${paymentIntentId}`
    );

    if (!response.ok) throw new Error("Failed to fetch payment status");
    return response.json();
  },

  // List all payments for a user
  async getPaymentHistory(userId: string): Promise<ChargeResponse[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/user/${userId}`
    );

    if (!response.ok) throw new Error("Failed to fetch payment history");
    return response.json();
  },
};

// Type-safe Stripe utilities
export const stripeUtils = {
  // Get Stripe publishable key
  getPublishableKey(): string {
    const key = stripeConfig.publishableKey;
    if (!key) throw new Error("Stripe publishable key not configured");
    return key;
  },

  // Format amount for Stripe (cents)
  formatAmount(amountInNaira: number): number {
    return Math.round(amountInNaira * 100);
  },

  // Parse amount from Stripe (from cents)
  parseAmount(amountInCents: number): number {
    return Math.round(amountInCents / 100);
  },

  // Validate card number (basic Luhn check)
  validateCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  // Validate CVV
  validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  },

  // Validate expiry date
  validateExpiry(expiry: string): boolean {
    const [month, year] = expiry.split("/");
    if (!month || !year) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);

    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false;

    return expiryMonth >= 1 && expiryMonth <= 12;
  },
};
