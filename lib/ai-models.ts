export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  role: string;
  capabilities: string[];
  icon: string;
  color: string;
  isAvailable: boolean;
  isPremium: boolean;
  maxTokens: number;
  costPerToken: number;
  latency: 'low' | 'medium' | 'high';
  specialties: string[];
}

export interface AIModelResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata?: {
    reasoning?: string;
    confidence?: number;
    suggestions?: string[];
  };
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Core Developer & Architect - Interprets prompts and generates complete projects',
    role: 'Core Developer & Architect',
    capabilities: [
      'Project scaffolding',
      'Logic design',
      'Component generation',
      'Copywriting',
      'Natural language UX',
      'Real-time suggestions'
    ],
    icon: '🔍',
    color: 'text-green-600',
    isAvailable: true,
    isPremium: false,
    maxTokens: 128000,
    costPerToken: 0.00003,
    latency: 'medium',
    specialties: ['code-generation', 'architecture', 'ui-components', 'copywriting']
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    provider: 'Anthropic',
    description: 'Thought Partner & Safety Advisor - Human-like reasoning and ethical guardrails',
    role: 'Thought Partner & Safety Advisor',
    capabilities: [
      'Human-like reasoning',
      'Business logic verification',
      'Ethical guardrails',
      'Prompt clarification',
      'Code auditing',
      'UX tone improvement'
    ],
    icon: '🧠',
    color: 'text-purple-600',
    isAvailable: true,
    isPremium: true,
    maxTokens: 200000,
    costPerToken: 0.000015,
    latency: 'medium',
    specialties: ['reasoning', 'ethics', 'business-logic', 'ux-writing']
  },
  {
    id: 'gemini-1.5',
    name: 'Gemini 1.5',
    provider: 'Google',
    description: 'Data Integration & Cloud Expert - Specializes in APIs and backend functions',
    role: 'Data Integration & Cloud App Expert',
    capabilities: [
      'Cloud APIs integration',
      'GCP & Firebase',
      'Google Sheets integration',
      'Backend functions',
      'Database optimization',
      'Form handling'
    ],
    icon: '📦',
    color: 'text-blue-600',
    isAvailable: true,
    isPremium: false,
    maxTokens: 1000000,
    costPerToken: 0.0000075,
    latency: 'low',
    specialties: ['apis', 'backend', 'database', 'cloud-services']
  },
  {
    id: 'command-r-plus',
    name: 'Command R+',
    provider: 'Cohere',
    description: 'Debugger & Optimizer - Performance tuning and error fixing specialist',
    role: 'Debugger & Optimizer',
    capabilities: [
      'Performance tuning',
      'Error fixing',
      'Intelligent refactoring',
      'Security suggestions',
      'Runtime error analysis',
      'Code optimization'
    ],
    icon: '🛠️',
    color: 'text-orange-600',
    isAvailable: true,
    isPremium: true,
    maxTokens: 128000,
    costPerToken: 0.000003,
    latency: 'low',
    specialties: ['debugging', 'optimization', 'security', 'refactoring']
  },
  {
    id: 'mistral-8x',
    name: 'Mistral 8x',
    provider: 'Mistral AI',
    description: 'Lightweight Assistant - Fast responses and privacy-first tasks',
    role: 'Lightweight Assistant',
    capabilities: [
      'Simple completions',
      'Code suggestions',
      'Boilerplate generation',
      'Fast responses',
      'Privacy-first processing',
      'Offline capability'
    ],
    icon: '📈',
    color: 'text-indigo-600',
    isAvailable: true,
    isPremium: false,
    maxTokens: 32000,
    costPerToken: 0.0000007,
    latency: 'low',
    specialties: ['completions', 'boilerplate', 'suggestions', 'privacy']
  },
  {
    id: 'llava',
    name: 'LLaVA',
    provider: 'Open Source',
    description: 'Visual Assistant - UI/UX design analysis and generation',
    role: 'UI/UX Visual Assistant',
    capabilities: [
      'Design generation',
      'Screenshot analysis',
      'Component layout review',
      'Visual mockups',
      'Figma-style previews',
      'UI pattern recognition'
    ],
    icon: '🤖',
    color: 'text-pink-600',
    isAvailable: false,
    isPremium: true,
    maxTokens: 4096,
    costPerToken: 0.000001,
    latency: 'high',
    specialties: ['visual-design', 'ui-analysis', 'mockups', 'patterns']
  },
  {
    id: 'whisper',
    name: 'Whisper',
    provider: 'OpenAI',
    description: 'Audio Transcription - Voice commands to text prompts',
    role: 'Audio/Voice Transcription',
    capabilities: [
      'Voice transcription',
      'Audio to text',
      'Voice commands',
      'Accessibility support',
      'Multi-language support',
      'Real-time processing'
    ],
    icon: '🔐',
    color: 'text-teal-600',
    isAvailable: false,
    isPremium: false,
    maxTokens: 0,
    costPerToken: 0.000006,
    latency: 'low',
    specialties: ['transcription', 'voice', 'accessibility', 'audio']
  }
];

