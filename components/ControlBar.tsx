import React from "react";
import { Download } from "lucide-react";
import { AllTrackersData } from "../types";
import { formatDateKey } from "../utils/dateUtils";

interface ControlBarProps {
  allData: AllTrackersData;
}

const ControlBar: React.FC<ControlBarProps> = ({ allData }) => {
  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,Tracker,Date\n";

    Object.entries(allData).forEach(([trackerId, datesMap]) => {
      Object.keys(datesMap).forEach((date) => {
        csvContent += `${trackerId},${date}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `life_grid_tracker_${formatDateKey(new Date())}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-3 sm:gap-4 bg-[#1e293b] p-3 sm:p-4 rounded-xl border border-[#5a6b7a]/50 sticky top-4 z-40 shadow-xl backdrop-blur-md bg-opacity-95 w-full">
      {/* Title / Logo Area */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mb-2 sm:mb-0">
        <div className="grid grid-cols-2 gap-1 bg-[#0f172a] p-1.5 rounded border border-[#5a6b7a]/50">
          <div className="w-2.5 h-2.5 bg-[#f97316] rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 bg-[#10b981] rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 bg-[#3b82f6] rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 bg-[#a855f7] rounded-[1px]"></div>
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight text-white leading-none">
            LifeGrid
          </h1>
          <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
            Activity Tracker
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={handleDownloadCsv}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-[#5a6b7a]/40 hover:bg-[#5a6b7a]/80 rounded-lg text-xs sm:text-sm text-gray-300 hover:text-white transition-all active:scale-95 border border-transparent hover:border-gray-500 shadow-sm w-1/2 sm:w-auto"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Export Data</span>
          <span className="sm:hidden">CSV</span>
        </button>
        <button
          onClick={() => (window.location.href = "/notes")}
          className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700 hover:bg-blue-500 rounded-lg text-xs sm:text-sm text-white transition-all active:scale-95 border border-transparent shadow-sm w-1/2 sm:w-auto"
        >
          <span>Notes</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
