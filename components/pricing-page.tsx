"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: '$0',
      period: 'forever',
      features: [
        'starsky-01 AI model',
        '5 projects per month',
        'Basic templates',
        'Community support',
        'GitHub export',
        'Basic deployment',
        '1GB storage',
        'Standard performance'
      ],
      cta: 'Get Started Free',
      href: '/auth/signup',
      popular: false,
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      name: 'Pro',
      description: 'For serious builders and teams',
      price: isAnnual ? '$24' : '$29',
      period: 'per month',
      originalPrice: isAnnual ? '$29' : null,
      features: [
        'starsky-pro AI model',
        'Unlimited projects',
        'Premium templates',
        'Priority support',
        'Advanced GitHub integration',
        'Custom domains',
        'Team collaboration (up to 5)',
        'Advanced analytics',
        '100GB storage',
        'High-performance builds',
        'White-label options',
        'API access'
      ],
      cta: 'Start Pro Trial',
      href: '/auth/signup?plan=pro',
      popular: true,
      icon: Crown,
      color: 'text-purple-600'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Custom AI model training',
        'Unlimited everything',
        'Enterprise templates',
        'Dedicated support',
        'On-premise deployment',
        'Custom integrations',
        'Unlimited team members',
        'Advanced security & compliance',
        'Unlimited storage',
        'Enterprise-grade infrastructure',
        'Custom branding',
        'SLA guarantees'
      ],
      cta: 'Contact Sales',
      href: '/contact',
      popular: false,
      icon: Sparkles,
      color: 'text-emerald-600'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between starsky-01 and starsky-pro?',
      answer: 'starsky-01 is our base AI model optimized for common use cases, while starsky-pro offers advanced capabilities, better performance, and support for complex applications.'
    },
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'For the Free plan, you\'ll be prompted to upgrade. Pro users can temporarily exceed limits with overage charges. Enterprise plans have no limits.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. Enterprise plans have custom terms.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll retain access to paid features until the end of your billing period.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that's right for you. Start free and scale as you grow.
            </p>
            
            {/* Annual Toggle */}
            <div className="flex items-center justify-center space-x-4">
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
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <plan.icon className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      {plan.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through mr-2">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold">{plan.price}</span>
                    </div>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about our pricing and plans.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}