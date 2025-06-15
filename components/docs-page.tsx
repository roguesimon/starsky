"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Code, 
  Zap, 
  Rocket, 
  Shield, 
  Globe,
  Github,
  MessageSquare,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function DocsPage() {
  const quickStart = [
    {
      title: 'Getting Started',
      description: 'Create your first AI-powered application in minutes',
      icon: Rocket,
      href: '#getting-started'
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      icon: Code,
      href: '#api-reference'
    },
    {
      title: 'AI Models',
      description: 'Learn about starsky-01 and starsky-pro capabilities',
      icon: Zap,
      href: '#ai-models'
    },
    {
      title: 'Deployment',
      description: 'Deploy your applications to various platforms',
      icon: Globe,
      href: '#deployment'
    },
    {
      title: 'Security',
      description: 'Best practices for secure application development',
      icon: Shield,
      href: '#security'
    },
    {
      title: 'Integrations',
      description: 'Connect with GitHub, Stripe, and other services',
      icon: Github,
      href: '#integrations'
    }
  ];

  const guides = [
    {
      category: 'Basics',
      items: [
        { title: 'Your First App', time: '5 min read' },
        { title: 'Understanding AI Prompts', time: '8 min read' },
        { title: 'Project Management', time: '6 min read' },
        { title: 'Exporting Your Code', time: '4 min read' }
      ]
    },
    {
      category: 'Advanced',
      items: [
        { title: 'Custom AI Training', time: '15 min read' },
        { title: 'Team Collaboration', time: '12 min read' },
        { title: 'Enterprise Setup', time: '20 min read' },
        { title: 'Performance Optimization', time: '10 min read' }
      ]
    },
    {
      category: 'Integrations',
      items: [
        { title: 'GitHub Integration', time: '7 min read' },
        { title: 'Stripe Payments', time: '9 min read' },
        { title: 'Custom Domains', time: '5 min read' },
        { title: 'Webhook Setup', time: '6 min read' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Documentation
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Build with Starsky AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to know to build amazing applications with AI
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickStart.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {guides.map((category, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-sm mb-2">{category.category}</h4>
                        <ul className="space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link 
                                href="#" 
                                className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="getting-started" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>
                
                <TabsContent value="getting-started" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started with Starsky AI</CardTitle>
                      <CardDescription>
                        Learn how to create your first AI-powered application
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="prose max-w-none">
                      <h3>Step 1: Create Your Account</h3>
                      <p>
                        Start by creating a free account on Starsky AI. You'll get access to our starsky-01 model
                        and can create up to 5 projects per month.
                      </p>
                      
                      <h3>Step 2: Describe Your App</h3>
                      <p>
                        Use natural language to describe what you want to build. For example:
                      </p>
                      <pre className="bg-muted p-4 rounded-lg">
                        <code>
                          "Create a todo app with the ability to add, edit, and delete tasks. 
                          Include a dark mode toggle and make it responsive."
                        </code>
                      </pre>
                      
                      <h3>Step 3: Watch the Magic</h3>
                      <p>
                        Our AI will generate the complete application code, including HTML, CSS, and JavaScript.
                        You can see the live preview immediately.
                      </p>
                      
                      <h3>Step 4: Customize and Deploy</h3>
                      <p>
                        Use our built-in code editor to make any adjustments, then deploy your app
                        to GitHub Pages, Netlify, or download the code.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="api" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Reference</CardTitle>
                      <CardDescription>
                        Complete API documentation for developers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                          <p className="text-muted-foreground mb-4">
                            All API requests require authentication using your API key.
                          </p>
                          <pre className="bg-muted p-4 rounded-lg">
                            <code>
                              {`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.starsky.ai/v1/generate`}
                            </code>
                          </pre>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Generate Application</h3>
                          <p className="text-muted-foreground mb-4">
                            Generate a complete application from a text description.
                          </p>
                          <pre className="bg-muted p-4 rounded-lg">
                            <code>
                              {`POST /v1/generate
{
  "prompt": "Create a todo app with dark mode",
  "model": "starsky-pro",
  "framework": "react",
  "styling": "tailwind"
}`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="examples" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Example Applications</CardTitle>
                      <CardDescription>
                        Explore what you can build with Starsky AI
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">E-commerce Store</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Complete online store with product catalog, cart, and checkout.
                          </p>
                          <Badge variant="secondary">React</Badge>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Portfolio Website</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Professional portfolio with project gallery and contact form.
                          </p>
                          <Badge variant="secondary">HTML/CSS</Badge>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Dashboard App</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Analytics dashboard with charts and data visualization.
                          </p>
                          <Badge variant="secondary">Vue.js</Badge>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Blog Platform</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Content management system with admin panel.
                          </p>
                          <Badge variant="secondary">Next.js</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="support" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Get Support</CardTitle>
                      <CardDescription>
                        Multiple ways to get help when you need it
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                          <MessageSquare className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">Community Forum</h4>
                            <p className="text-sm text-muted-foreground">
                              Get help from other developers and share your creations.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Book className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">Documentation</h4>
                            <p className="text-sm text-muted-foreground">
                              Comprehensive guides and API documentation.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Github className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">GitHub Issues</h4>
                            <p className="text-sm text-muted-foreground">
                              Report bugs and request features on GitHub.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Shield className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">Priority Support</h4>
                            <p className="text-sm text-muted-foreground">
                              Direct access to our support team for Pro users.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}