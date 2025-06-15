"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Globe, 
  ExternalLink, 
  Copy, 
  RefreshCw, 
  Settings, 
  Share2,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from 'lucide-react';

interface DeploymentStatus {
  id: string;
  url: string;
  status: 'building' | 'deployed' | 'failed';
  timestamp: string;
  buildTime: number;
  size: string;
}

interface LivePreviewDeployProps {
  projectCode: string;
  projectName: string;
  onDeploymentUpdate: (deployment: DeploymentStatus) => void;
}

export function LivePreviewDeploy({ projectCode, projectName, onDeploymentUpdate }: LivePreviewDeployProps) {
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([
    {
      id: 'deploy-1',
      url: 'https://preview-abc123.starsky.app',
      status: 'deployed',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      buildTime: 45,
      size: '2.3 MB'
    },
    {
      id: 'deploy-2',
      url: 'https://preview-def456.starsky.app',
      status: 'deployed',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      buildTime: 38,
      size: '2.1 MB'
    }
  ]);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true);

  const currentDeployment = deployments[0];

  const deployPreview = async () => {
    setIsDeploying(true);
    
    const newDeployment: DeploymentStatus = {
      id: `deploy-${Date.now()}`,
      url: `https://preview-${Math.random().toString(36).substr(2, 9)}.starsky.app`,
      status: 'building',
      timestamp: new Date().toISOString(),
      buildTime: 0,
      size: '0 MB'
    };
    
    setDeployments(prev => [newDeployment, ...prev]);
    
    try {
      // Simulate build process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const completedDeployment = {
        ...newDeployment,
        status: 'deployed' as const,
        buildTime: Math.floor(Math.random() * 60) + 30,
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
      };
      
      setDeployments(prev => prev.map(d => 
        d.id === newDeployment.id ? completedDeployment : d
      ));
      
      onDeploymentUpdate(completedDeployment);
    } catch (error) {
      setDeployments(prev => prev.map(d => 
        d.id === newDeployment.id ? { ...d, status: 'failed' as const } : d
      ));
    } finally {
      setIsDeploying(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const shareDeployment = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: 'Check out my project preview',
        url: url
      });
    } else {
      copyUrl(url);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'building':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'building':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'deployed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Auto-deploy when code changes (if enabled)
  useEffect(() => {
    if (autoDeployEnabled && projectCode) {
      const timer = setTimeout(() => {
        deployPreview();
      }, 2000); // Deploy 2 seconds after code change
      
      return () => clearTimeout(timer);
    }
  }, [projectCode, autoDeployEnabled]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Live Preview
              </CardTitle>
              <CardDescription>
                Automatically deploy and share your project previews
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoDeployEnabled(!autoDeployEnabled)}
              >
                <Zap className={`h-4 w-4 mr-2 ${autoDeployEnabled ? 'text-green-500' : 'text-gray-400'}`} />
                Auto Deploy
              </Button>
              <Button onClick={deployPreview} disabled={isDeploying}>
                {isDeploying ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Globe className="h-4 w-4 mr-2" />
                )}
                Deploy Now
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Deployment */}
          {currentDeployment && (
            <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Current Preview</h3>
                  <Badge className={getStatusColor(currentDeployment.status)}>
                    {getStatusIcon(currentDeployment.status)}
                    <span className="ml-1">{currentDeployment.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyUrl(currentDeployment.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareDeployment(currentDeployment.url)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open(currentDeployment.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <code className="text-sm bg-white px-2 py-1 rounded border">
                    {currentDeployment.url}
                  </code>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Build time: {currentDeployment.buildTime}s</span>
                  <span>Size: {currentDeployment.size}</span>
                  <span>Deployed {formatTimestamp(currentDeployment.timestamp)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Custom Domain */}
          <div>
            <h3 className="text-sm font-medium mb-3">Custom Domain</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="your-domain.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Connect a custom domain to your preview deployments
            </p>
          </div>

          {/* Deployment History */}
          <div>
            <h3 className="text-sm font-medium mb-3">Deployment History</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {deployments.map((deployment) => (
                <div key={deployment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(deployment.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm">{deployment.url.split('//')[1]}</code>
                        <Badge variant="outline" className="text-xs">
                          {deployment.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(deployment.timestamp)} • {deployment.buildTime}s • {deployment.size}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyUrl(deployment.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(deployment.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-3">Preview Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Auto-deploy on changes</span>
                  <p className="text-xs text-muted-foreground">
                    Automatically deploy when code is modified
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoDeployEnabled}
                  onChange={(e) => setAutoDeployEnabled(e.target.checked)}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Password protection</span>
                  <p className="text-xs text-muted-foreground">
                    Require password to access previews
                  </p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Analytics tracking</span>
                  <p className="text-xs text-muted-foreground">
                    Track visitor analytics on preview sites
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}