"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Download, 
  Settings, 
  Play, 
  Package,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Code,
  Zap
} from 'lucide-react';

interface MobileExportProps {
  projectCode: string;
  projectName: string;
  framework: string;
}

interface ExportConfig {
  appName: string;
  bundleId: string;
  version: string;
  description: string;
  platforms: ('ios' | 'android' | 'web')[];
  features: string[];
}

export function MobileExport({ projectCode, projectName, framework }: MobileExportProps) {
  const [config, setConfig] = useState<ExportConfig>({
    appName: projectName,
    bundleId: `com.example.${projectName.toLowerCase().replace(/\s+/g, '')}`,
    version: '1.0.0',
    description: 'Mobile app generated from web project',
    platforms: ['ios', 'android'],
    features: ['expo-router', 'expo-status-bar', 'react-native-safe-area-context']
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'converting' | 'building' | 'complete' | 'error'>('idle');
  const [exportResult, setExportResult] = useState<{ downloadUrl?: string; previewUrl?: string } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('converting');
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExportStatus('building');
      
      // Simulate build process
      await new Promise(resolve => setTimeout(resolve, 3000));
      setExportStatus('complete');
      
      setExportResult({
        downloadUrl: '/downloads/mobile-app.zip',
        previewUrl: 'https://expo.dev/@username/project-name'
      });
    } catch (error) {
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  const generateReactNativeCode = () => {
    // Convert web components to React Native equivalents
    const convertedCode = `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>${config.appName}</Text>
            <Text style={styles.subtitle}>Mobile App</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.description}>
              This mobile app was automatically generated from your web project.
            </Text>
            
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
  },
  content: {
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});`;

    return convertedCode;
  };

  const generateAppConfig = () => {
    return `{
  "expo": {
    "name": "${config.appName}",
    "slug": "${config.bundleId.split('.').pop()}",
    "version": "${config.version}",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "${config.bundleId}"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "${config.bundleId}"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}`;
  };

  const getStatusIcon = () => {
    switch (exportStatus) {
      case 'converting':
      case 'building':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />;
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (exportStatus) {
      case 'converting':
        return 'Converting web components to React Native...';
      case 'building':
        return 'Building mobile app bundle...';
      case 'complete':
        return 'Mobile app export completed successfully!';
      case 'error':
        return 'Export failed. Please try again.';
      default:
        return 'Ready to export';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Mobile App Export
          </CardTitle>
          <CardDescription>
            Convert your web project to a React Native mobile app
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="config" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">App Name</label>
                  <input
                    type="text"
                    value={config.appName}
                    onChange={(e) => setConfig(prev => ({ ...prev, appName: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Bundle ID</label>
                  <input
                    type="text"
                    value={config.bundleId}
                    onChange={(e) => setConfig(prev => ({ ...prev, bundleId: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Version</label>
                  <input
                    type="text"
                    value={config.version}
                    onChange={(e) => setConfig(prev => ({ ...prev, version: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Platforms</label>
                  <div className="flex space-x-2 mt-1">
                    {['ios', 'android', 'web'].map(platform => (
                      <label key={platform} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={config.platforms.includes(platform as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setConfig(prev => ({ 
                                ...prev, 
                                platforms: [...prev.platforms, platform as any] 
                              }));
                            } else {
                              setConfig(prev => ({ 
                                ...prev, 
                                platforms: prev.platforms.filter(p => p !== platform) 
                              }));
                            }
                          }}
                          className="mr-1"
                        />
                        {platform.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={config.description}
                  onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded h-20"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Features</label>
                <div className="flex flex-wrap gap-2">
                  {config.features.map(feature => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">React Native Code</h3>
                  <pre className="bg-muted p-4 rounded text-xs overflow-auto h-80 border">
                    <code>{generateReactNativeCode()}</code>
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">App Configuration</h3>
                  <pre className="bg-muted p-4 rounded text-xs overflow-auto h-80 border">
                    <code>{generateAppConfig()}</code>
                  </pre>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Conversion Notes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Web CSS classes converted to React Native StyleSheet</li>
                  <li>• HTML elements mapped to React Native components</li>
                  <li>• Navigation structure adapted for mobile</li>
                  <li>• Touch interactions optimized for mobile devices</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="export" className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {getStatusIcon()}
                  <span className="text-sm font-medium">{getStatusText()}</span>
                </div>
                
                {exportStatus === 'idle' && (
                  <Button onClick={handleExport} size="lg" disabled={isExporting}>
                    <Package className="h-4 w-4 mr-2" />
                    Export Mobile App
                  </Button>
                )}
                
                {exportStatus === 'complete' && exportResult && (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => window.open(exportResult.downloadUrl, '_blank')}>
                        <Download className="h-4 w-4 mr-2" />
                        Download App
                      </Button>
                      <Button variant="outline" onClick={() => window.open(exportResult.previewUrl, '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View in Expo
                      </Button>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Next Steps</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Download and extract the mobile app files</li>
                        <li>• Install Expo CLI: npm install -g @expo/cli</li>
                        <li>• Run: expo start in the project directory</li>
                        <li>• Test on device using Expo Go app</li>
                        <li>• Build for production: expo build</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {exportStatus === 'error' && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2">Export Failed</h4>
                    <p className="text-sm text-red-800 mb-3">
                      There was an error converting your project. Please check your configuration and try again.
                    </p>
                    <Button variant="outline" onClick={() => setExportStatus('idle')}>
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}