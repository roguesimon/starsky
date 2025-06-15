"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import { TaskQueue } from '@/components/task-queue';
import { TemplateGallery } from '@/components/template-gallery';
import { CollaborationPanel } from '@/components/collaboration-panel';
import { AIConsole } from '@/components/ai-console';
import { GitHubIntegration } from '@/components/github-integration';
import { PromptHistory } from '@/components/prompt-history';
import { ProjectNotes } from '@/components/project-notes';
import { MonacoEditor } from '@/components/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send, 
  Code, 
  Eye, 
  MessageSquare,
  Users,
  Terminal,
  Github,
  History,
  FileText,
  Palette,
  Settings,
  Layers,
  Zap
} from 'lucide-react';
import { Template } from '@/lib/types';

// Dynamically import DevicePreview with SSR disabled
const DevicePreview = dynamic(() => import('@/components/device-preview').then(mod => ({ default: mod.DevicePreview })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading preview...</div>
});

export function EnhancedDemoPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-5xl font-bold text-center mb-8 text-gray-800">
      Welcome to Starsky AI
    </h1>
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <p class="text-gray-600 mb-6 text-lg">
        Describe what you'd like to build and watch the magic happen!
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800 mb-2">AI-Powered</h3>
          <p class="text-blue-600 text-sm">Advanced AI models</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <h3 class="font-semibold text-purple-800 mb-2">No-Code</h3>
          <p class="text-purple-600 text-sm">Build without coding</p>
        </div>
      </div>
      <button class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold">
        Get Started
      </button>
    </div>
  </div>
</body>
</html>`);

  const [activeTab, setActiveTab] = useState('chat');
  const [rightPanelTab, setRightPanelTab] = useState('preview');
  const projectId = 'demo-project';

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedCode(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${prompt}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-5xl font-bold text-center mb-8 text-gray-800">
      ${prompt}
    </h1>
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <p class="text-gray-600 mb-6 text-lg">
        This is your AI-generated application based on: "${prompt}"
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800 mb-2">Feature 1</h3>
          <p class="text-blue-600 text-sm">AI-powered functionality</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <h3 class="font-semibold text-purple-800 mb-2">Feature 2</h3>
          <p class="text-purple-600 text-sm">Smart automation</p>
        </div>
      </div>
      <button class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold">
        Launch Application
      </button>
    </div>
  </div>
</body>
</html>`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleTaskComplete = (result: string) => {
    // Handle task completion
    console.log('Task completed:', result);
  };

  const handleTemplateSelect = (template: Template) => {
    setGeneratedCode(template.code);
  };

  const handleDebugRequest = (query: string) => {
    setPrompt(query);
    handleGenerate();
  };

  const handleRestorePrompt = (restoredPrompt: string) => {
    setPrompt(restoredPrompt);
  };

  const handleRerunPrompt = (rerunPrompt: string) => {
    setPrompt(rerunPrompt);
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="h-screen flex">
          {/* Left Panel */}
          <div className="w-1/3 border-r bg-muted/50 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Development Studio</h2>
                <Badge variant="secondary">
                  <Zap className="h-3 w-3 mr-1" />
                  starsky-pro
                </Badge>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-4 mx-4 mt-2">
                <TabsTrigger value="chat" className="text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="tasks" className="text-xs">
                  <Layers className="h-3 w-3 mr-1" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="templates" className="text-xs">
                  <Palette className="h-3 w-3 mr-1" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs">
                  <History className="h-3 w-3 mr-1" />
                  History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">AI Assistant</p>
                      <p className="text-sm text-muted-foreground">
                        Hello! I'm here to help you build amazing web applications. Just describe what you'd like to create, and I'll generate the code for you instantly.
                      </p>
                    </div>
                    
                    {prompt && (
                      <div className="bg-primary/10 rounded-lg p-4 ml-8">
                        <p className="text-sm font-medium mb-2">You</p>
                        <p className="text-sm">{prompt}</p>
                      </div>
                    )}
                    
                    {isGenerating && (
                      <div className="bg-background rounded-lg p-4">
                        <p className="text-sm font-medium mb-2">AI Assistant</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          <span className="text-sm text-muted-foreground ml-2">Generating your app...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Describe your app idea..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="flex-1 min-h-[60px] resize-none"
                    />
                    <Button 
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      size="icon"
                      className="h-[60px] w-[60px]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tasks" className="flex-1 m-0">
                <TaskQueue 
                  projectId={projectId} 
                  onTaskComplete={handleTaskComplete}
                />
              </TabsContent>
              
              <TabsContent value="templates" className="flex-1 m-0">
                <TemplateGallery onSelectTemplate={handleTemplateSelect} />
              </TabsContent>
              
              <TabsContent value="history" className="flex-1 m-0">
                <PromptHistory 
                  projectId={projectId}
                  onRestorePrompt={handleRestorePrompt}
                  onRerunPrompt={handleRerunPrompt}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">Development Environment</h2>
                <Badge variant="outline">Live Preview</Badge>
              </div>
            </div>

            <Tabs value={rightPanelTab} onValueChange={setRightPanelTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="console">
                  <Terminal className="h-4 w-4 mr-2" />
                  Console
                </TabsTrigger>
                <TabsTrigger value="collaborate">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="github">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <FileText className="h-4 w-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="flex-1 m-0">
                <DevicePreview code={generatedCode} />
              </TabsContent>
              
              <TabsContent value="code" className="flex-1 m-0">
                <MonacoEditor
                  value={generatedCode}
                  onChange={setGeneratedCode}
                  language="html"
                />
              </TabsContent>
              
              <TabsContent value="console" className="flex-1 m-0 p-4">
                <AIConsole 
                  projectId={projectId}
                  onDebugRequest={handleDebugRequest}
                />
              </TabsContent>
              
              <TabsContent value="collaborate" className="flex-1 m-0 p-4">
                <CollaborationPanel 
                  projectId={projectId}
                  isOwner={true}
                />
              </TabsContent>
              
              <TabsContent value="github" className="flex-1 m-0 p-4">
                <GitHubIntegration 
                  projectId={projectId}
                  projectName="My Awesome Project"
                  code={generatedCode}
                />
              </TabsContent>
              
              <TabsContent value="notes" className="flex-1 m-0 p-4">
                <ProjectNotes projectId={projectId} />
              </TabsContent>
              
              <TabsContent value="settings" className="flex-1 m-0 p-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Project Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">AI Model</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>starsky-01 (Free)</option>
                          <option>starsky-pro (Premium)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Framework</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>HTML/CSS/JS</option>
                          <option>React</option>
                          <option>Vue.js</option>
                          <option>Svelte</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Styling</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option>Tailwind CSS</option>
                          <option>Bootstrap</option>
                          <option>Custom CSS</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}