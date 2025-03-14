/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import type { TCreateUrlForm } from '../schemas';
import { CreateUrlFormReqSchema } from '../schemas';
import type { IModalProps } from '@/components';
import { Modal, RHFTextField } from '@/components';
import utils from '@/utils';

interface CreateUrlModalProps extends IModalProps {
  onCreateMapping: (data: any) => Promise<void>;
}

export const CreateUrlModal = ({ open, onCancel, onCreateMapping }: CreateUrlModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TCreateUrlForm>({
    resolver: zodResolver(CreateUrlFormReqSchema),
    defaultValues: {
      platform: '',
      campaignObjective: '',
      campaignTarget: '',
      source: '',
      medium: '',
      placementLocation: '',
      campaignName: '',
      contentType: '',
      costPerClick: '',
      sourceId: '',
      link: '',
      davaPixel: '',
    },
  });
  const onSubmit = async (data: TCreateUrlForm) => {
    startTransition(async () => {
      setIsLoading(true);
      try {
        await onCreateMapping(data);
        utils.showToast('success', 'URL created successfully');
        handleCancel();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        utils.showToast('error', 'Failed to create URL');
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleCancel = () => {
    onCancel?.();
    setTimeout(() => methods.reset(), 500);
  };

  return (
    <Modal
      title="Create New URL"
      okText="Save"
      open={open}
      onSubmit={methods.handleSubmit(onSubmit)}
      onCancel={handleCancel}
      paperClassName="max-w-[1054px]"
      maxWidth="lg"
      isLoading={isPending || isLoading}
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" noValidate>
          <Grid2 container columnSpacing={4} rowSpacing={4}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography component="span" className="required">
                Platform
              </Typography>
              <RHFTextField
                name="platform"
                placeholder="Enter platform"
                className="mt-2"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography component="span" className="required">
              Campaign Objective
            </Typography>
            <RHFTextField
              name="campaignObjective"  // Changed from campaign_objective
              placeholder="Enter campaign objective"
              className="mt-2"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography component="span" className="required">
              Campaign Target
            </Typography>
            <RHFTextField
              name="campaignTarget"  // Changed from campaign_target
              placeholder="Enter campaign target"
              className="mt-2"
            />
          </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography component="span" className="required">
              Source
              </Typography>
              <RHFTextField
                name="source"
                placeholder="Enter source"
                className="mt-2"
              />            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography component="span" className="required">
              Medium
              </Typography>
              <RHFTextField
                name="medium"
                placeholder="Enter medium"
                className="mt-2"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography component="span" className="required">
              Placement Location
            </Typography>
            <RHFTextField
              name="placementLocation"  // Changed from placement_location
              placeholder="Enter placement location"
              className="mt-2"
            />
          </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography component="span" className="required">
                Campaign Name
              </Typography>
              <RHFTextField
                name="campaignName"
                placeholder="Enter campaign name"
                className="mt-2"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography component="span" className="required">
                Content Type
              </Typography>
              <RHFTextField name="contentType" placeholder="Enter content Type" className="mt-2" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography component="span">Cost Per Click ($)</Typography>
              <RHFTextField
                name="costPerClick"
                placeholder="Enter Cost Per Click ($)"
                className="mt-2"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography component="span" className="required">
                Source ID
              </Typography>
              <RHFTextField name="sourceId" placeholder="Enter Source ID" className="mt-2" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography component="span" className="required">
                URL
              </Typography>
              <RHFTextField name="link" placeholder="Enter URL" className="mt-2" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography component="span">Dava Pixel</Typography>
              <RHFTextField name="davaPixel" placeholder="Enter Dava Pixel" className="mt-2" />
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>
    </Modal>
  );
};
