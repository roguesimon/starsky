"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
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
  RotateCcw
} from 'lucide-react';
import { AIModelSelector } from './ai-model-selector';
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

    try {
      const request: AIRequest = {
        prompt: currentMessage,
        projectId,
        userTier,
        preferredModel: autoSelectModel ? undefined : selectedModel,
        streaming: true
      };

      const { response, jobLog } = await aiOrchestrator.processRequest(request);

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

      setMessages(prev => [...prev, assistantMessage]);

      // If the response contains code, trigger the callback
      if (response.content.includes('```') || response.content.includes('<') || response.content.includes('function')) {
        onCodeGenerated?.(response.content);
      }

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date().toISOString(),
        modelUsed: 'error'
      };

      setMessages(prev => [...prev, errorMessage]);
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

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Development Assistant
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  Multi-Model AI
                </Badge>
                {autoSelectModel ? (
                  <Badge variant="outline" className="text-xs">
                    Auto-Select: {classifyPrompt(currentMessage)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {getModelInfo(selectedModel).name}
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
                          {message.content}
                        </div>

                        {/* Message Metadata */}
                        {message.type === 'assistant' && (
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
                                  <RotateCcw className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
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
                                    <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
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
              {isProcessing && (
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
            <div className="flex space-x-2">
              <Textarea
                ref={textareaRef}
                placeholder="Describe what you want to build, debug, or optimize..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                disabled={isProcessing}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isProcessing}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage('Create a modern landing page with hero section')}
                disabled={isProcessing}
              >
                Landing Page
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage('Debug this code and fix any errors')}
                disabled={isProcessing}
              >
                Debug Code
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage('Optimize performance and reduce bundle size')}
                disabled={isProcessing}
              >
                Optimize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage('Add API integration with error handling')}
                disabled={isProcessing}
              >
                Add API
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}