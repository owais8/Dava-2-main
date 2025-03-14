import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const LANGUAGE_CODE_EN = 'en';
export const LANGUAGE_CODE_DATE_EN = 'en';
export const DEFAULT_LOCATE = LANGUAGE_CODE_EN;
export const locales = [LANGUAGE_CODE_EN] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: DEFAULT_LOCATE,
  localeDetection: false,
  alternateLinks: false,
  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
export type LinkProps = React.ComponentProps<typeof Link>;
export type LanguageProps = (typeof locales)[number];
