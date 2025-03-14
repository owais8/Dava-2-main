import { z } from 'zod';

import { Response } from '@/schemas';

// ----------- Login --------------
const LoginSchema = z.object({
  accesstoken: z.string(),
  msg: z.string(),
  role: z.string(),
  full_name: z.string().optional(),
  email: z.string(),
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
  accesstoken: z.string(),
  role: z.string(),
  msg: z.string(),
});

export const AuthInfoRes = Response.extend({
  data: AuthInfoResSchema,
});

export type TAuthInfo = z.infer<typeof AuthInfoResSchema>;
