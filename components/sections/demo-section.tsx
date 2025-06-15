"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, MessageSquare, Code, Eye } from 'lucide-react';
import Link from 'next/link';

export function DemoSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-800/50 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-blue-500/10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-navy-800/50 border-teal-500/30 text-teal-300">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            See Starsky AI in Action
          </h2>
          <p className="text-xl text-navy-300 max-w-2xl mx-auto">
            Experience the power of AI-driven development with our interactive demo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center bg-navy-800/50 border-navy-700 hover:border-blue-500/50 hover:shadow-glow-blue transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <MessageSquare className="h-12 w-12 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-12 w-12 bg-blue-400 rounded-full opacity-20 group-hover:opacity-30 blur-sm mx-auto transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                1. Describe Your App
              </h3>
              <p className="text-navy-300 group-hover:text-navy-200 transition-colors duration-300">
                Tell our AI what you want to build in natural language
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-navy-800/50 border-navy-700 hover:border-teal-500/50 hover:shadow-glow-teal transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <Code className="h-12 w-12 text-teal-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-12 w-12 bg-teal-400 rounded-full opacity-20 group-hover:opacity-30 blur-sm mx-auto transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-teal-300 transition-colors duration-300">
                2. Watch It Build
              </h3>
              <p className="text-navy-300 group-hover:text-navy-200 transition-colors duration-300">
                See the code and design come together in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-navy-800/50 border-navy-700 hover:border-blue-500/50 hover:shadow-glow-blue transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <Eye className="h-12 w-12 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-12 w-12 bg-blue-400 rounded-full opacity-20 group-hover:opacity-30 blur-sm mx-auto transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                3. Preview & Deploy
              </h3>
              <p className="text-navy-300 group-hover:text-navy-200 transition-colors duration-300">
                Test your app and deploy it instantly to the web
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6 bg-gradient-blue-teal hover:shadow-glow-accent transition-all duration-300 group" asChild>
            <Link href="/demo">
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Try Interactive Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}