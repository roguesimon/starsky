export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  tokens: number;
  features: string[];
  stripePriceId?: string;
  teamEnabled: boolean;
  prioritySupport: boolean;
  uploadSizeLimit: number; // in MB
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For personal projects and exploration',
    price: 0,
    interval: 'month',
    tokens: 200000, // 200k tokens/month
    features: [
      'Access to basic AI models',
      'Up to 200k tokens per month',
      'Single user access',
      'Basic support',
      'Standard response times'
    ],
    teamEnabled: false,
    prioritySupport: false,
    uploadSizeLimit: 5
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For individual developers',
    price: 20,
    interval: 'month',
    tokens: 10000000, // 10M tokens
    stripePriceId: 'price_pro_monthly_id',
    features: [
      'Access to all AI models',
      'Up to 10M tokens per month',
      'Single user access',
      'Standard support',
      'Faster response times'
    ],
    teamEnabled: false,
    prioritySupport: false,
    uploadSizeLimit: 20
  },
  {
    id: 'pro-50',
    name: 'Pro 50',
    description: 'For small teams',
    price: 50,
    interval: 'month',
    tokens: 26000000, // 26M tokens
    stripePriceId: 'price_pro_50_monthly_id',
    features: [
      'Access to all AI models',
      'Up to 26M tokens per month',
      'Team collaboration (up to 3)',
      'Priority support',
      'Faster response times'
    ],
    teamEnabled: true,
    prioritySupport: true,
    uploadSizeLimit: 50
  },
  {
    id: 'pro-100',
    name: 'Pro 100',
    description: 'For growing teams',
    price: 100,
    interval: 'month',
    tokens: 55000000, // 55M tokens
    stripePriceId: 'price_pro_100_monthly_id',
    features: [
      'Access to all AI models',
      'Up to 55M tokens per month',
      'Team collaboration (up to 5)',
      'Priority support',
      'Rapid response times'
    ],
    teamEnabled: true,
    prioritySupport: true,
    uploadSizeLimit: 100
  },
  {
    id: 'pro-200',
    name: 'Pro 200',
    description: 'For professional teams',
    price: 200,
    interval: 'month',
    tokens: 120000000, // 120M tokens
    stripePriceId: 'price_pro_200_monthly_id',
    features: [
      'Access to all AI models',
      'Up to 120M tokens per month',
      'Team collaboration (up to 10)',
      'Priority support',
      'Instant response times'
    ],
    teamEnabled: true,
    prioritySupport: true,
    uploadSizeLimit: 200
  }
];

export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
}

export function getStripePriceId(planId: string): string | undefined {
  const plan = getPlanById(planId);
  return plan?.stripePriceId;
}