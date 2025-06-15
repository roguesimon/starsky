"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Code, 
  Eye, 
  Smartphone, 
  Tablet, 
  Monitor,
  Download,
  Share,
  Settings,
  Play,
  MessageSquare
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { MonacoEditor } from '@/components/monaco-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DemoPage() {
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
<body class="bg-gray-100 min-h-screen">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">
      Welcome to Your AI App
    </h1>
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <p class="text-gray-600 mb-4">
        Describe what you'd like to build and watch the magic happen!
      </p>
      <button class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        Get Started
      </button>
    </div>
  </div>
</body>
</html>`);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="h-screen flex">
          {/* Left Panel - Chat Interface */}
          <div className="w-1/3 border-r bg-muted/50 flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">AI Assistant</h2>
                <Badge variant="secondary">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  starsky-01
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Describe your app in natural language and watch it come to life.
              </p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
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
            
            <div className="p-6 border-t">
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
          </div>

          {/* Right Panel - Code Editor and Preview */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">Development Environment</h2>
                <Badge variant="outline">Live Preview</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="preview" className="flex-1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview" className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="flex-1 m-0">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Monitor className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="w-full h-full border rounded-lg bg-white">
                      <iframe
                        srcDoc={generatedCode}
                        className="w-full h-full rounded-lg"
                        title="App Preview"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="flex-1 m-0">
                <MonacoEditor
                  value={generatedCode}
                  onChange={setGeneratedCode}
                  language="html"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}