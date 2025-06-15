import { NextApiRequest, NextApiResponse } from 'next';
import { TokenManager } from '@/lib/token-manager';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Get user from session
    const { user } = await supabase.auth.getUser(req.headers.authorization?.split(' ')[1] || '');
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get token usage
    const tokenUsage = await TokenManager.getUserTokenUsage(user.id);
    
    // Get token transactions
    const limit = parseInt(req.query.limit as string) || 50;
    const transactions = await TokenManager.getTokenTransactions(user.id, limit);
    
    return res.status(200).json({ tokenUsage, transactions });
  } catch (error) {
    console.error('Error getting token usage:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}