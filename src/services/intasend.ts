interface IntaSendPaymentData {
  amount: number;
  currency: string;
  email: string;
  phone_number: string;
  api_ref: string;
  redirect_url?: string;
  comment?: string;
}

interface IntaSendResponse {
  id: string;
  url: string;
  signature: string;
  api_ref: string;
  checkout_id: string;
}

export class IntaSendService {
  private publicKey: string;
  private baseUrl = 'https://sandbox.intasend.com/api/v1';

  constructor() {
    this.publicKey = import.meta.env.VITE_INTASEND_PUBLIC_KEY || '';
  }

  async initiatePayment(paymentData: IntaSendPaymentData): Promise<IntaSendResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-IntaSend-Public-API-Key': this.publicKey,
        },
        body: JSON.stringify({
          ...paymentData,
          method: 'M-PESA',
          provider: 'M-PESA',
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment initiation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('IntaSend payment error:', error);
      throw error;
    }
  }

  async checkPaymentStatus(checkoutId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/checkout/${checkoutId}/`, {
        headers: {
          'X-IntaSend-Public-API-Key': this.publicKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  }
}

export const intaSendService = new IntaSendService();