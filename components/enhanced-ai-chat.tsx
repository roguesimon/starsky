"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Send, 
  Bot, 
  User, 
  Settings, 
  Zap, 
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Brain,
  Sparkles
} from 'lucide-react';
import { AIModelSelector } from './ai-model-selector';
import { EnhancedPromptAutocomplete } from './enhanced-prompt-autocomplete';
import { aiOrchestrator, AIRequest } from '@/lib/ai-orchestrator';
import { AI_MODELS, classifyPrompt } from '@/lib/ai-models';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  promptType?: string;
  duration?: number;
  tokensUsed?: number;
  cost?: number;
  confidence?: number;
  suggestions?: string[];
  isStreaming?: boolean;
}

interface EnhancedAIChatProps {
  projectId: string;
  userTier: 'free' | 'pro' | 'enterprise';
  onCodeGenerated?: (code: string) => void;
}

export function EnhancedAIChat({ projectId, userTier, onCodeGenerated }: EnhancedAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI development assistant with access to multiple specialized models. I can help you build, debug, optimize, and deploy your applications. What would you like to create today?',
      timestamp: new Date().toISOString(),
      modelUsed: 'gpt-4o'
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [autoSelectModel, setAutoSelectModel] = useState(true);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);

    // Determine the prompt type for model selection
    const promptType = classifyPrompt(currentMessage);
    
    // Create a placeholder for streaming
    if (isStreaming) {
      const streamingId = (Date.now() + 1).toString();
      setStreamingMessageId(streamingId);
      setStreamingMessage('');
      
      const streamingPlaceholder: ChatMessage = {
        id: streamingId,
        type: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        modelUsed: autoSelectModel ? getOptimalModelId(promptType) : selectedModel,
        isStreaming: true
      };
      
      setMessages(prev => [...prev, streamingPlaceholder]);
    }

    try {
      const request: AIRequest = {
        prompt: currentMessage,
        projectId,
        userTier,
        preferredModel: autoSelectModel ? undefined : selectedModel,
        streaming: true,
        fallbackModels: ['gpt-4o', 'claude-3', 'gemini-1.5', 'mistral-8x'],
        maxRetries: 2,
        timeout: 30000
      };

      // Simulate streaming
      if (isStreaming) {
        const model = autoSelectModel ? getOptimalModelId(promptType) : selectedModel;
        const fullResponse = generateMockResponse(model, currentMessage);
        const words = fullResponse.split(' ');
        
        for (let i = 0; i < words.length; i++) {
          if (i > 0) await new Promise(r => setTimeout(r, 50));
          setStreamingMessage(prev => prev + ' ' + words[i]);
        }
      }

      const { response, jobLog } = await aiOrchestrator.processRequest(request);

      // Clear streaming state
      setStreamingMessageId(null);
      setStreamingMessage('');

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        modelUsed: response.model,
        promptType: jobLog.promptType,
        duration: jobLog.duration,
        tokensUsed: jobLog.tokensUsed,
        cost: jobLog.cost,
        confidence: response.metadata?.confidence,
        suggestions: response.metadata?.suggestions
      };

      // If streaming, replace the placeholder
      if (isStreaming) {
        setMessages(prev => prev.map(msg => 
          msg.isStreaming ? assistantMessage : msg
        ));
      } else {
        setMessages(prev => [...prev, assistantMessage]);
      }

      // If the response contains code, trigger the callback
      if (response.content.includes('```') || response.content.includes('<') || response.content.includes('function')) {
        onCodeGenerated?.(response.content);
      }

      toast.success(`${getModelInfo(response.model).name} responded`, {
        description: `Processed with ${jobLog.promptType} model in ${(jobLog.duration / 1000).toFixed(1)}s`
      });

    } catch (error) {
      // Clear streaming state
      setStreamingMessageId(null);
      setStreamingMessage('');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date().toISOString(),
        modelUsed: 'error'
      };

      // If streaming, replace the placeholder
      if (isStreaming) {
        setMessages(prev => prev.map(msg => 
          msg.isStreaming ? errorMessage : msg
        ));
      } else {
        setMessages(prev => [...prev, errorMessage]);
      }
      
      toast.error('Error processing request', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const regenerateResponse = async (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1 || messageIndex === 0) return;

    const userMessage = messages[messageIndex - 1];
    if (userMessage.type !== 'user') return;

    // Remove the assistant message and regenerate
    setMessages(prev => prev.slice(0, messageIndex));
    setCurrentMessage(userMessage.content);
    await handleSendMessage();
  };

  const getModelInfo = (modelId: string) => {
    return AI_MODELS.find(m => m.id === modelId) || {
      name: modelId,
      icon: '🤖',
      color: 'text-gray-600'
    };
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatCost = (cost: number) => {
    if (cost < 0.001) return `$${(cost * 1000).toFixed(3)}k`;
    return `$${cost.toFixed(4)}`;
  };

  const getOptimalModelId = (promptType: string): string => {
    switch (promptType) {
      case 'debugging':
      case 'optimization':
      case 'performance':
        return 'command-r-plus';
      case 'reasoning':
      case 'business-logic':
      case 'ethics':
        return 'claude-3';
      case 'apis':
      case 'backend':
      case 'database':
        return 'gemini-1.5';
      case 'completion':
      case 'suggestion':
        return 'mistral-8x';
      default:
        return 'gpt-4o';
    }
  };

  const generateMockResponse = (modelId: string, prompt: string): string => {
    const promptLower = prompt.toLowerCase();

    switch (modelId) {
      case 'gpt-4o':
        if (promptLower.includes('component')) {
          return `I'll create a modern component for you based on your request.

\`\`\`jsx
import React from 'react';

export function GeneratedComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Generated Component</h2>
      <p className="text-gray-600">
        This component was generated based on your prompt: "${prompt}"
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
}
\`\`\`

This component includes responsive design, proper semantic HTML, and follows React best practices. You can customize the styling and content as needed.`;
        }
        return `As your Core Developer & Architect, I've analyzed your request: "${prompt}" and generated a comprehensive solution with proper architecture and component structure.

Let me walk you through the implementation:

1. First, I've created a modular component structure
2. Added responsive design with Tailwind CSS
3. Implemented proper state management
4. Ensured accessibility compliance

Would you like me to explain any specific part in more detail?`;

      case 'claude-3':
        return `I've carefully considered your request: "${prompt}". 

From a business logic perspective, this approach makes sense because it aligns with user needs and follows best practices. I've also verified that the implementation is ethical and follows privacy guidelines.

Here are my recommendations for improving the user experience and ensuring the solution is both effective and responsible:

1. Consider the user journey more holistically
2. Add clear error states and recovery paths
3. Ensure data handling follows privacy best practices
4. Implement progressive enhancement for better accessibility

Would you like me to elaborate on any of these points?`;

      case 'gemini-1.5':
        if (promptLower.includes('api') || promptLower.includes('database')) {
          return `I'll help you implement the API integration you requested. Here's a solution optimized for cloud deployment:

\`\`\`typescript
// API Integration with proper error handling and caching
export async function handleApiIntegration() {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: "${prompt}" })
    });
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Cache the response for 5 minutes
    localStorage.setItem('api_cache', JSON.stringify({
      data,
      timestamp: Date.now() + 5 * 60 * 1000
    }));
    
    return data;
  } catch (error) {
    console.error('API Integration Error:', error);
    // Fallback to cached data if available
    const cached = localStorage.getItem('api_cache');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (timestamp > Date.now()) {
        return data;
      }
    }
    throw error;
  }
}
\`\`\`

This implementation includes:
- Proper error handling
- Response caching with expiration
- Fallback to cached data on failure
- Type safety with TypeScript`;
        }
        return `As your Data Integration & Cloud Expert, I've optimized your request for cloud deployment and API efficiency.

Here's what I've implemented:

1. Serverless function architecture for scalability
2. Efficient database queries with proper indexing
3. API rate limiting and caching for performance
4. Secure authentication flow with JWT

This approach ensures your application will scale efficiently while maintaining data integrity and security.`;

      case 'command-r-plus':
        return `🛠️ Command R+ Analysis - Debugger & Optimizer

I've identified several optimization opportunities in your request: "${prompt}"

**Performance Improvements:**
- Reduced bundle size by 23% by removing unused dependencies
- Optimized rendering with React.memo and useMemo hooks
- Implemented lazy loading for better initial load time
- Added proper code splitting for route-based chunking

**Security Enhancements:**
- Added input validation to prevent injection attacks
- Implemented CSRF protection with secure tokens
- Sanitized user inputs to prevent XSS vulnerabilities
- Added proper Content Security Policy headers

**Code Quality:**
- Refactored for better maintainability using the repository pattern
- Added TypeScript strict mode for better type safety
- Improved error handling with custom error boundaries
- Implemented comprehensive logging for better debugging

The optimized solution is ready for production deployment with significantly improved performance metrics.`;

      case 'mistral-8x':
        return `Quick response from Mistral 8x:

Here's a fast, efficient solution for: "${prompt}"

\`\`\`javascript
// Lightweight, optimized code
const solution = {
  fast: true,
  efficient: true,
  privacyFirst: true
};

// Implementation
function quickSolution() {
  // Your solution here
  return "Implemented!";
}
\`\`\`

This solution prioritizes speed and privacy while maintaining functionality. Let me know if you need any adjustments!`;

      default:
        return `Response generated for: "${prompt}"`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Multi-Model AI Assistant
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Orchestrator
                </Badge>
                {autoSelectModel ? (
                  <Badge variant="outline" className="text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Auto-Select: {classifyPrompt(currentMessage)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {getModelInfo(selectedModel).icon} {getModelInfo(selectedModel).name}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowModelSelector(!showModelSelector)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Model Selector */}
        {showModelSelector && (
          <div className="px-6 pb-4">
            <AIModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              userTier={userTier}
              currentPrompt={currentMessage}
              autoSelect={autoSelectModel}
              onAutoSelectChange={setAutoSelectModel}
            />
          </div>
        )}

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              {messages.map((message) => {
                const model = message.modelUsed ? getModelInfo(message.modelUsed) : null;
                
                // For streaming messages, show the current streaming content
                const displayContent = message.id === streamingMessageId 
                  ? streamingMessage 
                  : message.content;
                
                return (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      {/* Message Header */}
                      <div className={`flex items-center space-x-2 mb-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.type === 'assistant' && model && (
                          <>
                            <span className="text-lg">{model.icon}</span>
                            <span className="text-sm font-medium">{model.name}</span>
                            {message.promptType && (
                              <Badge variant="outline" className="text-xs">
                                {message.promptType}
                              </Badge>
                            )}
                            {message.isStreaming && (
                              <Badge variant="secondary" className="text-xs animate-pulse">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Generating...
                              </Badge>
                            )}
                          </>
                        )}
                        {message.type === 'user' && (
                          <>
                            <span className="text-sm font-medium">You</span>
                            <User className="h-4 w-4" />
                          </>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className={`p-4 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm">
                          {displayContent}
                          {message.isStreaming && (
                            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
                          )}
                        </div>

                        {/* Message Metadata */}
                        {message.type === 'assistant' && !message.isStreaming && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-3">
                                {message.duration && (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatDuration(message.duration)}</span>
                                  </div>
                                )}
                                {message.tokensUsed && (
                                  <div className="flex items-center space-x-1">
                                    <Zap className="h-3 w-3" />
                                    <span>{message.tokensUsed} tokens</span>
                                  </div>
                                )}
                                {message.cost && (
                                  <span>{formatCost(message.cost)}</span>
                                )}
                                {message.confidence && (
                                  <div className="flex items-center space-x-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>{(message.confidence * 100).toFixed(0)}%</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(message.content)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => regenerateResponse(message.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <RotateCw className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => toast.success('Feedback recorded', { description: 'Thank you for your feedback' })}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => toast.success('Feedback recorded', { description: 'Thank you for your feedback' })}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* AI Suggestions */}
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-medium mb-1">Suggestions:</p>
                                <div className="flex flex-wrap gap-1">
                                  {message.suggestions.slice(0, 3).map((suggestion, index) => (
                                    <Badge 
                                      key={index} 
                                      variant="outline" 
                                      className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                      onClick={() => setCurrentMessage(suggestion)}
                                    >
                                      {suggestion}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Processing Indicator */}
              {isProcessing && !isStreaming && (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm font-medium">AI is thinking...</span>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 border-t">
            <EnhancedPromptAutocomplete
              value={currentMessage}
              onChange={setCurrentMessage}
              onSuggestionSelect={setCurrentMessage}
              framework={framework}
              projectContext={projectMemory?.framework || ''}
              aiModel={selectedModel}
            />
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    id="streaming"
                    checked={isStreaming}
                    onChange={(e) => setIsStreaming(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="streaming" className="text-xs text-muted-foreground">
                    Streaming
                  </label>
                </div>
                
                <div className="h-4 border-r border-muted-foreground/30"></div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setCurrentMessage('Create a modern landing page')}
                  >
                    Landing Page
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setCurrentMessage('Debug this code and fix any errors')}
                  >
                    Debug
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isProcessing}
                size="sm"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}