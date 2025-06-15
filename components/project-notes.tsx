"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Save, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff,
  Clock
} from 'lucide-react';

interface ProjectNotesProps {
  projectId: string;
}

export function ProjectNotes({ projectId }: ProjectNotesProps) {
  const [notes, setNotes] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load notes on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`project-notes-${projectId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [projectId]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        saveNotes();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [notes, hasUnsavedChanges]);

  const saveNotes = () => {
    localStorage.setItem(`project-notes-${projectId}`, notes);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setHasUnsavedChanges(true);
  };

  const toggleEncryption = () => {
    setIsEncrypted(!isEncrypted);
    // In a real implementation, this would encrypt/decrypt the notes
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never saved';
    
    const now = new Date();
    const diffInMinutes = (now.getTime() - lastSaved.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return 'Saved just now';
    } else if (diffInMinutes < 60) {
      return `Saved ${Math.floor(diffInMinutes)} minutes ago`;
    } else {
      return `Saved at ${lastSaved.toLocaleTimeString()}`;
    }
  };

  const displayNotes = isEncrypted && !isVisible 
    ? notes.replace(/./g, '•') 
    : notes;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Project Notes
            </CardTitle>
            <CardDescription>
              Private notes for your development process
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges && (
              <Badge variant="outline" className="text-xs">
                Unsaved changes
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleEncryption}
              title={isEncrypted ? 'Disable encryption' : 'Enable encryption'}
            >
              {isEncrypted ? (
                <Lock className="h-4 w-4 text-green-600" />
              ) : (
                <Unlock className="h-4 w-4 text-gray-600" />
              )}
            </Button>
            
            {isEncrypted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVisibility}
                title={isVisible ? 'Hide notes' : 'Show notes'}
              >
                {isVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Security Notice */}
        {isEncrypted && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              Notes are encrypted and stored securely
            </span>
          </div>
        )}

        {/* Notes Editor */}
        <div className="flex-1">
          <Textarea
            placeholder="Add your development notes, ideas, todos, or any private thoughts about this project..."
            value={displayNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="h-full min-h-[300px] resize-none font-mono text-sm"
            disabled={isEncrypted && !isVisible}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatLastSaved()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {notes.length} characters
            </span>
            <Button
              size="sm"
              onClick={saveNotes}
              disabled={!hasUnsavedChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Templates</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNotesChange(notes + '\n\n## TODO\n- [ ] ')}
            >
              Add TODO
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNotesChange(notes + '\n\n## Bug Report\n**Issue:** \n**Steps to reproduce:** \n**Expected:** \n**Actual:** ')}
            >
              Bug Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNotesChange(notes + '\n\n## Feature Idea\n**Description:** \n**Priority:** \n**Notes:** ')}
            >
              Feature Idea
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}