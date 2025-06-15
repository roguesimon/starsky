"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, MessageSquare, Code, Eye } from 'lucide-react';
import Link from 'next/link';

export function DemoSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See Starsky AI in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-driven development with our interactive demo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Describe Your App</h3>
              <p className="text-muted-foreground">
                Tell our AI what you want to build in natural language
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. Watch It Build</h3>
              <p className="text-muted-foreground">
                See the code and design come together in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. Preview & Deploy</h3>
              <p className="text-muted-foreground">
                Test your app and deploy it instantly to the web
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/demo">
              <Play className="h-5 w-5 mr-2" />
              Try Interactive Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}