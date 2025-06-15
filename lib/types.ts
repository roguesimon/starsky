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
  is_public?: boolean;
  visibility?: 'public' | 'private' | 'team';
  ai_model_preferences?: Record<string, string>;
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

export interface FileVersion {
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

export interface PromptChain {
  id: string;
  name: string;
  steps: PromptStep[];
  created_at: string;
  updated_at: string;
  user_id: string;
  project_id: string;
  is_favorite: boolean;
}

export interface PromptStep {
  id: string;
  prompt: string;
  model_id?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  error?: string;
  duration?: number;
  depends_on?: string[];
}

export interface AIConversation {
  id: string;
  project_id: string;
  user_id: string;
  model_used: string;
  prompt: string;
  response: string;
  prompt_type: string;
  tokens_used: number;
  cost: number;
  duration_ms: number;
  confidence_score?: number;
  is_favorite: boolean;
  created_at: string;
}

export interface DeploymentConfig {
  id: string;
  project_id: string;
  provider: 'vercel' | 'netlify' | 'github-pages';
  site_id?: string;
  custom_domain?: string;
  is_public: boolean;
  auto_deploy: boolean;
  created_at: string;
  updated_at: string;
}

export interface MobileExportConfig {
  id: string;
  project_id: string;
  app_name: string;
  bundle_id: string;
  version: string;
  platforms: ('ios' | 'android' | 'web')[];
  shared_code_enabled: boolean;
  native_optimizations: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIModelPreference {
  id: string;
  user_id: string;
  project_id?: string;
  preferred_models: Record<string, string>;
  auto_select_enabled: boolean;
  created_at: string;
  updated_at: string;
}