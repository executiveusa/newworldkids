// User related types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  walletAddress?: string;
  createdAt: Date;
  role: 'user' | 'admin' | 'moderator';
}

// Donation related types
export interface Donation {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  projectId: string;
  message?: string;
  createdAt: Date;
}

// Animal and NFT related types
export interface Animal {
  id: string;
  name: string;
  species: string;
  model3dUrl: string;
  description: string;
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  funFacts: string[];
}

export interface NFTBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Project and Impact types
export interface Project {
  id: string;
  title: string;
  description: string;
  location: GeoLocation;
  targetAmount: number;
  raisedAmount: number;
  status: 'active' | 'completed' | 'pending';
  images: string[];
  category: 'conservation' | 'education' | 'community' | 'research';
}

export interface GeoLocation {
  lat: number;
  lng: number;
  country: string;
  region?: string;
}

// Leaderboard types
export interface LeaderboardEntry {
  id: string;
  userId: string;
  score: number;
  rank: number;
  category: string;
  achievements: string[];
}

// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  tags: string[];
  imageUrl?: string;
  readTime: number;
}

// Firebase Sync types
export interface SyncJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  type: 'import' | 'export' | 'sync';
  progress: number;
  startTime: Date;
  endTime?: Date;
  error?: string;
}
