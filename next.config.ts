/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

module.exports = withBundleAnalyzer(
  withNextIntl({
    reactStrictMode: true,
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    devIndicators: {
      appIsrStatus: false,
    },
    experimental: {
      optimizePackageImports: ['react-tna', 'lodash', 'react-toastify', '@mui/x-date-pickers'],
    },
  } as NextConfig),
  
);

module.exports = {
  reactStrictMode: true,
  eslint: {
      ignoreDuringBuilds: true,
  },
}