import { z } from 'zod';

export const AnnotationsSchema = z.object({
  id: z.string(),
  date: z.string(),
  text: z.string(),
  isActived: z.boolean(),
  isEdit: z.boolean(),
  isCreate: z.boolean(),
});

export const OverviewFilterReqSchema = z.object({
  source: z.string(),
  dateRange: z.string(),
});

export const OverviewFilterReq = OverviewFilterReqSchema.extend({});

export type TOverviewFilter = z.infer<typeof OverviewFilterReqSchema>;
export type TAnnotation = z.infer<typeof AnnotationsSchema>;
