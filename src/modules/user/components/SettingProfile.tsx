'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid2, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { timeZoneOptions } from '@/__mocks';
import { Button, Card, PageHeading, RHFSelect, RHFTextField, RHFUpload } from '@/components';
import type { TProfileSetting } from '@/modules/user';
import { ProfileSettingReqSchema, SettingContainer } from '@/modules/user';
import utils from '@/utils';

export function SettingProfile() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TProfileSetting>({
    resolver: zodResolver(ProfileSettingReqSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      timeZone: '',
    },
  });

  const onSubmit = async (_data: TProfileSetting) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        utils.showToast('success', 'Profile updated successfully');
      }, 2000);
    });
  };

  return (
    <SettingContainer tab="profile">
      <Card>
        <PageHeading
          title="Profile Settings"
          description="Update your personal information and preferences"
        />
        <FormProvider {...methods}>
          <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid2 container rowSpacing={{ xs: 6, sm: 8 }} columnSpacing={{ xs: 4, sm: 6 }}>
              <Grid2 size={12}>
                <RHFUpload
                  name="avatar"
                  label="Upload photo"
                  variant="button"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField name="fullname" label="Full Name" disabled={isPending || isLoading} />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="email"
                  label="Email Address"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="phone"
                  label="Support Phone"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFSelect
                  name="timeZone"
                  label="Select Time Zone"
                  options={timeZoneOptions}
                  disabled={isPending || isLoading}
                />
              </Grid2>
            </Grid2>

            <Box mt={10}>
              <Button
                type="submit"
                disabled={isPending || isLoading}
                isLoading={isPending || isLoading}
              >
                Save change
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </SettingContainer>
  );
}
