import { getTranslations } from 'next-intl/server';

import { DEFAULT_LOCATE } from '@/i18n/routing';
import { NotFoundPage } from '@/modules/notFound';

export async function generateMetadata() {
  const t = await getTranslations<string>({ locale: DEFAULT_LOCATE, namespace: 'Common.metadata' });

  return {
    title: t('template', { page: t('notFoundTitle') }),
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center lg:mt-5 items-top mt-2 lg:px-4 px-3">
        <div className="lg:w-full w-full">
          <NotFoundPage />
        </div>
      </div>
    </div>
  );
}
