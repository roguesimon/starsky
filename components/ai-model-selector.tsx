"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Zap, 
  Crown, 
  Clock, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { AI_MODELS, AIModel, getOptimalModel, classifyPrompt } from '@/lib/ai-models';

interface AIModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  userTier: 'free' | 'pro' | 'enterprise';
  currentPrompt?: string;
  autoSelect?: boolean;
  onAutoSelectChange?: (enabled: boolean) => void;
}

export function AIModelSelector({ 
  selectedModel, 
  onModelChange, 
  userTier, 
  currentPrompt = '',
  autoSelect = true,
  onAutoSelectChange 
}: AIModelSelectorProps) {
  const [showDetails, setShowDetails] = useState(false);

  const availableModels = AI_MODELS.filter(model => 
    model.isAvailable && (userTier !== 'free' || !model.isPremium)
  );

  const recommendedModel = currentPrompt 
    ? getOptimalModel(classifyPrompt(currentPrompt), userTier)
    : availableModels[0];

  const getLatencyColor = (latency: string) => {
    switch (latency) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getLatencyIcon = (latency: string) => {
    switch (latency) {
      case 'low': return <Zap className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'high': return <AlertCircle className="h-3 w-3" />;
      default: return <Info className="h-3 w-3" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Settings className="h-5 w-5 mr-2" />
              AI Model Selection
            </CardTitle>
            <CardDescription>
              Choose the optimal AI model for your task
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Auto-select</span>
            <Switch
              checked={autoSelect}
              onCheckedChange={onAutoSelectChange}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Recommended Model Alert */}
        {currentPrompt && recommendedModel.id !== selectedModel && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Recommended: {recommendedModel.name}
              </span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Based on your prompt type: {classifyPrompt(currentPrompt)}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 text-blue-700 border-blue-300"
              onClick={() => onModelChange(recommendedModel.id)}
            >
              Use Recommended
            </Button>
          </div>
        )}

        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableModels.map((model) => (
            <Card 
              key={model.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedModel === model.id 
                  ? 'ring-2 ring-primary border-primary shadow-lg' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onModelChange(model.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{model.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm">{model.name}</h3>
                      <p className="text-xs text-muted-foreground">{model.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {selectedModel === model.id && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {model.isPremium && (
                      <Crown className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {model.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">{model.role}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Latency:</span>
                    <div className={`flex items-center space-x-1 ${getLatencyColor(model.latency)}`}>
                      {getLatencyIcon(model.latency)}
                      <span className="capitalize">{model.latency}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Cost:</span>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{(model.costPerToken * 1000).toFixed(4)}/1K tokens</span>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {model.capabilities.slice(0, 3).map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                    {model.capabilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{model.capabilities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Unavailable Models */}
        {AI_MODELS.filter(m => !m.isAvailable).length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Coming Soon
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {AI_MODELS.filter(m => !m.isAvailable).map((model) => (
                <div key={model.id} className="p-2 border rounded-lg opacity-50">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{model.icon}</span>
                    <div>
                      <p className="text-xs font-medium">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.provider}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Model Details Toggle */}
        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full"
          >
            {showDetails ? 'Hide' : 'Show'} Model Details
          </Button>
          
          {showDetails && (
            <div className="mt-4 space-y-4">
              {availableModels.map((model) => (
                <Card key={`details-${model.id}`} className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl">{model.icon}</span>
                    <h4 className="font-semibold">{model.name}</h4>
                    <Badge className={model.color}>{model.role}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Capabilities</h5>
                      <ul className="space-y-1">
                        {model.capabilities.map((cap, index) => (
                          <li key={index} className="text-muted-foreground">• {cap}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Specialties</h5>
                      <div className="flex flex-wrap gap-1">
                        {model.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <div>Max Tokens: {model.maxTokens.toLocaleString()}</div>
                        <div>Cost: ${(model.costPerToken * 1000).toFixed(6)}/1K tokens</div>
                        <div>Latency: {model.latency}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}