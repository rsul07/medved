export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  shortDescription: string;
  description: string;
  images: string[]; // Changed from single image string to array
  category: 'mammal' | 'bird';
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR'; // Least Concern to Critically Endangered
}

export interface MapPoint {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  animalId: string;
  iconType: 'paw' | 'feather';
}

export interface MapZone {
  id: string;
  animalId: string;
  path: string; // SVG path 'd' attribute for the enclosure shape
  labelX: number; // Center X for label (0-1000 scale)
  labelY: number; // Center Y for label (0-600 scale)
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}