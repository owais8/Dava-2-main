//next-auth.d.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

import type { TToken, TUser } from '@/schemas/signin/response';

interface User extends NextAuthUser, TUser, TToken {}

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & TUser & TToken;
  }
}
declare module 'next-auth' {
  interface JWT extends TUser, TToken {}

  interface Session {
    user: User & Session['user'];
  }
}
