import type { Metadata } from 'next';

import constants from '@/constants';

const metadata: Metadata = {
  title: {
    default: constants.shared.APP.NAME,
    template: `%s | ${constants.shared.APP.NAME}`,
  },
  metadataBase: new URL(constants.shared.APP.URL),
  description: constants.shared.APP.DESCRIPTION,
  applicationName: constants.shared.APP.NAME,
  referrer: 'origin-when-cross-origin',
  keywords: constants.shared.APP.KEYWORDS.slice(),
  authors: [{ name: constants.shared.APP.AUTHOR, url: '' }],
  creator: constants.shared.APP.AUTHOR,
  alternates: {
    canonical: '/en',
    languages: {
      'en-US': '/en',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
  generator: 'Next.js version 15',
  category: constants.shared.APP.KEYWORDS.join(', '),
  verification: {
    google: '',
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: constants.shared.APP.NAME,
    description: constants.shared.APP.DESCRIPTION,
    images: ['./opengraph-image.png'],
    creator: `@${constants.shared.APP.NAME}`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: constants.shared.APP.URL,
    title: constants.shared.APP.NAME,
    description: constants.shared.APP.DESCRIPTION,
    siteName: constants.shared.APP.NAME,
    images: [
      {
        url: './opengraph-image.png',
        width: 1200,
        height: 630,
        alt: constants.shared.APP.NAME,
      },
    ],
  },
  other: {
    'apple-mobile-web-app-title': constants.shared.APP.NAME,
    'apple-icon': '/apple-icon.png',
    'apple-touch-icon': '/apple-icon.png',
    'theme-color': constants.shared.APP.THEME_COLOR,
    'msapplication-TileColor': constants.shared.APP.THEME_COLOR,
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'mask-icon': '/safari-pinned-tab.svg',
  },
};

export default metadata;
