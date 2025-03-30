
import { MapPin } from './types';

// Pin data for our impact projects
export const pins: MapPin[] = [
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
