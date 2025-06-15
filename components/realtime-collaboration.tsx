"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Circle, TextCursor as Cursor, Eye, Edit3, MessageSquare, Wifi, WifiOff } from 'lucide-react';

interface CollaboratorCursor {
  id: string;
  user: {
    name: string;
    avatar?: string;
    color: string;
  };
  position: {
    x: number;
    y: number;
  };
  selection?: {
    start: number;
    end: number;
  };
  lastSeen: string;
}

interface RealtimeCollaborationProps {
  projectId: string;
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  onCodeChange?: (code: string, author: string) => void;
}

export function RealtimeCollaboration({ 
  projectId, 
  currentUser, 
  onCodeChange 
}: RealtimeCollaborationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState<CollaboratorCursor[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Simulate WebSocket connection
  useEffect(() => {
    // In a real implementation, this would connect to your WebSocket server
    const mockConnect = () => {
      setIsConnected(true);
      
      // Simulate other users joining
      const mockCollaborators: CollaboratorCursor[] = [
        {
          id: 'user-2',
          user: {
            name: 'Sarah Chen',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
            color: '#3B82F6'
          },
          position: { x: 150, y: 200 },
          lastSeen: new Date().toISOString()
        },
        {
          id: 'user-3',
          user: {
            name: 'Mike Johnson',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
            color: '#10B981'
          },
          position: { x: 300, y: 150 },
          selection: { start: 45, end: 67 },
          lastSeen: new Date().toISOString()
        }
      ];
      
      setCollaborators(mockCollaborators);
      setActiveUsers(['user-2', 'user-3']);
    };

    const timer = setTimeout(mockConnect, 1000);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Handle mouse movement for cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isConnected || !editorRef.current) return;
      
      const rect = editorRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // In a real implementation, broadcast cursor position via WebSocket
      console.log('Cursor position:', { x, y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isConnected]);

  const handleDisconnect = () => {
    setIsConnected(false);
    setCollaborators([]);
    setActiveUsers([]);
  };

  const handleReconnect = () => {
    setIsConnected(true);
    // Simulate reconnection
  };

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2" />
              Live Collaboration
            </CardTitle>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Badge variant="default" className="bg-green-600">
                  <Wifi className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Disconnected
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={isConnected ? handleDisconnect : handleReconnect}
              >
                {isConnected ? 'Disconnect' : 'Reconnect'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Active Collaborators */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Active Collaborators</h4>
              <div className="space-y-2">
                {/* Current User */}
                <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{currentUser.name} (You)</p>
                    <p className="text-xs text-muted-foreground">Owner • Editing</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Editing
                  </Badge>
                </div>

                {/* Other Collaborators */}
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collaborator.user.avatar} />
                        <AvatarFallback>{collaborator.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Circle 
                        className="absolute -bottom-1 -right-1 h-3 w-3 fill-current"
                        style={{ color: collaborator.user.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{collaborator.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {collaborator.selection ? 'Selecting text' : 'Viewing'}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {collaborator.selection ? (
                        <>
                          <Edit3 className="h-3 w-3 mr-1" />
                          Editing
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Viewing
                        </>
                      )}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Features */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Collaboration Features</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Cursor className="h-4 w-4 mr-2" />
                  Live Cursors
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Shared Editing
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Follow Mode
                </Button>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Circle className="h-2 w-2 text-green-500 fill-current" />
                  <span>Sarah Chen joined the project</span>
                  <span>2 min ago</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Circle className="h-2 w-2 text-blue-500 fill-current" />
                  <span>Mike Johnson edited App.tsx</span>
                  <span>5 min ago</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Circle className="h-2 w-2 text-purple-500 fill-current" />
                  <span>You created a new component</span>
                  <span>8 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cursor Overlay for Editor */}
      <div 
        ref={editorRef}
        className="relative"
        style={{ minHeight: '200px' }}
      >
        {/* Render collaborator cursors */}
        {isConnected && collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: collaborator.position.x,
              top: collaborator.position.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center space-x-1">
              <Cursor 
                className="h-4 w-4"
                style={{ color: collaborator.user.color }}
              />
              <div 
                className="px-2 py-1 rounded text-xs text-white font-medium"
                style={{ backgroundColor: collaborator.user.color }}
              >
                {collaborator.user.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}