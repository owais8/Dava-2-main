import constants from '@/constants';

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = Object.values(constants.routePages.public);

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const AUTH_ROUTES = Object.values(constants.routePages.auth);

/**
 * An array of routes that are accessible to authenticated users
 * These routes require authentication
 * @type {string[]}
 */
// export const privateRoutes = [""]; All routes are private by default, is defined the middleware.ts
export const privateRoutes = Object.values(constants.routePages.private);

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes. They are available to the public.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = constants.routePages.private.TRAFFIC_ANALYTICS_PAGE;
export const DEFAULT_LOGOUT_REDIRECT = constants.routePages.auth.LOGIN_PAGE;
