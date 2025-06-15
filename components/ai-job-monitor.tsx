"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Zap,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Download,
  Trash2
} from 'lucide-react';
import { aiOrchestrator, AIJobLog } from '@/lib/ai-orchestrator';
import { AI_MODELS } from '@/lib/ai-models';

interface AIJobMonitorProps {
  projectId?: string;
  showStats?: boolean;
}

export function AIJobMonitor({ projectId, showStats = true }: AIJobMonitorProps) {
  const [jobLogs, setJobLogs] = useState<AIJobLog[]>([]);
  const [activeJobs, setActiveJobs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    successRate: 0,
    averageDuration: 0,
    totalCost: 0,
    modelUsage: {} as Record<string, number>
  });

  const refreshData = () => {
    const logs = aiOrchestrator.getJobLogs(projectId);
    const activeJobIds = aiOrchestrator.getActiveJobs();
    const usageStats = aiOrchestrator.getUsageStats();
    
    setJobLogs(logs.slice(-50)); // Show last 50 jobs
    setActiveJobs(activeJobIds);
    setStats(usageStats);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 2000); // Refresh every 2 seconds
    return () => clearInterval(interval);
  }, [projectId]);

  const getModelInfo = (modelId: string) => {
    return AI_MODELS.find(m => m.id === modelId) || {
      name: modelId,
      icon: '🤖',
      color: 'text-gray-600'
    };
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatCost = (cost: number) => {
    if (cost < 0.001) return `$${(cost * 1000).toFixed(3)}k`;
    return `$${cost.toFixed(4)}`;
  };

  const exportLogs = () => {
    const csvContent = [
      'Timestamp,Model,Prompt Type,Duration,Tokens,Cost,Success',
      ...jobLogs.map(log => 
        `${log.timestamp},${log.modelUsed},${log.promptType},${log.duration},${log.tokensUsed},${log.cost},${log.success}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-job-logs-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearLogs = () => {
    aiOrchestrator.clearLogs();
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                  <p className="text-2xl font-bold">{stats.totalJobs}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{(stats.successRate * 100).toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">{formatDuration(stats.averageDuration)}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">{formatCost(stats.totalCost)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Model Usage Chart */}
      {showStats && Object.keys(stats.modelUsage).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Model Usage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.modelUsage).map(([modelId, count]) => {
                const model = getModelInfo(modelId);
                const percentage = (count / stats.totalJobs) * 100;
                
                return (
                  <div key={modelId} className="flex items-center space-x-3">
                    <span className="text-lg">{model.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{model.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} jobs ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                AI Job Monitor
              </CardTitle>
              <CardDescription>
                Real-time monitoring of AI model executions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {activeJobs.length > 0 && (
                <Badge variant="secondary" className="animate-pulse">
                  {activeJobs.length} active
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={clearLogs}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-2 p-6">
              {jobLogs.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No AI jobs executed yet
                  </p>
                </div>
              ) : (
                jobLogs.map((log) => {
                  const model = getModelInfo(log.modelUsed);
                  
                  return (
                    <Card key={log.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <span className="text-lg">{model.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{model.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {log.promptType}
                              </Badge>
                              {log.success ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {log.prompt}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDuration(log.duration)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Zap className="h-3 w-3" />
                                <span>{log.tokensUsed} tokens</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatCost(log.cost)}</span>
                              </div>
                            </div>
                            
                            {log.error && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                                Error: {log.error}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}