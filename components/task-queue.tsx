"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Play, 
  Pause, 
  Trash2, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Edit3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Task } from '@/lib/types';

interface TaskQueueProps {
  projectId: string;
  onTaskComplete: (result: string) => void;
}

export function TaskQueue({ projectId, onTaskComplete }: TaskQueueProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskPrompt, setNewTaskPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const addTask = () => {
    if (!newTaskPrompt.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      prompt: newTaskPrompt,
      status: 'pending',
      created_at: new Date().toISOString(),
      project_id: projectId,
    };
    
    setTasks(prev => [...prev, newTask]);
    setNewTaskPrompt('');
  };

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const moveTask = (taskId: string, direction: 'up' | 'down') => {
    setTasks(prev => {
      const index = prev.findIndex(task => task.id === taskId);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newTasks = [...prev];
      [newTasks[index], newTasks[newIndex]] = [newTasks[newIndex], newTasks[index]];
      return newTasks;
    });
  };

  const runTasks = async () => {
    setIsRunning(true);
    
    for (const task of tasks) {
      if (task.status !== 'pending') continue;
      
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, status: 'running' } : t
      ));
      
      try {
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const result = `Completed: ${task.prompt}`;
        
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'completed', result } : t
        ));
        
        onTaskComplete(result);
      } catch (error) {
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { 
            ...t, 
            status: 'failed', 
            error: error instanceof Error ? error.message : 'Unknown error'
          } : t
        ));
      }
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
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

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'running':
        return 'default';
      case 'completed':
        return 'default';
      case 'failed':
        return 'destructive';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Task Queue</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {tasks.filter(t => t.status === 'pending').length} pending
            </Badge>
            <Button
              size="sm"
              onClick={runTasks}
              disabled={isRunning || tasks.filter(t => t.status === 'pending').length === 0}
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run Tasks
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Task */}
        <div className="space-y-2">
          <Textarea
            placeholder="Describe what you want to add or change..."
            value={newTaskPrompt}
            onChange={(e) => setNewTaskPrompt(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={addTask} size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Task List */}
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <Card key={task.id} className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    {getStatusIcon(task.status)}
                    <div className="flex-1 min-w-0">
                      {editingTask === task.id ? (
                        <Textarea
                          value={task.prompt}
                          onChange={(e) => {
                            setTasks(prev => prev.map(t => 
                              t.id === task.id ? { ...t, prompt: e.target.value } : t
                            ));
                          }}
                          onBlur={() => setEditingTask(null)}
                          className="min-h-[60px]"
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="text-sm cursor-pointer hover:bg-muted p-1 rounded"
                          onClick={() => setEditingTask(task.id)}
                        >
                          {task.prompt}
                        </p>
                      )}
                      {task.result && (
                        <p className="text-xs text-green-600 mt-1">{task.result}</p>
                      )}
                      {task.error && (
                        <p className="text-xs text-red-600 mt-1">{task.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant={getStatusColor(task.status)} className="text-xs">
                      {task.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveTask(task.id, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveTask(task.id, 'down')}
                      disabled={index === tasks.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTask(task.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}