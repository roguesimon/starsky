"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  ArrowDown, 
  ArrowUp, 
  Copy,
  Edit3,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  Workflow,
  Zap
} from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PromptStep {
  id: string;
  prompt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  error?: string;
  duration?: number;
  model?: string;
  dependsOn?: string[];
}

interface PromptChainBuilderProps {
  projectId: string;
  onChainExecute: (chain: PromptStep[]) => Promise<void>;
}

function SortablePromptStep({ 
  step, 
  index, 
  onEdit, 
  onDelete, 
  onDuplicate 
}: {
  step: PromptStep;
  index: number;
  onEdit: (id: string, prompt: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusIcon = () => {
    switch (step.status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (step.status) {
      case 'pending':
        return 'border-gray-300 bg-gray-50';
      case 'running':
        return 'border-blue-300 bg-blue-50';
      case 'completed':
        return 'border-green-300 bg-green-50';
      case 'failed':
        return 'border-red-300 bg-red-50';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 border-2 rounded-lg cursor-move ${getStatusColor()}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Step {index + 1}
          </Badge>
          {getStatusIcon()}
          <span className="text-sm font-medium capitalize">{step.status}</span>
          {step.model && (
            <Badge variant="secondary" className="text-xs">
              {step.model}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(step.id, step.prompt)}
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDuplicate(step.id)}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(step.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <p className="text-sm mb-2">{step.prompt}</p>
      
      {step.result && (
        <div className="mt-2 p-2 bg-white rounded border">
          <p className="text-xs text-green-600 font-medium">Result:</p>
          <p className="text-xs text-gray-600 line-clamp-2">{step.result}</p>
        </div>
      )}
      
      {step.error && (
        <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
          <p className="text-xs text-red-600 font-medium">Error:</p>
          <p className="text-xs text-red-600">{step.error}</p>
        </div>
      )}
      
      {step.duration && (
        <div className="mt-2 text-xs text-muted-foreground">
          Completed in {step.duration}ms
        </div>
      )}
    </div>
  );
}

export function PromptChainBuilder({ projectId, onChainExecute }: PromptChainBuilderProps) {
  const [steps, setSteps] = useState<PromptStep[]>([]);
  const [newPrompt, setNewPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const addStep = () => {
    if (!newPrompt.trim()) return;
    
    const newStep: PromptStep = {
      id: Date.now().toString(),
      prompt: newPrompt,
      status: 'pending',
    };
    
    setSteps(prev => [...prev, newStep]);
    setNewPrompt('');
  };

  const editStep = (id: string, newPrompt: string) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, prompt: newPrompt } : step
    ));
    setEditingStep(null);
  };

  const deleteStep = (id: string) => {
    setSteps(prev => prev.filter(step => step.id !== id));
  };

  const duplicateStep = (id: string) => {
    const stepToDuplicate = steps.find(step => step.id === id);
    if (!stepToDuplicate) return;
    
    const newStep: PromptStep = {
      ...stepToDuplicate,
      id: Date.now().toString(),
      status: 'pending',
      result: undefined,
      error: undefined,
      duration: undefined,
    };
    
    setSteps(prev => [...prev, newStep]);
  };

  const moveStep = (id: string, direction: 'up' | 'down') => {
    const index = steps.findIndex(step => step.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    
    const newSteps = [...steps];
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    setSteps(newSteps);
  };

  const executeChain = async () => {
    if (steps.length === 0) return;
    
    setIsExecuting(true);
    
    try {
      // Reset all steps to pending
      setSteps(prev => prev.map(step => ({ ...step, status: 'pending' as const })));
      
      // Execute steps sequentially
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        
        // Update step to running
        setSteps(prev => prev.map(s => 
          s.id === step.id ? { ...s, status: 'running' as const } : s
        ));
        
        try {
          const startTime = Date.now();
          
          // Simulate AI processing
          await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
          
          const duration = Date.now() - startTime;
          const result = `Completed step ${i + 1}: ${step.prompt.substring(0, 50)}...`;
          
          // Update step to completed
          setSteps(prev => prev.map(s => 
            s.id === step.id ? { 
              ...s, 
              status: 'completed' as const, 
              result,
              duration,
              model: 'gpt-4o'
            } : s
          ));
          
        } catch (error) {
          // Update step to failed
          setSteps(prev => prev.map(s => 
            s.id === step.id ? { 
              ...s, 
              status: 'failed' as const, 
              error: error instanceof Error ? error.message : 'Unknown error'
            } : s
          ));
          break; // Stop execution on error
        }
      }
      
      await onChainExecute(steps);
      
    } catch (error) {
      console.error('Chain execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        const newItems = [...items];
        const [reorderedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, reorderedItem);
        
        return newItems;
      });
    }
    
    setActiveId(null);
  };

  const clearChain = () => {
    setSteps([]);
  };

  const saveChain = () => {
    // In a real implementation, save to database
    console.log('Saving chain:', steps);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Workflow className="h-5 w-5 mr-2" />
            Prompt Chain Builder
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {steps.length} steps
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={saveChain}
              disabled={steps.length === 0}
            >
              Save Chain
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearChain}
              disabled={steps.length === 0}
            >
              Clear
            </Button>
            <Button
              onClick={executeChain}
              disabled={isExecuting || steps.length === 0}
              size="sm"
            >
              {isExecuting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Execute Chain
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Add New Step */}
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your prompt for this step..."
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={addStep} size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>

        {/* Chain Visualization */}
        <div className="flex-1">
          <ScrollArea className="h-[500px]">
            {steps.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No steps in chain</p>
                <p className="text-sm">Add prompts to create a sequential AI workflow</p>
              </div>
            ) : (
              <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div key={step.id}>
                        <SortablePromptStep
                          step={step}
                          index={index}
                          onEdit={editStep}
                          onDelete={deleteStep}
                          onDuplicate={duplicateStep}
                        />
                        {index < steps.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ArrowDown className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </SortableContext>
                
                <DragOverlay>
                  {activeId ? (
                    <div className="opacity-50 p-4 border-2 rounded-lg bg-white">
                      Step being moved
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </ScrollArea>
        </div>

        {/* Chain Statistics */}
        {steps.length > 0 && (
          <div className="pt-4 border-t">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm font-medium">Total Steps</p>
                <p className="text-2xl font-bold text-primary">{steps.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {steps.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Failed</p>
                <p className="text-2xl font-bold text-red-600">
                  {steps.filter(s => s.status === 'failed').length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-600">
                  {steps.filter(s => s.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}