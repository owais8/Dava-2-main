'use client';

import { AuthCard } from './AuthCard';
import { Button, CheckedIcon } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';

export function DoneCard() {
  const { redirect } = useRedirect();

  return (
    <AuthCard
      title="All Done!"
      subTitle="Your workspace is ready to use"
      className="py-[60px] sm:pb-[80px] md:pb-[100px]"
      logoIcon={<CheckedIcon className="w-[84px] h-[84px]" />}
    >
      <Button
        fullWidth
        size="large"
        className="py-3 mt-6"
        onClick={() => redirect(constants.routePages.auth.LOGIN_PAGE)}
      >
        Enter
      </Button>
    </AuthCard>
  );
}
