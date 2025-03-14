const shared = {
  APP: {
    NAME: 'Dava Zmysel',
    DESCRIPTION: 'Dava Zmysel web application description',
    AUTHOR: 'Develop Team',
    MAIL: 'helpme@domain.com',
    KEYWORDS: [
      'web',
      'application',
      'description',
      'Nextjs',
      'React',
      'TypeScript',
      'TailwindCSS',
      'MUI',
    ],
    URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    LOADING: 'app-loading',
    TIME_ZONE: process.env.TIME_ZONE || 'UTC',
    THEME_COLOR: '#EE4D52',
  },
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
    TIMEOUT: 30000,
  },
  ENV: {
    DEFAULT: process.env.NODE_ENV || '',
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
  API_REQUEST_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },
  REGEX_PATTERNS: {
    EMAIL: /^(?!.*\.\.)(?!\.)(?!.*\.$)[^\s@][^\s@]*(?<!\.)@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[1-9]\d{1,20}$/,
    URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/,
    DATE: /^(19|20)\d\d[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$/,
    TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
    IP_ADDRESS:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[A-Za-z\d\S]{8,}$/,
    ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
    ALPHABET: /^[a-zA-Z]+$/,
  },
  DATETIME: {
    MMYY: 'MM/YY',
    DDMMYYYY: 'DD/MM/YYYY',
    DDMMMYYYY: 'DD MMM YYYY',
    DDMMMYYYYHHMM: 'DD MMM YYYY, HH:mm',
    DDMMMYYYYHHMMSS: 'DD MMM YYYY, HH:mm:ss',
    DDMMMYYYYHHMMA: 'DD MMM YYYY, hh:mm A',
    DDMMMYYYYHHMMAZ: 'DD MMM YYYY, hh:mm A z',
    DDMMMYYYYHHMMAZZ: 'DD MMM YYYY, hh:mm A zz',
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 10,
    DEFAULT_PAGE_SIZE: 10,
    DEFAULT_PAGE_SIZES: [10, 30, 50, 100],
  },
  LOCAL_STORAGE_KEYS: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
  },
  FILE: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_IMAGE_MIME_TYPES: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/gif',
    ],
    ACCEPTED_IMAGE_TYPES: ['jpeg', 'jpg', 'png', 'webp'],
  },
} as const;

export default shared;
