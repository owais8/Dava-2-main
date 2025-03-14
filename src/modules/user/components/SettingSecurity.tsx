'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Card, PageHeading, RHFInputPassword } from '@/components';
import type { TResetPasswordReq } from '@/modules/auth';
import { ResetPasswordReqSchema } from '@/modules/auth';
import { SettingContainer } from '@/modules/user';
import utils from '@/utils';

export function SettingSecurity() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TResetPasswordReq>({
    resolver: zodResolver(ResetPasswordReqSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        utils.showToast('success', 'Password has been changed successfully');
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <SettingContainer tab="security">
      <Card>
        <PageHeading title="Change Password" />
        <FormProvider {...methods}>
          <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <RHFInputPassword
                name="password"
                label="Current Password"
                placeholder="Enter your Current password"
                disabled={isPending || isLoading}
              />
              <RHFInputPassword
                name="newPassword"
                label="New Password"
                placeholder="Enter your New Password"
                disabled={isPending || isLoading}
              />
              <RHFInputPassword
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your Confirm Password"
                disabled={isPending || isLoading}
              />
            </Stack>
            <Box mt={10}>
              <Button
                type="submit"
                disabled={isPending || isLoading}
                isLoading={isPending || isLoading}
              >
                Update Password
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </SettingContainer>
  );
}
