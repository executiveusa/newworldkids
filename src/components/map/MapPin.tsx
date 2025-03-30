
import React from 'react';

type MapPinProps = {
  x: number;
  y: number;
  pulseSize: number;
};

const MapPin: React.FC<MapPinProps> = ({ x, y, pulseSize }) => {
  // This is a render-only component that will be used inside the P5 sketch
  // It doesn't actually render directly to the DOM
  return null;
};

export default MapPin;
