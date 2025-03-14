import { z } from 'zod';

// CreateUrlFormReqSchema
export const CreateUrlFormReqSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  campaignObjective: z.string().min(1, 'Campaign Objective is required'),
  campaignTarget: z.string().min(1, 'Campaign Target is required'),
  source: z.string().min(1, 'Source is required'),
  medium: z.string().min(1, 'Medium is required'),
  placementLocation: z.string(),
  campaignName: z.string().min(1, 'Campaign Name is required'),
  contentType: z.string().min(1, 'Content Type is required'),
  costPerClick: z.string(),
  sourceId: z.string().min(1, 'Source ID is required'),
  link: z.string().min(1, 'URL is required'),
  davaPixel: z.string(),
});
export const CreateUrlFormReq = CreateUrlFormReqSchema.extend({});
export type TCreateUrlForm = z.infer<typeof CreateUrlFormReqSchema>;

// FilterUrlReqSchema
export const FilterUrlReqSchema = z.object({
  source: z.string(),
  dateRange: z.string(),
});
export const FilterUrlReq = FilterUrlReqSchema.extend({});
export type TFilterUrl = z.infer<typeof FilterUrlReqSchema>;

// SearchReqSchema
export const SearchReqSchema = z.object({
  keywork: z.string(),
});
export const SearchReq = SearchReqSchema.extend({});
export type TSearch = z.infer<typeof CreateUrlFormReqSchema>;
