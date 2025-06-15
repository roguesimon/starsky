import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { SubscriptionManager } from '@/components/subscription/subscription-manager';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SubscriptionPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }
      
      setUserId(user.id);
      setIsLoading(false);
    }
    
    getUser();
  }, [router]);

  // Handle query parameters for checkout success/cancel
  useEffect(() => {
    if (router.query.checkout === 'success') {
      // Show success toast
    } else if (router.query.checkout === 'canceled') {
      // Show canceled toast
    }
    
    // Clean up query params
    if (router.query.checkout) {
      router.replace('/dashboard/subscription', undefined, { shallow: true });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Subscription & Tokens</h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription plan and token usage
            </p>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : userId ? (
            <SubscriptionManager userId={userId} />
          ) : (
            <div className="text-center py-12">
              <p>Please sign in to manage your subscription.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}