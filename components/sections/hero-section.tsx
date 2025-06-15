"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-8">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Advanced AI Models
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            <span className="block">From Idea to App.</span>
            <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Instantly.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Build beautiful, production-ready web applications with natural language.
            No coding required. Just describe what you want, and watch it come to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/demo">
                <Play className="h-5 w-5 mr-2" />
                Try Live Demo
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/signup">
                Start Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Hero Image/Video */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
              <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Interactive Demo Loading...
                  </p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-background border rounded-lg p-4 shadow-lg">
              <div className="text-sm font-medium">⚡ Built in 30s</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border rounded-lg p-4 shadow-lg">
              <div className="text-sm font-medium">🚀 Deploy Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}