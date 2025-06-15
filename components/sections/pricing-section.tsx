"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'starsky-01 AI model',
        '5 projects',
        'Basic templates',
        'Community support',
        'GitHub export',
        'Basic deployment'
      ],
      cta: 'Get Started Free',
      href: '/auth/signup',
      popular: false,
      icon: Zap
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For serious builders',
      features: [
        'starsky-pro AI model',
        'Unlimited projects',
        'Premium templates',
        'Priority support',
        'Advanced GitHub integration',
        'Custom domains',
        'Team collaboration',
        'Advanced analytics'
      ],
      cta: 'Start Pro Trial',
      href: '/auth/signup?plan=pro',
      popular: true,
      icon: Crown
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-800/30 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-navy-800/50 border-blue-500/30 text-blue-300">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-navy-300 max-w-2xl mx-auto">
            Choose the plan that's right for you. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-navy-800/50 border-navy-700 hover:shadow-glow-blue transition-all duration-300 group ${plan.popular ? 'border-blue-500/50 shadow-glow-blue scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-blue-teal text-white shadow-glow-blue">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <plan.icon className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 h-8 w-8 bg-blue-400 rounded-full opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-navy-300 group-hover:text-navy-200 transition-colors duration-300">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-navy-300 ml-2">/ {plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-teal-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-navy-300 group-hover:text-navy-200 transition-colors duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-blue-teal hover:shadow-glow-accent' 
                      : 'bg-navy-700 hover:bg-navy-600 border border-navy-600 hover:border-blue-500/50'
                  }`}
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
      </div>
    </section>
  );
}