"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Github, Mail } from 'lucide-react';

interface OAuthButtonsProps {
  onOAuthLogin: (provider: 'github' | 'google') => Promise<void>;
  isLoading?: boolean;
}

export function OAuthButtons({ onOAuthLogin, isLoading = false }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<'github' | 'google' | null>(null);

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setLoadingProvider(provider);
    try {
      await onOAuthLogin(provider);
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('github')}
        disabled={isLoading || loadingProvider !== null}
      >
        {loadingProvider === 'github' ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Github className="h-4 w-4 mr-2" />
        )}
        Continue with GitHub
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('google')}
        disabled={isLoading || loadingProvider !== null}
      >
        {loadingProvider === 'google' ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Mail className="h-4 w-4 mr-2" />
        )}
        Continue with Google
      </Button>
    </div>
  );
}