"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Folder, 
  File, 
  FolderOpen, 
  Edit3, 
  Trash2, 
  Copy, 
  Plus, 
  Save, 
  X,
  MoreHorizontal,
  Code,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MonacoEditor } from '@/components/monaco-editor';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

interface SmartFileExplorerProps {
  onFileSelect: (file: FileNode) => void;
  onPromptInFile: (file: FileNode) => void;
  framework: string;
}

const initialFileStructure: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        isOpen: false,
        children: [
          {
            id: 'header.tsx',
            name: 'Header.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">My App</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}`
          },
          {
            id: 'button.tsx',
            name: 'Button.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ children, onClick, variant = 'primary', size = 'md' }: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      onClick={onClick}
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
    >
      {children}
    </button>
  );
}`
          }
        ]
      },
      {
        id: 'pages',
        name: 'pages',
        type: 'folder',
        isOpen: false,
        children: [
          {
            id: 'index.tsx',
            name: 'index.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to My App
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is a sample application built with modern web technologies.
          </p>
          <Button size="lg">
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}`
          }
        ]
      },
      {
        id: 'styles',
        name: 'styles',
        type: 'folder',
        isOpen: false,
        children: [
          {
            id: 'globals.css',
            name: 'globals.css',
            type: 'file',
            language: 'css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`
          }
        ]
      }
    ]
  },
  {
    id: 'package.json',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "14.0.0",
    "postcss": "^8",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}`
  },
  {
    id: 'readme.md',
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# My App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [\`create-next-app\`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`pages/index.tsx\`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.`
  }
];

export function SmartFileExplorer({ onFileSelect, onPromptInFile, framework }: SmartFileExplorerProps) {
  const [fileStructure, setFileStructure] = useState<FileNode[]>(initialFileStructure);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [editingFile, setEditingFile] = useState<FileNode | null>(null);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file: FileNode } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFolder = (folderId: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === folderId && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setFileStructure(updateNode(fileStructure));
  };

  const handleFileClick = (file: FileNode) => {
    if (file.type === 'folder') {
      toggleFolder(file.id);
    } else {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleRightClick = (e: React.MouseEvent, file: FileNode) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const handleRename = (file: FileNode) => {
    setRenamingFile(file.id);
    setNewFileName(file.name);
    setContextMenu(null);
  };

  const handleDelete = (file: FileNode) => {
    const deleteNode = (nodes: FileNode[], targetId: string): FileNode[] => {
      return nodes.filter(node => {
        if (node.id === targetId) return false;
        if (node.children) {
          node.children = deleteNode(node.children, targetId);
        }
        return true;
      });
    };
    setFileStructure(deleteNode(fileStructure, file.id));
    setContextMenu(null);
    if (selectedFile?.id === file.id) {
      setSelectedFile(null);
    }
  };

  const handleDuplicate = (file: FileNode) => {
    const newFile: FileNode = {
      ...file,
      id: `${file.id}-copy-${Date.now()}`,
      name: `${file.name.split('.')[0]}-copy.${file.name.split('.')[1] || 'txt'}`
    };
    
    // Add to the same parent
    const addNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.children) {
          const hasTarget = node.children.some(child => child.id === file.id);
          if (hasTarget) {
            return { ...node, children: [...node.children, newFile] };
          }
          return { ...node, children: addNode(node.children) };
        }
        return node;
      });
    };
    
    setFileStructure(addNode(fileStructure));
    setContextMenu(null);
  };

  const saveFileContent = (content: string) => {
    if (!editingFile) return;
    
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === editingFile.id) {
          return { ...node, content };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    
    setFileStructure(updateNode(fileStructure));
    setEditingFile(null);
  };

  const getFileIcon = (file: FileNode) => {
    if (file.type === 'folder') {
      return file.isOpen ? FolderOpen : Folder;
    }
    return File;
  };

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'ts': return 'typescript';
      case 'jsx':
      case 'js': return 'javascript';
      case 'css': return 'css';
      case 'html': return 'html';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'py': return 'python';
      default: return 'plaintext';
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map(node => {
      const Icon = getFileIcon(node);
      const isSelected = selectedFile?.id === node.id;
      
      return (
        <div key={node.id}>
          <div
            className={`flex items-center space-x-2 px-2 py-1 hover:bg-muted/50 cursor-pointer rounded ${
              isSelected ? 'bg-primary/10 border border-primary/20' : ''
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => handleFileClick(node)}
            onContextMenu={(e) => handleRightClick(e, node)}
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
            {renamingFile === node.id ? (
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={() => setRenamingFile(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Handle rename logic here
                    setRenamingFile(null);
                  }
                  if (e.key === 'Escape') {
                    setRenamingFile(null);
                  }
                }}
                className="h-6 text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm truncate">{node.name}</span>
            )}
            {node.type === 'file' && (
              <Badge variant="outline" className="text-xs ml-auto">
                {getLanguageFromExtension(node.name)}
              </Badge>
            )}
          </div>
          {node.type === 'folder' && node.isOpen && node.children && (
            <div>
              {renderFileTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex">
      {/* File Tree */}
      <div className="w-80 border-r bg-muted/20 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">File Explorer</h3>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {renderFileTree(fileStructure)}
        </div>
      </div>

      {/* File Editor */}
      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="h-4 w-4" />
                <span className="font-medium">{selectedFile.name}</span>
                <Badge variant="outline" className="text-xs">
                  {getLanguageFromExtension(selectedFile.name)}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPromptInFile(selectedFile)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  AI Prompt
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingFile(selectedFile)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              {editingFile?.id === selectedFile.id ? (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between bg-muted/50">
                    <span className="text-sm font-medium">Editing {editingFile.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => saveFileContent(editingFile.content || '')}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <MonacoEditor
                      value={editingFile.content || ''}
                      onChange={(value) => setEditingFile({ ...editingFile, content: value })}
                      language={getLanguageFromExtension(editingFile.name)}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <MonacoEditor
                    value={selectedFile.content || ''}
                    onChange={() => {}} // Read-only when not editing
                    language={getLanguageFromExtension(selectedFile.name)}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No file selected</h3>
              <p className="text-muted-foreground">
                Select a file from the explorer to view and edit its contents
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white border rounded-lg shadow-lg py-1 min-w-[150px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <button
            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center"
            onClick={() => handleRename(contextMenu.file)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Rename
          </button>
          <button
            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center"
            onClick={() => handleDuplicate(contextMenu.file)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </button>
          <button
            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center"
            onClick={() => onPromptInFile(contextMenu.file)}
          >
            <Zap className="h-4 w-4 mr-2" />
            AI Prompt in File
          </button>
          <div className="border-t my-1" />
          <button
            className="w-full px-3 py-2 text-left text-sm hover:bg-muted text-red-600 flex items-center"
            onClick={() => handleDelete(contextMenu.file)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}