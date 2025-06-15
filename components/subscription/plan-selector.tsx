import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Zap, Crown, CreditCard, Bitcoin } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/lib/subscription-plans';

interface PlanSelectorProps {
  currentPlanId: string;
  onSelectPlan: (planId: string, paymentMethod: 'card' | 'crypto') => void;
}

export function PlanSelector({ currentPlanId, onSelectPlan }: PlanSelectorProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.id === currentPlanId) return;
    setSelectedPlanId(plan.id);
  };

  const handleConfirmSelection = () => {
    if (selectedPlanId) {
      onSelectPlan(selectedPlanId, paymentMethod);
    }
  };

  const formatTokens = (tokens: number): string => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    }
    return tokens.toString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Subscription Plans
        </CardTitle>
        <CardDescription>
          Choose the plan that's right for you
        </CardDescription>
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          <span className={`text-sm ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <Badge variant="secondary" className="ml-2">
            Save 20%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrentPlan = plan.id === currentPlanId;
            const isSelected = plan.id === selectedPlanId;
            
            // Skip free plan if user is already on a paid plan
            if (plan.id === 'free' && currentPlanId !== 'free') {
              return null;
            }
            
            return (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary border-primary shadow-lg' : 
                  isCurrentPlan ? 'ring-2 ring-green-500 border-green-500' : ''
                }`}
                onClick={() => handleSelectPlan(plan)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {isCurrentPlan && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Current Plan
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      ${isAnnual ? (plan.price * 0.8 * 12).toFixed(0) : plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">{formatTokens(plan.tokens)} tokens</span>
                    </div>
                    {plan.teamEnabled && (
                      <div className="flex items-center">
                        <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="font-medium">Team collaboration</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {!isCurrentPlan && (
                    <Button 
                      variant={isSelected ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment Method Selection */}
        {selectedPlanId && (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  paymentMethod === 'card' ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Credit Card</h4>
                    <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  paymentMethod === 'crypto' ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setPaymentMethod('crypto')}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <Bitcoin className="h-8 w-8 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Cryptocurrency</h4>
                    <p className="text-sm text-muted-foreground">Pay with BTC, ETH, USDT, etc.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleConfirmSelection}
            >
              Continue to Payment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}