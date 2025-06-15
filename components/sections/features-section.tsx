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
      badge: 'Core Feature',
      color: 'text-blue-400'
    },
    {
      icon: Code,
      title: 'Live Code Editor',
      description: 'Monaco-based editor with IntelliSense, syntax highlighting, and real-time collaboration.',
      badge: 'Developer Tools',
      color: 'text-teal-400'
    },
    {
      icon: Palette,
      title: 'Beautiful Design System',
      description: 'Modern, responsive designs with customizable themes and components.',
      badge: 'Design',
      color: 'text-blue-400'
    },
    {
      icon: Smartphone,
      title: 'Responsive Preview',
      description: 'Real-time preview with mobile, tablet, and desktop views.',
      badge: 'Preview',
      color: 'text-teal-400'
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Built-in version history and GitHub integration for seamless collaboration.',
      badge: 'Collaboration',
      color: 'text-blue-400'
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Download as ZIP, deploy to GitHub Pages, or export to various platforms.',
      badge: 'Deployment',
      color: 'text-teal-400'
    },
    {
      icon: Globe,
      title: 'Instant Deployment',
      description: 'One-click deployment to multiple platforms with custom domains.',
      badge: 'Hosting',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with enterprise-grade security and privacy controls.',
      badge: 'Security',
      color: 'text-teal-400'
    },
    {
      icon: Rocket,
      title: 'Performance Optimized',
      description: 'Optimized builds with automatic performance enhancements and CDN distribution.',
      badge: 'Performance',
      color: 'text-blue-400'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-navy-800/50 border-blue-500/30 text-blue-300">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Everything you need to build amazing apps
          </h2>
          <p className="text-xl text-navy-300 max-w-2xl mx-auto">
            From AI-powered development to enterprise deployment, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-glow-blue transition-all duration-300 bg-navy-800/50 border-navy-700 hover:border-blue-500/50 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="relative">
                    <feature.icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`absolute inset-0 h-8 w-8 ${feature.color.replace('text-', 'bg-')} rounded-full opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300`}></div>
                  </div>
                  <Badge variant="outline" className="text-xs border-navy-600 text-navy-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base text-navy-300 group-hover:text-navy-200 transition-colors duration-300">
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