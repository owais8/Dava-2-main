/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IData } from './type';
import { dayjs } from '@/lib';

export const generateDates = (range: string): string[] => {
  const dates: string[] = [];
  const today = dayjs();

  let startDate = today;
  let endDate = today;

  switch (range) {
    case 'today':
      return [today.format('D MMM').toUpperCase()];

    case 'yesterday':
      startDate = today.subtract(1, 'day');

      return [startDate.format('D MMM').toUpperCase()];

    case '7':
      startDate = today.subtract(6, 'days'); // Last 7 days, including today
      break;

    case '30':
      startDate = today.subtract(29, 'days'); // Last 30 days, including today
      break;

    case '90':
      startDate = today.subtract(89, 'days'); // Last 90 days, including today
      break;

    case 'this_month':
      startDate = today.startOf('month'); // Start of the current month
      break;

    case 'last_month':
      startDate = today.subtract(1, 'month').startOf('month'); // Start of last month
      endDate = today.subtract(1, 'month').endOf('month'); // End of last month
      break;

    case 'year_to_date':
      startDate = today.startOf('year'); // Start of the current year
      break;
  }

  // Generate the date range based on the start and end dates
  const daysInRange = endDate.diff(startDate, 'days') + 1;
  for (let i = 0; i < daysInRange; i++) {
    const date = startDate.add(i, 'days');
    dates.push(date.format('D MMM').toUpperCase());
  }

  return dates;
};

export const generateLineChartMockData = (data: any, range: string = '30'): IData[] => {
  const dateLabels = generateDates(range);

  return data.map((item: any) => ({
    ...item,
    data: dateLabels.map((date) => ({
      date,
      valueDate: Math.floor(Math.random() * 61) + 40,
    })),
  }));
};

export const transformDataForLineChart = (data: any[], range: string = '30') => {
  const dateLabels = generateDates(range);
  const result: Record<string, any>[] = [];

  for (const date of dateLabels) {
    const row: Record<string, any> = { date };

    data.forEach((entry) => {
      const valueObj = entry.data?.find((d: any) => d.date === date);
      row[entry.id] = valueObj ? valueObj.valueDate : null;
    });

    result.push(row);
  }

  return result;
};

export const getSelectedDays = (range: string): string[] => {
  const today = dayjs();
  const selectedDays: string[] = [];

  const formatDay = (date: dayjs.Dayjs): string => {
    return date.format('D MMM').toUpperCase();
  };

  switch (range) {
    case 'today':
      selectedDays.push(formatDay(today));
      break;

    case 'yesterday':
      selectedDays.push(formatDay(today.subtract(1, 'day')));
      break;

    case '7':
      for (let i = 0; i < 7; i++) {
        selectedDays.push(formatDay(today.subtract(i, 'day')));
      }
      break;

    case '30':
      for (let i = 0; i < 5; i++) {
        const targetDate = today.subtract(i * 7, 'days');
        selectedDays.push(formatDay(targetDate));
      }

      break;

    case '90': {
      const endLoop = Math.ceil(90 / 14); // 90 days divided by 14 days (2 weeks)
      for (let i = 0; i < endLoop; i++) {
        const targetDate = today.subtract(i * 14, 'days');
        selectedDays.push(formatDay(targetDate));
      }
      break;
    }

    case 'this_month': {
      const startOfThisMonth = today.startOf('month');
      const daysInThisMonth = startOfThisMonth.daysInMonth();
      for (let i = 1; i < 5; i++) {
        const targetDay = i * 7;
        if (targetDay <= daysInThisMonth) {
          selectedDays.push(formatDay(startOfThisMonth.date(targetDay)));
        }
      }
      selectedDays.push(formatDay(today)); // Include today as well (if it's within the current month)
      break;
    }

    case 'last_month': {
      const startOfLastMonth = today.subtract(1, 'month').startOf('month');
      const daysInLastMonth = startOfLastMonth.daysInMonth();

      for (let i = 1; i <= 5; i++) {
        const targetDay = i * 7;
        if (targetDay <= daysInLastMonth) {
          selectedDays.push(formatDay(startOfLastMonth.date(targetDay)));
        }
      }
      break;
    }

    case 'year_to_date': {
      const startOfYear = today.startOf('year');
      for (
        let date = startOfYear;
        date.isBefore(today, 'month') || date.isSame(today, 'month');
        date = date.add(1, 'month')
      ) {
        selectedDays.push(formatDay(date));
      }
      break;
    }

    case 'custom':
      // Handle custom range if necessary
      break;

    default:
      break;
  }

  return selectedDays.reverse(); // Ensure ascending order
};
