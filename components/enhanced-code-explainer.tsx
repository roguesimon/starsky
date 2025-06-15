"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  Lightbulb, 
  Code, 
  BookOpen, 
  X,
  Copy,
  ExternalLink,
  Brain,
  Zap,
  Star,
  MessageSquare
} from 'lucide-react';

interface CodeExplanation {
  id: string;
  code: string;
  explanation: string;
  concepts: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  relatedDocs?: { title: string; url: string }[];
  aiModel: string;
  confidence: number;
  suggestions: string[];
  examples: { title: string; code: string }[];
}

interface EnhancedCodeExplainerProps {
  selectedCode: string;
  onClose: () => void;
  language: string;
  aiModel?: string;
}

export function EnhancedCodeExplainer({ 
  selectedCode, 
  onClose, 
  language,
  aiModel = 'gpt-4o'
}: EnhancedCodeExplainerProps) {
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModel);

  const availableModels = [
    { id: 'gpt-4o', name: 'GPT-4o', icon: '🔍', specialty: 'Code Analysis' },
    { id: 'claude-3', name: 'Claude 3', icon: '🧠', specialty: 'Detailed Explanations' },
    { id: 'gemini-1.5', name: 'Gemini 1.5', icon: '📦', specialty: 'Technical Concepts' }
  ];

  const generateExplanation = async (model: string) => {
    setIsLoading(true);
    
    // Simulate AI explanation generation with different models
    setTimeout(() => {
      const mockExplanation: CodeExplanation = {
        id: '1',
        code: selectedCode,
        explanation: generateMockExplanation(selectedCode, language, model),
        concepts: extractConcepts(selectedCode, language),
        difficulty: getDifficulty(selectedCode),
        relatedDocs: getRelatedDocs(language),
        aiModel: model,
        confidence: Math.random() * 0.3 + 0.7, // 70-100%
        suggestions: generateSuggestions(selectedCode, model),
        examples: generateExamples(selectedCode, language)
      };
      
      setExplanation(mockExplanation);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockExplanation = (code: string, lang: string, model: string): string => {
    const baseExplanation = getBaseExplanation(code, lang);
    
    switch (model) {
      case 'gpt-4o':
        return `**GPT-4o Analysis:**\n\n${baseExplanation}\n\nThis code follows modern ${lang} best practices and demonstrates clean architecture principles. The implementation is efficient and maintainable.`;
      
      case 'claude-3':
        return `**Claude 3 Deep Dive:**\n\n${baseExplanation}\n\nFrom a software engineering perspective, this code exemplifies good design patterns. The structure promotes readability and follows the principle of least surprise. Consider the broader implications of this pattern in your application architecture.`;
      
      case 'gemini-1.5':
        return `**Gemini 1.5 Technical Analysis:**\n\n${baseExplanation}\n\nThis implementation leverages ${lang}'s core features effectively. The code is optimized for performance and follows industry standards. Integration with modern development workflows is seamless.`;
      
      default:
        return baseExplanation;
    }
  };

  const getBaseExplanation = (code: string, lang: string): string => {
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

  const generateSuggestions = (code: string, model: string): string[] => {
    const baseSuggestions = [
      'Consider adding error handling',
      'Implement loading states',
      'Add accessibility features',
      'Optimize for mobile devices'
    ];

    const modelSpecificSuggestions: Record<string, string[]> = {
      'gpt-4o': ['Add TypeScript types', 'Implement unit tests', 'Consider code splitting'],
      'claude-3': ['Review business logic', 'Ensure ethical compliance', 'Improve user messaging'],
      'gemini-1.5': ['Add performance monitoring', 'Implement caching', 'Consider scalability']
    };

    return [...baseSuggestions, ...(modelSpecificSuggestions[model] || [])];
  };

  const generateExamples = (code: string, lang: string) => {
    if (code.includes('useState')) {
      return [
        {
          title: 'Basic Counter Example',
          code: `const [count, setCount] = useState(0);

return (
  <div>
    <p>Count: {count}</p>
    <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
  </div>
);`
        },
        {
          title: 'Form Input Example',
          code: `const [name, setName] = useState('');

return (
  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter your name"
  />
);`
        }
      ];
    }

    return [
      {
        title: 'Basic Example',
        code: `// Example usage of this pattern
console.log('Hello, World!');`
      }
    ];
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
      generateExplanation(selectedModel);
    }
  }, [selectedCode, selectedModel]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Enhanced Code Explanation
            </CardTitle>
            <CardDescription>
              Multi-model AI analysis of your selected code
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            >
              {availableModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.icon} {model.name} - {model.specialty}
                </option>
              ))}
            </select>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="explanation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explanation" className="space-y-6">
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
                <p className="text-sm text-muted-foreground">
                  {selectedModel === 'gpt-4o' && 'GPT-4o is analyzing your code...'}
                  {selectedModel === 'claude-3' && 'Claude 3 is providing detailed explanations...'}
                  {selectedModel === 'gemini-1.5' && 'Gemini 1.5 is examining technical concepts...'}
                </p>
              </div>
            ) : explanation ? (
              <>
                {/* AI Model Info */}
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Analyzed by {availableModels.find(m => m.id === explanation.aiModel)?.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(explanation.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(explanation.difficulty)}
                  >
                    {explanation.difficulty}
                  </Badge>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Explanation
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="prose prose-sm max-w-none">
                      {explanation.explanation.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    AI Suggestions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {explanation.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-green-800">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </TabsContent>
          
          <TabsContent value="concepts" className="space-y-4">
            {explanation && (
              <>
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    Key Concepts
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {explanation.concepts.map((concept, index) => (
                      <Badge key={index} variant="secondary" className="justify-center p-2">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Concept Explanations</h3>
                  <div className="space-y-3">
                    {explanation.concepts.slice(0, 3).map((concept, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">{concept}</h4>
                        <p className="text-xs text-muted-foreground">
                          {concept === 'React Hooks' && 'Functions that let you use state and other React features in functional components.'}
                          {concept === 'State Management' && 'The practice of managing and updating component data over time.'}
                          {concept === 'Functions' && 'Reusable blocks of code that perform specific tasks and can accept parameters.'}
                          {concept === 'TypeScript Types' && 'Static type definitions that help catch errors at compile time.'}
                          {concept === 'Async/Await' && 'Modern JavaScript syntax for handling asynchronous operations.'}
                          {!['React Hooks', 'State Management', 'Functions', 'TypeScript Types', 'Async/Await'].includes(concept) && 
                           'A fundamental programming concept used in modern web development.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-4">
            {explanation && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-3">Related Examples</h3>
                {explanation.examples.map((example, index) => (
                  <div key={index} className="border rounded-lg">
                    <div className="p-3 border-b bg-muted/50">
                      <h4 className="font-medium text-sm">{example.title}</h4>
                    </div>
                    <pre className="bg-muted p-4 text-xs overflow-auto max-h-60">
                      <code>{example.code}</code>
                    </pre>
                    <div className="p-3 border-t flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(example.code)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Example
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            {explanation && (
              <>
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Related Documentation
                  </h3>
                  <div className="space-y-2">
                    {explanation.relatedDocs?.map((doc, index) => (
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

                <div>
                  <h3 className="text-sm font-medium mb-3">Learning Resources</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3 w-full"
                      onClick={() => window.open(`https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(language)}`, '_blank')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      MDN Web Docs
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3 w-full"
                      onClick={() => window.open(`https://www.w3schools.com/${language.toLowerCase()}`, '_blank')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      W3Schools Tutorials
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3 w-full"
                      onClick={() => window.open(`https://stackoverflow.com/questions/tagged/${language.toLowerCase()}`, '_blank')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Stack Overflow
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t mt-6">
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Save Explanation
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask Follow-up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}