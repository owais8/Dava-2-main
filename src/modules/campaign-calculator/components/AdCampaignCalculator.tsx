/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// app/components/AdCampaignCalculator.tsx
'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { AdCampaignCalculatorReqSchema } from '../schemas';
import { Button, Card, PageHeading, RHFDatePicker, RHFSelect, RHFTextField} from '@/components';

interface AdCampaignCalculatorProps {
  filters: {
    platforms: string[];
    sources: string[];
    mediums: string[];
    campaign_names: string[];
    campaign_term: string[];
  };
  onSubmit: (data: any) => void;
}

export const AdCampaignCalculator = ({ filters, onSubmit }: AdCampaignCalculatorProps) => {
  const methods = useForm({
    resolver: zodResolver(AdCampaignCalculatorReqSchema),
    defaultValues: {
      pageUrl: '',
      platform: '',
      source: '',
      medium: '',
      campaignName: '',
      campaignTerm: '',
      totalSpend: 0,
      startDate: null,
      endDate: null,
    },
  });
  const { formState: { isSubmitting } } = methods;

  return (
    <Card>
      <PageHeading
        title="Ad Campaign Calculator"
        titleVariant={{ variant: 'h5', fontWeight: 500 }}
      />

      <FormProvider {...methods}>
        <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit, (errors) => console.error(errors))}>
        <RHFTextField
            name="pageUrl"
            label="Page URL"
            placeholder="Enter destination page URL"
            fullWidth
          />
          <Typography variant="subtitle2" my={6}>
            Or Select
          </Typography>
          <Grid2 container columnSpacing={8} rowSpacing={6}>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <RHFSelect
                name="platform"
                label="Platform"
                placeholder="Select platform"
                options={filters.platforms.map(platform => ({
                  value: platform,
                  label: platform
                }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <RHFSelect
                name="source"
                label="Source"
                placeholder="Select Source"
                options={filters.sources.map(source => ({
                  value: source,
                  label: source
                }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <RHFSelect
                name="medium"
                label="Medium"
                placeholder="Select Medium"
                options={filters.mediums.map(medium => ({
                  value: medium,
                  label: medium
                }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <RHFSelect
                name="campaignName"
                label="Campaign Name"
                placeholder="Select Campaign Name"
                options={filters.campaign_names.map(name => ({
                  value: name,
                  label: name
                }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <RHFSelect
                name="campaignTerm"
                label="Campaign Term"
                placeholder="Select Campaign Term"
                options={filters.campaign_term.map(term => ({
                  value: term,
                  label: term
                }))}
              />
            </Grid2>
            {/* Keep existing implementation for other fields */}
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <br />
              <RHFTextField
                name="totalSpend"
                label="Total Spend"
                type="number"
                placeholder="Enter total spend"
                InputProps={{
                  inputProps: { 
                    min: 0,
                    step: 100
                  }
                }}
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <Typography variant="subtitle2" mb={1}>
                Start Date
              </Typography>
              <RHFDatePicker name="startDate" />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <Typography variant="subtitle2" mb={1}>
                End Date
              </Typography>
              <RHFDatePicker name="endDate" />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
            <Button type="submit" loading={isSubmitting}>
              {isSubmitting ? 'Calculating...' : 'Calculate'}
            </Button>
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>
    </Card>
  );
};