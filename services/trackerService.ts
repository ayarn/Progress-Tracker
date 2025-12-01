import { supabase } from './supabaseClient';
import { AllTrackersData, TrackerType } from '../types';
import { formatDateKey } from '../utils/dateUtils';

// Helper to store in local storage if Supabase is not configured
const LOCAL_STORAGE_KEY = 'life_grid_data';

const getLocalData = (): AllTrackersData => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

const saveLocalData = (data: AllTrackersData) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const fetchAllActivities = async (): Promise<AllTrackersData> => {
  if (!supabase) {
    console.warn("Supabase not configured. Using LocalStorage.");
    return getLocalData();
  }

  const { data, error } = await supabase
    .from('activity_logs')
    .select('tracker_id, date');

  if (error) {
    console.error('Error fetching activities:', error);
    return getLocalData(); // Fallback
  }

  const resultMap: AllTrackersData = {};

  data?.forEach((row: any) => {
    if (!resultMap[row.tracker_id]) {
      resultMap[row.tracker_id] = {};
    }
    resultMap[row.tracker_id][row.date] = true;
  });

  return resultMap;
};

export const toggleActivity = async (
  trackerId: TrackerType, 
  date: Date, 
  currentStatus: boolean,
  currentData: AllTrackersData
): Promise<AllTrackersData> => {
  const dateStr = formatDateKey(date);
  
  // Optimistic Update Data structure
  const newData = { ...currentData };
  if (!newData[trackerId]) newData[trackerId] = {};
  
  if (currentStatus) {
    delete newData[trackerId][dateStr];
  } else {
    newData[trackerId][dateStr] = true;
  }

  if (!supabase) {
    saveLocalData(newData);
    return newData;
  }

  try {
    if (currentStatus) {
      // Remove
      await supabase
        .from('activity_logs')
        .delete()
        .match({ tracker_id: trackerId, date: dateStr });
    } else {
      // Add
      await supabase
        .from('activity_logs')
        .insert([{ tracker_id: trackerId, date: dateStr }]);
    }
    return newData;
  } catch (error) {
    console.error("Error toggling activity:", error);
    return currentData; // Revert if failed
  }
};
