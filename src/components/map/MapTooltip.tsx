
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from './types';

type MapTooltipProps = {
  pin: MapPin | null;
  position: { x: number; y: number };
};

const MapTooltip: React.FC<MapTooltipProps> = ({ pin, position }) => {
  if (!pin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-10 bg-background/90 backdrop-blur-lg border border-white/20 rounded-lg p-3 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        maxWidth: '220px'
      }}
    >
      <h4 className="text-lg font-bold text-white mb-1">{pin.name}</h4>
      <p className="text-sm text-white/80">{pin.description}</p>
      <div className="text-xs text-brand-light mt-2">Click to explore →</div>
    </motion.div>
  );
};

export default MapTooltip;
