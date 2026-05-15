export type MusicProgram = {
  id: string;
  title: string;
  duration: string;
  level: string;
  badge: string;
  objectives: string[];
  curriculum: string[];
  ragas?: string[];
  raags?: string[];
  compositions?: string[];
  songs?: string[];
  courseContent?: string[];
  skills?: string[];
  certification: string;
  performance?: string[];
};

export type PricingTier = {
  id: string;
  duration: string;
  label: string;
  actualInr: number;
  actualUsd: number;
  offerInr: number;
  offerUsd: number;
};
