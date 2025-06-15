import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Zap, 
  Settings, 
  Clock, 
  BarChart3,
  Users,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { TokenUsageDisplay } from './token-usage-display';
import { TokenUsageHistory } from './token-usage-history';
import { UpgradePlanModal } from './upgrade-plan-modal';
import { useSubscription } from '@/lib/hooks/use-subscription';
import { SUBSCRIPTION_PLANS, getPlanById } from '@/lib/subscription-plans';
import { TokenTransaction } from '@/lib/token-manager';

interface SubscriptionManagerProps {
  userId: string;
}

export function SubscriptionManager({ userId }: SubscriptionManagerProps) {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  
  const { 
    planId, 
    plan, 
    status, 
    currentPeriodEnd, 
    cancelAtPeriodEnd,
    tokenUsage,
    isLoading,
    error
  } = useSubscription(userId);

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const response = await fetch('/api/tokens/get-usage', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch token transactions');
      
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching token transactions:', error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const handleUpgrade = async (selectedPlanId: string, paymentMethod: 'card' | 'crypto') => {
    try {
      const response = await fetch('/api/subscriptions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
        },
        body: JSON.stringify({
          planId: selectedPlanId,
          paymentMethod
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      // Redirect to checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions/customer-portal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create customer portal session');
      }
      
      const { url } = await response.json();
      
      // Redirect to customer portal
      window.location.href = url;
    } catch (error) {
      console.error('Error creating customer portal session:', error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Subscription
          </CardTitle>
          <CardDescription>Loading your subscription details...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Error Loading Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Current Plan
                  </CardTitle>
                  <CardDescription>
                    Your current subscription details
                  </CardDescription>
                </div>
                <Badge variant={planId === 'free' ? 'outline' : 'default'}>
                  {plan.name}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-medium">Token Allowance</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {plan.tokens.toLocaleString()} 
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Renewal Date</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {formatDate(currentPeriodEnd)}
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Team Access</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {plan.teamEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              
              {/* Plan Features */}
              <div>
                <h3 className="text-sm font-medium mb-3">Plan Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Zap className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="flex-1"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {planId === 'free' ? 'Upgrade Plan' : 'Change Plan'}
                </Button>
                
                {planId !== 'free' && (
                  <Button 
                    variant="outline" 
                    onClick={handleManageSubscription}
                    className="flex-1"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                )}
              </div>
              
              {/* Cancellation Notice */}
              {cancelAtPeriodEnd && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Your subscription will be canceled
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Your plan will downgrade to Free on {formatDate(currentPeriodEnd)}.
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="mt-2 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                      onClick={handleManageSubscription}
                    >
                      Reactivate Subscription
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Token Usage */}
          <TokenUsageDisplay 
            tokenUsage={tokenUsage}
            currentPlan={plan}
            onUpgrade={() => setIsUpgradeModalOpen(true)}
          />
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-6">
          <TokenUsageHistory 
            userId={userId}
            transactions={transactions}
            isLoading={isLoadingTransactions}
            onRefresh={fetchTransactions}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Subscription Settings
              </CardTitle>
              <CardDescription>
                Manage your subscription preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-medium mb-3">Payment Methods</h3>
                {planId !== 'free' ? (
                  <Button variant="outline" onClick={handleManageSubscription}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Payment Methods
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Add a payment method when you upgrade to a paid plan.
                  </p>
                )}
              </div>
              
              {/* Billing History */}
              <div>
                <h3 className="text-sm font-medium mb-3">Billing History</h3>
                {planId !== 'free' ? (
                  <Button variant="outline" onClick={handleManageSubscription}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Billing History
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No billing history available on the free plan.
                  </p>
                )}
              </div>
              
              {/* Cancellation */}
              {planId !== 'free' && !cancelAtPeriodEnd && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Cancel Subscription</h3>
                  <Button variant="outline" onClick={handleManageSubscription}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage in Stripe Portal
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    You'll continue to have access until the end of your current billing period.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upgrade Modal */}
      <UpgradePlanModal 
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlanId={planId}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}