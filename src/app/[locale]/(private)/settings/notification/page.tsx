import { getTranslations } from 'next-intl/server';

import { DEFAULT_LOCATE } from '@/i18n/routing';
import { SettingNotification } from '@/modules/user';

export async function generateMetadata() {
  const t = await getTranslations<string>({ locale: DEFAULT_LOCATE, namespace: 'Common.metadata' });

  return {
    title: t('template', { page: t('settingNotificationTitle') }),
  };
}

export default function Index() {
  return <SettingNotification />;
}
