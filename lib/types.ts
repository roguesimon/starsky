export interface Project {
  id: string;
  name: string;
  description: string;
  code: string;
  preview_image?: string;
  status: 'draft' | 'active' | 'deployed';
  created_at: string;
  updated_at: string;
  user_id: string;
  folder_id?: string;
  is_starred: boolean;
  github_repo?: string;
  notes?: string;
  theme_config?: ThemeConfig;
}

export interface Folder {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  projects: Project[];
}

export interface Task {
  id: string;
  prompt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  error?: string;
  created_at: string;
  project_id: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'blog' | 'saas' | 'dashboard' | 'component';
  preview_image: string;
  code: string;
  tags: string[];
  is_premium: boolean;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  category: 'payment' | 'database' | 'auth' | 'email' | 'analytics' | 'ui' | 'deployment';
  icon: React.ComponentType<any>;
  version: string;
  downloads: number;
  rating: number;
  isPremium: boolean;
  isInstalled: boolean;
  envVars: string[];
  dependencies: string[];
  setupCode: string;
}

export interface Collaborator {
  id: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  project_id: string;
  invited_at: string;
  accepted_at?: string;
}

export interface ThemeConfig {
  primary_color: string;
  secondary_color: string;
  font_family: string;
  brand_name: string;
  logo_url?: string;
}

export interface PromptHistory {
  id: string;
  prompt: string;
  response: string;
  project_id: string;
  created_at: string;
  is_favorite: boolean;
  label?: string;
}

export interface AILog {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  project_id: string;
}

export interface DevicePreview {
  type: 'desktop' | 'tablet' | 'mobile';
  width: number;
  height: number;
  name: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

export interface ProjectMemory {
  id: string;
  framework: string;
  stack: string[];
  patterns: string[];
  preferences: Record<string, any>;
  promptHistory: string[];
  learnings: string[];
  lastUpdated: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'email' | 'github' | 'google';
  subscription?: 'free' | 'pro' | 'enterprise';
  created_at: string;
}