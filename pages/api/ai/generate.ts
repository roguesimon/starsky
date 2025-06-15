import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { TokenManager } from '@/lib/token-manager';

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

    const { prompt, model, estimatedTokens } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }
    
    // Estimate token usage if not provided
    const tokenEstimate = estimatedTokens || Math.ceil(prompt.length / 4) * 2; // Simple estimation
    
    // Check if user has enough tokens
    const hasEnoughTokens = await TokenManager.hasEnoughTokens(user.id, tokenEstimate);
    
    if (!hasEnoughTokens) {
      return res.status(402).json({ 
        error: 'Insufficient tokens', 
        code: 'INSUFFICIENT_TOKENS',
        message: 'You do not have enough tokens to complete this request. Please upgrade your plan or add more tokens.'
      });
    }
    
    // Generate a unique ID for this prompt
    const promptId = `prompt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // In a real implementation, you would call your AI service here
    // For this example, we'll simulate a response
    const response = {
      id: promptId,
      model: model || 'gpt-4o',
      choices: [
        {
          text: `This is a simulated response to: "${prompt}"`,
          index: 0,
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: Math.ceil(prompt.length / 4),
        completion_tokens: Math.ceil(prompt.length / 4),
        total_tokens: Math.ceil(prompt.length / 2)
      }
    };
    
    // Deduct tokens based on actual usage
    const actualTokens = response.usage.total_tokens;
    const success = await TokenManager.deductTokens(user.id, actualTokens, promptId, model);
    
    if (!success) {
      return res.status(500).json({ error: 'Failed to deduct tokens' });
    }
    
    // Return the response
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error generating AI response:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}