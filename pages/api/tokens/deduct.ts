import { NextApiRequest, NextApiResponse } from 'next';
import { TokenManager } from '@/lib/token-manager';
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

    const { tokenCount, promptId, modelId } = req.body;
    
    if (!tokenCount || typeof tokenCount !== 'number') {
      return res.status(400).json({ error: 'Missing or invalid tokenCount' });
    }

    // Deduct tokens
    const success = await TokenManager.deductTokens(user.id, tokenCount, promptId, modelId);
    
    if (!success) {
      return res.status(400).json({ error: 'Failed to deduct tokens' });
    }
    
    // Get updated token usage
    const tokenUsage = await TokenManager.getUserTokenUsage(user.id);
    
    return res.status(200).json({ success: true, tokenUsage });
  } catch (error) {
    console.error('Error deducting tokens:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}