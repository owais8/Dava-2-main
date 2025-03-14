import { z } from 'zod';

import { CVVSchema, DayjsSchema, EmailSchema, FileImageSchema } from '@/schemas';

// Profile Setting
export const ProfileSettingReqSchema = z.object({
  avatar: FileImageSchema,
  fullname: z.string().min(1, 'Full name is required'),
  email: EmailSchema,
  phone: z.string().min(1, 'Support phone is required'),
  timeZone: z.string().min(1, 'Time zone is required'),
});

export const ProfileSettingReq = ProfileSettingReqSchema.extend({});

export type TProfileSetting = z.infer<typeof ProfileSettingReqSchema>;

// Organisation Setting
export const OrganisationSettingReqSchema = z.object({
  organisationName: z.string().min(1, 'Full name is required'),
  organisationCategory: z.string().min(1, 'Organisation category is required'),
  businessURL: z.string().min(1, 'Business URL is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  stateOrTerritory: z.string().min(1, 'State or territory is required'),
  postCodeOrZipCode: z.string().min(1, 'Post code or zip code is required'),
  country: z.string().min(1, 'Country is required'),
});

export const OrganisationSettingReq = OrganisationSettingReqSchema.extend({});

export type TOrganisationSetting = z.infer<typeof OrganisationSettingReqSchema>;

// Search Team
export const SearchTeamReqSchema = z.object({
  keyword: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional(),
});

export const SearchTeamReq = SearchTeamReqSchema.extend({});

export type TSearchTeam = z.infer<typeof SearchTeamReqSchema>;

// Billing Setting

export const SearchInvoiceReqSchema = z.object({
  keyword: z.string(),
  category: z.string(),
  dateRange: z.string(),
  sortBy: z.string(),
});

export const SearchInvoiceReq = SearchInvoiceReqSchema.extend({});

export type TSearchInvoice = z.infer<typeof SearchInvoiceReqSchema>;

// Billing Edit
export const EditBillingReqSchema = z.object({
  billingName: z.string().min(1, 'Billing name is required'),
  billingAddress: z.string().min(1, 'Billing address is required'),
});

export const EditBillingReq = EditBillingReqSchema.extend({});

export type TEditBilling = z.infer<typeof EditBillingReqSchema>;

// Add New Card
export const PaymentCardReqSchema = z.object({
  id: z.string().or(z.number()).optional(),
  cardNumber: z.string().min(1, 'Card number is required'),
  brand: z.string().optional(),
  lastFour: z.string().optional(),
  expiryDate: DayjsSchema,
  cvv: CVVSchema,
  cardName: z.string().min(1, 'Card name is required'),
  isDefault: z.boolean(),
});

export const PaymentCardReq = PaymentCardReqSchema.extend({});

export type TPaymentCard = z.infer<typeof PaymentCardReqSchema>;
