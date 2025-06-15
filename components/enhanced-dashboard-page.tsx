"use client";

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { ProjectsDashboard } from '@/components/projects-dashboard';
import { EnhancedDemoPage } from '@/components/enhanced-demo-page';
import { Project } from '@/lib/types';

export function EnhancedDashboardPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCreateProject = () => {
    setShowCreateProject(true);
  };

  const handleBackToDashboard = () => {
    setSelectedProject(null);
    setShowCreateProject(false);
  };

  // If a project is selected or user wants to create a new project, show the enhanced demo page
  if (selectedProject || showCreateProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="p-4 border-b bg-muted/50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToDashboard}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Back to Dashboard
                </button>
                <div className="h-4 w-px bg-border" />
                <h1 className="text-lg font-semibold">
                  {selectedProject ? selectedProject.name : 'New Project'}
                </h1>
              </div>
            </div>
          </div>
          <EnhancedDemoPage />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <ProjectsDashboard 
          onSelectProject={handleSelectProject}
          onCreateProject={handleCreateProject}
        />
      </main>
    </div>
  );
}