import React, { useMemo } from 'react';
import { getMonthDaysGrid, isToday, formatDateKey, getFormattedDateString } from '../utils/dateUtils';
import { format, isSameMonth } from 'date-fns';
import { TrackerConfig } from '../types';

interface MonthGridProps {
  monthDate: Date;
  trackerConfig: TrackerConfig;
  data: Record<string, boolean>;
  onToggle: (date: Date) => void;
}

const MonthGrid: React.FC<MonthGridProps> = ({ monthDate, trackerConfig, data, onToggle }) => {
  const days = useMemo(() => getMonthDaysGrid(monthDate), [monthDate]);
  
  // Group days into columns (weeks)
  const weeks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < days.length; i += 7) {
      chunks.push(days.slice(i, i + 7));
    }
    return chunks;
  }, [days]);

  return (
    // Fixed width container to ensure carousel items line up perfectly
    // The inner content is centered
    <div className="flex flex-col items-center w-full max-w-[180px]">
      <div className="w-full text-center text-sm text-gray-400 font-medium mb-3">
        {format(monthDate, 'MMM yyyy')}
      </div>
      
      <div className="flex gap-1.5">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1.5">
            {week.map((day, dIndex) => {
              const dateStr = formatDateKey(day);
              const isActive = !!data[dateStr];
              const isCurrentMonth = isSameMonth(day, monthDate);
              const isTodayDate = isToday(day);
              
              // Only render cells that belong to the current month to keep the shape clean
              const isVisible = isCurrentMonth;
              const isClickable = isVisible && isTodayDate;

              return (
                <div
                  key={dateStr}
                  onClick={() => {
                    if (isClickable) {
                      onToggle(day);
                    }
                  }}
                  className={`
                    w-5 h-5 relative group
                    ${!isVisible ? 'opacity-0 pointer-events-none' : ''}
                  `}
                >
                  {/* Visual Cell Layer 
                      Separated from container so opacity doesn't affect the tooltip 
                  */}
                  <div className={`
                    w-full h-full rounded-[4px] transition-all duration-200 border
                    ${isActive 
                        ? `${trackerConfig.colorClass} border-transparent shadow-[0_0_10px_rgba(0,0,0,0.5)]` 
                        : 'bg-surface border-border/60'
                    }
                    ${isClickable 
                        ? 'cursor-pointer ring-2 ring-offset-2 ring-offset-background ring-gray-400 hover:border-gray-400' 
                        : 'cursor-default'
                    }
                    ${!isTodayDate ? 'opacity-40' : ''}
                  `}></div>

                  {/* Tooltip Layer 
                      Rendered outside the opacity layer but inside the relative parent
                  */}
                  {isVisible && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap pointer-events-none">
                      <div className="bg-gray-800 text-white text-xs px-2 py-1.5 rounded-md shadow-xl border border-gray-700 font-medium relative">
                        {getFormattedDateString(dateStr)}
                        {/* Tiny Arrow for tooltip */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-700"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthGrid;