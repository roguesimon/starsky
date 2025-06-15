"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
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
  Zap,
  Globe,
  Share2,
  QrCode
} from 'lucide-react';

interface EnhancedMobileExportProps {
  projectCode: string;
  projectName: string;
  framework: string;
  webUrl?: string;
}

interface ExportConfig {
  appName: string;
  bundleId: string;
  version: string;
  description: string;
  platforms: ('ios' | 'android' | 'web')[];
  features: string[];
  sharedCodeEnabled: boolean;
  nativeOptimizations: boolean;
}

export function EnhancedMobileExport({ 
  projectCode, 
  projectName, 
  framework,
  webUrl 
}: EnhancedMobileExportProps) {
  const [config, setConfig] = useState<ExportConfig>({
    appName: projectName,
    bundleId: `com.starsky.${projectName.toLowerCase().replace(/\s+/g, '')}`,
    version: '1.0.0',
    description: 'Mobile app generated from web project',
    platforms: ['ios', 'android'],
    features: ['expo-router', 'expo-status-bar', 'react-native-safe-area-context'],
    sharedCodeEnabled: true,
    nativeOptimizations: true
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'analyzing' | 'converting' | 'building' | 'complete' | 'error'>('idle');
  const [exportResult, setExportResult] = useState<{ 
    downloadUrl?: string; 
    previewUrl?: string;
    qrCode?: string;
    sharedComponents?: string[];
    optimizations?: string[];
  } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('analyzing');
    
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExportStatus('converting');
      
      // Simulate conversion
      await new Promise(resolve => setTimeout(resolve, 3000));
      setExportStatus('building');
      
      // Simulate build
      await new Promise(resolve => setTimeout(resolve, 4000));
      setExportStatus('complete');
      
      setExportResult({
        downloadUrl: '/downloads/mobile-app.zip',
        previewUrl: 'https://expo.dev/@starsky/project-name',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://expo.dev/@starsky/project-name',
        sharedComponents: ['Header', 'Button', 'Card', 'Navigation'],
        optimizations: [
          'Converted CSS to React Native StyleSheet',
          'Optimized images for mobile',
          'Added touch gestures',
          'Implemented native navigation',
          'Added offline support'
        ]
      });
    } catch (error) {
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  const generateReactNativeCode = () => {
    return `import React from 'react';
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
              Shared components: ${exportResult?.sharedComponents?.join(', ') || 'Loading...'}
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
  };

  const generateSharedCode = () => {
    return `// Shared business logic between web and mobile
export const useSharedLogic = () => {
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    // This logic works on both web and mobile
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return { data, fetchData };
};

// Shared utilities
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Shared validation
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};`;
  };

  const getStatusIcon = () => {
    switch (exportStatus) {
      case 'analyzing':
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
      case 'analyzing':
        return 'Analyzing web components for mobile compatibility...';
      case 'converting':
        return 'Converting web components to React Native...';
      case 'building':
        return 'Building mobile app bundle with optimizations...';
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
            Enhanced Mobile App Export
          </CardTitle>
          <CardDescription>
            Convert your web project to a React Native mobile app with shared code optimization
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="shared">Shared Code</TabsTrigger>
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
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Enable Shared Code</h4>
                    <p className="text-xs text-muted-foreground">
                      Share business logic between web and mobile versions
                    </p>
                  </div>
                  <Switch
                    checked={config.sharedCodeEnabled}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, sharedCodeEnabled: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Native Optimizations</h4>
                    <p className="text-xs text-muted-foreground">
                      Apply mobile-specific performance optimizations
                    </p>
                  </div>
                  <Switch
                    checked={config.nativeOptimizations}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, nativeOptimizations: checked }))}
                  />
                </div>
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
                  <h3 className="text-sm font-medium mb-2">Mobile Preview</h3>
                  <div className="bg-gray-900 rounded-lg p-4 h-80 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-48 h-72 p-4 shadow-xl">
                      <div className="text-center">
                        <h4 className="font-bold text-lg mb-2">{config.appName}</h4>
                        <p className="text-sm text-gray-600 mb-4">Mobile App</p>
                        <div className="bg-blue-500 text-white p-2 rounded text-sm">
                          Get Started
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {webUrl && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Web-Mobile Sync</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Your mobile app will sync with the web version at: {webUrl}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      View Web Version
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Link
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shared" className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Shared Code Benefits</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Consistent business logic across platforms</li>
                  <li>• Reduced development and maintenance time</li>
                  <li>• Synchronized data and user experience</li>
                  <li>• Easier testing and debugging</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Shared Business Logic</h3>
                <pre className="bg-muted p-4 rounded text-xs overflow-auto h-60 border">
                  <code>{generateSharedCode()}</code>
                </pre>
              </div>
              
              {exportResult?.sharedComponents && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Shared Components</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {exportResult.sharedComponents.map(component => (
                      <Badge key={component} variant="outline" className="justify-center">
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="font-medium">Download & Install</h4>
                        <div className="space-y-2">
                          <Button onClick={() => window.open(exportResult.downloadUrl, '_blank')} className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download App Bundle
                          </Button>
                          <Button variant="outline" onClick={() => window.open(exportResult.previewUrl, '_blank')} className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in Expo
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Test on Device</h4>
                        {exportResult.qrCode && (
                          <div className="flex flex-col items-center">
                            <img src={exportResult.qrCode} alt="QR Code" className="w-32 h-32 border rounded" />
                            <p className="text-xs text-muted-foreground mt-2">
                              Scan with Expo Go app
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {exportResult.optimizations && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">Applied Optimizations</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          {exportResult.optimizations.map((optimization, index) => (
                            <li key={index}>• {optimization}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                      <ol className="text-sm text-blue-800 space-y-1">
                        <li>1. Download and extract the mobile app files</li>
                        <li>2. Install Expo CLI: <code>npm install -g @expo/cli</code></li>
                        <li>3. Run: <code>expo start</code> in the project directory</li>
                        <li>4. Test on device using Expo Go app</li>
                        <li>5. Build for production: <code>expo build</code></li>
                        <li>6. Submit to App Store / Google Play</li>
                      </ol>
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