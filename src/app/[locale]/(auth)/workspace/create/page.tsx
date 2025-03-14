import { getTranslations } from 'next-intl/server';

import { DEFAULT_LOCATE } from '@/i18n/routing';
import { WorkspaceCreateForm } from '@/modules/auth';

export async function generateMetadata() {
  const t = await getTranslations<string>({ locale: DEFAULT_LOCATE, namespace: 'Common.metadata' });

  return {
    title: t('template', { page: t('workspaceCreateTitle') }),
  };
}

export default function Index() {
  return <WorkspaceCreateForm />;
}
