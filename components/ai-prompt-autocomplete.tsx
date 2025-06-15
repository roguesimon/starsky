"use client";

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight, Zap, Code, Palette, Database } from 'lucide-react';

interface PromptSuggestion {
  id: string;
  text: string;
  category: 'ui' | 'functionality' | 'styling' | 'integration';
  description: string;
  icon: React.ComponentType<any>;
}

interface AIPromptAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  framework: string;
}

export function AIPromptAutocomplete({ value, onChange, onSuggestionSelect, framework }: AIPromptAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      text: 'Style with modern gradients and glassmorphism effects',
      category: 'styling',
      description: 'Applies contemporary design trends',
      icon: Palette
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
      'Create dynamic routes with [slug] pages'
    ],
    'astro': [
      'Add Astro components with islands architecture',
      'Implement static site generation',
      'Add content collections for blog posts',
      'Integrate with headless CMS'
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

      setSuggestions([...filtered, ...additionalSuggestions].slice(0, 6));
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, framework]);

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
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ui': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'functionality': return 'bg-green-100 text-green-800 border-green-200';
      case 'styling': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'integration': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to build... (Ctrl+Enter to use suggestion)"
        className="w-full min-h-[120px] p-4 border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto shadow-lg border">
          <div className="p-2">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">AI Suggestions</span>
              <Badge variant="outline" className="text-xs">
                {suggestions.length}
              </Badge>
            </div>
            
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={suggestion.id}
                  variant={index === selectedIndex ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left h-auto p-3 ${
                    index === selectedIndex ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                  onClick={() => {
                    onSuggestionSelect(suggestion.text);
                    setShowSuggestions(false);
                  }}
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
                          {suggestion.category}
                        </Badge>
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
                Use ↑↓ to navigate, Ctrl+Enter to select, Esc to close
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}