import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS, getPlanById } from '../subscription-plans';
import { TokenManager } from '../token-manager';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface CreateCheckoutOptions {
  planId: string;
  userId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CreatePortalOptions {
  customerId: string;
  returnUrl: string;
}

export class StripeService {
  /**
   * Create a checkout session for subscription
   */
  static async createCheckoutSession(options: CreateCheckoutOptions): Promise<string | null> {
    try {
      const plan = getPlanById(options.planId);
      if (!plan || !plan.stripePriceId) {
        throw new Error(`Invalid plan ID or missing Stripe price ID: ${options.planId}`);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: plan.stripePriceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: options.successUrl,
        cancel_url: options.cancelUrl,
        customer_email: options.customerEmail,
        metadata: {
          userId: options.userId,
          planId: options.planId,
          ...options.metadata,
        },
        subscription_data: {
          metadata: {
            userId: options.userId,
            planId: options.planId,
          },
        },
      });

      return session.url;
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      return null;
    }
  }

  /**
   * Create a customer portal session
   */
  static async createCustomerPortalSession(options: CreatePortalOptions): Promise<string | null> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: options.customerId,
        return_url: options.returnUrl,
      });

      return session.url;
    } catch (error) {
      console.error('Error creating Stripe customer portal session:', error);
      return null;
    }
  }

  /**
   * Handle subscription created webhook
   */
  static async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<boolean> {
    try {
      const userId = subscription.metadata.userId;
      const planId = subscription.metadata.planId;
      
      if (!userId || !planId) {
        throw new Error('Missing userId or planId in subscription metadata');
      }
      
      const plan = getPlanById(planId);
      if (!plan) {
        throw new Error(`Invalid plan ID: ${planId}`);
      }
      
      // Initialize token usage for the user
      const success = await TokenManager.initializeTokenUsage(userId, planId, plan.tokens);
      
      if (!success) {
        throw new Error('Failed to initialize token usage');
      }
      
      // Update user's subscription in database
      // This would typically update a 'subscriptions' table
      
      return true;
    } catch (error) {
      console.error('Error handling subscription created webhook:', error);
      return false;
    }
  }

  /**
   * Handle subscription updated webhook
   */
  static async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<boolean> {
    try {
      const userId = subscription.metadata.userId;
      const planId = subscription.metadata.planId;
      
      if (!userId || !planId) {
        throw new Error('Missing userId or planId in subscription metadata');
      }
      
      const plan = getPlanById(planId);
      if (!plan) {
        throw new Error(`Invalid plan ID: ${planId}`);
      }
      
      // Update token usage for the user
      const success = await TokenManager.initializeTokenUsage(userId, planId, plan.tokens);
      
      if (!success) {
        throw new Error('Failed to update token usage');
      }
      
      // Update user's subscription in database
      
      return true;
    } catch (error) {
      console.error('Error handling subscription updated webhook:', error);
      return false;
    }
  }

  /**
   * Handle subscription deleted webhook
   */
  static async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<boolean> {
    try {
      const userId = subscription.metadata.userId;
      
      if (!userId) {
        throw new Error('Missing userId in subscription metadata');
      }
      
      // Update user's subscription in database to free plan
      // This would typically update a 'subscriptions' table
      
      // Reset token usage to free plan
      const freePlan = SUBSCRIPTION_PLANS[0]; // Assuming first plan is free
      const success = await TokenManager.initializeTokenUsage(userId, freePlan.id, freePlan.tokens);
      
      if (!success) {
        throw new Error('Failed to reset token usage to free plan');
      }
      
      return true;
    } catch (error) {
      console.error('Error handling subscription deleted webhook:', error);
      return false;
    }
  }

  /**
   * Verify Stripe webhook signature
   */
  static verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        throw new Error('Missing Stripe webhook secret');
      }
      
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
      
      return !!event;
    } catch (error) {
      console.error('Error verifying Stripe webhook signature:', error);
      return false;
    }
  }
}