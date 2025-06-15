"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import { AIPromptAutocomplete } from '@/components/ai-prompt-autocomplete';
import { VisualBuilder } from '@/components/visual-builder';
import { PluginStore } from '@/components/plugin-store';
import { SmartFileExplorer } from '@/components/smart-file-explorer';
import { FrameworkSwitcher } from '@/components/framework-switcher';
import { ChatHistoryPanel } from '@/components/chat-history-panel';
import { CodeExplainer } from '@/components/code-explainer';
import { MobileExport } from '@/components/mobile-export';
import { ProjectContextMemory } from '@/components/project-context-memory';
import { LivePreviewDeploy } from '@/components/live-preview-deploy';
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
  Zap,
  Smartphone,
  Globe,
  Brain,
  Puzzle,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { Template, Plugin, FileNode, ProjectMemory } from '@/lib/types';

// Dynamically import DevicePreview with SSR disabled
const DevicePreview = dynamic(() => import('@/components/device-preview').then(mod => ({ default: mod.DevicePreview })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading preview...</div>
});

export function EnhancedDemoPageV2() {
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
  const [framework, setFramework] = useState('nextjs');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [showCodeExplainer, setShowCodeExplainer] = useState(false);
  const [projectMemory, setProjectMemory] = useState<ProjectMemory | null>(null);
  const [mode, setMode] = useState<'prompt' | 'visual'>('prompt');
  
  const projectId = 'demo-project';
  const projectName = 'My Awesome Project';

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation with framework-specific code
    setTimeout(() => {
      const frameworkCode = generateFrameworkCode(prompt, framework);
      setGeneratedCode(frameworkCode);
      setIsGenerating(false);
    }, 2000);
  };

  const generateFrameworkCode = (userPrompt: string, selectedFramework: string) => {
    const basePrompt = userPrompt.toLowerCase();
    
    switch (selectedFramework) {
      case 'nextjs':
        return generateNextJSCode(basePrompt);
      case 'astro':
        return generateAstroCode(basePrompt);
      case 'svelte':
        return generateSvelteCode(basePrompt);
      case 'remix':
        return generateRemixCode(basePrompt);
      case 'static':
        return generateStaticCode(basePrompt);
      default:
        return generateNextJSCode(basePrompt);
    }
  };

  const generateNextJSCode = (prompt: string) => {
    return `import React from 'react';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>${prompt}</title>
        <meta name="description" content="Generated with Starsky AI" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
            ${prompt}
          </h1>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <p className="text-gray-600 mb-6 text-lg">
              This Next.js application was generated based on: "${prompt}"
            </p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}`;
  };

  const generateAstroCode = (prompt: string) => {
    return `---
title: "${prompt}"
description: "Generated with Starsky AI"
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-5xl font-bold text-center mb-8 text-gray-800">
        ${prompt}
      </h1>
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <p class="text-gray-600 mb-6 text-lg">
          This Astro application was generated based on: "${prompt}"
        </p>
        <button class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold">
          Get Started
        </button>
      </div>
    </div>
  </body>
</html>`;
  };

  const generateSvelteCode = (prompt: string) => {
    return `<script>
  let title = "${prompt}";
  let description = "This SvelteKit application was generated based on: \\"${prompt}\\"";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="Generated with Starsky AI" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-5xl font-bold text-center mb-8 text-gray-800">
      {title}
    </h1>
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <p class="text-gray-600 mb-6 text-lg">
        {description}
      </p>
      <button class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 font-semibold">
        Get Started
      </button>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }
</style>`;
  };

  const generateRemixCode = (prompt: string) => {
    return `import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "${prompt}" },
    { name: "description", content: "Generated with Starsky AI" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          ${prompt}
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600 mb-6 text-lg">
            This Remix application was generated based on: "${prompt}"
          </p>
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}`;
  };

  const generateStaticCode = (prompt: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${prompt}</title>
  <meta name="description" content="Generated with Starsky AI">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-5xl font-bold text-center mb-8 text-gray-800">
      ${prompt}
    </h1>
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <p class="text-gray-600 mb-6 text-lg">
        This static HTML application was generated based on: "${prompt}"
      </p>
      <button class="w-full bg-gradient-to-r from-gray-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-gray-600 hover:to-blue-600 transition-all duration-200 font-semibold" onclick="alert('Hello from static HTML!')">
        Get Started
      </button>
    </div>
  </div>
</body>
</html>`;
  };

  const handleTaskComplete = (result: string) => {
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

  const handleInstallPlugin = (plugin: Plugin) => {
    console.log('Installing plugin:', plugin);
    // Add plugin installation logic here
  };

  const handleFileSelect = (file: FileNode) => {
    console.log('File selected:', file);
  };

  const handlePromptInFile = (file: FileNode) => {
    setPrompt(`Modify the file ${file.name}: `);
    setActiveTab('chat');
  };

  const handleFrameworkChange = (newFramework: string) => {
    setFramework(newFramework);
    // Regenerate code with new framework
    if (prompt) {
      const newCode = generateFrameworkCode(prompt, newFramework);
      setGeneratedCode(newCode);
    }
  };

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
    setShowCodeExplainer(true);
  };

  const handleMemoryUpdate = (memory: ProjectMemory) => {
    setProjectMemory(memory);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleDeploymentUpdate = (deployment: any) => {
    console.log('Deployment updated:', deployment);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Navigation />
      
      <main className="pt-16">
        <div className="h-screen flex">
          {/* Left Panel */}
          <div className="w-1/3 border-r bg-muted/50 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Development Studio</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Zap className="h-3 w-3 mr-1" />
                    starsky-pro
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Mode Toggle */}
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant={mode === 'prompt' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('prompt')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Prompt Mode
                </Button>
                <Button
                  variant={mode === 'visual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('visual')}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Visual Mode
                </Button>
              </div>
            </div>
            
            {mode === 'prompt' ? (
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
                  <TabsTrigger value="plugins" className="text-xs">
                    <Puzzle className="h-3 w-3 mr-1" />
                    Plugins
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
                    <AIPromptAutocomplete
                      value={prompt}
                      onChange={setPrompt}
                      onSuggestionSelect={handleSuggestionSelect}
                      framework={framework}
                    />
                    <Button 
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="w-full mt-2"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
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
                
                <TabsContent value="plugins" className="flex-1 m-0">
                  <PluginStore 
                    onInstallPlugin={handleInstallPlugin}
                    framework={framework}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex-1">
                <VisualBuilder 
                  onCodeChange={setGeneratedCode}
                  framework={framework}
                />
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">Development Environment</h2>
                <Badge variant="outline">Live Preview</Badge>
                <Badge variant="outline">{framework}</Badge>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setRightPanelTab('framework')}>
                <Settings className="h-4 w-4 mr-2" />
                Framework
              </Button>
            </div>

            <Tabs value={rightPanelTab} onValueChange={setRightPanelTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="files">
                  <FileText className="h-4 w-4 mr-2" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="console">
                  <Terminal className="h-4 w-4 mr-2" />
                  Console
                </TabsTrigger>
                <TabsTrigger value="deploy">
                  <Globe className="h-4 w-4 mr-2" />
                  Deploy
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="memory">
                  <Brain className="h-4 w-4 mr-2" />
                  Memory
                </TabsTrigger>
                <TabsTrigger value="framework">
                  <Settings className="h-4 w-4 mr-2" />
                  Framework
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="flex-1 m-0">
                <DevicePreview code={generatedCode} />
              </TabsContent>
              
              <TabsContent value="code" className="flex-1 m-0">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">Code Editor</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCodeSelect(generatedCode)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Explain Code
                    </Button>
                  </div>
                  <div className="flex-1">
                    <MonacoEditor
                      value={generatedCode}
                      onChange={setGeneratedCode}
                      language="html"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="files" className="flex-1 m-0">
                <SmartFileExplorer
                  onFileSelect={handleFileSelect}
                  onPromptInFile={handlePromptInFile}
                  framework={framework}
                />
              </TabsContent>
              
              <TabsContent value="console" className="flex-1 m-0 p-4">
                <AIConsole 
                  projectId={projectId}
                  onDebugRequest={handleDebugRequest}
                />
              </TabsContent>
              
              <TabsContent value="deploy" className="flex-1 m-0 p-4">
                <LivePreviewDeploy
                  projectCode={generatedCode}
                  projectName={projectName}
                  onDeploymentUpdate={handleDeploymentUpdate}
                />
              </TabsContent>
              
              <TabsContent value="mobile" className="flex-1 m-0 p-4">
                <MobileExport
                  projectCode={generatedCode}
                  projectName={projectName}
                  framework={framework}
                />
              </TabsContent>
              
              <TabsContent value="memory" className="flex-1 m-0 p-4">
                <ProjectContextMemory
                  projectId={projectId}
                  onMemoryUpdate={handleMemoryUpdate}
                />
              </TabsContent>
              
              <TabsContent value="framework" className="flex-1 m-0 p-4">
                <FrameworkSwitcher
                  currentFramework={framework}
                  onFrameworkChange={handleFrameworkChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Code Explainer Modal */}
      {showCodeExplainer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <CodeExplainer
            selectedCode={selectedCode}
            onClose={() => setShowCodeExplainer(false)}
            language="html"
          />
        </div>
      )}
    </div>
  );
}