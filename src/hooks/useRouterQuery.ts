'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { useRouter } from '@/i18n/routing';

export const useRedirect = () => {
  const router = useRouter();
  const currentLang = useLocale();
  const searchParams = useSearchParams();

  const redirect = (pathname: string, query?: Record<string, string>) => {
    return router.push({ pathname, query }, { locale: currentLang });
  };
  const getSearchParams = (param: string) => searchParams.get(param);
  const back = () => router.back();

  return { getSearchParams, redirect, back };
};
