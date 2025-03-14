'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, RHFInputPassword, RHFTextField, TextLink } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import type { TRegisterReq } from '@/modules/auth';
import { AuthCard, RegisterReqSchema } from '@/modules/auth';
import utils from '@/utils';

export function RegisterForm() {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TRegisterReq>({
    resolver: zodResolver(RegisterReqSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (_data: TRegisterReq) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.EMAIL_VERIFICATION_PAGE);
        setIsLoading(false);
        utils.showToast(
          'success',
          'Registration successful. Please check your email to verify your account.',
        );
      }, 2000);
    });
  };

  return (
    <AuthCard title="Register" variantTitle="h4">
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <RHFTextField
            name="email"
            label="Emaill address"
            placeholder="Enter emaill address"
            disabled={isPending || isLoading}
          />

          <RHFInputPassword
            name="password"
            label="Create password"
            placeholder="Enter password"
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
            Continue
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
