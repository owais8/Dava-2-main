import { z } from 'zod';

import { Response } from '@/schemas';

// ----------- Login --------------
const LoginSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  id: z.number().or(z.string()),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  image: z.string().url(),
});

export const LoginResSchema = Response.extend({
  data: LoginSchema.nullable(),
});

export type TLoginRes = z.infer<typeof LoginSchema>;

// ----------- Register --------------
const RegisterResSchema = z.object({});

export const RegisterRes = Response.extend({
  data: RegisterResSchema.nullable(),
});

export type TRegisterRes = z.infer<typeof RegisterResSchema>;

// ----------- Refresh Token --------------
export const RefreshTokenResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshTokenRes = Response.extend({
  data: RefreshTokenResSchema,
});

export type TRefreshTokenRes = z.infer<typeof RefreshTokenResSchema>;

//----------- Auth Info --------------
export const AuthInfoResSchema = z.object({
  id: z.number(),
  accessToken: z.string(),
  refreshToken: z.string(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  image: z.string().url(),
});

export const AuthInfoRes = Response.extend({
  data: AuthInfoResSchema,
});

export type TAuthInfo = z.infer<typeof AuthInfoResSchema>;
