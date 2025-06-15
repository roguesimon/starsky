"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  Sun, 
  Moon,
  Wifi,
  WifiOff,
  Zap
} from 'lucide-react';
import { DEVICE_PRESETS } from '@/lib/constants';
import { DevicePreview as DevicePreviewType } from '@/lib/types';

interface DevicePreviewProps {
  code: string;
  className?: string;
}

export function DevicePreview({ code, className = "" }: DevicePreviewProps) {
  const [selectedDevice, setSelectedDevice] = useState<DevicePreviewType>(DEVICE_PRESETS[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  const getDeviceFrame = () => {
    const width = isRotated && selectedDevice.type !== 'desktop' 
      ? selectedDevice.height 
      : selectedDevice.width;
    const height = isRotated && selectedDevice.type !== 'desktop' 
      ? selectedDevice.width 
      : selectedDevice.height;

    const scale = Math.min(
      (window.innerWidth - 100) / width,
      (window.innerHeight - 200) / height,
      1
    );

    return {
      width: width * scale,
      height: height * scale,
      scale
    };
  };

  const frame = getDeviceFrame();

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Device Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <div className="flex items-center space-x-2">
          {DEVICE_PRESETS.map((device) => {
            const Icon = getDeviceIcon(device.type);
            return (
              <Button
                key={`${device.type}-${device.width}`}
                variant={selectedDevice === device ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice(device)}
                className="flex items-center"
              >
                <Icon className="h-4 w-4 mr-1" />
                {device.name}
              </Button>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {Math.round(frame.width)} × {Math.round(frame.height)}
          </Badge>
          
          {selectedDevice.type !== 'desktop' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRotated(!isRotated)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSlowConnection(!isSlowConnection)}
          >
            {isSlowConnection ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-muted/20 to-muted/40">
        <Card className="relative overflow-hidden shadow-2xl">
          {/* Device Frame */}
          <div 
            className={`relative bg-white ${isDarkMode ? 'dark' : ''}`}
            style={{
              width: frame.width,
              height: frame.height,
            }}
          >
            {/* Loading Overlay for Slow Connection */}
            {isSlowConnection && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <div className="text-center">
                  <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-muted-foreground">Simulating slow connection...</p>
                </div>
              </div>
            )}
            
            {/* Preview Content */}
            <iframe
              srcDoc={isDarkMode ? code.replace('<body', '<body class="dark"') : code}
              className="w-full h-full border-0"
              title="Device Preview"
              style={{
                transform: `scale(${frame.scale})`,
                transformOrigin: 'top left',
                width: `${100 / frame.scale}%`,
                height: `${100 / frame.scale}%`,
              }}
            />
          </div>
          
          {/* Device Info */}
          <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
            {selectedDevice.name} {isRotated ? '(Rotated)' : ''}
          </div>
        </Card>
      </div>
    </div>
  );
}