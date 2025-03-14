'use server';

import { AuthError } from 'next-auth';

import type { TLoginReq } from '../schemas/request';
import { LoginReqSchema } from '../schemas/request';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const login = async (values: TLoginReq, callbackUrl?: string | null) => {
  const validatedFields = LoginReqSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Your credentials are invalid.' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Your credentials are invalid!' };

        case 'CallbackRouteError':
          return { error: 'Invalid callback route!' };

        
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
