'use client';

import { Fragment, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, RHFTextField } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import type { TVerifyEmail } from '@/modules/auth';
import { AuthCard, VerifyEmailReqSchema } from '@/modules/auth';

export function EmailVerifycationForm() {
  const { redirect, getSearchParams } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const workspaceType = getSearchParams('type');

  const methods = useForm<TVerifyEmail>({
    resolver: zodResolver(VerifyEmailReqSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (_data: TVerifyEmail) => {
    startTransition(() => {
      setIsLoading(true);

      const redirectPage =
        workspaceType === 'create'
          ? constants.routePages.auth.WORKSPACE_INVITE_PAGE
          : constants.routePages.auth.WORKSPACE_PAGE;

      setTimeout(() => {
        redirect(redirectPage);
        setIsLoading(false);
      }, 2000);
    });
  };

  const onResendCode = () => {
    //TODO
  };

  return (
    <AuthCard
      title="Check your email"
      subTitle={
        <Fragment>
          <Typography>We’ve sent a verification code to</Typography>
          <Typography variant="subtitle1">example@email.com</Typography>
        </Fragment>
      }
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <RHFTextField
            name="code"
            label="Enter 6-digit code"
            placeholder="Enter 6-digit code"
            disabled={isPending || isLoading}
          />

          <Button
            type="submit"
            size="large"
            fullWidth
            className="py-3 mt-[77px]"
            disabled={isPending || isLoading}
            isLoading={isPending || isLoading}
          >
            Verify email
          </Button>

          <Box display="flex" flexDirection="column" alignItems="center" mt={7}>
            <Typography>Didn’t receive the code?</Typography>
            <Typography
              component="a"
              fontWeight="bold"
              className="cursor-pointer"
              mt={1}
              onClick={onResendCode}
            >
              Resend code
            </Typography>
          </Box>
        </Stack>
      </FormProvider>
    </AuthCard>
  );
}
