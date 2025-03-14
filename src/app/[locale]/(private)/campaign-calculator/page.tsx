import { getTranslations } from 'next-intl/server';

import { DEFAULT_LOCATE } from '@/i18n/routing';
import { CampaignCalculator } from '@/modules/campaign-calculator';

export async function generateMetadata() {
  const t = await getTranslations<string>({ locale: DEFAULT_LOCATE, namespace: 'Common.metadata' });

  return {
    title: t('template', { page: t('campaignCalculatorTitle') }),
  };
}

export default function Index() {
  return <CampaignCalculator />;
}
