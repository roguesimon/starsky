"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  History, 
  Star, 
  Search, 
  RotateCcw, 
  Copy, 
  Edit3, 
  Trash2,
  Tag,
  Clock,
  MessageSquare
} from 'lucide-react';
import { PromptHistory as PromptHistoryType } from '@/lib/types';

interface PromptHistoryProps {
  projectId: string;
  onRestorePrompt: (prompt: string) => void;
  onRerunPrompt: (prompt: string) => void;
}

export function PromptHistory({ projectId, onRestorePrompt, onRerunPrompt }: PromptHistoryProps) {
  const [history, setHistory] = useState<PromptHistoryType[]>([
    {
      id: '1',
      prompt: 'Create a modern landing page with hero section and pricing table',
      response: 'Generated a responsive landing page with hero section, features, and pricing components.',
      project_id: projectId,
      created_at: '2024-01-20T10:00:00Z',
      is_favorite: true,
      label: 'Landing Page Base',
    },
    {
      id: '2',
      prompt: 'Add a contact form with validation',
      response: 'Added contact form with email validation and success/error states.',
      project_id: projectId,
      created_at: '2024-01-20T10:15:00Z',
      is_favorite: false,
    },
    {
      id: '3',
      prompt: 'Make the design more modern with gradients and shadows',
      response: 'Updated design with modern gradients, shadows, and improved typography.',
      project_id: projectId,
      created_at: '2024-01-20T10:30:00Z',
      is_favorite: false,
    },
    {
      id: '4',
      prompt: 'Add dark mode toggle functionality',
      response: 'Implemented dark mode with toggle button and persistent theme storage.',
      project_id: projectId,
      created_at: '2024-01-20T10:45:00Z',
      is_favorite: true,
      label: 'Dark Mode',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');

  const filteredHistory = history.filter(item =>
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.label && item.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item =>
      item.id === id ? { ...item, is_favorite: !item.is_favorite } : item
    ));
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const saveLabel = (id: string) => {
    setHistory(prev => prev.map(item =>
      item.id === id ? { ...item, label: newLabel || undefined } : item
    ));
    setEditingLabel(null);
    setNewLabel('');
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 mr-2" />
              Prompt History
            </CardTitle>
            <CardDescription>
              View, restore, and manage your prompt history
            </CardDescription>
          </div>
          <Badge variant="outline">
            {history.length} prompts
          </Badge>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6">
          <div className="space-y-4 py-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(item.created_at)}
                      </span>
                      {item.label && (
                        <Badge variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {item.label}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <Star className={`h-4 w-4 ${item.is_favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingLabel(item.id);
                          setNewLabel(item.label || '');
                        }}
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPrompt(item.prompt)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHistoryItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Label Editing */}
                  {editingLabel === item.id && (
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add label..."
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button size="sm" onClick={() => saveLabel(item.id)}>
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingLabel(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">Prompt</span>
                    </div>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">
                      {item.prompt}
                    </p>
                  </div>

                  {/* Response */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Edit3 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium">Result</span>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                      {item.response}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRestorePrompt(item.prompt)}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restore
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRerunPrompt(item.prompt)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Rerun
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'No prompts match your search.' : 'No prompt history yet.'}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}