"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Download, 
  Star, 
  Shield, 
  Zap, 
  Database, 
  Mail, 
  CreditCard,
  Github,
  Globe,
  Smartphone,
  BarChart3,
  Lock,
  CheckCircle
} from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: 'payment' | 'database' | 'auth' | 'email' | 'analytics' | 'ui' | 'deployment';
  icon: React.ComponentType<any>;
  version: string;
  downloads: number;
  rating: number;
  isPremium: boolean;
  isInstalled: boolean;
  envVars: string[];
  dependencies: string[];
  setupCode: string;
}

interface PluginStoreProps {
  onInstallPlugin: (plugin: Plugin) => void;
  framework: string;
}

const plugins: Plugin[] = [
  {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Accept payments with Stripe. Includes checkout, subscriptions, and webhooks.',
    category: 'payment',
    icon: CreditCard,
    version: '2.1.0',
    downloads: 15420,
    rating: 4.9,
    isPremium: false,
    isInstalled: false,
    envVars: ['STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY', 'STRIPE_WEBHOOK_SECRET'],
    dependencies: ['stripe'],
    setupCode: `// Stripe integration setup
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/success\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cancel\`,
  });
  return session;
}`
  },
  {
    id: 'supabase',
    name: 'Supabase Database',
    description: 'PostgreSQL database with real-time subscriptions and authentication.',
    category: 'database',
    icon: Database,
    version: '2.45.4',
    downloads: 28350,
    rating: 4.8,
    isPremium: false,
    isInstalled: false,
    envVars: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    dependencies: ['@supabase/supabase-js'],
    setupCode: `// Supabase client setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);`
  },
  {
    id: 'auth0',
    name: 'Auth0 Authentication',
    description: 'Complete authentication solution with social logins and SSO.',
    category: 'auth',
    icon: Shield,
    version: '3.2.1',
    downloads: 12890,
    rating: 4.7,
    isPremium: true,
    isInstalled: false,
    envVars: ['AUTH0_SECRET', 'AUTH0_BASE_URL', 'AUTH0_ISSUER_BASE_URL', 'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET'],
    dependencies: ['@auth0/nextjs-auth0'],
    setupCode: `// Auth0 setup
import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    returnTo: '/dashboard'
  }),
  logout: handleLogout({
    returnTo: '/'
  }),
  callback: handleCallback(),
  profile: handleProfile()
});`
  },
  {
    id: 'sendgrid',
    name: 'SendGrid Email',
    description: 'Send transactional and marketing emails with SendGrid.',
    category: 'email',
    icon: Mail,
    version: '7.7.0',
    downloads: 9650,
    rating: 4.6,
    isPremium: false,
    isInstalled: false,
    envVars: ['SENDGRID_API_KEY'],
    dependencies: ['@sendgrid/mail'],
    setupCode: `// SendGrid email setup
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: 'noreply@yourapp.com',
    subject,
    html,
  };
  
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}`
  },
  {
    id: 'analytics',
    name: 'Google Analytics',
    description: 'Track user behavior and website performance with GA4.',
    category: 'analytics',
    icon: BarChart3,
    version: '4.0.2',
    downloads: 18750,
    rating: 4.5,
    isPremium: false,
    isInstalled: false,
    envVars: ['NEXT_PUBLIC_GA_MEASUREMENT_ID'],
    dependencies: [],
    setupCode: `// Google Analytics setup
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const gtag = (...args: any[]) => {
  (window as any).gtag(...args);
};

export const pageview = (url: string) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};`
  },
  {
    id: 'cryptomus',
    name: 'Cryptomus Crypto Payments',
    description: 'Accept cryptocurrency payments with Cryptomus gateway.',
    category: 'payment',
    icon: Lock,
    version: '1.3.0',
    downloads: 3420,
    rating: 4.4,
    isPremium: true,
    isInstalled: false,
    envVars: ['CRYPTOMUS_API_KEY', 'CRYPTOMUS_MERCHANT_ID'],
    dependencies: ['cryptomus-api'],
    setupCode: `// Cryptomus crypto payments setup
import { CryptomusAPI } from 'cryptomus-api';

const cryptomus = new CryptomusAPI({
  apiKey: process.env.CRYPTOMUS_API_KEY!,
  merchantId: process.env.CRYPTOMUS_MERCHANT_ID!,
});

export async function createCryptoPayment(amount: number, currency: string) {
  const payment = await cryptomus.createPayment({
    amount,
    currency,
    order_id: \`order_\${Date.now()}\`,
    callback_url: \`\${process.env.NEXT_PUBLIC_URL}/api/crypto-webhook\`,
  });
  return payment;
}`
  }
];

export function PluginStore({ onInstallPlugin, framework }: PluginStoreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [installedPlugins, setInstalledPlugins] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Plugins', icon: Zap },
    { id: 'payment', name: 'Payments', icon: CreditCard },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'auth', name: 'Authentication', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstallPlugin = async (plugin: Plugin) => {
    setInstalledPlugins(prev => new Set([...prev, plugin.id]));
    onInstallPlugin(plugin);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || Zap;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Plugin Store</h2>
          <Badge variant="secondary">
            {filteredPlugins.length} plugins
          </Badge>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plugins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
        <div className="px-6 py-4 border-b">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                  <Icon className="h-4 w-4 mr-1" />
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin) => {
              const isInstalled = installedPlugins.has(plugin.id);
              const Icon = plugin.icon;
              
              return (
                <Card key={plugin.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {plugin.name}
                            {plugin.isPremium && (
                              <Badge variant="secondary" className="text-xs">
                                Pro
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>v{plugin.version}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              {plugin.rating}
                            </div>
                            <span>•</span>
                            <span>{plugin.downloads.toLocaleString()} downloads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="mb-4">
                      {plugin.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Environment Variables</h4>
                        <div className="flex flex-wrap gap-1">
                          {plugin.envVars.map(envVar => (
                            <Badge key={envVar} variant="outline" className="text-xs">
                              {envVar}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Dependencies</h4>
                        <div className="flex flex-wrap gap-1">
                          {plugin.dependencies.map(dep => (
                            <Badge key={dep} variant="outline" className="text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        className="w-full" 
                        onClick={() => handleInstallPlugin(plugin)}
                        disabled={isInstalled}
                        variant={isInstalled ? "outline" : "default"}
                      >
                        {isInstalled ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Installed
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Install Plugin
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredPlugins.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No plugins found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse different categories.
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}