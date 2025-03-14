import { z } from 'zod';

export const PaginationResSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number().optional(),
  totalPages: z.number().optional(),
});

export const PaginationRes = z
  .object({
    items: z.array(z.any()),
  })
  .merge(PaginationResSchema);

export type TPagination = z.infer<typeof PaginationResSchema>;
