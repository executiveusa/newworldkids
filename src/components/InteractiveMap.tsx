
import React, { useRef } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence } from 'framer-motion';
import MapTooltip from './map/MapTooltip';
import { pins } from './map/mapData';
import { createMapSketch } from './map/MapSketch';
import { useMapInteraction } from './map/useMapInteraction';

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Use our custom hook for map interactions
  const { 
    hoveredPin, 
    tooltipPosition, 
    handlePinHover, 
    handlePinClick 
  } = useMapInteraction();
  
  // Detect if we're on mobile
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Calculate dimensions based on device
  const canvasWidth = isMobile ? 360 : 1024;
  const canvasHeight = isMobile ? 250 : 450;

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
