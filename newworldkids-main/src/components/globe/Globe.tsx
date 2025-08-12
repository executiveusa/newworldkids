
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from '../map/types';
import { pins } from '../map/mapData';
import GlobeTooltip from './GlobeTooltip';
import { useToast } from '@/hooks/use-toast';

const Globe: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPin, setHoveredPin] = useState<MapPin | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(450);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isMobile) {
      setWidth(360);
      setHeight(250);
    } else {
      setWidth(1024);
      setHeight(450);
    }
  }, [isMobile]);

  useEffect(() => {
    // Initialize and load the globe visualization
    if (!globeRef.current) return;
    
    const initGlobe = async () => {
      try {
        const container = globeRef.current;
        if (!container) return;
        
        // Get container dimensions
        const rect = container.getBoundingClientRect();
        
        // Create the globe
        const ThreeGlobe = (window as any).ThreeGlobe;
        const globe = new ThreeGlobe({
          waitForGlobeReady: true,
          animateIn: true
        })
          .hexPolygonsData([])
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.7)
          .showAtmosphere(true)
          .atmosphereColor('#3a228a')
          .atmosphereAltitude(0.25)
          .hexPolygonColor(() => {
            return 'rgba(255,255,255, 0.7)';
          });

        // Configure and create the globe visualization
        setTimeout(() => {
          const Globe = (window as any).Globe;
          const globeViz = new Globe(container, {
            globeObject: globe,
            initialPosition: { lat: 25, lng: 8, altitude: 3 },
            enableGlobeGlow: true,
            enableUniverseBackground: true,
            universeBgTexture: 'https://cdn.jsdelivr.net/npm/three-globe@2.24.1/example/img/night-sky.png',
            enableCameraAutoRotate: true,
            cameraAutoRotateSpeed: 0.5
          });

          // Add point markers for each pin
          pins.forEach((pin) => {
            const lat = (pin.y - 0.5) * 180;
            const lng = (pin.x - 0.5) * 360;
            
            const marker = {
              lat,
              lng,
              size: 0.1,
              color: '#ff3333',
              id: pin.id
            };
            
            globeViz.addPointMarker(marker);
          });

          // Handle marker click events
          container.addEventListener('marker-click', (event: any) => {
            const markerId = event.detail.id;
            const pin = pins.find(p => p.id === markerId);
            if (pin) {
              toast({
                title: `Navigating to ${pin.name}`,
                description: "Loading the impact project details...",
                duration: 3000,
              });
              setTimeout(() => {
                navigate(pin.link);
              }, 300);
            }
          });

          // Handle marker hover events
          container.addEventListener('marker-hover', (event: any) => {
            const markerId = event.detail.id;
            const isHovering = event.detail.isHovering;
            const pin = pins.find(p => p.id === markerId);
            
            if (isHovering && pin) {
              const x = event.detail.screenX;
              const y = event.detail.screenY;
              setHoveredPin(pin);
              setTooltipPos({ x, y });
            } else {
              setHoveredPin(null);
            }
          });

          setIsLoading(false);
        }, 100);
      } catch (error) {
        console.error('Error initializing globe:', error);
        setIsLoading(false);
      }
    };

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        // Load required scripts in the correct order
        await loadScript('https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/three-globe@2.24.1/dist/three-globe.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/qglobe@1.2.1/dist/qglobe.min.js');
        
        await initGlobe();
      } catch (error) {
        console.error('Error loading scripts:', error);
        setIsLoading(false);
      }
    };

    loadScripts();

    return () => {
      // Cleanup event listeners if needed
      if (globeRef.current) {
        globeRef.current.innerHTML = '';
      }
    };
  }, [navigate, toast]);

  return (
    <div className="relative w-full flex justify-center" ref={containerRef}>
      <div 
        className="relative w-full max-w-[1024px] h-[450px] md:h-[450px] overflow-hidden rounded-lg shadow-lg glass-effect"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/80 backdrop-blur-sm">
            <div className="text-white flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
              <div>Loading globe visualization...</div>
            </div>
          </div>
        )}
        
        <div 
          ref={globeRef} 
          className="w-full h-full" 
          style={{ width: `${width}px`, height: `${height}px` }}
        />
        
        <AnimatePresence>
          {hoveredPin && (
            <GlobeTooltip
              pin={hoveredPin}
              position={tooltipPos}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Globe;
