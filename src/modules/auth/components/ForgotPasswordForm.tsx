'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import type { TForgotPasswordReq } from '../schemas/request';
import { ForgotPasswordReqSchema } from '../schemas/request';
import { Button, RHFTextField, TextLink } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { AuthCard } from '@/modules/auth/components/AuthCard';
import utils from '@/utils';

export function ForgotPasswordForm() {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TForgotPasswordReq>({
    resolver: zodResolver(ForgotPasswordReqSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (_formData: TForgotPasswordReq) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.RESET_PASSWORD_PAGE);
        utils.showToast('success', 'Profile setup successful.');
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <AuthCard title="Reset Password">
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <RHFTextField
            name="email"
            label="Email address"
            placeholder="Enter your email address"
            disabled={isPending || isLoading}
          />

          <Button
            size="large"
            type="submit"
            fullWidth
            className="py-3 mt-[77px]"
            disabled={isPending || isLoading}
            isLoading={isPending || isLoading}
          >
            Reset Password
          </Button>

          <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
            Already have an account?
            <TextLink href={constants.routePages.auth.LOGIN_PAGE} ml={1} fontWeight="bold">
              Sign In
            </TextLink>
          </Box>
        </Stack>
      </FormProvider>
    </AuthCard>
  );
}
