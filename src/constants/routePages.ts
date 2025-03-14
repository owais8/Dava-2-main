const routePages = {
  public: {
    HOME_PAGE: '/',
    DESIGN_SYTEM: '/design-system',
    ABOUT: '/about',
    TERMS_PAGE: '/terms',
    PRIVACY_PAGE: '/privacy',
  },
  auth: {
    LOGIN_PAGE: '/login',
    REGISTER_PAGE: '/register',
    FORGOT_PASSWORD_PAGE: '/forgot-password',
    RESET_PASSWORD_PAGE: '/reset-password',
    EMAIL_VERIFICATION_PAGE: '/email-verification',
    WORKSPACE_PAGE: '/workspace',
    WORKSPACE_INFO_PAGE: '/workspace/info',
    WORKSPACE_INVITE_PAGE: '/workspace/invite',
    WORKSPACE_CREATE_PAGE: '/workspace/create',
    WORKSPACE_JOIN_PAGE: '/workspace/join',
    WORKSPACE_REQUEST_CHANGE_PAGE: '/workspace/request-change',
    WORKSPACE_REQUEST_SUCCESS_PAGE: '/workspace/request-success',
    PROFILE_SETUP_PAGE: '/profile-setup',
    DONE_PAGE: '/done',
  },
  private: {
    TRAFFIC_ANALYTICS_PAGE: '/traffic-analytics',
    URL_MAPPER_PAGE: '/url-mapper',
    CAMPAIGN_CALCULATOR_PAGE: '/campaign-calculator',
    SETTING_PROFILE_PAGE: '/settings/profile',
    SETTING_TEAM_PAGE: '/settings/team',
    SETTING_ORGANISATION_PAGE: '/settings/organisation',
    SETTING_NOTIFICATION_PAGE: '/settings/notification',
    SETTING_SECURITY_PAGE: '/settings/security',
    SETTING_BILLING_PAGE: '/settings/billing',
    SETTING_AGENCY_PAGE: '/settings/agency',
  },
} as const;

export default routePages;
