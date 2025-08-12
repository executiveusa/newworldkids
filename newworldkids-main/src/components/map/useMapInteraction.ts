
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from './types';

type UseMapInteractionProps = {
  onPinHover?: (pin: MapPin | null, x: number, y: number) => void;
};

export function useMapInteraction({ onPinHover }: UseMapInteractionProps = {}) {
  const [hoveredPin, setHoveredPin] = useState<MapPin | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle pin hover
  const handlePinHover = (pin: MapPin | null, x: number, y: number) => {
    setHoveredPin(pin);
    
    if (pin) {
      // Position the tooltip above the pin
      const tooltipX = x;
      const tooltipY = y - 20; // Offset to position above the pin
      
      setTooltipPosition({ x: tooltipX, y: tooltipY });
    }
    
    // Call any external handlers if provided
    if (onPinHover) {
      onPinHover(pin, x, y);
    }
  };

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

  return {
    hoveredPin,
    tooltipPosition,
    handlePinHover,
    handlePinClick
  };
}
