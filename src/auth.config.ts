import type { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import constants from '@/constants';
import { LoginResSchema } from '@/modules/auth/schemas/response';
import { fetcher } from '@/utils/fetcher';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? 'ABCD',
    }),
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null;

        const response = await fetcher({
          apiConfig: {
            endPoint: constants.routeApis.AUTH.LOGIN,
            key: ['auth-login'],
            method: constants.shared.API_REQUEST_METHODS.POST,
            isAuthRequired: false,
          },
          responseSchema: LoginResSchema,
          payload: {
            email: credentials.email,
            password: credentials.password,
            expiresInMins: 30,
          },
        });
        if (!response) return null;

        return {
          id: '1',
          name: response.data?.full_name,
          email: response.data?.email,
          accesstoken: response.data?.accesstoken,
          image: '',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle login with email and code
      if (user && account?.provider === 'credentials') {
        token.accesstoken = (user as any)?.accesstoken;
        
      }

      // Handle refresh token
      // if (new Date().getTime() < token.) return token;

      return token;
      // return await refreshToken(token);
    },

    async session({ token, session }) {
      if (session.user) {
        session.user = {
          ...session.user,
          accesstoken: token.accesstoken,
        };

        return session;
      }

      return session;
    },
  },
  trustHost: true,
  session: { strategy: 'jwt' },

  pages: {
    signIn: '/login',
    error: '/error',
  },
} satisfies NextAuthConfig;

export default authConfig;
