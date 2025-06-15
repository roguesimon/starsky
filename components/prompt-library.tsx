"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Star, 
  Tag, 
  Copy, 
  Edit3, 
  Trash2,
  MessageSquare,
  Plus,
  Filter,
  SortAsc,
  BookOpen
} from 'lucide-react';

interface SavedPrompt {
  id: string;
  text: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  usageCount: number;
  aiModel?: string;
  notes?: string;
}

interface PromptLibraryProps {
  onSelectPrompt: (prompt: string) => void;
  onSavePrompt?: (prompt: string, category: string, tags: string[]) => void;
}

export function PromptLibrary({ onSelectPrompt, onSavePrompt }: PromptLibraryProps) {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([
    {
      id: '1',
      text: 'Create a modern landing page with hero section and pricing table',
      category: 'UI',
      tags: ['landing', 'hero', 'pricing'],
      isFavorite: true,
      createdAt: '2024-01-20T10:00:00Z',
      usageCount: 12,
      aiModel: 'gpt-4o'
    },
    {
      id: '2',
      text: 'Add user authentication with login and signup forms',
      category: 'Functionality',
      tags: ['auth', 'forms', 'security'],
      isFavorite: true,
      createdAt: '2024-01-21T14:30:00Z',
      usageCount: 8,
      aiModel: 'gpt-4o'
    },
    {
      id: '3',
      text: 'Create a responsive navigation bar with mobile menu',
      category: 'UI',
      tags: ['navigation', 'responsive', 'mobile'],
      isFavorite: false,
      createdAt: '2024-01-22T09:15:00Z',
      usageCount: 5,
      aiModel: 'gpt-4o'
    },
    {
      id: '4',
      text: 'Implement dark mode toggle with theme persistence',
      category: 'Functionality',
      tags: ['dark-mode', 'theme', 'accessibility'],
      isFavorite: true,
      createdAt: '2024-01-23T16:45:00Z',
      usageCount: 10,
      aiModel: 'gpt-4o'
    },
    {
      id: '5',
      text: 'Add Stripe payment integration with checkout flow',
      category: 'Integration',
      tags: ['stripe', 'payment', 'checkout'],
      isFavorite: false,
      createdAt: '2024-01-24T11:20:00Z',
      usageCount: 3,
      aiModel: 'gemini-1.5',
      notes: 'Works best with Gemini for API integrations'
    },
    {
      id: '6',
      text: 'Optimize performance and reduce bundle size',
      category: 'Optimization',
      tags: ['performance', 'bundle-size', 'speed'],
      isFavorite: false,
      createdAt: '2024-01-25T13:10:00Z',
      usageCount: 6,
      aiModel: 'command-r-plus',
      notes: 'Command R+ is best for optimization tasks'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'usage' | 'alphabetical'>('recent');
  const [newPrompt, setNewPrompt] = useState('');
  const [newCategory, setNewCategory] = useState('UI');
  const [newTags, setNewTags] = useState('');
  const [editingPrompt, setEditingPrompt] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Prompts' },
    { id: 'UI', name: 'UI Components' },
    { id: 'Functionality', name: 'Functionality' },
    { id: 'Integration', name: 'Integrations' },
    { id: 'Optimization', name: 'Optimization' },
    { id: 'favorite', name: 'Favorites' }
  ];

  const filteredPrompts = savedPrompts.filter(prompt => {
    const matchesSearch = prompt.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'favorite' ? prompt.isFavorite : prompt.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'usage':
        return b.usageCount - a.usageCount;
      case 'alphabetical':
        return a.text.localeCompare(b.text);
      default:
        return 0;
    }
  });

  const toggleFavorite = (id: string) => {
    setSavedPrompts(prev => prev.map(prompt => 
      prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt
    ));
  };

  const deletePrompt = (id: string) => {
    setSavedPrompts(prev => prev.filter(prompt => prompt.id !== id));
  };

  const savePrompt = () => {
    if (!newPrompt.trim()) return;
    
    const newPromptObj: SavedPrompt = {
      id: Date.now().toString(),
      text: newPrompt,
      category: newCategory,
      tags: newTags.split(',').map(tag => tag.trim()).filter(Boolean),
      isFavorite: false,
      createdAt: new Date().toISOString(),
      usageCount: 0
    };
    
    setSavedPrompts(prev => [...prev, newPromptObj]);
    setNewPrompt('');
    setNewTags('');
    
    if (onSavePrompt) {
      onSavePrompt(newPrompt, newCategory, newPromptObj.tags);
    }
  };

  const updatePrompt = (id: string, text: string) => {
    setSavedPrompts(prev => prev.map(prompt => 
      prompt.id === id ? { ...prompt, text } : prompt
    ));
    setEditingPrompt(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UI': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Functionality': return 'bg-green-100 text-green-800 border-green-200';
      case 'Integration': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Optimization': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getModelIcon = (model?: string) => {
    switch (model) {
      case 'gpt-4o': return '🔍';
      case 'claude-3': return '🧠';
      case 'gemini-1.5': return '📦';
      case 'command-r-plus': return '🛠️';
      case 'mistral-8x': return '📈';
      default: return '🤖';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Prompt Library
            </CardTitle>
            <CardDescription>
              Save, organize, and reuse your most effective prompts
            </CardDescription>
          </div>
          <Badge variant="outline">
            {savedPrompts.length} prompts
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs defaultValue="browse" className="flex-1 flex flex-col">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="browse" className="flex-1 flex flex-col m-0">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
              
              <div className="flex overflow-x-auto pb-2 space-x-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.id === 'favorite' ? (
                      <Star className="h-4 w-4 mr-2" />
                    ) : (
                      <Tag className="h-4 w-4 mr-2" />
                    )}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {filteredPrompts.map((prompt) => (
                  <Card key={prompt.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(prompt.category)}
                          >
                            {prompt.category}
                          </Badge>
                          {prompt.aiModel && (
                            <Badge variant="outline" className="text-xs">
                              {getModelIcon(prompt.aiModel)} {prompt.aiModel}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(prompt.id)}
                          >
                            <Star className={`h-4 w-4 ${prompt.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPrompt(prompt.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePrompt(prompt.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Prompt Text */}
                      {editingPrompt === prompt.id ? (
                        <div className="space-y-2">
                          <Input
                            value={prompt.text}
                            onChange={(e) => setSavedPrompts(prev => prev.map(p => 
                              p.id === prompt.id ? { ...p, text: e.target.value } : p
                            ))}
                          />
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => updatePrompt(prompt.id, prompt.text)}
                            >
                              Save
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setEditingPrompt(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{prompt.text}</p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Notes */}
                      {prompt.notes && (
                        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                          <span className="font-medium">Note:</span> {prompt.notes}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>Added: {formatDate(prompt.createdAt)}</span>
                          <span>Used: {prompt.usageCount} times</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(prompt.text);
                            }}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              onSelectPrompt(prompt.text);
                              // Increment usage count
                              setSavedPrompts(prev => prev.map(p => 
                                p.id === prompt.id ? { ...p, usageCount: p.usageCount + 1 } : p
                              ));
                            }}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Use
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {filteredPrompts.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? 'No prompts match your search.' : 'No prompts in this category yet.'}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="add" className="flex-1 m-0 p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Prompt Text</label>
                <textarea
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Enter your prompt text..."
                  className="w-full p-3 border rounded-lg min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="UI">UI Components</option>
                    <option value="Functionality">Functionality</option>
                    <option value="Integration">Integrations</option>
                    <option value="Optimization">Optimization</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                  <Input
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="landing, hero, responsive..."
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Notes (optional)</label>
                <Input
                  placeholder="Add any notes about this prompt..."
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Recommended AI Model</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Any Model</option>
                  <option value="gpt-4o">GPT-4o (General Purpose)</option>
                  <option value="claude-3">Claude 3 (Reasoning)</option>
                  <option value="gemini-1.5">Gemini 1.5 (Integrations)</option>
                  <option value="command-r-plus">Command R+ (Optimization)</option>
                </select>
              </div>
              
              <Button 
                onClick={savePrompt}
                disabled={!newPrompt.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Save Prompt
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}