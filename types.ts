export enum TrackerType {
  DSA = 'DSA',
  PROJECT = 'PROJECT',
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  WORKOUT = 'WORKOUT'
}

export interface TrackerConfig {
  id: TrackerType;
  label: string;
  colorClass: string;
  glowClass: string;
}

export interface ActivityLog {
  tracker_id: string;
  date: string; // YYYY-MM-DD
}

// Map of 'YYYY-MM-DD' -> boolean
export type TrackerDataMap = Record<string, boolean>;

// Map of TrackerType -> TrackerDataMap
export type AllTrackersData = Record<string, TrackerDataMap>;
