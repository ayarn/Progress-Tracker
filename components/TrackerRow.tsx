import React, { useState, useEffect, useRef, useMemo } from 'react';
import { addMonths, subMonths, eachMonthOfInterval, startOfYear, endOfYear, isSameMonth, differenceInMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TrackerConfig, TrackerDataMap } from '../types';
import MonthGrid from './MonthGrid';

interface TrackerRowProps {
  config: TrackerConfig;
  data: TrackerDataMap;
  onToggle: (date: Date) => void;
}

// Fixed width for each month item including gap.
// MonthGrid min-width is approx 160px. Let's fix the container item width.
// We will enforce this width in the render.
const ITEM_WIDTH = 190; // px

const TrackerRow: React.FC<TrackerRowProps> = ({ config, data, onToggle }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Define the master timeline: Jan 2025 to Dec 2030
  const allMonths = useMemo(() => {
    return eachMonthOfInterval({
      start: new Date(2025, 0, 1),
      end: new Date(2030, 11, 31)
    });
  }, []);

  // State for responsive visible count
  const [visibleMonths, setVisibleMonths] = useState(6);
  
  // State for the "Focused" month (the last visible month on the right)
  // Default to current month, but clamped within our range
  const [targetIndex, setTargetIndex] = useState(() => {
    const today = new Date();
    const index = allMonths.findIndex(m => isSameMonth(m, today));
    return index >= 0 ? index : 0;
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleMonths(1);
      } else if (width < 1024) {
        setVisibleMonths(3);
      } else {
        setVisibleMonths(6);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Scrolling Effect
  useEffect(() => {
    if (scrollContainerRef.current) {
      // We want the targetIndex to be the LAST visible item.
      // So the first visible item index is: targetIndex - visibleMonths + 1
      let startHtmlIndex = targetIndex - visibleMonths + 1;
      
      // Clamp logic if we are at the very start
      if (startHtmlIndex < 0) startHtmlIndex = 0;

      const scrollLeftPos = startHtmlIndex * ITEM_WIDTH;

      scrollContainerRef.current.scrollTo({
        left: scrollLeftPos,
        behavior: 'smooth'
      });
    }
  }, [targetIndex, visibleMonths]);

  const years = [2025, 2026, 2027, 2028, 2029, 2030];
  const currentYearSelection = allMonths[targetIndex]?.getFullYear() || 2025;

  const handleYearChange = (year: number) => {
    const today = new Date();
    // If selecting current year, aim for today's month. Else Dec of that year.
    let targetDate: Date;
    if (year === today.getFullYear()) {
      targetDate = today;
    } else {
      targetDate = new Date(year, 11, 1); // Dec 1st
    }
    
    const newIndex = allMonths.findIndex(m => isSameMonth(m, targetDate));
    if (newIndex !== -1) {
      setTargetIndex(newIndex);
    }
  };

  const handlePrev = () => {
    if (targetIndex > 0) {
      setTargetIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (targetIndex < allMonths.length - 1) {
      setTargetIndex(prev => prev + 1);
    }
  };

  // Calculate container width based on visible items
  const containerStyle = {
    width: `${visibleMonths * ITEM_WIDTH}px`
  };

  return (
    <div className="mb-10 w-full animate-fade-in border-b border-border/30 pb-8 last:border-0 last:pb-0">
      {/* Header: Title and Year Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-bold tracking-wide text-gray-200 uppercase flex items-center gap-3">
           <span className={`w-4 h-4 rounded-md ${config.colorClass} shadow-lg ${config.glowClass}`}></span>
           {config.label}
        </h2>

        <div className="relative z-10">
          <select
            value={currentYearSelection}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="appearance-none bg-[#161b22] border border-border text-gray-300 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:border-blue-500/50 hover:border-gray-600 transition-colors cursor-pointer"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      
      {/* Content: Arrows and Carousel */}
      <div className="flex items-center justify-center w-full">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          disabled={targetIndex <= 0}
          className="p-2 mr-2 md:mr-4 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95 flex-shrink-0 disabled:opacity-20 disabled:hover:bg-transparent"
          aria-label="Previous Month"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Scrollable Window Mask */}
        <div 
          style={containerStyle}
          className="relative overflow-hidden transition-[width] duration-300 ease-in-out"
        >
          {/* Moving Track */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth" // overflow-x-hidden to hide scrollbar but allow programmatic scroll
          >
            {allMonths.map((monthDate, idx) => (
              <div 
                key={monthDate.toString()} 
                className="flex-shrink-0 flex justify-center"
                style={{ width: `${ITEM_WIDTH}px` }}
              >
                <MonthGrid
                  monthDate={monthDate}
                  trackerConfig={config}
                  data={data}
                  onToggle={onToggle}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          disabled={targetIndex >= allMonths.length - 1}
          className="p-2 ml-2 md:ml-4 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95 flex-shrink-0 disabled:opacity-20 disabled:hover:bg-transparent"
          aria-label="Next Month"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default TrackerRow;