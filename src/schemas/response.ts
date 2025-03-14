import { z } from 'zod';

export const Metadata = z.object({
  path: z.string().nullable().optional(),
  constraint: z.string().optional(),
  options: z.record(z.string()).optional().nullable(),
});

export const Error = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
  metadata: Metadata.optional(),
});

export const Response = z.object({
  time: z.number().optional(),
  data: z.any().optional(),
  success: z.boolean(),
  statusCode: z.number(),
  errors: z.array(Error).optional(),
});

export const SuccessResponse = Response.transform((val) => ({
  time: val.time,
  data: val.data,
  success: val.success,
  statusCode: val.statusCode,
}));

export const ErrorResponse = Response.transform((val) => ({
  time: val.time,
  errors: val.errors,
  success: val.success,
  statusCode: val.statusCode,
}));

export const LinkSchema = z.object({
  first: z.string().nullish(),
  last: z.string().nullish(),
  self: z.string().nullish(),
  next: z.string().nullish(),
  prev: z.string().nullish(),
});

export type TError = z.infer<typeof Error>;
export type TMetadata = z.infer<typeof Metadata>;
export type TResponse = z.infer<typeof Response>;
export type TSuccessResponse = z.infer<typeof SuccessResponse>;
export type TErrorResponse = z.infer<typeof ErrorResponse>;