export const getModelBySpecialty = (specialty: string): AIModel | null => {
  return AI_MODELS.find(model => 
    model.isAvailable && model.specialties.includes(specialty)
  ) || null;
};

export const getOptimalModel = (promptType: string, userTier: 'free' | 'pro' | 'enterprise'): AIModel => {
  const availableModels = AI_MODELS.filter(model => 
    model.isAvailable && (userTier !== 'free' || !model.isPremium)
  );

  switch (promptType) {
    case 'code-generation':
    case 'architecture':
    case 'component':
      return availableModels.find(m => m.id === 'gpt-4o') || availableModels[0];
    
    case 'debugging':
    case 'optimization':
    case 'performance':
      return availableModels.find(m => m.id === 'command-r-plus') || availableModels[0];
    
    case 'reasoning':
    case 'business-logic':
    case 'ethics':
    case 'ux-writing':
      return availableModels.find(m => m.id === 'claude-3') || availableModels[0];
    
    case 'apis':
    case 'backend':
    case 'database':
    case 'cloud':
      return availableModels.find(m => m.id === 'gemini-1.5') || availableModels[0];
    
    case 'completion':
    case 'suggestion':
    case 'boilerplate':
      return availableModels.find(m => m.id === 'mistral-8x') || availableModels[0];
    
    case 'visual':
    case 'ui-analysis':
    case 'design':
      return availableModels.find(m => m.id === 'llava') || availableModels[0];
    
    default:
      return availableModels.find(m => m.id === 'gpt-4o') || availableModels[0];
  }
};

export const classifyPrompt = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Debug and optimization patterns
  if (lowerPrompt.includes('fix') || lowerPrompt.includes('debug') || 
      lowerPrompt.includes('error') || lowerPrompt.includes('optimize') ||
      lowerPrompt.includes('performance') || lowerPrompt.includes('faster')) {
    return 'debugging';
  }
  
  // API and backend patterns
  if (lowerPrompt.includes('api') || lowerPrompt.includes('database') ||
      lowerPrompt.includes('backend') || lowerPrompt.includes('firebase') ||
      lowerPrompt.includes('cloud') || lowerPrompt.includes('integration')) {
    return 'apis';
  }
  
  // Reasoning and business logic patterns
  if (lowerPrompt.includes('why') || lowerPrompt.includes('explain') ||
      lowerPrompt.includes('business') || lowerPrompt.includes('logic') ||
      lowerPrompt.includes('should') || lowerPrompt.includes('recommend')) {
    return 'reasoning';
  }
  
  // Visual and design patterns
  if (lowerPrompt.includes('design') || lowerPrompt.includes('ui') ||
      lowerPrompt.includes('visual') || lowerPrompt.includes('layout') ||
      lowerPrompt.includes('mockup') || lowerPrompt.includes('screenshot')) {
    return 'visual';
  }
  
  // Simple completion patterns
  if (lowerPrompt.length < 50 || lowerPrompt.includes('complete') ||
      lowerPrompt.includes('suggest') || lowerPrompt.includes('boilerplate')) {
    return 'completion';
  }
  
  // Default to code generation
  return 'code-generation';
};