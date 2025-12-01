import React from 'react';
import { Download } from 'lucide-react';
import { AllTrackersData } from '../types';
import { formatDateKey } from '../utils/dateUtils';

interface ControlBarProps {
  allData: AllTrackersData;
}

const ControlBar: React.FC<ControlBarProps> = ({ allData }) => {
  
  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,Tracker,Date\n";
    
    Object.entries(allData).forEach(([trackerId, datesMap]) => {
      Object.keys(datesMap).forEach(date => {
        csvContent += `${trackerId},${date}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `life_grid_tracker_${formatDateKey(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-row justify-between items-center mb-10 gap-4 bg-surface p-4 rounded-xl border border-border/50 sticky top-4 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
      
      {/* Title / Logo Area */}
      <div className="flex items-center gap-3">
         <div className="grid grid-cols-2 gap-1 bg-background p-1.5 rounded border border-border/50">
            <div className="w-2.5 h-2.5 bg-dsa rounded-[1px]"></div>
            <div className="w-2.5 h-2.5 bg-project rounded-[1px]"></div>
            <div className="w-2.5 h-2.5 bg-backend rounded-[1px]"></div>
            <div className="w-2.5 h-2.5 bg-frontend rounded-[1px]"></div>
         </div>
         <div>
            <h1 className="font-bold text-xl tracking-tight text-white leading-none">LifeGrid</h1>
            <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Activity Tracker</span>
         </div>
      </div>

      {/* Right Controls */}
      <button 
        onClick={handleDownloadCsv}
        className="flex items-center gap-2 px-4 py-2 bg-border/40 hover:bg-border/80 rounded-lg text-sm text-gray-300 hover:text-white transition-all active:scale-95 border border-transparent hover:border-gray-500 shadow-sm"
      >
        <Download size={16} />
        <span className="hidden sm:inline">Export Data</span>
        <span className="sm:hidden">CSV</span>
      </button>
    </div>
  );
};

export default ControlBar;