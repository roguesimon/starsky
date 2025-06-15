"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  ArrowRight, 
  Zap, 
  Code, 
  Palette, 
  Database,
  Sparkles,
  Brain,
  Wand2
} from 'lucide-react';

interface PromptSuggestion {
  id: string;
  text: string;
  category: 'ui' | 'functionality' | 'styling' | 'integration' | 'optimization' | 'ai-generated';
  description: string;
  icon: React.ComponentType<any>;
  confidence?: number;
  aiGenerated?: boolean;
}

interface EnhancedPromptAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  framework: string;
  projectContext?: string;
  aiModel?: string;
}

export function EnhancedPromptAutocomplete({ 
  value, 
  onChange, 
  onSuggestionSelect, 
  framework,
  projectContext = '',
  aiModel = 'gpt-4o'
}: EnhancedPromptAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<PromptSuggestion[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const baseSuggestions: PromptSuggestion[] = [
    {
      id: '1',
      text: 'Add a responsive navigation bar with logo and menu items',
      category: 'ui',
      description: 'Creates a modern navigation component',
      icon: Code
    },
    {
      id: '2',
      text: 'Create a hero section with gradient background and call-to-action',
      category: 'ui',
      description: 'Builds an engaging landing page hero',
      icon: Palette
    },
    {
      id: '3',
      text: 'Add user authentication with login and signup forms',
      category: 'functionality',
      description: 'Implements user auth system',
      icon: Database
    },
    {
      id: '4',
      text: 'Implement dark mode toggle with theme persistence',
      category: 'functionality',
      description: 'Adds theme switching capability',
      icon: Zap
    },
    {
      id: '5',
      text: 'Create a dashboard with charts and analytics',
      category: 'ui',
      description: 'Builds data visualization interface',
      icon: Code
    },
    {
      id: '6',
      text: 'Add Stripe payment integration with checkout flow',
      category: 'integration',
      description: 'Integrates payment processing',
      icon: Database
    },
    {
      id: '7',
      text: 'Optimize performance and reduce bundle size',
      category: 'optimization',
      description: 'Improves app performance',
      icon: Zap
    },
    {
      id: '8',
      text: 'Add responsive grid layout for product cards',
      category: 'ui',
      description: 'Creates flexible product display',
      icon: Code
    }
  ];

  const frameworkSpecificSuggestions = {
    'nextjs': [
      'Add API routes for backend functionality',
      'Implement server-side rendering for SEO',
      'Add middleware for authentication',
      'Create dynamic routes with [slug] pages',
      'Add Image optimization with next/image',
      'Implement incremental static regeneration'
    ],
    'astro': [
      'Add Astro components with islands architecture',
      'Implement static site generation',
      'Add content collections for blog posts',
      'Integrate with headless CMS',
      'Add partial hydration for components'
    ],
    'svelte': [
      'Create Svelte stores for state management',
      'Add SvelteKit routing and layouts',
      'Implement reactive animations',
      'Add Svelte transitions and effects'
    ],
    'remix': [
      'Add Remix loaders for data fetching',
      'Implement nested routing',
      'Add form actions and mutations',
      'Create error boundaries'
    ]
  };

  // Generate AI-powered suggestions based on current input
  const generateAISuggestions = useCallback(async (input: string) => {
    if (input.length < 10) return;
    
    setIsGeneratingAI(true);
    
    try {
      // Simulate AI suggestion generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const contextualSuggestions: PromptSuggestion[] = [
        {
          id: 'ai-1',
          text: `Enhance "${input}" with modern animations and micro-interactions`,
          category: 'ai-generated',
          description: `AI-suggested improvement based on your prompt`,
          icon: Sparkles,
          confidence: 0.92,
          aiGenerated: true
        },
        {
          id: 'ai-2',
          text: `Add accessibility features to "${input.substring(0, 30)}..."`,
          category: 'ai-generated',
          description: 'AI-suggested accessibility improvements',
          icon: Brain,
          confidence: 0.87,
          aiGenerated: true
        },
        {
          id: 'ai-3',
          text: `Optimize "${input.substring(0, 30)}..." for mobile devices`,
          category: 'ai-generated',
          description: 'AI-suggested mobile optimization',
          icon: Wand2,
          confidence: 0.84,
          aiGenerated: true
        }
      ];
      
      setAiSuggestions(contextualSuggestions);
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  }, []);

  // Debounced AI suggestion generation
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (value.length > 10) {
        generateAISuggestions(value);
      } else {
        setAiSuggestions([]);
      }
    }, 1000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value, generateAISuggestions]);

  useEffect(() => {
    if (value.length > 2) {
      const filtered = baseSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(value.toLowerCase())
      );

      // Add framework-specific suggestions
      const frameworkSuggestions = frameworkSpecificSuggestions[framework as keyof typeof frameworkSpecificSuggestions] || [];
      const additionalSuggestions = frameworkSuggestions
        .filter(text => text.toLowerCase().includes(value.toLowerCase()))
        .map((text, index) => ({
          id: `fw-${index}`,
          text,
          category: 'functionality' as const,
          description: `${framework} specific feature`,
          icon: Zap
        }));

      // Combine all suggestions
      const allSuggestions = [...filtered, ...additionalSuggestions, ...aiSuggestions].slice(0, 8);
      setSuggestions(allSuggestions);
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, framework, aiSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          if (suggestions[selectedIndex]) {
            onSuggestionSelect(suggestions[selectedIndex].text);
            setShowSuggestions(false);
          }
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      case 'Tab':
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          onSuggestionSelect(suggestions[selectedIndex].text);
          setShowSuggestions(false);
        }
        break;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ui': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'functionality': return 'bg-green-100 text-green-800 border-green-200';
      case 'styling': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'integration': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'optimization': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ai-generated': return 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSuggestionClick = (suggestion: PromptSuggestion) => {
    onSuggestionSelect(suggestion.text);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to build... (AI will suggest improvements as you type)"
        className="w-full min-h-[120px] p-4 border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto shadow-lg border">
          <div className="p-2">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">
                Smart Suggestions
              </span>
              <Badge variant="outline" className="text-xs">
                {suggestions.length}
              </Badge>
              {isGeneratingAI && (
                <Badge variant="secondary" className="text-xs animate-pulse">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Thinking...
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={suggestion.id}
                  variant={index === selectedIndex ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left h-auto p-3 ${
                    index === selectedIndex ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <suggestion.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium truncate">
                          {suggestion.text}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(suggestion.category)}`}
                        >
                          {suggestion.aiGenerated ? (
                            <div className="flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              AI
                            </div>
                          ) : (
                            suggestion.category
                          )}
                        </Badge>
                        {suggestion.confidence && (
                          <Badge variant="outline" className="text-xs">
                            {Math.round(suggestion.confidence * 100)}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="mt-3 pt-2 border-t">
              <p className="text-xs text-muted-foreground text-center">
                Use ↑↓ to navigate • Tab or Ctrl+Enter to select • Esc to close
              </p>
              {aiModel && (
                <p className="text-xs text-muted-foreground text-center mt-1">
                  AI suggestions powered by {aiModel}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}