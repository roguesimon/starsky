"use client";

import { useEffect } from 'react';
import { aiOrchestrator, AIRequest } from '@/lib/ai-orchestrator';
import { useSubscription } from '@/lib/hooks/use-subscription';
import { toast } from 'sonner';

interface AIPromptHookProps {
  userId?: string;
  children: React.ReactNode;
}

export function AIPromptHook({ userId, children }: AIPromptHookProps) {
  const { checkTokenAvailability, tokenUsage, planId } = useSubscription(userId);

  // Override the aiOrchestrator.processRequest method to check token availability
  useEffect(() => {
    if (!userId) return;

    const originalProcessRequest = aiOrchestrator.processRequest.bind(aiOrchestrator);
    
    aiOrchestrator.processRequest = async (request: AIRequest) => {
      try {
        // Estimate token usage
        const promptTokens = Math.ceil(request.prompt.length / 4);
        const estimatedResponseTokens = promptTokens * 2; // Simple estimation
        const estimatedTotalTokens = promptTokens + estimatedResponseTokens;
        
        // Check if user has enough tokens
        const hasEnoughTokens = await checkTokenAvailability(estimatedTotalTokens);
        
        if (!hasEnoughTokens) {
          toast.error('Insufficient tokens', {
            description: 'You do not have enough tokens to complete this request. Please upgrade your plan.',
            action: {
              label: 'Upgrade',
              onClick: () => {
                // Redirect to upgrade page or open modal
                window.location.href = '/dashboard?upgrade=true';
              }
            }
          });
          
          throw new Error('Insufficient tokens');
        }
        
        // Process the request
        const result = await originalProcessRequest(request);
        
        // Deduct tokens
        const actualTokens = result.jobLog.tokensUsed;
        await fetch('/api/tokens/deduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
          },
          body: JSON.stringify({
            tokenCount: actualTokens,
            promptId: result.jobLog.id,
            modelId: result.jobLog.modelUsed
          })
        });
        
        return result;
      } catch (error) {
        if (error instanceof Error && error.message === 'Insufficient tokens') {
          throw error;
        }
        
        // For other errors, proceed with original method
        return originalProcessRequest(request);
      }
    };
    
    // Restore original method on cleanup
    return () => {
      aiOrchestrator.processRequest = originalProcessRequest;
    };
  }, [userId, checkTokenAvailability]);

  // Show warning when tokens are low
  useEffect(() => {
    if (tokenUsage && (tokenUsage.tokensRemaining / tokenUsage.tokensTotal < 0.1)) {
      toast.warning('Low token balance', {
        description: `You have ${tokenUsage.tokensRemaining.toLocaleString()} tokens remaining (${Math.round((tokenUsage.tokensRemaining / tokenUsage.tokensTotal) * 100)}%).`,
        action: {
          label: 'Upgrade',
          onClick: () => {
            window.location.href = '/dashboard?upgrade=true';
          }
        },
        duration: 10000
      });
    }
  }, [tokenUsage]);

  return <>{children}</>;
}