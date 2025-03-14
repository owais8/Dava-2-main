import { z } from 'zod';

import { DayjsSchema } from '@/schemas';

export const AdCampaignCalculatorReqSchema = z.object({
  pageUrl: z.string(),
  platform: z.string(),
  source: z.string(),
  medium: z.string(),
  campaignName: z.string(),
  campaignTerm: z.string(),
  totalSpend: z.coerce.number().min(0),
  startDate: DayjsSchema,
  endDate: DayjsSchema,
});

export const AdCampaignCalculatorReq = AdCampaignCalculatorReqSchema.extend({});

export type TAdCampaignCalculator = z.infer<typeof AdCampaignCalculatorReqSchema>;
