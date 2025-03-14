import { getTranslations } from 'next-intl/server';

import { DEFAULT_LOCATE } from '@/i18n/routing';
import { TrafficAnalyticPage } from '@/modules/traffic-analytics';

export async function generateMetadata() {
  const t = await getTranslations<string>({ locale: DEFAULT_LOCATE, namespace: 'Common.metadata' });

  return {
    title: t('template', { page: t('trafficAnalyticsTitle') }),
  };
}

export default function Index() {
  return <TrafficAnalyticPage />;
}
