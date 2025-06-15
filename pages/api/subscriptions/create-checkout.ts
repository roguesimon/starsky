import { NextApiRequest, NextApiResponse } from 'next';
import { StripeService } from '@/lib/payment-providers/stripe';
import { CryptomusService } from '@/lib/payment-providers/cryptomus';
import { getPlanById } from '@/lib/subscription-plans';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Get user from session
    const { user } = await supabase.auth.getUser(req.headers.authorization?.split(' ')[1] || '');
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { planId, paymentMethod } = req.body;
    
    if (!planId) {
      return res.status(400).json({ error: 'Missing planId' });
    }
    
    const plan = getPlanById(planId);
    if (!plan) {
      return res.status(400).json({ error: `Invalid plan ID: ${planId}` });
    }
    
    // Get user email
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single();
    
    const userEmail = profile?.email || user.email;
    
    // Create checkout session based on payment method
    if (paymentMethod === 'card') {
      // Create Stripe checkout
      const checkoutUrl = await StripeService.createCheckoutSession({
        planId,
        userId: user.id,
        customerEmail: userEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=canceled`,
      });
      
      if (!checkoutUrl) {
        return res.status(500).json({ error: 'Failed to create checkout session' });
      }
      
      return res.status(200).json({ url: checkoutUrl });
    } else if (paymentMethod === 'crypto') {
      // Create Cryptomus payment
      const orderId = `order_${Date.now()}_${user.id}`;
      
      const payment = await CryptomusService.createPayment({
        amount: plan.price.toString(),
        currency: 'USD',
        orderId,
        userId: user.id,
        planId,
        email: userEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
        failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=canceled`,
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/cryptomus`,
      });
      
      if (!payment.success || !payment.paymentUrl) {
        return res.status(500).json({ error: payment.error || 'Failed to create crypto payment' });
      }
      
      return res.status(200).json({ url: payment.paymentUrl });
    } else {
      return res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}