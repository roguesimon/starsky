"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
  Zap,
  QrCode,
  Lock,
  Unlock,
  Users
} from 'lucide-react';

interface DeploymentStatus {
  id: string;
  url: string;
  status: 'building' | 'deployed' | 'failed';
  timestamp: string;
  buildTime: number;
  size: string;
  isPublic: boolean;
  viewCount: number;
}

interface OneClickPreviewDeployProps {
  projectCode: string;
  projectName: string;
  onDeploymentUpdate: (deployment: DeploymentStatus) => void;
}

export function OneClickPreviewDeploy({ 
  projectCode, 
  projectName, 
  onDeploymentUpdate 
}: OneClickPreviewDeployProps) {
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([
    {
      id: 'deploy-1',
      url: 'https://preview-abc123.starsky.app',
      status: 'deployed',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      buildTime: 45,
      size: '2.3 MB',
      isPublic: true,
      viewCount: 12
    },
    {
      id: 'deploy-2',
      url: 'https://preview-def456.starsky.app',
      status: 'deployed',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      buildTime: 38,
      size: '2.1 MB',
      isPublic: false,
      viewCount: 5
    }
  ]);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  const currentDeployment = deployments[0];

  const deployPreview = async () => {
    setIsDeploying(true);
    
    const newDeployment: DeploymentStatus = {
      id: `deploy-${Date.now()}`,
      url: `https://preview-${Math.random().toString(36).substr(2, 9)}.starsky.app`,
      status: 'building',
      timestamp: new Date().toISOString(),
      buildTime: 0,
      size: '0 MB',
      isPublic,
      viewCount: 0
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

  const toggleVisibility = (deploymentId: string) => {
    setDeployments(prev => prev.map(d => 
      d.id === deploymentId ? { ...d, isPublic: !d.isPublic } : d
    ));
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
                One-Click Preview Deploy
              </CardTitle>
              <CardDescription>
                Instantly deploy and share your project with public/private options
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Auto Deploy</span>
                <Switch
                  checked={autoDeployEnabled}
                  onCheckedChange={setAutoDeployEnabled}
                />
              </div>
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
                  <Badge variant={currentDeployment.isPublic ? "default" : "outline"}>
                    {currentDeployment.isPublic ? (
                      <>
                        <Globe className="h-3 w-3 mr-1" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </>
                    )}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility(currentDeployment.id)}
                  >
                    {currentDeployment.isPublic ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                  </Button>
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
                    variant="outline"
                    size="sm"
                    onClick={() => setShowQRCode(!showQRCode)}
                  >
                    <QrCode className="h-4 w-4" />
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
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {currentDeployment.viewCount} views
                  </span>
                </div>
              </div>
              
              {showQRCode && (
                <div className="mt-4 flex justify-center">
                  <div className="bg-white p-4 rounded-lg border">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentDeployment.url)}`} 
                      alt="QR Code" 
                      className="w-32 h-32"
                    />
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      Scan to view on mobile
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visibility Settings */}
          <div>
            <h3 className="text-sm font-medium mb-3">Visibility Settings</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Project Visibility</h4>
                <p className="text-sm text-muted-foreground">
                  Control who can access your deployed preview
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Private</span>
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <span className="text-sm text-muted-foreground">Public</span>
              </div>
            </div>
          </div>

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
                        {!deployment.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        )}
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
                      onClick={() => toggleVisibility(deployment.id)}
                    >
                      {deployment.isPublic ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
                      )}
                    </Button>
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
                <Switch
                  checked={autoDeployEnabled}
                  onCheckedChange={setAutoDeployEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Password protection</span>
                  <p className="text-xs text-muted-foreground">
                    Require password to access private previews
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Analytics tracking</span>
                  <p className="text-xs text-muted-foreground">
                    Track visitor analytics on preview sites
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}