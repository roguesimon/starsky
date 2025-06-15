"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  History, 
  Tag, 
  Zap, 
  Database, 
  Code, 
  Lightbulb,
  RefreshCw,
  Trash2
} from 'lucide-react';

interface ProjectMemory {
  id: string;
  framework: string;
  stack: string[];
  patterns: string[];
  preferences: Record<string, any>;
  promptHistory: string[];
  learnings: string[];
  lastUpdated: string;
}

interface ProjectContextMemoryProps {
  projectId: string;
  onMemoryUpdate: (memory: ProjectMemory) => void;
}

export function ProjectContextMemory({ projectId, onMemoryUpdate }: ProjectContextMemoryProps) {
  const [memory, setMemory] = useState<ProjectMemory>({
    id: projectId,
    framework: 'nextjs',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    patterns: ['Component-based architecture', 'Responsive design', 'Modern CSS'],
    preferences: {
      styling: 'tailwind',
      typescript: true,
      darkMode: true,
      animations: true
    },
    promptHistory: [
      'Create a modern landing page',
      'Add authentication system',
      'Implement dark mode toggle',
      'Add responsive navigation'
    ],
    learnings: [
      'User prefers gradient backgrounds',
      'Consistent use of Tailwind utility classes',
      'Focus on mobile-first design',
      'Emphasis on accessibility features'
    ],
    lastUpdated: new Date().toISOString()
  });

  const [isLearning, setIsLearning] = useState(false);

  const analyzePatterns = async () => {
    setIsLearning(true);
    
    // Simulate AI pattern analysis
    setTimeout(() => {
      const newLearnings = [
        'User frequently requests modern UI components',
        'Preference for blue and teal color schemes',
        'Consistent use of card-based layouts',
        'Focus on user experience and animations'
      ];
      
      setMemory(prev => ({
        ...prev,
        learnings: [...prev.learnings, ...newLearnings].slice(-10), // Keep last 10
        lastUpdated: new Date().toISOString()
      }));
      
      setIsLearning(false);
    }, 2000);
  };

  const clearMemory = () => {
    const clearedMemory: ProjectMemory = {
      ...memory,
      patterns: [],
      learnings: [],
      promptHistory: [],
      lastUpdated: new Date().toISOString()
    };
    setMemory(clearedMemory);
    onMemoryUpdate(clearedMemory);
  };

  const updateFramework = (framework: string) => {
    const updatedMemory = {
      ...memory,
      framework,
      lastUpdated: new Date().toISOString()
    };
    setMemory(updatedMemory);
    onMemoryUpdate(updatedMemory);
  };

  useEffect(() => {
    onMemoryUpdate(memory);
  }, [memory, onMemoryUpdate]);

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'nextjs': return 'bg-black text-white';
      case 'astro': return 'bg-orange-500 text-white';
      case 'svelte': return 'bg-orange-600 text-white';
      case 'remix': return 'bg-blue-600 text-white';
      case 'static': return 'bg-gray-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Project Memory
              </CardTitle>
              <CardDescription>
                AI learns from your project patterns and preferences
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={analyzePatterns}
                disabled={isLearning}
              >
                {isLearning ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Lightbulb className="h-4 w-4 mr-2" />
                )}
                Analyze
              </Button>
              <Button variant="outline" size="sm" onClick={clearMemory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Framework & Stack */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Technology Stack
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Framework:</span>
                <Badge className={getFrameworkColor(memory.framework)}>
                  {memory.framework}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {memory.stack.map((tech, index) => (
                  <Badge key={index} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Patterns */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Detected Patterns
            </h3>
            <div className="space-y-2">
              {memory.patterns.map((pattern, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>{pattern}</span>
                </div>
              ))}
              {memory.patterns.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No patterns detected yet. Continue building to help AI learn your preferences.
                </p>
              )}
            </div>
          </div>

          {/* AI Learnings */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              AI Learnings
            </h3>
            <div className="space-y-2">
              {memory.learnings.map((learning, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">{learning}</p>
                </div>
              ))}
              {memory.learnings.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  AI will learn from your interactions and remember your preferences.
                </p>
              )}
            </div>
          </div>

          {/* Recent Prompts */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <History className="h-4 w-4 mr-2" />
              Recent Prompts
            </h3>
            <div className="space-y-2">
              {memory.promptHistory.slice(-5).map((prompt, index) => (
                <div key={index} className="text-sm p-2 bg-muted rounded border">
                  {prompt}
                </div>
              ))}
              {memory.promptHistory.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No prompts recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Preferences
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(memory.preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <Badge variant={value ? "default" : "outline"}>
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(memory.lastUpdated).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}