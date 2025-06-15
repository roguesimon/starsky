"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  User, 
  Bot, 
  RotateCcw, 
  Copy, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trash2,
  Star
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  status: 'success' | 'error' | 'pending';
  summary?: string;
  isFavorite?: boolean;
}

interface ChatHistoryPanelProps {
  projectId: string;
  onRerunPrompt: (prompt: string) => void;
  onEditPrompt: (prompt: string) => void;
}

export function ChatHistoryPanel({ projectId, onRerunPrompt, onEditPrompt }: ChatHistoryPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'user',
      content: 'Create a modern landing page with hero section and pricing table',
      timestamp: '2024-01-20T10:00:00Z',
      status: 'success',
      summary: 'Landing page creation'
    },
    {
      id: '2',
      type: 'assistant',
      content: 'I\'ve created a modern landing page with a hero section featuring a gradient background, compelling headline, and call-to-action button. The pricing table includes three tiers with feature comparisons.',
      timestamp: '2024-01-20T10:00:30Z',
      status: 'success'
    },
    {
      id: '3',
      type: 'user',
      content: 'Add a contact form with validation',
      timestamp: '2024-01-20T10:15:00Z',
      status: 'success',
      summary: 'Contact form addition'
    },
    {
      id: '4',
      type: 'assistant',
      content: 'Added a contact form with email validation, required field indicators, and success/error states. The form includes name, email, subject, and message fields with proper validation.',
      timestamp: '2024-01-20T10:15:45Z',
      status: 'success'
    },
    {
      id: '5',
      type: 'user',
      content: 'Make the design more modern with gradients and shadows',
      timestamp: '2024-01-20T10:30:00Z',
      status: 'error',
      summary: 'Design modernization',
      isFavorite: true
    },
    {
      id: '6',
      type: 'assistant',
      content: 'I encountered an error while applying the gradient effects. The shadow implementation conflicted with existing styles.',
      timestamp: '2024-01-20T10:30:15Z',
      status: 'error'
    },
    {
      id: '7',
      type: 'user',
      content: 'Add dark mode toggle functionality',
      timestamp: '2024-01-20T10:45:00Z',
      status: 'pending',
      summary: 'Dark mode implementation'
    }
  ]);

  const toggleFavorite = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isFavorite: !msg.isFavorite } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-l-green-500 bg-green-50/50';
      case 'error':
        return 'border-l-red-500 bg-red-50/50';
      case 'pending':
        return 'border-l-yellow-500 bg-yellow-50/50';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const userMessages = messages.filter(msg => msg.type === 'user');
  const conversationPairs = messages.reduce((pairs, msg, index) => {
    if (msg.type === 'user') {
      const assistantResponse = messages[index + 1];
      pairs.push({
        user: msg,
        assistant: assistantResponse?.type === 'assistant' ? assistantResponse : null
      });
    }
    return pairs;
  }, [] as Array<{ user: ChatMessage; assistant: ChatMessage | null }>);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Chat History
            </CardTitle>
            <CardDescription>
              View and manage your conversation history
            </CardDescription>
          </div>
          <Badge variant="outline">
            {userMessages.length} prompts
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6">
          <div className="space-y-4 py-4">
            {conversationPairs.map((pair, index) => (
              <div key={pair.user.id} className={`border-l-4 pl-4 ${getStatusColor(pair.user.status)}`}>
                {/* User Message */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">You</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(pair.user.timestamp)}
                      </span>
                      {getStatusIcon(pair.user.status)}
                      {pair.user.isFavorite && (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(pair.user.id)}
                      >
                        <Star className={`h-4 w-4 ${pair.user.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(pair.user.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditPrompt(pair.user.content)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRerunPrompt(pair.user.content)}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(pair.user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {pair.user.summary && (
                    <Badge variant="outline" className="mb-2 text-xs">
                      {pair.user.summary}
                    </Badge>
                  )}
                  
                  <p className="text-sm bg-blue-50 p-3 rounded-lg border">
                    {pair.user.content}
                  </p>
                </div>

                {/* Assistant Response */}
                {pair.assistant && (
                  <div className="ml-4 pb-4 border-l border-gray-200 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">AI Assistant</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(pair.assistant.timestamp)}
                      </span>
                      {getStatusIcon(pair.assistant.status)}
                    </div>
                    
                    <p className="text-sm bg-green-50 p-3 rounded-lg border">
                      {pair.assistant.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
            
            {conversationPairs.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No conversation history yet
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}