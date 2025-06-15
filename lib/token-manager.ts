import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TokenUsage {
  userId: string;
  planId: string;
  tokensRemaining: number;
  tokensUsed: number;
  tokensTotal: number;
  lastUpdated: string;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deduction' | 'addition' | 'reset';
  source: 'prompt' | 'subscription' | 'topup' | 'admin' | 'refund';
  promptId?: string;
  modelId?: string;
  timestamp: string;
}

export class TokenManager {
  /**
   * Get current token usage for a user
   */
  static async getUserTokenUsage(userId: string): Promise<TokenUsage | null> {
    try {
      const { data, error } = await supabase
        .from('token_usage')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      
      if (!data) return null;
      
      return {
        userId: data.user_id,
        planId: data.plan_id,
        tokensRemaining: data.tokens_remaining,
        tokensUsed: data.tokens_used,
        tokensTotal: data.tokens_total,
        lastUpdated: data.last_updated
      };
    } catch (error) {
      console.error('Error getting user token usage:', error);
      return null;
    }
  }

  /**
   * Initialize token usage for a new subscription
   */
  static async initializeTokenUsage(userId: string, planId: string, tokensTotal: number): Promise<boolean> {
    try {
      // Check if user already has a token usage record
      const { data: existingData } = await supabase
        .from('token_usage')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('token_usage')
          .update({
            plan_id: planId,
            tokens_remaining: tokensTotal,
            tokens_total: tokensTotal,
            tokens_used: 0,
            last_updated: new Date().toISOString()
          })
          .eq('user_id', userId);
        
        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('token_usage')
          .insert({
            user_id: userId,
            plan_id: planId,
            tokens_remaining: tokensTotal,
            tokens_total: tokensTotal,
            tokens_used: 0,
            last_updated: new Date().toISOString()
          });
        
        if (error) throw error;
      }
      
      // Log the transaction
      await this.logTokenTransaction(userId, tokensTotal, 'addition', 'subscription');
      
      return true;
    } catch (error) {
      console.error('Error initializing token usage:', error);
      return false;
    }
  }

  /**
   * Deduct tokens for a prompt
   */
  static async deductTokens(userId: string, tokenCount: number, promptId?: string, modelId?: string): Promise<boolean> {
    try {
      // Get current usage
      const usage = await this.getUserTokenUsage(userId);
      if (!usage) throw new Error('No token usage record found for user');
      
      // Check if user has enough tokens
      if (usage.tokensRemaining < tokenCount) {
        throw new Error('Insufficient tokens');
      }
      
      // Update token usage
      const { error } = await supabase
        .from('token_usage')
        .update({
          tokens_remaining: usage.tokensRemaining - tokenCount,
          tokens_used: usage.tokensUsed + tokenCount,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // Log the transaction
      await this.logTokenTransaction(userId, tokenCount, 'deduction', 'prompt', promptId, modelId);
      
      return true;
    } catch (error) {
      console.error('Error deducting tokens:', error);
      return false;
    }
  }

  /**
   * Add tokens to a user's account (for top-ups or admin adjustments)
   */
  static async addTokens(userId: string, tokenCount: number, source: 'topup' | 'admin' | 'refund'): Promise<boolean> {
    try {
      // Get current usage
      const usage = await this.getUserTokenUsage(userId);
      if (!usage) throw new Error('No token usage record found for user');
      
      // Update token usage
      const { error } = await supabase
        .from('token_usage')
        .update({
          tokens_remaining: usage.tokensRemaining + tokenCount,
          tokens_total: usage.tokensTotal + tokenCount,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // Log the transaction
      await this.logTokenTransaction(userId, tokenCount, 'addition', source);
      
      return true;
    } catch (error) {
      console.error('Error adding tokens:', error);
      return false;
    }
  }

  /**
   * Log a token transaction
   */
  private static async logTokenTransaction(
    userId: string, 
    amount: number, 
    type: 'deduction' | 'addition' | 'reset',
    source: 'prompt' | 'subscription' | 'topup' | 'admin' | 'refund',
    promptId?: string,
    modelId?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('token_transactions')
        .insert({
          user_id: userId,
          amount,
          type,
          source,
          prompt_id: promptId,
          model_id: modelId,
          timestamp: new Date().toISOString()
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error logging token transaction:', error);
    }
  }

  /**
   * Get token usage history for a user
   */
  static async getTokenTransactions(userId: string, limit = 50): Promise<TokenTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        userId: item.user_id,
        amount: item.amount,
        type: item.type,
        source: item.source,
        promptId: item.prompt_id,
        modelId: item.model_id,
        timestamp: item.timestamp
      }));
    } catch (error) {
      console.error('Error getting token transactions:', error);
      return [];
    }
  }

  /**
   * Check if a user has enough tokens for a prompt
   */
  static async hasEnoughTokens(userId: string, estimatedTokens: number): Promise<boolean> {
    try {
      const usage = await this.getUserTokenUsage(userId);
      if (!usage) return false;
      
      return usage.tokensRemaining >= estimatedTokens;
    } catch (error) {
      console.error('Error checking token balance:', error);
      return false;
    }
  }

  /**
   * Get token usage percentage
   */
  static getUsagePercentage(usage: TokenUsage): number {
    if (usage.tokensTotal === 0) return 0;
    return (usage.tokensUsed / usage.tokensTotal) * 100;
  }

  /**
   * Check if user is low on tokens (below 10%)
   */
  static isLowOnTokens(usage: TokenUsage): boolean {
    return (usage.tokensRemaining / usage.tokensTotal) < 0.1;
  }
}