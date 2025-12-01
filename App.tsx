import React, { useState, useEffect, useCallback } from "react";
import { TrackerType, TrackerConfig, AllTrackersData } from "./types";
import TrackerRow from "./components/TrackerRow";
import ControlBar from "./components/ControlBar";
import { fetchAllActivities, toggleActivity } from "./services/trackerService";

// Constants for tracker configuration
const TRACKERS: TrackerConfig[] = [
  {
    id: TrackerType.DSA,
    label: "DSA Tracker",
    colorClass: "bg-[#f97316]",
    glowClass: "shadow-orange-500/50",
  },
  {
    id: TrackerType.PROJECT,
    label: "Project Tracker",
    colorClass: "bg-[#10b981]",
    glowClass: "shadow-emerald-500/50",
  },
  {
    id: TrackerType.BACKEND,
    label: "Backend Tracker",
    colorClass: "bg-[#3b82f6]",
    glowClass: "shadow-blue-500/50",
  },
  {
    id: TrackerType.FRONTEND,
    label: "Frontend Tracker",
    colorClass: "bg-[#a855f7]",
    glowClass: "shadow-purple-500/50",
  },
  {
    id: TrackerType.WORKOUT,
    label: "Workout Tracker",
    colorClass: "bg-[#ef4444]",
    glowClass: "shadow-red-500/50",
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<AllTrackersData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedData = await fetchAllActivities();
      setData(fetchedData);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleToggle = useCallback(
    async (trackerId: TrackerType, date: Date, currentStatus: boolean) => {
      // Optimistic UI update handled inside service wrapper or local state re-fetch
      const updatedData = await toggleActivity(
        trackerId,
        date,
        currentStatus,
        data
      );
      setData(updatedData);
    },
    [data]
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-300 font-sans selection:bg-blue-500/30 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <ControlBar allData={data} />

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 text-gray-500 animate-pulse gap-4">
            <div className="w-12 h-12 border-4 border-[#5a6b7a] border-t-blue-500 rounded-full animate-spin"></div>
            <p>Loading your activity grid...</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            {TRACKERS.map((tracker) => (
              <TrackerRow
                key={tracker.id}
                config={tracker}
                data={data[tracker.id] || {}}
                onToggle={(date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const isActive = data[tracker.id]?.[dateStr] || false;
                  handleToggle(tracker.id, date, isActive);
                }}
              />
            ))}
          </div>
        )}

        <footer className="mt-12 border-t border-[#5a6b7a]/50 pt-8 text-center text-sm text-gray-600">
          <p>
            Only the current day can be marked. Hover over cells to see dates.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
