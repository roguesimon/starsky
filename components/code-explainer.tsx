"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Lightbulb, 
  Code, 
  BookOpen, 
  X,
  Copy,
  ExternalLink
} from 'lucide-react';

interface CodeExplanation {
  id: string;
  code: string;
  explanation: string;
  concepts: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  relatedDocs?: { title: string; url: string }[];
}

interface CodeExplainerProps {
  selectedCode: string;
  onClose: () => void;
  language: string;
}

export function CodeExplainer({ selectedCode, onClose, language }: CodeExplainerProps) {
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateExplanation = async () => {
    setIsLoading(true);
    
    // Simulate AI explanation generation
    setTimeout(() => {
      const mockExplanation: CodeExplanation = {
        id: '1',
        code: selectedCode,
        explanation: generateMockExplanation(selectedCode, language),
        concepts: extractConcepts(selectedCode, language),
        difficulty: getDifficulty(selectedCode),
        relatedDocs: getRelatedDocs(language)
      };
      
      setExplanation(mockExplanation);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockExplanation = (code: string, lang: string): string => {
    if (code.includes('useState')) {
      return `This code uses React's useState hook to manage component state. The useState hook returns an array with two elements: the current state value and a function to update it. When the state is updated, React will re-render the component with the new value.

The syntax \`const [state, setState] = useState(initialValue)\` uses array destructuring to assign the returned values to variables. This is a common pattern in React for managing local component state.`;
    }
    
    if (code.includes('function') || code.includes('=>')) {
      return `This is a ${lang === 'typescript' ? 'TypeScript' : 'JavaScript'} function definition. Functions are reusable blocks of code that perform specific tasks. ${code.includes('=>') ? 'This uses arrow function syntax, which is a more concise way to write functions introduced in ES6.' : 'This uses the traditional function declaration syntax.'}

Functions can accept parameters (inputs) and return values (outputs). They help organize code into logical, reusable units and are fundamental building blocks of any application.`;
    }
    
    if (code.includes('className')) {
      return `This code uses the \`className\` attribute to apply CSS classes to HTML elements. In React, we use \`className\` instead of \`class\` because \`class\` is a reserved keyword in JavaScript.

The classes being applied likely come from a CSS framework like Tailwind CSS, which provides utility classes for styling. This approach allows for rapid styling without writing custom CSS.`;
    }
    
    return `This ${language} code snippet demonstrates common programming patterns and best practices. The code structure follows modern development conventions and uses standard syntax for the ${language} language.

Understanding this code requires familiarity with ${language} fundamentals including variables, functions, and control structures. The implementation shows how different language features work together to create functional applications.`;
  };

  const extractConcepts = (code: string, lang: string): string[] => {
    const concepts = [];
    
    if (code.includes('useState')) concepts.push('React Hooks', 'State Management');
    if (code.includes('useEffect')) concepts.push('Side Effects', 'Component Lifecycle');
    if (code.includes('function') || code.includes('=>')) concepts.push('Functions', 'ES6 Arrow Functions');
    if (code.includes('const') || code.includes('let')) concepts.push('Variable Declaration', 'Block Scope');
    if (code.includes('className')) concepts.push('JSX', 'CSS Classes');
    if (code.includes('interface') || code.includes('type')) concepts.push('TypeScript Types', 'Type Safety');
    if (code.includes('async') || code.includes('await')) concepts.push('Async/Await', 'Promises');
    if (code.includes('map') || code.includes('filter')) concepts.push('Array Methods', 'Functional Programming');
    
    return concepts.length > 0 ? concepts : ['Basic Syntax', 'Programming Fundamentals'];
  };

  const getDifficulty = (code: string): 'Beginner' | 'Intermediate' | 'Advanced' => {
    let complexity = 0;
    
    if (code.includes('useState') || code.includes('useEffect')) complexity += 2;
    if (code.includes('async') || code.includes('await')) complexity += 2;
    if (code.includes('interface') || code.includes('type')) complexity += 1;
    if (code.includes('map') || code.includes('filter')) complexity += 1;
    if (code.includes('Promise') || code.includes('callback')) complexity += 2;
    
    if (complexity >= 4) return 'Advanced';
    if (complexity >= 2) return 'Intermediate';
    return 'Beginner';
  };

  const getRelatedDocs = (lang: string) => {
    const docs = {
      typescript: [
        { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
        { title: 'React TypeScript Guide', url: 'https://react.dev/learn/typescript' }
      ],
      javascript: [
        { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
        { title: 'React Documentation', url: 'https://react.dev/' }
      ],
      css: [
        { title: 'MDN CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' }
      ]
    };
    
    return docs[lang as keyof typeof docs] || docs.javascript;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  React.useEffect(() => {
    if (selectedCode) {
      generateExplanation();
    }
  }, [selectedCode]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Code Explanation
            </CardTitle>
            <CardDescription>
              AI-powered explanation of your selected code
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Selected Code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Selected Code</h3>
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(selectedCode)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto border">
            <code>{selectedCode}</code>
          </pre>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Analyzing code...</p>
          </div>
        ) : explanation ? (
          <>
            {/* Explanation */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Explanation
                </h3>
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(explanation.difficulty)}
                >
                  {explanation.difficulty}
                </Badge>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {explanation.explanation}
                </p>
              </div>
            </div>

            {/* Concepts */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Code className="h-4 w-4 mr-2" />
                Key Concepts
              </h3>
              <div className="flex flex-wrap gap-2">
                {explanation.concepts.map((concept, index) => (
                  <Badge key={index} variant="secondary">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Related Documentation */}
            {explanation.relatedDocs && explanation.relatedDocs.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Related Documentation
                </h3>
                <div className="space-y-2">
                  {explanation.relatedDocs.map((doc, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3 w-full"
                      onClick={() => window.open(doc.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {doc.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Lightbulb className="h-4 w-4 mr-2" />
                Explain More
              </Button>
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                Show Examples
              </Button>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}