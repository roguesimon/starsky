import { AIModel, AIModelResponse, getOptimalModel, classifyPrompt, AI_MODELS } from './ai-models';

export interface AIRequest {
  prompt: string;
  context?: string;
  projectId?: string;
  userId?: string;
  userTier: 'free' | 'pro' | 'enterprise';
  preferredModel?: string;
  streaming?: boolean;
  fallbackModels?: string[];
  maxRetries?: number;
  timeout?: number;
}

export interface AIJobLog {
  id: string;
  timestamp: string;
  prompt: string;
  modelUsed: string;
  promptType: string;
  response: string;
  duration: number;
  tokensUsed: number;
  cost: number;
  success: boolean;
  error?: string;
  fallbackAttempts?: number;
  routingDecision?: string;
}

export class AIOrchestrator {
  private jobLogs: AIJobLog[] = [];
  private activeJobs: Map<string, AbortController> = new Map();
  private modelUsageStats: Map<string, { count: number, tokens: number, cost: number }> = new Map();
  private modelAvailability: Map<string, boolean> = new Map(
    AI_MODELS.map(model => [model.id, model.isAvailable])
  );

  async processRequest(request: AIRequest): Promise<{
    response: AIModelResponse;
    jobLog: AIJobLog;
  }> {
    const startTime = Date.now();
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Classify the prompt to determine optimal model
      const promptType = classifyPrompt(request.prompt);
      
      // Get optimal model based on prompt type and user tier
      let selectedModel = request.preferredModel 
        ? AI_MODELS.find(m => m.id === request.preferredModel) || getOptimalModel(promptType, request.userTier)
        : getOptimalModel(promptType, request.userTier);

      // Check if model is available
      if (!this.modelAvailability.get(selectedModel.id)) {
        console.log(`🤖 AI Orchestrator: Primary model ${selectedModel.name} unavailable, using fallback`);
        
        // Try fallback models if specified
        if (request.fallbackModels && request.fallbackModels.length > 0) {
          for (const fallbackId of request.fallbackModels) {
            const fallbackModel = AI_MODELS.find(m => m.id === fallbackId);
            if (fallbackModel && this.modelAvailability.get(fallbackId)) {
              selectedModel = fallbackModel;
              break;
            }
          }
        } else {
          // Default fallback to any available model
          const availableModel = AI_MODELS.find(m => 
            this.modelAvailability.get(m.id) && 
            (request.userTier !== 'free' || !m.isPremium)
          );
          
          if (availableModel) {
            selectedModel = availableModel;
          } else {
            throw new Error('No available AI models found');
          }
        }
      }

      console.log(`🤖 AI Orchestrator: Using ${selectedModel.name} for ${promptType} task`);

      // Create abort controller for this job
      const abortController = new AbortController();
      this.activeJobs.set(jobId, abortController);

      // Set timeout if specified
      let timeoutId: NodeJS.Timeout | undefined;
      if (request.timeout) {
        timeoutId = setTimeout(() => {
          abortController.abort();
        }, request.timeout);
      }

      try {
        // Process the request with the selected model
        const response = await this.callModel(selectedModel, request, abortController.signal);
        
        // Clear timeout if set
        if (timeoutId) clearTimeout(timeoutId);
        
        const duration = Date.now() - startTime;
        const cost = response.usage.totalTokens * selectedModel.costPerToken;

        // Update model usage stats
        this.updateModelStats(selectedModel.id, response.usage.totalTokens, cost);

        // Create job log
        const jobLog: AIJobLog = {
          id: jobId,
          timestamp: new Date().toISOString(),
          prompt: request.prompt,
          modelUsed: selectedModel.id,
          promptType,
          response: response.content,
          duration,
          tokensUsed: response.usage.totalTokens,
          cost,
          success: true,
          routingDecision: `Selected ${selectedModel.name} based on prompt type: ${promptType}`
        };

        this.jobLogs.push(jobLog);
        this.activeJobs.delete(jobId);

        return { response, jobLog };
      } catch (error) {
        // Clear timeout if set
        if (timeoutId) clearTimeout(timeoutId);
        
        // Try fallback models if retries are enabled
        if (request.maxRetries && request.maxRetries > 0) {
          console.log(`🤖 AI Orchestrator: Primary model failed, attempting fallbacks`);
          
          // Mark this model as temporarily unavailable
          this.modelAvailability.set(selectedModel.id, false);
          
          // Reset after 5 minutes
          setTimeout(() => {
            this.modelAvailability.set(selectedModel.id, true);
          }, 5 * 60 * 1000);
          
          // Try with reduced retries
          const fallbackRequest: AIRequest = {
            ...request,
            preferredModel: undefined, // Let orchestrator choose best fallback
            maxRetries: request.maxRetries - 1,
            fallbackModels: request.fallbackModels?.filter(id => id !== selectedModel.id)
          };
          
          return this.processRequest(fallbackRequest);
        }
        
        throw error;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      const jobLog: AIJobLog = {
        id: jobId,
        timestamp: new Date().toISOString(),
        prompt: request.prompt,
        modelUsed: request.preferredModel || 'unknown',
        promptType: classifyPrompt(request.prompt),
        response: '',
        duration,
        tokensUsed: 0,
        cost: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      this.jobLogs.push(jobLog);
      this.activeJobs.delete(jobId);

      throw error;
    }
  }

  private async callModel(
    model: AIModel, 
    request: AIRequest, 
    signal: AbortSignal
  ): Promise<AIModelResponse> {
    // Simulate different model behaviors and response times
    const delay = model.latency === 'low' ? 500 : model.latency === 'medium' ? 1500 : 3000;
    
    await new Promise(resolve => setTimeout(resolve, delay));

    if (signal.aborted) {
      throw new Error('Request aborted');
    }

    // Mock response based on model capabilities
    const response = this.generateMockResponse(model, request.prompt);
    
    return {
      content: response,
      model: model.id,
      usage: {
        promptTokens: Math.floor(request.prompt.length / 4),
        completionTokens: Math.floor(response.length / 4),
        totalTokens: Math.floor((request.prompt.length + response.length) / 4)
      },
      metadata: {
        reasoning: this.generateReasoning(model, request.prompt),
        confidence: Math.random() * 0.3 + 0.7, // 70-100%
        suggestions: this.generateSuggestions(model, request.prompt)
      }
    };
  }

  private generateMockResponse(model: AIModel, prompt: string): string {
    const promptLower = prompt.toLowerCase();

    switch (model.id) {
      case 'gpt-4o':
        if (promptLower.includes('component')) {
          return `// Generated by ${model.name} - Core Developer & Architect
import React from 'react';

export function GeneratedComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Generated Component</h2>
      <p className="text-gray-600">
        This component was generated based on your prompt: "${prompt}"
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
}`;
        }
        return `I'm GPT-4o, your Core Developer & Architect. I've analyzed your request: "${prompt}" and generated a comprehensive solution with proper architecture and component structure.`;

      case 'claude-3':
        return `As Claude 3, your Thought Partner & Safety Advisor, I've carefully considered your request: "${prompt}". 

From a business logic perspective, this approach makes sense because it aligns with user needs and follows best practices. I've also verified that the implementation is ethical and follows privacy guidelines.

Here are my recommendations for improving the user experience and ensuring the solution is both effective and responsible.`;

      case 'gemini-1.5':
        if (promptLower.includes('api') || promptLower.includes('database')) {
          return `// Generated by ${model.name} - Data Integration & Cloud Expert
// Optimized for Google Cloud Platform and Firebase

export async function handleApiIntegration() {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: "${prompt}" })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Integration Error:', error);
    throw error;
  }
}

// Firebase configuration optimized for your use case
export const firebaseConfig = {
  // Optimized settings based on your requirements
};`;
        }
        return `I'm Gemini 1.5, specializing in Data Integration & Cloud services. I've optimized your request for cloud deployment and API efficiency.`;

      case 'command-r-plus':
        return `🛠️ Command R+ Analysis - Debugger & Optimizer

I've identified several optimization opportunities in your request: "${prompt}"

**Performance Improvements:**
- Reduced bundle size by 23%
- Optimized rendering with React.memo
- Implemented lazy loading for better UX

**Security Enhancements:**
- Added input validation
- Implemented CSRF protection
- Sanitized user inputs

**Code Quality:**
- Refactored for better maintainability
- Added TypeScript strict mode
- Improved error handling

The optimized solution is ready for production deployment.`;

      case 'mistral-8x':
        return `Quick response from Mistral 8x - Lightweight Assistant:

Here's a fast, efficient solution for: "${prompt}"

\`\`\`javascript
// Lightweight, optimized code
const solution = {
  fast: true,
  efficient: true,
  privacyFirst: true
};
\`\`\`

This solution prioritizes speed and privacy while maintaining functionality.`;

      case 'llava':
        return `🤖 LLaVA Visual Analysis:

I've analyzed the visual requirements for: "${prompt}"

**UI/UX Recommendations:**
- Modern, clean design with proper spacing
- Accessible color contrast ratios
- Mobile-first responsive layout
- Intuitive user flow

**Component Structure:**
- Header with navigation
- Main content area with cards
- Footer with links

The visual design follows current best practices and accessibility guidelines.`;

      default:
        return `Response generated for: "${prompt}"`;
    }
  }

  private generateReasoning(model: AIModel, prompt: string): string {
    return `${model.name} selected this approach because it aligns with the model's specialty in ${model.role.toLowerCase()} and optimizes for ${model.capabilities.slice(0, 2).join(' and ')}.`;
  }

  private generateSuggestions(model: AIModel, prompt: string): string[] {
    const baseSuggestions = [
      'Consider adding error handling',
      'Implement loading states',
      'Add accessibility features',
      'Optimize for mobile devices'
    ];

    const modelSpecificSuggestions: Record<string, string[]> = {
      'gpt-4o': ['Add TypeScript types', 'Implement unit tests', 'Consider code splitting'],
      'claude-3': ['Review business logic', 'Ensure ethical compliance', 'Improve user messaging'],
      'gemini-1.5': ['Add API caching', 'Implement database indexing', 'Consider cloud functions'],
      'command-r-plus': ['Profile performance', 'Add security headers', 'Implement monitoring'],
      'mistral-8x': ['Minimize bundle size', 'Add offline support', 'Optimize for speed'],
      'llava': ['Improve visual hierarchy', 'Add animations', 'Enhance color scheme']
    };

    return [...baseSuggestions, ...(modelSpecificSuggestions[model.id] || [])];
  }

  private updateModelStats(modelId: string, tokens: number, cost: number) {
    const currentStats = this.modelUsageStats.get(modelId) || { count: 0, tokens: 0, cost: 0 };
    this.modelUsageStats.set(modelId, {
      count: currentStats.count + 1,
      tokens: currentStats.tokens + tokens,
      cost: currentStats.cost + cost
    });
  }

  getJobLogs(projectId?: string): AIJobLog[] {
    return this.jobLogs.filter(log => !projectId || log.prompt.includes(projectId));
  }

  cancelJob(jobId: string): boolean {
    const controller = this.activeJobs.get(jobId);
    if (controller) {
      controller.abort();
      this.activeJobs.delete(jobId);
      return true;
    }
    return false;
  }

  getActiveJobs(): string[] {
    return Array.from(this.activeJobs.keys());
  }

  clearLogs(): void {
    this.jobLogs = [];
  }

  getUsageStats(userId?: string): {
    totalJobs: number;
    successRate: number;
    averageDuration: number;
    totalCost: number;
    modelUsage: Record<string, number>;
    modelCosts: Record<string, number>;
    modelTokens: Record<string, number>;
    promptTypeDistribution: Record<string, number>;
  } {
    const logs = this.jobLogs;
    const successfulJobs = logs.filter(log => log.success);
    
    const modelUsage: Record<string, number> = {};
    const modelCosts: Record<string, number> = {};
    const modelTokens: Record<string, number> = {};
    const promptTypeDistribution: Record<string, number> = {};
    
    logs.forEach(log => {
      // Model usage
      modelUsage[log.modelUsed] = (modelUsage[log.modelUsed] || 0) + 1;
      
      // Model costs
      modelCosts[log.modelUsed] = (modelCosts[log.modelUsed] || 0) + log.cost;
      
      // Model tokens
      modelTokens[log.modelUsed] = (modelTokens[log.modelUsed] || 0) + log.tokensUsed;
      
      // Prompt type distribution
      promptTypeDistribution[log.promptType] = (promptTypeDistribution[log.promptType] || 0) + 1;
    });

    return {
      totalJobs: logs.length,
      successRate: logs.length > 0 ? successfulJobs.length / logs.length : 0,
      averageDuration: logs.length > 0 ? logs.reduce((sum, log) => sum + log.duration, 0) / logs.length : 0,
      totalCost: logs.reduce((sum, log) => sum + log.cost, 0),
      modelUsage,
      modelCosts,
      modelTokens,
      promptTypeDistribution
    };
  }

  getModelAvailability(): Record<string, boolean> {
    return Object.fromEntries(this.modelAvailability);
  }

  setModelAvailability(modelId: string, isAvailable: boolean): void {
    this.modelAvailability.set(modelId, isAvailable);
  }

  getDetailedModelStats(): Record<string, {
    count: number;
    tokens: number;
    cost: number;
    averageResponseTime: number;
    successRate: number;
  }> {
    const result: Record<string, any> = {};
    
    // Initialize with basic stats
    for (const [modelId, stats] of this.modelUsageStats.entries()) {
      result[modelId] = {
        ...stats,
        averageResponseTime: 0,
        successRate: 1
      };
    }
    
    // Add response time and success rate
    for (const model of AI_MODELS) {
      const modelLogs = this.jobLogs.filter(log => log.modelUsed === model.id);
      if (modelLogs.length > 0) {
        const successfulLogs = modelLogs.filter(log => log.success);
        result[model.id] = {
          ...(result[model.id] || { count: 0, tokens: 0, cost: 0 }),
          averageResponseTime: modelLogs.reduce((sum, log) => sum + log.duration, 0) / modelLogs.length,
          successRate: successfulLogs.length / modelLogs.length
        };
      }
    }
    
    return result;
  }
}

// Global orchestrator instance
export const aiOrchestrator = new AIOrchestrator();