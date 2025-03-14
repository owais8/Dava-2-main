import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import constants from '@/constants';
import { DEFAULT_LOCATE } from '@/i18n/routing';

export async function generateMetadata() {
  const t = await getTranslations<string>({ locale: DEFAULT_LOCATE, namespace: 'Common.metadata' });

  return {
    title: t('template', { page: t('homeTitle') }),
  };
}

export default function Index() {
  return redirect(constants.routePages.auth.LOGIN_PAGE as string);
}
