import { NextApiRequest, NextApiResponse } from 'next';
import { StripeService } from '@/lib/payment-providers/stripe';
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

    // Get Stripe customer ID from database
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();
    
    if (!subscription?.stripe_customer_id) {
      return res.status(404).json({ error: 'No Stripe customer found for this user' });
    }

    // Create customer portal session
    const portalUrl = await StripeService.createCustomerPortalSession({
      customerId: subscription.stripe_customer_id,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });
    
    if (!portalUrl) {
      return res.status(500).json({ error: 'Failed to create customer portal session' });
    }
    
    return res.status(200).json({ url: portalUrl });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}