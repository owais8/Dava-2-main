const routeApis = {
  HEALTH_CHECK: '/health-check',
  AUTH: {
    LOGIN: `/login`,
    REGISTER: '/auth/register',
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    CHANGE_PASSWORD: '/auth/change-password',
  },
} as const;

export default routeApis;
