"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import { EnhancedAIChat } from '@/components/enhanced-ai-chat';
import { AIJobMonitor } from '@/components/ai-job-monitor';
import { VisualComponentGallery } from '@/components/visual-component-gallery';
import { PromptChainBuilder } from '@/components/prompt-chain-builder';
import { SmartFileExplorer } from '@/components/smart-file-explorer';
import { FrameworkSwitcher } from '@/components/framework-switcher';
import { ChatHistoryPanel } from '@/components/chat-history-panel';
import { EnhancedCodeExplainer } from '@/components/enhanced-code-explainer';
import { EnhancedMobileExport } from '@/components/enhanced-mobile-export';
import { ProjectContextMemory } from '@/components/project-context-memory';
import { OneClickPreviewDeploy } from '@/components/one-click-preview-deploy';
import { TaskQueue } from '@/components/task-queue';
import { TemplateGallery } from '@/components/template-gallery';
import { CollaborationPanel } from '@/components/collaboration-panel';
import { GitHubIntegration } from '@/components/github-integration';
import { PromptLibrary } from '@/components/prompt-library';
import { ProjectNotes } from '@/components/project-notes';
import { MonacoEditor } from '@/components/monaco-editor';
import { FileDiffViewer } from '@/components/file-diff-viewer';
import { RealtimeCollaboration } from '@/components/realtime-collaboration';
import { EnhancedPromptAutocomplete } from '@/components/enhanced-prompt-autocomplete';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
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
  Sun,
  Activity,
  BarChart3,
  Workflow,
  BookOpen,
  GitBranch
} from 'lucide-react';
import { Template, Plugin, FileNode, ProjectMemory, FileVersion } from '@/lib/types';

// Dynamically import DevicePreview with SSR disabled
const DevicePreview = dynamic(() => import('@/components/device-preview').then(mod => ({ default: mod.DevicePreview })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading preview...</div>
});

