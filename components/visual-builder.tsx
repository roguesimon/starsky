"use client";

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layers, 
  Type, 
  Image, 
  Square, 
  Circle, 
  Grid3X3, 
  Layout,
  Palette,
  Settings,
  Trash2,
  Copy,
  Move,
  Eye,
  Code
} from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Component {
  id: string;
  type: 'text' | 'image' | 'button' | 'card' | 'grid' | 'hero' | 'navbar' | 'footer';
  content: string;
  styles: Record<string, string>;
  children?: Component[];
}

interface VisualBuilderProps {
  onCodeChange: (code: string) => void;
  framework: string;
}

const componentLibrary = [
  { type: 'text', label: 'Text', icon: Type, description: 'Add text content' },
  { type: 'image', label: 'Image', icon: Image, description: 'Add images' },
  { type: 'button', label: 'Button', icon: Square, description: 'Interactive buttons' },
  { type: 'card', label: 'Card', icon: Layout, description: 'Content cards' },
  { type: 'grid', label: 'Grid', icon: Grid3X3, description: 'Layout grids' },
  { type: 'hero', label: 'Hero Section', icon: Circle, description: 'Landing hero' },
  { type: 'navbar', label: 'Navigation', icon: Layers, description: 'Navigation bar' },
  { type: 'footer', label: 'Footer', icon: Layers, description: 'Page footer' }
];

function SortableComponent({ component, onSelect, onDelete, isSelected }: {
  component: Component;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600">{component.content || 'Text content'}</p>
          </div>
        );
      case 'button':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              {component.content || 'Button'}
            </button>
          </div>
        );
      case 'card':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Card Title</h3>
              <p className="text-gray-600">{component.content || 'Card content'}</p>
            </div>
          </div>
        );
      case 'hero':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center">
              <h1 className="text-3xl font-bold mb-4">Hero Title</h1>
              <p className="text-lg mb-6">{component.content || 'Hero description'}</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        );
      case 'navbar':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <nav className="bg-white border-b p-4 flex justify-between items-center">
              <div className="font-bold text-xl">Logo</div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </nav>
          </div>
        );
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              {component.type} component
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onSelect(component.id)}
    >
      {renderComponent()}
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="h-6 w-6 p-0">
            <Copy className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(component.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function VisualBuilder({ onCodeChange, framework }: VisualBuilderProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type: type as Component['type'],
      content: '',
      styles: {}
    };
    setComponents(prev => [...prev, newComponent]);
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setComponents((items) => {
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

  const generateCode = useCallback(() => {
    const generateComponentCode = (comp: Component): string => {
      switch (comp.type) {
        case 'text':
          return `<p className="text-gray-600">${comp.content || 'Text content'}</p>`;
        case 'button':
          return `<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            ${comp.content || 'Button'}
          </button>`;
        case 'card':
          return `<div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Card Title</h3>
            <p className="text-gray-600">${comp.content || 'Card content'}</p>
          </div>`;
        case 'hero':
          return `<section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Hero Title</h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">${comp.content || 'Hero description'}</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </section>`;
        case 'navbar':
          return `<nav className="bg-white border-b shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="font-bold text-xl">Logo</div>
                <div className="hidden md:flex space-x-8">
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </nav>`;
        default:
          return `<div className="p-4">${comp.type} component</div>`;
      }
    };

    const componentCodes = components.map(generateComponentCode);
    
    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Builder App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
  <div className="min-h-screen">
    ${componentCodes.join('\n    ')}
  </div>
</body>
</html>`;

    onCodeChange(fullCode);
  }, [components, onCodeChange]);

  // Generate code whenever components change
  React.useEffect(() => {
    generateCode();
  }, [generateCode]);

  return (
    <div className="h-full flex">
      {/* Component Library */}
      <div className="w-80 border-r bg-muted/20 p-4">
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="components" className="mt-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                Drag components to canvas
              </h3>
              {componentLibrary.map((comp) => (
                <Button
                  key={comp.type}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => addComponent(comp.type)}
                >
                  <comp.icon className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{comp.label}</div>
                    <div className="text-xs text-muted-foreground">{comp.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="properties" className="mt-4">
            {selectedComponent ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Component Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <textarea 
                      className="w-full mt-1 p-2 border rounded text-sm"
                      placeholder="Enter content..."
                      rows={3}
                      onChange={(e) => {
                        setComponents(prev => prev.map(comp => 
                          comp.id === selectedComponent 
                            ? { ...comp, content: e.target.value }
                            : comp
                        ));
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CSS Classes</label>
                    <input 
                      type="text"
                      className="w-full mt-1 p-2 border rounded text-sm"
                      placeholder="Additional classes..."
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center text-muted-foreground text-sm py-8">
                Select a component to edit properties
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Visual Canvas</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{components.length} components</Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={generateCode}>
                <Code className="h-4 w-4 mr-2" />
                Generate Code
              </Button>
            </div>
          </div>

          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg min-h-[600px] p-6">
            {components.length === 0 ? (
              <div className="text-center text-muted-foreground py-20">
                <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Start building your app</p>
                <p className="text-sm">Drag components from the sidebar to get started</p>
              </div>
            ) : (
              <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {components.map((component) => (
                      <SortableComponent
                        key={component.id}
                        component={component}
                        onSelect={setSelectedComponent}
                        onDelete={deleteComponent}
                        isSelected={selectedComponent === component.id}
                      />
                    ))}
                  </div>
                </SortableContext>
                
                <DragOverlay>
                  {activeId ? (
                    <div className="opacity-50">
                      Component being dragged
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}