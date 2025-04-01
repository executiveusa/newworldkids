
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from '../map/types';

type GlobeTooltipProps = {
  pin: MapPin;
  position: { x: number; y: number };
};

const GlobeTooltip: React.FC<GlobeTooltipProps> = ({ pin, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="absolute z-50 bg-background/90 backdrop-blur-lg border border-white/20 rounded-lg p-3 shadow-lg"
      style={{
        left: position.x,
        top: position.y - 100, // Position above the cursor
        transform: 'translate(-50%, -100%)',
        maxWidth: '220px'
      }}
    >
      <h4 className="text-lg font-bold text-white mb-1">{pin.name}</h4>
      <p className="text-sm text-white/80">{pin.description}</p>
      <div className="text-xs text-[#F2FF44] mt-2">Click to explore →</div>
    </motion.div>
  );
};

export default GlobeTooltip;
