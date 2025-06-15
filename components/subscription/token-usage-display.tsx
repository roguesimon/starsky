import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  BarChart3,
  CreditCard
} from 'lucide-react';
import { TokenUsage } from '@/lib/token-manager';
import { SubscriptionPlan } from '@/lib/subscription-plans';

interface TokenUsageDisplayProps {
  tokenUsage: TokenUsage | null;
  currentPlan: SubscriptionPlan;
  onUpgrade: () => void;
  isLoading?: boolean;
}

export function TokenUsageDisplay({ 
  tokenUsage, 
  currentPlan, 
  onUpgrade,
  isLoading = false
}: TokenUsageDisplayProps) {
  const [usagePercentage, setUsagePercentage] = useState(0);
  const [isLowOnTokens, setIsLowOnTokens] = useState(false);

  useEffect(() => {
    if (tokenUsage && tokenUsage.tokensTotal > 0) {
      const percentage = (tokenUsage.tokensUsed / tokenUsage.tokensTotal) * 100;
      setUsagePercentage(percentage);
      setIsLowOnTokens(tokenUsage.tokensRemaining / tokenUsage.tokensTotal < 0.1);
    } else {
      setUsagePercentage(0);
      setIsLowOnTokens(false);
    }
  }, [tokenUsage]);

  const formatTokens = (tokens: number): string => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Token Usage
          </CardTitle>
          <CardDescription>Loading your token usage...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Token Usage
            </CardTitle>
            <CardDescription>
              Your current token usage and limits
            </CardDescription>
          </div>
          <Badge variant={currentPlan.id === 'free' ? 'outline' : 'default'}>
            {currentPlan.name} Plan
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Usage Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {tokenUsage ? formatTokens(tokenUsage.tokensRemaining) : '0'} tokens remaining
            </span>
            <span className="text-sm text-muted-foreground">
              {tokenUsage ? formatTokens(tokenUsage.tokensTotal) : '0'} total
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {tokenUsage ? formatTokens(tokenUsage.tokensUsed) : '0'} used ({Math.round(usagePercentage)}%)
            </span>
            <span>
              Updated {tokenUsage ? new Date(tokenUsage.lastUpdated).toLocaleDateString() : 'never'}
            </span>
          </div>
        </div>

        {/* Low Token Warning */}
        {isLowOnTokens && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                You're running low on tokens
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Upgrade your plan or reduce usage to avoid interruptions.
              </p>
              <Button 
                size="sm" 
                className="mt-2 bg-yellow-500 hover:bg-yellow-600"
                onClick={onUpgrade}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        )}

        {/* Token Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Usage Rate</span>
            </div>
            <p className="text-2xl font-bold">
              {tokenUsage && tokenUsage.tokensUsed > 0 
                ? formatTokens(Math.round(tokenUsage.tokensUsed / 30)) 
                : '0'} 
              <span className="text-sm font-normal text-muted-foreground">/day</span>
            </p>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Estimated Days Left</span>
            </div>
            <p className="text-2xl font-bold">
              {tokenUsage && tokenUsage.tokensUsed > 0 
                ? Math.round(tokenUsage.tokensRemaining / (tokenUsage.tokensUsed / 30)) 
                : '∞'}
            </p>
          </div>
        </div>

        {/* Upgrade Button */}
        {currentPlan.id === 'free' && (
          <Button className="w-full" onClick={onUpgrade}>
            <Zap className="h-4 w-4 mr-2" />
            Upgrade to Pro
          </Button>
        )}

        {/* Usage History Link */}
        <Button variant="outline" className="w-full">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Detailed Usage History
        </Button>
      </CardContent>
    </Card>
  );
}