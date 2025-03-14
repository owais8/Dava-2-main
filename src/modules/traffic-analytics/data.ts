import { v4 as uuidv4 } from 'uuid';

import type { SourceInfo } from './type';
import type { TAnnotation } from '@/modules/traffic-analytics/schemas';

export const SOURCES: Record<string, SourceInfo> = {
  google_organic: { id: 'google_organic', label: 'Google / Organic', color: '#0BD9C0' },
  google_paid: { id: 'google_paid', label: 'Google / Paid', color: '#009D8A' },
  facebook: { id: 'facebook', label: 'Facebook / Paid', color: '#65A0FF' },
  pinterest: { id: 'pinterest', label: 'Pinterest / Paid', color: '#2861BD' },
  linkedin: { id: 'linkedin', label: 'LinkedIn / Paid', color: '#B381F0' },
  tiktok: { id: 'tiktok', label: 'TikTok / Paid', color: '#7028A7' },
};

export const sourceOptions = [
  { label: 'All Sources', value: 'all' },
  { label: 'Google / Organic', value: 'google_organic' },
  { label: 'Google / Paid', value: 'google_paid' },
  { label: 'Facebook / Paid', value: 'facebook' },
  { label: 'Pinterest / Paid', value: 'pinterest' },
  { label: 'LinkedIn / Paid', value: 'linkedin' },
  { label: 'TikTok / Paid', value: 'tiktok' },
];

export const CHART_DATA = [
  { id: 'google_organic', name: 'Google / Organic', value: 187 },
  { id: 'google_paid', name: 'Google / Paid', value: 147 },
  { id: 'facebook', name: 'Facebook / Paid', value: 127 },
  { id: 'pinterest', name: 'Pinterest / Paid', value: 105 },
  { id: 'linkedin', name: 'LinkedIn / Paid', value: 80 },
  { id: 'tiktok', name: 'TikTok / Paid', value: 61 },
];

export const dateRangeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 90 days', value: '90' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'Year to Date', value: 'year_to_date' },
  { label: 'Custom Range', value: 'custom' },
];

export const AnnotationMockData: TAnnotation[] = [
  {
    id: uuidv4(),
    date: '14 JAN, 2025',
    text: 'Doubled spending on Campaign V2',
    isActived: false,
    isEdit: false,
    isCreate: false,
  },
  {
    id: uuidv4(),
    date: '16 JAN, 2025',
    text: 'Stopped AB test on Vet Campaign 6',
    isActived: false,
    isEdit: false,
    isCreate: false,
  },
  {
    id: uuidv4(),
    date: '28 JAN, 2025',
    text: 'Finder Campaign Ended',
    isActived: false,
    isEdit: false,
    isCreate: false,
  },
];
