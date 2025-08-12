
import { pins } from './mapData';
import { MapPin } from './types';

type SketchProps = {
  canvasWidth: number;
  canvasHeight: number;
  onPinHover: (pin: MapPin | null, x: number, y: number) => void;
  onPinClick: (pin: MapPin) => void;
};

export function createMapSketch({
  canvasWidth,
  canvasHeight,
  onPinHover,
  onPinClick
}: SketchProps) {
  return (p5: any) => {
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
        onPinHover(null, 0, 0);
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
      if (closestPin) {
        const x = closestPin.x * canvasWidth;
        const y = closestPin.y * canvasHeight;
        onPinHover(closestPin, x, y);
      } else {
        onPinHover(null, 0, 0);
      }
      
      // Handle pin click (if mouse is pressed)
      if (p5.mouseIsPressed && closestPin) {
        onPinClick(closestPin);
        p5.mouseIsPressed = false; // Reset to prevent multiple clicks
      }
    };
  };
}
