import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '../subscription-plans';
import { TokenManager, TokenUsage } from '../token-manager';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserSubscription {
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  tokenUsage: TokenUsage | null;
  isLoading: boolean;
  error: string | null;
}

export function useSubscription(userId?: string): UserSubscription & {
  checkTokenAvailability: (requiredTokens: number) => Promise<boolean>;
} {
  const [subscription, setSubscription] = useState<UserSubscription>({
    planId: 'free',
    plan: SUBSCRIPTION_PLANS[0],
    status: 'active',
    currentPeriodEnd: '',
    cancelAtPeriodEnd: false,
    tokenUsage: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    if (!userId) {
      setSubscription(prev => ({ ...prev, isLoading: false }));
      return;
    }

    async function fetchSubscription() {
      try {
        // Fetch subscription data from Supabase
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (subscriptionError && subscriptionError.code !== 'PGRST116') {
          throw subscriptionError;
        }

        // Fetch token usage
        const tokenUsage = await TokenManager.getUserTokenUsage(userId);

        if (subscriptionData) {
          const plan = SUBSCRIPTION_PLANS.find(p => p.id === subscriptionData.plan_id) || SUBSCRIPTION_PLANS[0];
          
          setSubscription({
            planId: subscriptionData.plan_id,
            plan,
            status: subscriptionData.status,
            currentPeriodEnd: subscriptionData.current_period_end,
            cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
            tokenUsage,
            isLoading: false,
            error: null
          });
        } else {
          // Default to free plan if no subscription found
          setSubscription({
            planId: 'free',
            plan: SUBSCRIPTION_PLANS[0],
            status: 'active',
            currentPeriodEnd: '',
            cancelAtPeriodEnd: false,
            tokenUsage,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setSubscription(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load subscription data'
        }));
      }
    }

    fetchSubscription();
  }, [userId]);

  const checkTokenAvailability = async (requiredTokens: number): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      return await TokenManager.hasEnoughTokens(userId, requiredTokens);
    } catch (error) {
      console.error('Error checking token availability:', error);
      return false;
    }
  };

  return {
    ...subscription,
    checkTokenAvailability
  };
}