"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Github, 
  GitBranch, 
  GitCommit, 
  ExternalLink, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Upload
} from 'lucide-react';

interface GitHubIntegrationProps {
  projectId: string;
  projectName: string;
  code: string;
}

export function GitHubIntegration({ projectId, projectName, code }: GitHubIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/\s+/g, '-'));
  const [commitMessage, setCommitMessage] = useState('Initial commit from Starsky AI');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'creating' | 'pushing' | 'deployed' | 'error'>('idle');
  const [repoUrl, setRepoUrl] = useState('');

  const connectGitHub = async () => {
    // Simulate GitHub OAuth flow
    setIsConnected(true);
  };

  const createRepository = async () => {
    setIsDeploying(true);
    setDeploymentStatus('creating');
    
    try {
      // Simulate repository creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStatus('pushing');
      
      // Simulate code push
      await new Promise(resolve => setTimeout(resolve, 3000));
      setDeploymentStatus('deployed');
      setRepoUrl(`https://github.com/username/${repoName}`);
    } catch (error) {
      setDeploymentStatus('error');
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = () => {
    switch (deploymentStatus) {
      case 'creating':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'pushing':
        return <Upload className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Github className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (deploymentStatus) {
      case 'creating':
        return 'Creating repository...';
      case 'pushing':
        return 'Pushing code to GitHub...';
      case 'deployed':
        return 'Successfully deployed to GitHub!';
      case 'error':
        return 'Deployment failed. Please try again.';
      default:
        return 'Ready to deploy';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="h-5 w-5 mr-2" />
          GitHub Integration
        </CardTitle>
        <CardDescription>
          Export your project to GitHub with automatic commits
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="text-center py-8">
            <Github className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Connect to GitHub</h3>
            <p className="text-muted-foreground mb-4">
              Connect your GitHub account to export projects and enable automatic commits.
            </p>
            <Button onClick={connectGitHub}>
              <Github className="h-4 w-4 mr-2" />
              Connect GitHub Account
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Connected to GitHub</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {deploymentStatus === 'idle' && (
              <>
                {/* Repository Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Repository Name</label>
                    <Input
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      placeholder="my-awesome-project"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Commit Message</label>
                    <Textarea
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      placeholder="Describe your changes..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="private"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="private" className="text-sm">
                      Make repository private
                    </label>
                  </div>
                </div>

                {/* Deploy Button */}
                <Button 
                  onClick={createRepository}
                  disabled={isDeploying || !repoName.trim()}
                  className="w-full"
                >
                  <GitBranch className="h-4 w-4 mr-2" />
                  Create Repository & Push Code
                </Button>
              </>
            )}

            {/* Deployment Status */}
            {deploymentStatus !== 'idle' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-6 border rounded-lg">
                  <div className="text-center">
                    {getStatusIcon()}
                    <p className="mt-2 font-medium">{getStatusText()}</p>
                    {deploymentStatus === 'deployed' && repoUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => window.open(repoUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Repository
                      </Button>
                    )}
                  </div>
                </div>

                {deploymentStatus === 'deployed' && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Next Steps:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Enable GitHub Pages for free hosting</li>
                      <li>• Set up automatic deployments</li>
                      <li>• Invite collaborators to your repository</li>
                      <li>• Configure custom domain (optional)</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Auto-commit Settings */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Auto-commit Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-commit on AI changes</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Create branch for each change</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-generate commit messages</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}