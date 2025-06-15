"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-navy relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-blue"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-blue" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-8 bg-navy-800/50 border-blue-500/30 text-blue-300 hover:bg-navy-700/50 transition-colors duration-300">
            <Sparkles className="h-3 w-3 mr-1 text-teal-400" />
            Powered by Advanced AI Models
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            <span className="block text-white">From Idea to App.</span>
            <span className="block text-gradient-blue animate-slide-up">
              Instantly.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-navy-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Build beautiful, production-ready web applications with natural language.
            <span className="text-blue-400 font-medium"> No coding required.</span> Just describe what you want, and watch it come to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-blue-teal hover:shadow-glow-accent transition-all duration-300 group" asChild>
              <Link href="/demo">
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Try Live Demo
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-navy-600 text-blue-300 hover:bg-navy-800 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 group" asChild>
              <Link href="/auth/signup">
                Start Free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          {/* Hero Image/Video */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy-700 bg-navy-800">
              <div className="bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 aspect-video flex items-center justify-center relative">
                {/* Simulated Browser Chrome */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-navy-900 border-b border-navy-700 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-navy-800 rounded px-3 py-1 text-xs text-navy-300 inline-block">
                      starsky.ai/demo
                    </div>
                  </div>
                </div>
                
                {/* Demo Content */}
                <div className="text-center pt-10">
                  <div className="relative">
                    <Zap className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-glow" />
                    <div className="absolute inset-0 h-16 w-16 bg-blue-400 rounded-full opacity-20 blur-xl mx-auto animate-pulse-blue"></div>
                  </div>
                  <p className="text-lg text-navy-300 mb-4">
                    Interactive Demo Loading...
                  </p>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-navy-800/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 shadow-glow-blue animate-slide-up">
              <div className="text-sm font-medium text-blue-300">⚡ Built in 30s</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-navy-800/80 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4 shadow-glow-teal animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-sm font-medium text-teal-300">🚀 Deploy Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}