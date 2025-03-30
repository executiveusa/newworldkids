
import React, { useRef, useState, useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const InteractiveMap = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [dimensions, setDimensions] = useState({ width: 1024, height: 450 });
  const [hoveredPin, setHoveredPin] = useState<null | {
    name: string
    x: number
    y: number
    topic: string
    preview: string
  }>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setDimensions({ width: 360, height: 250 });
    } else {
      setDimensions({ width: 1024, height: 450 });
    }
  }, [isMobile]);

  const pins = [
    { name: 'Clean Water', x: 120, y: 220, topic: 'water', preview: 'Clean, community-based access systems.' },
    { name: 'Solar Justice', x: 300, y: 190, topic: 'energy', preview: 'Off-grid solar for liberation.' },
    { name: 'Vertical Farms', x: 450, y: 230, topic: 'food', preview: 'AI-enabled food systems.' },
    { name: 'Eco Housing', x: 380, y: 290, topic: 'shelter', preview: 'Resilient and green shelters.' }
  ];

  const sketch = (p5: any) => {
    p5.setup = () => {
      p5.createCanvas(dimensions.width, dimensions.height);
      p5.noStroke();
    };

    p5.draw = () => {
      p5.clear();
      p5.background(15, 60, 120);

      // Water shimmer effect
      for (let x = 0; x < p5.width; x += 5) {
        const y = dimensions.height - 10 + 4 * Math.sin(x * 0.05 + p5.frameCount * 0.03);
        p5.stroke(180, 230, 255, 120);
        p5.line(x, y, x, y + 10);
      }

      // Draw and animate pins
      pins.forEach(pin => {
        const pulse = 16 + 4 * Math.sin(p5.frameCount * 0.1);
        p5.fill(255, 0, 0);
        p5.ellipse(pin.x, pin.y, pulse, pulse);

        // Hover detection
        if (p5.dist(p5.mouseX, p5.mouseY, pin.x, pin.y) < 20) {
          setHoveredPin(pin);
        }
      });
    };

    p5.mousePressed = () => {
      pins.forEach(pin => {
        if (p5.dist(p5.mouseX, p5.mouseY, pin.x, pin.y) < 20) {
          navigate(`/blog/${pin.topic}`);
        }
      });
    };
  };

  return (
    <div className="relative w-full flex justify-center py-10">
      <div ref={mapRef} className="relative w-full max-w-[1024px] h-auto overflow-hidden rounded-lg shadow-lg glass-effect">
        <ReactP5Wrapper sketch={sketch} />
        
        <AnimatePresence>
          {hoveredPin && (
            <motion.div
              className="absolute bg-background/90 backdrop-blur-lg border border-white/20 rounded-lg p-3 shadow-lg"
              style={{ 
                top: hoveredPin.y - 50, 
                left: hoveredPin.x,
                transform: 'translate(-50%, -100%)',
                maxWidth: '220px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h4 className="text-lg font-bold text-white mb-1">{hoveredPin.name}</h4>
              <p className="text-sm text-white/80">{hoveredPin.preview}</p>
              <div className="text-xs text-brand-light mt-2">Click to explore →</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;
