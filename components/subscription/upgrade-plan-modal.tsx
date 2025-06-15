import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlanSelector } from './plan-selector';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlanId: string;
  onUpgrade: (planId: string, paymentMethod: 'card' | 'crypto') => Promise<void>;
}

export function UpgradePlanModal({ 
  isOpen, 
  onClose, 
  currentPlanId,
  onUpgrade
}: UpgradePlanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string, paymentMethod: 'card' | 'crypto') => {
    setIsLoading(true);
    setError(null);
    
    try {
      await onUpgrade(planId, paymentMethod);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process upgrade');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose a plan that fits your needs and get more tokens
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <PlanSelector 
            currentPlanId={currentPlanId}
            onSelectPlan={handleSelectPlan}
          />
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md">
            {error}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}