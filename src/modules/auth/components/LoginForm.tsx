'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, RHFInputPassword, RHFTextField, TextLink } from '@/components';
import constants from '@/constants';
import type { TLoginReq } from '@/modules/auth';
import { AuthCard, login, LoginReqSchema } from '@/modules/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isPending, startTransition] = useTransition();

  const methods = useForm<TLoginReq>({
    resolver: zodResolver(LoginReqSchema),
    defaultValues: {
      email: 'admin@petsy.com.au',
      password: 'petsy@123',
    },
  });

  const onSubmit = async (formData: TLoginReq) => {
    startTransition(async () => {
      try {
        await login(formData, callbackUrl ?? DEFAULT_LOGIN_REDIRECT);
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error((err as any).message);
      }
    });
  };

  return (
    <AuthCard title="Sign In" variantTitle="h4">
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <RHFTextField
            name="email"
            label="Email address"
            placeholder="Enter your email address"
            disabled={isPending}
          />

          <RHFInputPassword
            name="password"
            label="Password"
            placeholder="Enter your password"
            disabled={isPending}
            sx={{ mt: 8 }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <TextLink href={constants.routePages.auth.FORGOT_PASSWORD_PAGE}>
              Forgot password?
            </TextLink>
          </Box>

          <Button
            size="large"
            type="submit"
            fullWidth
            className="py-3"
            isLoading={isPending}
            disabled={isPending}
          >
            Submit
          </Button>

          <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
            Don’t have an account?
            <TextLink href={constants.routePages.auth.REGISTER_PAGE} ml={1} fontWeight="bold">
              Register
            </TextLink>
          </Box>
        </Stack>
      </FormProvider>
    </AuthCard>
  );
}
