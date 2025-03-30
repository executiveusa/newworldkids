
import React, { useState, useRef, useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type MapPin = {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  link: string;
};

// Pin data for our impact projects
const pins: MapPin[] = [
  {
    id: 'water',
    name: 'Clean Water',
    description: 'Bringing safe water to communities worldwide.',
    x: 0.25, // Normalized coordinates (0-1)
    y: 0.55,
    link: '/blog/water'
  },
  {
    id: 'energy',
    name: 'Solar Justice',
    description: 'Sustainable energy for underserved regions.',
    x: 0.6,
    y: 0.4,
    link: '/blog/energy'
  },
  {
    id: 'food',
    name: 'Vertical Farms',
    description: 'AI-enabled food systems for urban areas.',
    x: 0.7,
    y: 0.55,
    link: '/blog/food'
  },
  {
    id: 'shelter',
    name: 'Eco Housing',
    description: 'Sustainable homes using local materials.',
    x: 0.42,
    y: 0.65,
    link: '/blog/shelter'
  }
];

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
  const updateTooltipPosition = (pin: MapPin) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = pin.x * rect.width;
    const y = pin.y * rect.height;
    
    // Position the tooltip above the pin
    const tooltipX = x;
    const tooltipY = y - 20; // Offset to position above the pin
    
    setTooltipPosition({ x: tooltipX, y: tooltipY });
  };

  // P5.js sketch function
  const sketch = (p5: any) => {
    // Canvas setup
    p5.setup = () => {
      p5.createCanvas(canvasWidth, canvasHeight);
      p5.noStroke();
    };

    // Draw animation frame
    p5.draw = () => {
      // Draw ocean background with gentle wave animation
      drawOceanBackground(p5);
      
      // Draw the world map silhouette
      drawWorldMap(p5);
      
      // Draw animated pins
      drawPins(p5);
      
      // Check for pin hover
      checkPinHover(p5);
    };

    // Draw ocean background with animated waves
    const drawOceanBackground = (p5: any) => {
      // Create a gradient background for the ocean
      for (let y = 0; y < canvasHeight; y++) {
        const inter = p5.map(y, 0, canvasHeight, 0, 1);
        const c = p5.lerpColor(
          p5.color(15, 82, 186, 200), // Deep blue
          p5.color(0, 180, 216, 200),  // Light blue
          inter
        );
        p5.stroke(c);
        p5.line(0, y, canvasWidth, y);
      }
      
      // Animate gentle waves
      p5.noStroke();
      p5.fill(255, 255, 255, 20);
      
      for (let x = 0; x < canvasWidth; x += 20) {
        for (let y = 0; y < canvasHeight; y += 20) {
          const waveX = x + p5.sin(p5.frameCount * 0.05 + y * 0.1) * 5;
          const waveY = y + p5.sin(p5.frameCount * 0.03 + x * 0.1) * 5;
          p5.ellipse(waveX, waveY, 3, 3);
        }
      }
    };

    // Draw a simplified world map
    const drawWorldMap = (p5: any) => {
      p5.fill(30, 40, 50, 180);
      
      // Draw a simplified map shape
      p5.beginShape();
      // North America
      p5.vertex(canvasWidth * 0.1, canvasHeight * 0.2);
      p5.vertex(canvasWidth * 0.3, canvasHeight * 0.2);
      p5.vertex(canvasWidth * 0.3, canvasHeight * 0.45);
      p5.vertex(canvasWidth * 0.15, canvasHeight * 0.5);
      // South America
      p5.vertex(canvasWidth * 0.25, canvasHeight * 0.7);
      p5.vertex(canvasWidth * 0.2, canvasHeight * 0.85);
      // Europe
      p5.vertex(canvasWidth * 0.45, canvasHeight * 0.2);
      p5.vertex(canvasWidth * 0.55, canvasHeight * 0.25);
      // Africa
      p5.vertex(canvasWidth * 0.45, canvasHeight * 0.4);
      p5.vertex(canvasWidth * 0.5, canvasHeight * 0.7);
      p5.vertex(canvasWidth * 0.4, canvasHeight * 0.65);
      // Asia
      p5.vertex(canvasWidth * 0.7, canvasHeight * 0.2);
      p5.vertex(canvasWidth * 0.85, canvasHeight * 0.3);
      p5.vertex(canvasWidth * 0.7, canvasHeight * 0.5);
      // Australia
      p5.vertex(canvasWidth * 0.85, canvasHeight * 0.7);
      p5.vertex(canvasWidth * 0.75, canvasHeight * 0.75);
      p5.endShape(p5.CLOSE);
    };
    
    // Draw animated pins on the map
    const drawPins = (p5: any) => {
      pins.forEach(pin => {
        // Calculate pin position
        const x = pin.x * canvasWidth;
        const y = pin.y * canvasHeight;
        
        // Animate pin size with sine wave
        const pulseSize = 12 + p5.sin(p5.frameCount * 0.1) * 4;
        
        // Draw pin (outer glow)
        p5.fill(255, 50, 50, 100);
        p5.ellipse(x, y, pulseSize + 8, pulseSize + 8);
        
        // Draw pin (inner circle)
        p5.fill(200, 0, 0);
        p5.ellipse(x, y, pulseSize, pulseSize);
        
        // Draw pin center
        p5.fill(255);
        p5.ellipse(x, y, pulseSize / 2, pulseSize / 2);
      });
    };
    
    // Check if mouse is hovering near a pin
    const checkPinHover = (p5: any) => {
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;
      
      // Don't check if mouse is outside canvas
      if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > canvasHeight) {
        return;
      }
      
      let closestPin = null;
      let closestDistance = 30; // Minimum distance to trigger hover
      
      pins.forEach(pin => {
        const x = pin.x * canvasWidth;
        const y = pin.y * canvasHeight;
        const distance = p5.dist(mouseX, mouseY, x, y);
        
        if (distance < closestDistance) {
          closestPin = pin;
          closestDistance = distance;
        }
      });
      
      // Handle pin hover state
      if (closestPin && (!hoveredPin || hoveredPin.id !== closestPin.id)) {
        setHoveredPin(closestPin);
        updateTooltipPosition(closestPin);
      } else if (!closestPin && hoveredPin) {
        setHoveredPin(null);
      }
      
      // Handle pin click (if mouse is pressed)
      if (p5.mouseIsPressed && closestPin) {
        handlePinClick(closestPin);
        p5.mouseIsPressed = false; // Reset to prevent multiple clicks
      }
    };
  };

  return (
    <div className="relative w-full flex justify-center py-10">
      <div
        ref={mapRef}
        className="relative w-full max-w-[1024px] h-auto overflow-hidden rounded-lg shadow-lg glass-effect"
      >
        <ReactP5Wrapper sketch={sketch} />
        
        <AnimatePresence>
          {hoveredPin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 bg-background/90 backdrop-blur-lg border border-white/20 rounded-lg p-3 shadow-lg"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                transform: 'translate(-50%, -100%)',
                maxWidth: '220px'
              }}
            >
              <h4 className="text-lg font-bold text-white mb-1">{hoveredPin.name}</h4>
              <p className="text-sm text-white/80">{hoveredPin.description}</p>
              <div className="text-xs text-brand-light mt-2">Click to explore →</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;
