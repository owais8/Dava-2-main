'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, RHFInputPassword, TextLink } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import type { TResetPasswordReq } from '@/modules/auth';
import { AuthCard, ResetPasswordReqSchema } from '@/modules/auth';
import utils from '@/utils';

export function ResetPasswordForm() {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TResetPasswordReq>({
    resolver: zodResolver(ResetPasswordReqSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (_formData: TResetPasswordReq) => {
    startTransition(async () => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.LOGIN_PAGE);
        utils.showToast('success', 'Profile setup successful.');
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <AuthCard title="Create new password">
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <RHFInputPassword
            name="password"
            label="Password"
            placeholder="Enter your password"
            disabled={isPending || isLoading}
            sx={{ mt: 8 }}
          />

          <RHFInputPassword
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            disabled={isPending || isLoading}
            sx={{ mt: 8 }}
          />

          <Button
            type="submit"
            size="large"
            fullWidth
            className="py-3 mt-[77px]"
            disabled={isPending || isLoading}
            isLoading={isPending || isLoading}
          >
            Submit
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
