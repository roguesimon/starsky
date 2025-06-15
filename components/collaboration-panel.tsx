"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Crown, 
  Edit3, 
  Eye, 
  Trash2,
  Send,
  MessageSquare,
  Circle
} from 'lucide-react';
import { Collaborator } from '@/lib/types';

interface CollaborationPanelProps {
  projectId: string;
  isOwner: boolean;
}

export function CollaborationPanel({ projectId, isOwner }: CollaborationPanelProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      email: 'john@example.com',
      role: 'editor',
      project_id: projectId,
      invited_at: new Date().toISOString(),
      accepted_at: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'sarah@example.com',
      role: 'viewer',
      project_id: projectId,
      invited_at: new Date().toISOString(),
    },
  ]);
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');
  const [activeUsers] = useState(['john@example.com']); // Simulated active users

  const inviteCollaborator = () => {
    if (!inviteEmail.trim()) return;
    
    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      project_id: projectId,
      invited_at: new Date().toISOString(),
    };
    
    setCollaborators(prev => [...prev, newCollaborator]);
    setInviteEmail('');
  };

  const removeCollaborator = (collaboratorId: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
  };

  const updateRole = (collaboratorId: string, newRole: 'editor' | 'viewer') => {
    setCollaborators(prev => prev.map(c => 
      c.id === collaboratorId ? { ...c, role: newRole } : c
    ));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'editor': return Edit3;
      case 'viewer': return Eye;
      default: return Eye;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'text-yellow-600';
      case 'editor': return 'text-blue-600';
      case 'viewer': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Collaboration
              </CardTitle>
              <CardDescription>
                Invite team members to work together
              </CardDescription>
            </div>
            <Badge variant="outline">
              {collaborators.filter(c => c.accepted_at).length + 1} members
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Invite Section */}
          {isOwner && (
            <div className="space-y-3">
              <h4 className="font-medium">Invite Collaborators</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
                <Button onClick={inviteCollaborator}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          )}

          {/* Collaborators List */}
          <div className="space-y-3">
            <h4 className="font-medium">Team Members</h4>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {/* Owner */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                    </div>
                    <div>
                      <p className="font-medium">You (Owner)</p>
                      <p className="text-sm text-muted-foreground">owner@example.com</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Crown className="h-3 w-3 mr-1" />
                    Owner
                  </Badge>
                </div>

                {/* Collaborators */}
                {collaborators.map((collaborator) => {
                  const RoleIcon = getRoleIcon(collaborator.role);
                  const isActive = activeUsers.includes(collaborator.email);
                  
                  return (
                    <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {collaborator.email.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {isActive && (
                            <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{collaborator.email}</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-muted-foreground">
                              {collaborator.accepted_at ? 'Active' : 'Pending invitation'}
                            </p>
                            {isActive && (
                              <Badge variant="outline" className="text-xs">
                                Online
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {isOwner ? (
                          <select
                            value={collaborator.role}
                            onChange={(e) => updateRole(collaborator.id, e.target.value as 'editor' | 'viewer')}
                            className="text-sm px-2 py-1 border rounded"
                          >
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        ) : (
                          <Badge variant="outline">
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {collaborator.role}
                          </Badge>
                        )}
                        
                        {isOwner && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCollaborator(collaborator.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Live Chat */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Team Chat
            </h4>
            <div className="border rounded-lg p-3 h-32 overflow-y-auto bg-muted/20">
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John</p>
                    <p className="text-muted-foreground">Working on the header component</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}