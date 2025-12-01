import { format, eachDayOfInterval, startOfMonth, endOfMonth, getDay, startOfWeek, endOfWeek, addMonths, subMonths, isSameDay, parseISO } from 'date-fns';

export const formatDateKey = (date: Date): string => format(date, 'yyyy-MM-dd');

export const getMonthDaysGrid = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  // We want a grid that aligns with weeks, similar to GitHub.
  // GitHub starts columns with Sunday (usually).
  // We need to find the start of the week for the 1st of the month
  // and the end of the week for the last of the month to fill the grid visually.
  
  const matrixStart = startOfWeek(start);
  const matrixEnd = endOfWeek(end);

  return eachDayOfInterval({ start: matrixStart, end: matrixEnd });
};

export const getFormattedDateString = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd (EEEE)');
  } catch (e) {
    return dateString;
  }
};

export const isToday = (date: Date): boolean => isSameDay(date, new Date());
