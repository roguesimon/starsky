"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Folder, 
  FolderPlus, 
  Search, 
  Star, 
  MoreHorizontal,
  Plus,
  Grid3X3,
  List,
  SortAsc,
  Filter,
  Clock,
  Eye,
  Edit,
  Trash2,
  Copy,
  Download,
  Github,
  Globe,
  Users,
  Zap,
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project, Folder as FolderType } from '@/lib/types';

interface ProjectsDashboardProps {
  onSelectProject: (project: Project) => void;
  onCreateProject: () => void;
}

export function ProjectsDashboard({ onSelectProject, onCreateProject }: ProjectsDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Dashboard',
      description: 'Modern admin dashboard for online store with analytics and inventory management',
      code: '',
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T14:30:00Z',
      user_id: 'user1',
      is_starred: true,
      preview_image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Portfolio Website',
      description: 'Personal portfolio with contact form and project showcase',
      code: '',
      status: 'deployed',
      created_at: '2024-01-10T09:00:00Z',
      updated_at: '2024-01-19T16:45:00Z',
      user_id: 'user1',
      is_starred: false,
      github_repo: 'https://github.com/user/portfolio',
      preview_image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Task Management App',
      description: 'Collaborative task tracker with team features and real-time updates',
      code: '',
      status: 'draft',
      created_at: '2024-01-05T11:00:00Z',
      updated_at: '2024-01-18T12:20:00Z',
      user_id: 'user1',
      is_starred: true,
      folder_id: 'folder1',
      preview_image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      name: 'Blog Platform',
      description: 'Content management system with markdown support and SEO optimization',
      code: '',
      status: 'active',
      created_at: '2024-01-01T08:00:00Z',
      updated_at: '2024-01-17T10:15:00Z',
      user_id: 'user1',
      is_starred: false,
      preview_image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'SaaS Landing Page',
      description: 'High-converting landing page with pricing tiers and testimonials',
      code: '',
      status: 'deployed',
      created_at: '2023-12-28T14:00:00Z',
      updated_at: '2024-01-16T09:30:00Z',
      user_id: 'user1',
      is_starred: true,
      github_repo: 'https://github.com/user/saas-landing',
      preview_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'Restaurant Website',
      description: 'Modern restaurant website with menu, reservations, and online ordering',
      code: '',
      status: 'draft',
      created_at: '2023-12-25T16:00:00Z',
      updated_at: '2024-01-15T11:45:00Z',
      user_id: 'user1',
      is_starred: false,
      folder_id: 'folder2',
      preview_image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [folders, setFolders] = useState<FolderType[]>([
    {
      id: 'folder1',
      name: 'Work Projects',
      user_id: 'user1',
      created_at: '2024-01-01T00:00:00Z',
      projects: []
    },
    {
      id: 'folder2',
      name: 'Client Work',
      user_id: 'user1',
      created_at: '2023-12-15T00:00:00Z',
      projects: []
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'name'>('updated');

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = selectedFolder ? project.folder_id === selectedFolder : !project.folder_id;
      return matchesSearch && matchesFolder;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  const toggleStar = (projectId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, is_starred: !p.is_starred } : p
    ));
  };

  const duplicateProject = (project: Project) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'deployed': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'deployed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    deployedProjects: projects.filter(p => p.status === 'deployed').length,
    starredProjects: projects.filter(p => p.is_starred).length
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Projects Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage and organize your AI-generated applications
              </p>
            </div>
            <Button onClick={onCreateProject} size="lg" className="shadow-lg">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Projects</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalProjects}</p>
                  </div>
                  <Folder className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Active</p>
                    <p className="text-2xl font-bold text-green-900">{stats.activeProjects}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Deployed</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.deployedProjects}</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Starred</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats.starredProjects}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy('updated')}>
                    Last Updated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('created')}>
                    Date Created
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('name')}>
                    Name
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r bg-muted/20 p-4">
          <div className="space-y-2">
            <Button
              variant={selectedFolder === null ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedFolder(null)}
            >
              <Folder className="h-4 w-4 mr-2" />
              All Projects
              <Badge variant="secondary" className="ml-auto">
                {projects.filter(p => !p.folder_id).length}
              </Badge>
            </Button>
            
            {folders.map(folder => (
              <Button
                key={folder.id}
                variant={selectedFolder === folder.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFolder(folder.id)}
              >
                <Folder className="h-4 w-4 mr-2" />
                {folder.name}
                <Badge variant="secondary" className="ml-auto">
                  {projects.filter(p => p.folder_id === folder.id).length}
                </Badge>
              </Button>
            ))}
            
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Quick Filters</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Star className="h-3 w-3 mr-2" />
                  Starred
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Globe className="h-3 w-3 mr-2" />
                  Deployed
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Github className="h-3 w-3 mr-2" />
                  GitHub Synced
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className="flex-1 p-6 overflow-y-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map(project => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-200 cursor-pointer border-0 shadow-md hover:scale-[1.02]">
                  <div className="relative">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img 
                        src={project.preview_image} 
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onClick={() => onSelectProject(project)}
                      />
                    </div>
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs bg-white/90 backdrop-blur-sm">
                        <div className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(project.status)}`} />
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(project.id);
                        }}
                        className="bg-white/90 hover:bg-white backdrop-blur-sm h-8 w-8 p-0"
                      >
                        <Star className={`h-4 w-4 ${project.is_starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white backdrop-blur-sm h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onSelectProject(project)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateProject(project)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          {project.github_repo && (
                            <DropdownMenuItem>
                              <Github className="h-4 w-4 mr-2" />
                              View on GitHub
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive" onClick={() => deleteProject(project.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(project.updated_at)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.github_repo && (
                          <Github className="h-4 w-4" />
                        )}
                        {project.status === 'deployed' && (
                          <Globe className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => onSelectProject(project)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Open Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map(project => (
                <Card key={project.id} className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1" onClick={() => onSelectProject(project)}>
                      <div className="w-20 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={project.preview_image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold truncate">{project.name}</h3>
                          {project.is_starred && (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          )}
                          <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs">
                            <div className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(project.status)}`} />
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Updated {formatDate(project.updated_at)}</span>
                          <span>Created {formatDate(project.created_at)}</span>
                          {project.github_repo && (
                            <div className="flex items-center">
                              <Github className="h-3 w-3 mr-1" />
                              GitHub
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSelectProject(project)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateProject(project)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Folder className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? 'Try adjusting your search terms or browse different folders.' 
                    : 'Create your first project to get started with AI-powered development.'}
                </p>
                <Button onClick={onCreateProject} size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Project
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}