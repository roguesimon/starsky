"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  History, 
  RotateCcw, 
  Copy, 
  Download, 
  GitBranch,
  Clock,
  User,
  FileText,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';

interface FileVersion {
  id: string;
  content: string;
  timestamp: string;
  author: string;
  message: string;
  changes: {
    additions: number;
    deletions: number;
    modifications: number;
  };
}

interface FileDiffViewerProps {
  fileName: string;
  versions: FileVersion[];
  currentContent: string;
  onRevert: (versionId: string) => void;
  onDuplicate: (versionId: string) => void;
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export function FileDiffViewer({ 
  fileName, 
  versions, 
  currentContent, 
  onRevert, 
  onDuplicate 
}: FileDiffViewerProps) {
  const [selectedVersions, setSelectedVersions] = useState<[string, string]>([
    versions[0]?.id || '',
    versions[1]?.id || ''
  ]);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');

  const generateDiff = (oldContent: string, newContent: string): DiffLine[] => {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const diff: DiffLine[] = [];
    
    // Simple diff algorithm (in production, use a proper diff library)
    let oldIndex = 0;
    let newIndex = 0;
    
    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      const oldLine = oldLines[oldIndex];
      const newLine = newLines[newIndex];
      
      if (oldIndex >= oldLines.length) {
        // Only new lines remaining
        diff.push({
          type: 'added',
          newLineNumber: newIndex + 1,
          content: newLine
        });
        newIndex++;
      } else if (newIndex >= newLines.length) {
        // Only old lines remaining
        diff.push({
          type: 'removed',
          oldLineNumber: oldIndex + 1,
          content: oldLine
        });
        oldIndex++;
      } else if (oldLine === newLine) {
        // Lines are the same
        diff.push({
          type: 'unchanged',
          oldLineNumber: oldIndex + 1,
          newLineNumber: newIndex + 1,
          content: oldLine
        });
        oldIndex++;
        newIndex++;
      } else {
        // Lines are different
        diff.push({
          type: 'removed',
          oldLineNumber: oldIndex + 1,
          content: oldLine
        });
        diff.push({
          type: 'added',
          newLineNumber: newIndex + 1,
          content: newLine
        });
        oldIndex++;
        newIndex++;
      }
    }
    
    return diff;
  };

  const getVersionContent = (versionId: string): string => {
    if (versionId === 'current') return currentContent;
    const version = versions.find(v => v.id === versionId);
    return version?.content || '';
  };

  const oldContent = getVersionContent(selectedVersions[0]);
  const newContent = getVersionContent(selectedVersions[1]);
  const diffLines = generateDiff(oldContent, newContent);

  const getLineTypeColor = (type: DiffLine['type']) => {
    switch (type) {
      case 'added': return 'bg-green-50 border-l-4 border-green-500';
      case 'removed': return 'bg-red-50 border-l-4 border-red-500';
      case 'modified': return 'bg-yellow-50 border-l-4 border-yellow-500';
      default: return '';
    }
  };

  const getLineTypeIcon = (type: DiffLine['type']) => {
    switch (type) {
      case 'added': return <Plus className="h-3 w-3 text-green-600" />;
      case 'removed': return <Minus className="h-3 w-3 text-red-600" />;
      default: return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Version Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            File History: {fileName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Compare From:</label>
              <select
                value={selectedVersions[0]}
                onChange={(e) => setSelectedVersions([e.target.value, selectedVersions[1]])}
                className="w-full p-2 border rounded-md"
              >
                <option value="current">Current Version</option>
                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {formatTimestamp(version.timestamp)} - {version.author}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Compare To:</label>
              <select
                value={selectedVersions[1]}
                onChange={(e) => setSelectedVersions([selectedVersions[0], e.target.value])}
                className="w-full p-2 border rounded-md"
              >
                <option value="current">Current Version</option>
                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {formatTimestamp(version.timestamp)} - {version.author}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('side-by-side')}
              >
                Side by Side
              </Button>
              <Button
                variant={viewMode === 'unified' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('unified')}
              >
                Unified
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600">
                <Plus className="h-3 w-3 mr-1" />
                {diffLines.filter(l => l.type === 'added').length} additions
              </Badge>
              <Badge variant="outline" className="text-red-600">
                <Minus className="h-3 w-3 mr-1" />
                {diffLines.filter(l => l.type === 'removed').length} deletions
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diff Viewer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Diff View</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Diff
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            {viewMode === 'side-by-side' ? (
              <div className="grid grid-cols-2">
                {/* Old Version */}
                <div className="border-r">
                  <div className="bg-red-50 p-2 border-b">
                    <span className="text-sm font-medium text-red-800">
                      {selectedVersions[0] === 'current' ? 'Current' : 'Version ' + selectedVersions[0]}
                    </span>
                  </div>
                  <div className="font-mono text-sm">
                    {oldContent.split('\n').map((line, index) => (
                      <div key={index} className="flex">
                        <span className="w-12 text-gray-400 text-right pr-2 select-none">
                          {index + 1}
                        </span>
                        <span className="flex-1 px-2">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* New Version */}
                <div>
                  <div className="bg-green-50 p-2 border-b">
                    <span className="text-sm font-medium text-green-800">
                      {selectedVersions[1] === 'current' ? 'Current' : 'Version ' + selectedVersions[1]}
                    </span>
                  </div>
                  <div className="font-mono text-sm">
                    {newContent.split('\n').map((line, index) => (
                      <div key={index} className="flex">
                        <span className="w-12 text-gray-400 text-right pr-2 select-none">
                          {index + 1}
                        </span>
                        <span className="flex-1 px-2">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Unified View */
              <div className="font-mono text-sm">
                {diffLines.map((line, index) => (
                  <div key={index} className={`flex ${getLineTypeColor(line.type)}`}>
                    <span className="w-12 text-gray-400 text-right pr-2 select-none">
                      {line.oldLineNumber || ''}
                    </span>
                    <span className="w-12 text-gray-400 text-right pr-2 select-none">
                      {line.newLineNumber || ''}
                    </span>
                    <span className="w-6 flex items-center justify-center">
                      {getLineTypeIcon(line.type)}
                    </span>
                    <span className="flex-1 px-2">{line.content}</span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="h-5 w-5 mr-2" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Version */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Current Version</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Now</span>
                    <User className="h-3 w-3" />
                    <span>You</span>
                  </div>
                </div>
              </div>
              <Badge variant="default">Current</Badge>
            </div>

            {/* Previous Versions */}
            {versions.map((version) => (
              <div key={version.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{version.message}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimestamp(version.timestamp)}</span>
                      <User className="h-3 w-3" />
                      <span>{version.author}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-green-600">
                        +{version.changes.additions}
                      </span>
                      <span className="text-xs text-red-600">
                        -{version.changes.deletions}
                      </span>
                      <span className="text-xs text-yellow-600">
                        ~{version.changes.modifications}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDuplicate(version.id)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevert(version.id)}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Revert
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}