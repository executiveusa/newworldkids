
import React, { useState, useRef } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MapTooltip from './map/MapTooltip';
import { pins } from './map/mapData';
import { MapPin } from './map/types';
import { createMapSketch } from './map/MapSketch';

const InteractiveMap = () => {
  const [hoveredPin, setHoveredPin] = useState<MapPin | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Detect if we're on mobile
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Calculate dimensions based on device
  const canvasWidth = isMobile ? 360 : 1024;
  const canvasHeight = isMobile ? 250 : 450;

  // Handle pin click
  const handlePinClick = (pin: MapPin) => {
    toast({
      title: `Navigating to ${pin.name}`,
      description: "Loading the impact project details...",
      duration: 3000,
    });
    
    // Use setTimeout to allow the toast to show before navigation
    setTimeout(() => {
      navigate(pin.link);
    }, 300);
  };

  // Update tooltip position when hovering near a pin
  const handlePinHover = (pin: MapPin | null, x: number, y: number) => {
    setHoveredPin(pin);
    
    if (pin) {
      // Position the tooltip above the pin
      const tooltipX = x;
      const tooltipY = y - 20; // Offset to position above the pin
      
      setTooltipPosition({ x: tooltipX, y: tooltipY });
    }
  };

  // Create the sketch
  const sketch = createMapSketch({
    canvasWidth,
    canvasHeight,
    onPinHover: handlePinHover,
    onPinClick: handlePinClick
  });

  return (
    <div className="relative w-full flex justify-center py-10">
      <div
        ref={mapRef}
        className="relative w-full max-w-[1024px] h-auto overflow-hidden rounded-lg shadow-lg glass-effect"
      >
        <ReactP5Wrapper sketch={sketch} />
        
        <AnimatePresence>
          {hoveredPin && (
            <MapTooltip pin={hoveredPin} position={tooltipPosition} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;
