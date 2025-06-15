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