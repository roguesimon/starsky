"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Terminal, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  Trash2,
  Download,
  Bug,
  Zap
} from 'lucide-react';
import { AILog } from '@/lib/types';

interface AIConsoleProps {
  projectId: string;
  onDebugRequest: (query: string) => void;
}

export function AIConsole({ projectId, onDebugRequest }: AIConsoleProps) {
  const [logs, setLogs] = useState<AILog[]>([
    {
      id: '1',
      message: 'Starting AI code generation...',
      type: 'info',
      timestamp: new Date().toISOString(),
      project_id: projectId,
    },
    {
      id: '2',
      message: 'Analyzing project requirements',
      type: 'info',
      timestamp: new Date(Date.now() - 1000).toISOString(),
      project_id: projectId,
    },
    {
      id: '3',
      message: 'Installing required dependencies: react, tailwindcss',
      type: 'info',
      timestamp: new Date(Date.now() - 2000).toISOString(),
      project_id: projectId,
    },
    {
      id: '4',
      message: 'Warning: Large bundle size detected. Consider code splitting.',
      type: 'warning',
      timestamp: new Date(Date.now() - 3000).toISOString(),
      project_id: projectId,
    },
    {
      id: '5',
      message: 'Successfully generated component structure',
      type: 'success',
      timestamp: new Date(Date.now() - 4000).toISOString(),
      project_id: projectId,
    },
  ]);

  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const addLog = (message: string, type: AILog['type']) => {
    const newLog: AILog = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toISOString(),
      project_id: projectId,
    };
    
    setLogs(prev => [...prev, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const exportLogs = () => {
    const logText = logs.map(log => 
      `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.type.toUpperCase()}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-console-logs-${projectId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLogIcon = (type: AILog['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getLogColor = (type: AILog['type']) => {
    switch (type) {
      case 'info':
        return 'text-blue-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const messages = [
          'Processing user request...',
          'Optimizing code structure',
          'Checking for syntax errors',
          'Updating component dependencies',
          'Validating responsive design',
        ];
        
        const types: AILog['type'][] = ['info', 'success', 'warning'];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        addLog(randomMessage, randomType);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Terminal className="h-5 w-5 mr-2" />
            AI Console
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {logs.length} logs
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDebugRequest('Why is this broken?')}
            >
              <Bug className="h-4 w-4 mr-2" />
              Debug
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
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-2 py-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded">
                <div className="flex-shrink-0 mt-0.5">
                  {getLogIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatTimestamp(log.timestamp)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {log.type}
                    </Badge>
                  </div>
                  <p className={`text-sm mt-1 ${getLogColor(log.type)}`}>
                    {log.message}
                  </p>
                </div>
              </div>
            ))}
            
            {logs.length === 0 && (
              <div className="text-center py-8">
                <Terminal className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Console logs will appear here
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Quick Debug Actions */}
        <div className="border-t p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDebugRequest('Check for errors')}
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              Check Errors
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDebugRequest('Optimize performance')}
            >
              <Zap className="h-3 w-3 mr-1" />
              Optimize
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDebugRequest('Validate responsive design')}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Validate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}