export function EnhancedDemoPageV3() {
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
        Experience the power of multiple AI models working together to build your applications!
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800 mb-2">🔍 GPT-4o</h3>
          <p class="text-blue-600 text-sm">Core Developer & Architect</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <h3 class="font-semibold text-purple-800 mb-2">🧠 Claude 3</h3>
          <p class="text-purple-600 text-sm">Thought Partner & Safety</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="font-semibold text-green-800 mb-2">📦 Gemini 1.5</h3>
          <p class="text-green-600 text-sm">Data & Cloud Expert</p>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg">
          <h3 class="font-semibold text-orange-800 mb-2">🛠️ Command R+</h3>
          <p class="text-orange-600 text-sm">Debugger & Optimizer</p>
        </div>
      </div>
      <button class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold">
        Start Building with Multi-Model AI
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
  const [userTier] = useState<'free' | 'pro' | 'enterprise'>('pro'); // Demo as pro user
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isCollaborationEnabled, setIsCollaborationEnabled] = useState(false);
  const [selectedAIModel, setSelectedAIModel] = useState('gpt-4o');
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [fileVersions, setFileVersions] = useState<FileVersion[]>([
    {
      id: 'v1',
      content: generatedCode,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      author: 'You',
      message: 'Initial version',
      changes: { additions: 30, deletions: 0, modifications: 0 }
    },
    {
      id: 'v2',
      content: generatedCode.replace('Welcome to Starsky AI', 'Welcome to Multi-Model AI'),
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      author: 'AI Assistant',
      message: 'Updated heading text',
      changes: { additions: 1, deletions: 1, modifications: 0 }
    }
  ]);
  
  const projectId = 'demo-project-v3';
  const projectName = 'Multi-Model AI Project';
  const currentUser = {
    id: 'user-1',
    name: 'You',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100'
  };

  const handleTaskComplete = (result: string) => {
    toast.success('Task completed successfully', {
      description: result.substring(0, 50) + '...'
    });
  };

  const handleTemplateSelect = (template: Template) => {
    setGeneratedCode(template.code);
    toast.success('Template applied', {
      description: `Applied template: ${template.name}`
    });
  };

  const handleComponentSelect = (component: any) => {
    // Insert component code into the current code
    const updatedCode = generatedCode.replace('</body>', `${component.code}\n</body>`);
    setGeneratedCode(updatedCode);
    
    toast.success('Component inserted', {
      description: `Added ${component.name} to your project`
    });
    
    // Add to file versions
    const newVersion: FileVersion = {
      id: `v${fileVersions.length + 1}`,
      content: updatedCode,
      timestamp: new Date().toISOString(),
      author: 'You',
      message: `Added ${component.name} component`,
      changes: { additions: component.code.split('\n').length, deletions: 0, modifications: 0 }
    };
    
    setFileVersions(prev => [...prev, newVersion]);
  };

  const handleDebugRequest = (query: string) => {
    setCurrentPrompt(query);
    setSelectedAIModel('command-r-plus');
    setActiveTab('chat');
    
    toast.info('Debug request sent to Command R+', {
      description: 'Switching to specialized debugging model'
    });
  };

  const handleRestorePrompt = (prompt: string) => {
    setCurrentPrompt(prompt);
    setActiveTab('chat');
  };

  const handleRerunPrompt = (prompt: string) => {
    setCurrentPrompt(prompt);
    setActiveTab('chat');
    
    toast.info('Re-running previous prompt', {
      description: prompt.substring(0, 50) + '...'
    });
  };

  const handleInstallPlugin = (plugin: Plugin) => {
    toast.success(`Plugin installed: ${plugin.name}`, {
      description: 'Plugin has been added to your project'
    });
  };

  const handleFileSelect = (file: FileNode) => {
    toast.info(`File selected: ${file.name}`);
  };

  const handlePromptInFile = (file: FileNode) => {
    setCurrentPrompt(`Modify the file ${file.name}: `);
    setActiveTab('chat');
  };

  const handleFrameworkChange = (newFramework: string) => {
    setFramework(newFramework);
    
    toast.success(`Framework changed to ${newFramework}`, {
      description: 'Your project has been converted to the new framework'
    });
    
    // Add to file versions
    const newVersion: FileVersion = {
      id: `v${fileVersions.length + 1}`,
      content: generatedCode,
      timestamp: new Date().toISOString(),
      author: 'You',
      message: `Converted to ${newFramework}`,
      changes: { additions: 20, deletions: 15, modifications: 10 }
    };
    
    setFileVersions(prev => [...prev, newVersion]);
  };

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
    setShowCodeExplainer(true);
  };

  const handleMemoryUpdate = (memory: ProjectMemory) => {
    setProjectMemory(memory);
    
    toast.info('Project memory updated', {
      description: 'AI has learned from your project patterns'
    });
  };

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
    
    // Add to file versions
    const newVersion: FileVersion = {
      id: `v${fileVersions.length + 1}`,
      content: code,
      timestamp: new Date().toISOString(),
      author: 'AI Assistant',
      message: 'Generated from AI prompt',
      changes: { additions: 25, deletions: 10, modifications: 5 }
    };
    
    setFileVersions(prev => [...prev, newVersion]);
  };

  const handleDeploymentUpdate = (deployment: any) => {
    setDeploymentUrl(deployment.url);
    
    toast.success('Deployment successful', {
      description: `Your site is live at ${deployment.url}`
    });
  };

  const handleChainExecute = async (chain: any[]) => {
    toast.success('Prompt chain executed', {
      description: `${chain.length} steps completed successfully`
    });
  };

  const handleFileRevert = (versionId: string) => {
    const version = fileVersions.find(v => v.id === versionId);
    if (version) {
      setGeneratedCode(version.content);
      
      toast.success('Reverted to previous version', {
        description: `Reverted to: ${version.message}`
      });
    }
  };

  const handleFileDuplicate = (versionId: string) => {
    const version = fileVersions.find(v => v.id === versionId);
    if (version) {
      const newVersion: FileVersion = {
        id: `v${fileVersions.length + 1}`,
        content: version.content,
        timestamp: new Date().toISOString(),
        author: 'You',
        message: `Duplicate of: ${version.message}`,
        changes: { ...version.changes }
      };
      
      setFileVersions(prev => [...prev, newVersion]);
      
      toast.success('Version duplicated', {
        description: `Created duplicate of: ${version.message}`
      });
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setCurrentPrompt(prompt);
    
    toast.info('Prompt selected from library', {
      description: prompt.substring(0, 50) + '...'
    });
  };

  const toggleCollaboration = () => {
    setIsCollaborationEnabled(!isCollaborationEnabled);
    
    if (!isCollaborationEnabled) {
      toast.success('Collaboration enabled', {
        description: 'Real-time collaboration is now active'
      });
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    
    toast.info(`${isDarkMode ? 'Light' : 'Dark'} mode activated`);
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
                <h2 className="text-xl font-semibold">Multi-Model AI Studio</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Activity className="h-3 w-3 mr-1" />
                    AI Orchestrator
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
                  AI Chat Mode
                </Button>
                <Button
                  variant={mode === 'visual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('visual')}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Visual Mode
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleCollaboration}
                  className={isCollaborationEnabled ? 'bg-green-100 border-green-300' : ''}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Collab
                </Button>
              </div>
            </div>
            
            {mode === 'prompt' ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="grid w-full grid-cols-5 mx-4 mt-2">
                  <TabsTrigger value="chat" className="text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    AI Chat
                  </TabsTrigger>
                  <TabsTrigger value="monitor" className="text-xs">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Monitor
                  </TabsTrigger>
                  <TabsTrigger value="chains" className="text-xs">
                    <Workflow className="h-3 w-3 mr-1" />
                    Chains
                  </TabsTrigger>
                  <TabsTrigger value="library" className="text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Library
                  </TabsTrigger>
                  <TabsTrigger value="components" className="text-xs">
                    <Puzzle className="h-3 w-3 mr-1" />
                    Components
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                  <EnhancedAIChat
                    projectId={projectId}
                    userTier={userTier}
                    onCodeGenerated={handleCodeGenerated}
                  />
                </TabsContent>
                
                <TabsContent value="monitor" className="flex-1 m-0 p-4">
                  <AIJobMonitor 
                    projectId={projectId}
                    showStats={true}
                  />
                </TabsContent>
                
                <TabsContent value="chains" className="flex-1 m-0 p-4">
                  <PromptChainBuilder
                    projectId={projectId}
                    onChainExecute={handleChainExecute}
                  />
                </TabsContent>
                
                <TabsContent value="library" className="flex-1 m-0">
                  <PromptLibrary
                    onSelectPrompt={handleSelectPrompt}
                  />
                </TabsContent>
                
                <TabsContent value="components" className="flex-1 m-0">
                  <VisualComponentGallery
                    onComponentSelect={handleComponentSelect}
                    framework={framework}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex-1">
                <VisualComponentGallery
                  onComponentSelect={handleComponentSelect}
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
                <Badge variant="secondary">Multi-Model AI</Badge>
                {deploymentUrl && (
                  <Badge variant="default" className="bg-green-600">
                    <Globe className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {isCollaborationEnabled && (
                  <Badge variant="outline" className="animate-pulse bg-green-100 border-green-300">
                    <Users className="h-3 w-3 mr-1" />
                    3 Collaborators
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={() => setRightPanelTab('framework')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <Tabs value={rightPanelTab} onValueChange={setRightPanelTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-10">
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
                <TabsTrigger value="history">
                  <GitBranch className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  <Layers className="h-4 w-4 mr-2" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="deploy">
                  <Globe className="h-4 w-4 mr-2" />
                  Deploy
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="collab">
                  <Users className="h-4 w-4 mr-2" />
                  Collab
                </TabsTrigger>
                <TabsTrigger value="memory">
                  <Brain className="h-4 w-4 mr-2" />
                  Memory
                </TabsTrigger>
                <TabsTrigger value="framework">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
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
              
              <TabsContent value="history" className="flex-1 m-0 p-4">
                <FileDiffViewer
                  fileName="index.html"
                  versions={fileVersions}
                  currentContent={generatedCode}
                  onRevert={handleFileRevert}
                  onDuplicate={handleFileDuplicate}
                />
              </TabsContent>
              
              <TabsContent value="tasks" className="flex-1 m-0 p-4">
                <TaskQueue 
                  projectId={projectId} 
                  onTaskComplete={handleTaskComplete}
                />
              </TabsContent>
              
              <TabsContent value="deploy" className="flex-1 m-0 p-4">
                <OneClickPreviewDeploy
                  projectCode={generatedCode}
                  projectName={projectName}
                  onDeploymentUpdate={handleDeploymentUpdate}
                />
              </TabsContent>
              
              <TabsContent value="mobile" className="flex-1 m-0 p-4">
                <EnhancedMobileExport
                  projectCode={generatedCode}
                  projectName={projectName}
                  framework={framework}
                  webUrl={deploymentUrl || undefined}
                />
              </TabsContent>
              
              <TabsContent value="collab" className="flex-1 m-0 p-4">
                <RealtimeCollaboration
                  projectId={projectId}
                  currentUser={currentUser}
                  onCodeChange={handleCodeGenerated}
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
          <EnhancedCodeExplainer
            selectedCode={selectedCode}
            onClose={() => setShowCodeExplainer(false)}
            language="html"
            aiModel={selectedAIModel}
          />
        </div>
      )}
    </div>
  );
}