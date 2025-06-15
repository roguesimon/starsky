import crypto from 'crypto';

export interface CryptomusPaymentRequest {
  amount: string;
  currency: string;
  orderId: string;
  callbackUrl?: string;
  successUrl?: string;
  failUrl?: string;
  userId: string;
  planId: string;
  email?: string;
}

export interface CryptomusPaymentResponse {
  success: boolean;
  paymentUrl?: string;
  paymentId?: string;
  error?: string;
}

export class CryptomusService {
  private static apiKey = process.env.CRYPTOMUS_API_KEY || '';
  private static merchantId = process.env.CRYPTOMUS_MERCHANT_ID || '';
  private static apiUrl = 'https://api.cryptomus.com/v1';

  /**
   * Create a payment
   */
  static async createPayment(request: CryptomusPaymentRequest): Promise<CryptomusPaymentResponse> {
    try {
      const payload = {
        amount: request.amount,
        currency: request.currency,
        order_id: request.orderId,
        callback_url: request.callbackUrl,
        success_url: request.successUrl,
        fail_url: request.failUrl,
        is_payment_multiple: false,
        lifetime: 3600, // 1 hour
        customer_email: request.email,
        merchant_id: this.merchantId,
        metadata: {
          userId: request.userId,
          planId: request.planId
        }
      };

      const sign = this.generateSign(payload);
      
      const response = await fetch(`${this.apiUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'merchant': this.merchantId,
          'sign': sign
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok || !data.result) {
        throw new Error(data.message || 'Failed to create payment');
      }

      return {
        success: true,
        paymentUrl: data.result.url,
        paymentId: data.result.uuid
      };
    } catch (error) {
      console.error('Error creating Cryptomus payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check payment status
   */
  static async checkPaymentStatus(paymentId: string): Promise<{
    success: boolean;
    status?: 'paid' | 'partially_paid' | 'waiting' | 'expired';
    error?: string;
  }> {
    try {
      const payload = {
        uuid: paymentId,
        merchant_id: this.merchantId
      };

      const sign = this.generateSign(payload);
      
      const response = await fetch(`${this.apiUrl}/payment/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'merchant': this.merchantId,
          'sign': sign
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok || !data.result) {
        throw new Error(data.message || 'Failed to check payment status');
      }

      return {
        success: true,
        status: data.result.status as 'paid' | 'partially_paid' | 'waiting' | 'expired'
      };
    } catch (error) {
      console.error('Error checking Cryptomus payment status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const sign = this.generateSign(JSON.parse(payload));
      return sign === signature;
    } catch (error) {
      console.error('Error verifying Cryptomus webhook signature:', error);
      return false;
    }
  }

  /**
   * Generate signature for Cryptomus API
   */
  private static generateSign(payload: any): string {
    const sortedPayload = this.sortObject(payload);
    const jsonString = JSON.stringify(sortedPayload);
    const base64Payload = Buffer.from(jsonString).toString('base64');
    
    return crypto
      .createHash('md5')
      .update(base64Payload + this.apiKey)
      .digest('hex');
  }

  /**
   * Sort object keys alphabetically
   */
  private static sortObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sortObject(item));
    }

    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = this.sortObject(obj[key]);
        return result;
      }, {});
  }
}