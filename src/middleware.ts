/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';
import { locales, routing } from '@/i18n/routing';
import { AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from '@/routes';

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${locales.join('|')}))?(${pages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  ).test(pathName);
};

const intlMiddleware = createMiddleware(routing);

const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const isAuthPage = testPathnameRegex(AUTH_ROUTES, req.nextUrl.pathname);
  const session = req.auth;

  // Redirect to sign-in page if not authenticated
  if (!session && !isAuthPage) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  // Redirect to home page if authenticated and trying to access auth pages
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  }

  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  const isPublicPage = testPathnameRegex(PUBLIC_ROUTES, req.nextUrl.pathname);
  const isAuthPage = testPathnameRegex(AUTH_ROUTES, req.nextUrl.pathname);

  if (isAuthPage) {
    return (authMiddleware as any)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/', '/(en)/:path*', '/((?!api|_next|.*\\..*).*)'],
};
