import { z } from 'zod';

import constants from '@/constants';

export const EmailSchema = z.string().email('Please enter a valid email address.');
export const RoleSchema = z.string().min(1, 'Please select a role');
export const ReasonSchema = z.string().min(1, 'Please provide a reason');
export const CodeSchema = z.string().length(6, 'Please enter a 6-digit code.');
export const CVVSchema = z
  .string()
  .min(3, 'Please enter a valid CVV')
  .length(3, 'Please enter a 3-digit code.');
export const DayjsSchema = z.any().refine((date) => !!date, 'Expiry date is required');

export const PasswordSchema = z
  .string()
  .min(1, 'Please enter a password')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter')
  .regex(/[0-9]/, 'Password must include at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character');

export const FileImageSchema = z
  .any()
  .refine((files) => !!files, 'Please upload an image.')
  .refine((files) => {
    return files?.size <= constants.shared.FILE.MAX_FILE_SIZE;
  }, `Max image size is 5MB.`)
  .refine(
    (files) => constants.shared.FILE.ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.',
  );
