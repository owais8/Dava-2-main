'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid2, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { industryOptions } from '@/__mocks';
import { Button, Card, PageHeading, RHFSelect, RHFTextField } from '@/components';
import type { TOrganisationSetting } from '@/modules/user';
import { OrganisationSettingReqSchema, SettingContainer } from '@/modules/user';
import utils from '@/utils';

export function SettingOrganisation() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TOrganisationSetting>({
    resolver: zodResolver(OrganisationSettingReqSchema),
    defaultValues: {
      organisationName: '',
      organisationCategory: '',
      businessURL: '',
      streetAddress: '',
      city: '',
      stateOrTerritory: '',
      postCodeOrZipCode: '',
      country: '',
    },
  });

  const onSubmit = async (_data: TOrganisationSetting) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        utils.showToast('success', 'Organisation updated successfully');
      }, 2000);
    });
  };

  return (
    <SettingContainer tab="organisation">
      <Card>
        <PageHeading
          title="Organisation Settings"
          description="Manage your organisation details and preferences"
          mb={8}
        />

        <FormProvider {...methods}>
          <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid2 container rowSpacing={{ xs: 6, sm: 8 }} columnSpacing={{ xs: 4, sm: 6 }}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="organisationName"
                  label="Organisation Name"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFSelect
                  name="organisationCategory"
                  label="Select Industry"
                  options={industryOptions}
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="businessURL"
                  label="Business URL"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="streetAddress"
                  label="Street Address"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField name="city" label="City" disabled={isPending || isLoading} />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="stateOrTerritory"
                  label="State / Territory"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField
                  name="postCodeOrZipCode"
                  label="Postcode / Zip Code"
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <RHFTextField name="country" label="Country" disabled={isPending || isLoading} />
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
