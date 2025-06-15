import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { StripeService } from '@/lib/payment-providers/stripe';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    // Verify webhook signature
    const isValid = StripeService.verifyWebhookSignature(
      rawBody.toString(),
      signature
    );

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
    
    const event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Handle successful checkout
        // This typically means a new subscription has been created
        console.log('Checkout session completed:', session.id);
        
        // The subscription will be created in a separate event
        break;
      }
      
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle new subscription
        const success = await StripeService.handleSubscriptionCreated(subscription);
        
        if (!success) {
          console.error('Failed to handle subscription created:', subscription.id);
        }
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription update (e.g., plan change, renewal)
        const success = await StripeService.handleSubscriptionUpdated(subscription);
        
        if (!success) {
          console.error('Failed to handle subscription updated:', subscription.id);
        }
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription cancellation
        const success = await StripeService.handleSubscriptionDeleted(subscription);
        
        if (!success) {
          console.error('Failed to handle subscription deleted:', subscription.id);
        }
        
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle successful payment
        // This could be a subscription renewal or initial payment
        console.log('Invoice payment succeeded:', invoice.id);
        
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle failed payment
        // You might want to notify the user or take other actions
        console.log('Invoice payment failed:', invoice.id);
        
        break;
      }
      
      default: {
        console.log(`Unhandled event type: ${event.type}`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}