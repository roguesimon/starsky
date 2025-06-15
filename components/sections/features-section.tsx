"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Palette, 
  Smartphone, 
  Zap, 
  GitBranch,
  Download,
  Globe,
  Shield,
  Rocket
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Development',
      description: 'Describe your app in plain English and watch our advanced AI models (starsky-01 & starsky-pro) build it instantly.',
      badge: 'Core Feature'
    },
    {
      icon: Code,
      title: 'Live Code Editor',
      description: 'Monaco-based editor with IntelliSense, syntax highlighting, and real-time collaboration.',
      badge: 'Developer Tools'
    },
    {
      icon: Palette,
      title: 'Beautiful Design System',
      description: 'Modern, responsive designs with customizable themes and components.',
      badge: 'Design'
    },
    {
      icon: Smartphone,
      title: 'Responsive Preview',
      description: 'Real-time preview with mobile, tablet, and desktop views.',
      badge: 'Preview'
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Built-in version history and GitHub integration for seamless collaboration.',
      badge: 'Collaboration'
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Download as ZIP, deploy to GitHub Pages, or export to various platforms.',
      badge: 'Deployment'
    },
    {
      icon: Globe,
      title: 'Instant Deployment',
      description: 'One-click deployment to multiple platforms with custom domains.',
      badge: 'Hosting'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with enterprise-grade security and privacy controls.',
      badge: 'Security'
    },
    {
      icon: Rocket,
      title: 'Performance Optimized',
      description: 'Optimized builds with automatic performance enhancements and CDN distribution.',
      badge: 'Performance'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to build amazing apps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AI-powered development to enterprise deployment, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}