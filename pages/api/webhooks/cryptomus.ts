import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { CryptomusService } from '@/lib/payment-providers/cryptomus';
import { TokenManager } from '@/lib/token-manager';
import { getPlanById } from '@/lib/subscription-plans';

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
    const signature = req.headers['sign'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing sign header' });
    }

    // Verify webhook signature
    const isValid = CryptomusService.verifyWebhookSignature(
      rawBody.toString(),
      signature
    );

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const payload = JSON.parse(rawBody.toString());
    
    // Handle payment status
    if (payload.status === 'paid') {
      const { userId, planId } = payload.metadata;
      
      if (!userId || !planId) {
        return res.status(400).json({ error: 'Missing userId or planId in metadata' });
      }
      
      const plan = getPlanById(planId);
      if (!plan) {
        return res.status(400).json({ error: `Invalid plan ID: ${planId}` });
      }
      
      // Initialize token usage for the user
      const success = await TokenManager.initializeTokenUsage(userId, planId, plan.tokens);
      
      if (!success) {
        return res.status(500).json({ error: 'Failed to initialize token usage' });
      }
      
      // Update user's subscription in database
      // This would typically update a 'subscriptions' table
      
      return res.status(200).json({ success: true });
    }
    
    // For other statuses, just acknowledge receipt
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling Cryptomus webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}