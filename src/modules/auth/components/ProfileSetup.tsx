'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { AuthCard } from './AuthCard';
import { timeZoneOptions } from '@/__mocks';
import { Button, RHFSelect, RHFUpload } from '@/components';
import { RHFTextField } from '@/components/RHForm/RHFTextField';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import type { TProfile } from '@/modules/auth';
import { ProfileReqSchema } from '@/modules/auth';
import utils from '@/utils';

export function ProfileSetup() {
  const { redirect, back } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TProfile>({
    resolver: zodResolver(ProfileReqSchema),
    defaultValues: {
      avatar: '',
      fullname: '',
      timeZone: '',
    },
  });

  const onSubmit = async (_data: TProfile) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.DONE_PAGE);
        utils.showToast('success', 'Profile setup successful.');
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <AuthCard title="Complete Your Profile" className="pb-6 sm:pb-8 md:pb-8">
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Stack mb={11}>
            <RHFUpload name="avatar" label="Upload profile picture" />
          </Stack>
          <Stack spacing={6}>
            <RHFTextField
              name="fullname"
              label="Full Name"
              placeholder="Enter your full name"
              disabled={isPending || isLoading}
            />
            <RHFSelect
              name="timeZone"
              label="Select Time Zone"
              options={timeZoneOptions}
              disabled={isPending || isLoading}
            />
          </Stack>
          <Button
            type="submit"
            size="large"
            fullWidth
            className="py-3 mt-6"
            disabled={isPending || isLoading}
            isLoading={isPending || isLoading}
          >
            Submit
          </Button>

          <Box display="flex" mt={9}>
            <IconButton
              disableRipple
              size="medium"
              color="inherit"
              onClick={back}
              sx={{ ml: -4 }}
              className="group"
              disabled={isPending || isLoading}
            >
              <ChevronLeft />
              <Typography className="group-hover:underline">Back</Typography>
            </IconButton>
          </Box>
        </Stack>
      </FormProvider>
    </AuthCard>
  );
}
