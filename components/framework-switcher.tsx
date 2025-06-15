"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Globe, 
  Layers, 
  Code, 
  Rocket,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Framework {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  buildCommand: string;
  devCommand: string;
  isPopular?: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface FrameworkSwitcherProps {
  currentFramework: string;
  onFrameworkChange: (framework: string) => void;
}

const frameworks: Framework[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'The React framework for production with SSR, SSG, and API routes.',
    icon: Zap,
    features: ['Server-Side Rendering', 'Static Generation', 'API Routes', 'Image Optimization'],
    buildCommand: 'npm run build',
    devCommand: 'npm run dev',
    isPopular: true,
    difficulty: 'Intermediate'
  },
  {
    id: 'astro',
    name: 'Astro',
    description: 'Build faster websites with less client-side JavaScript.',
    icon: Rocket,
    features: ['Islands Architecture', 'Zero JS by Default', 'Component Agnostic', 'Fast Builds'],
    buildCommand: 'npm run build',
    devCommand: 'npm run dev',
    difficulty: 'Intermediate'
  },
  {
    id: 'svelte',
    name: 'SvelteKit',
    description: 'Cybernetically enhanced web apps with compile-time optimizations.',
    icon: Layers,
    features: ['Compile-time Optimizations', 'No Virtual DOM', 'Built-in State Management', 'Small Bundle Size'],
    buildCommand: 'npm run build',
    devCommand: 'npm run dev',
    difficulty: 'Intermediate'
  },
  {
    id: 'remix',
    name: 'Remix',
    description: 'Full stack web framework focused on web standards and modern UX.',
    icon: Globe,
    features: ['Nested Routing', 'Data Loading', 'Form Actions', 'Progressive Enhancement'],
    buildCommand: 'npm run build',
    devCommand: 'npm run dev',
    difficulty: 'Advanced'
  },
  {
    id: 'static',
    name: 'Static HTML',
    description: 'Pure HTML, CSS, and JavaScript for simple, fast websites.',
    icon: Code,
    features: ['No Build Step', 'Fast Loading', 'Easy Deployment', 'Universal Compatibility'],
    buildCommand: 'No build required',
    devCommand: 'Live Server',
    difficulty: 'Beginner'
  }
];

export function FrameworkSwitcher({ currentFramework, onFrameworkChange }: FrameworkSwitcherProps) {
  const [selectedFramework, setSelectedFramework] = useState(currentFramework);

  const handleFrameworkSelect = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
  };

  const handleConfirmSwitch = () => {
    if (selectedFramework !== currentFramework) {
      onFrameworkChange(selectedFramework);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Framework</h2>
        <p className="text-muted-foreground">
          Select the framework that best fits your project needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => {
          const isSelected = selectedFramework === framework.id;
          const isCurrent = currentFramework === framework.id;
          const Icon = framework.icon;
          
          return (
            <Card 
              key={framework.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-primary border-primary shadow-lg' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handleFrameworkSelect(framework.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {framework.name}
                        {framework.isPopular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge className="text-xs">
                            Current
                          </Badge>
                        )}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${getDifficultyColor(framework.difficulty)}`}
                      >
                        {framework.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4">
                  {framework.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Features</h4>
                    <div className="space-y-1">
                      {framework.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div><strong>Dev:</strong> {framework.devCommand}</div>
                      <div><strong>Build:</strong> {framework.buildCommand}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedFramework !== currentFramework && (
        <div className="flex items-center justify-center space-x-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Switching from <strong>{frameworks.find(f => f.id === currentFramework)?.name}</strong> to{' '}
              <strong>{frameworks.find(f => f.id === selectedFramework)?.name}</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              This will regenerate your project structure and update all files
            </p>
          </div>
          <Button onClick={handleConfirmSwitch} className="flex items-center">
            Switch Framework
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}