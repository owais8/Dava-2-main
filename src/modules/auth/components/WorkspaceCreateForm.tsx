'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { AuthCard } from './AuthCard';
import { industryOptions } from '@/__mocks';
import { Button, RHFSelect } from '@/components';
import { RHFTextField } from '@/components/RHForm/RHFTextField';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { type TWorkspaceCreate, WorkspaceCreateReqSchema } from '@/modules/auth';
import utils from '@/utils';

export function WorkspaceCreateForm() {
  const { redirect, back } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TWorkspaceCreate>({
    resolver: zodResolver(WorkspaceCreateReqSchema),
    defaultValues: {
      workspaceName: '',
      workspaceUrl: '',
      industry: '',
    },
  });

  const onSubmit = async (_data: TWorkspaceCreate) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.EMAIL_VERIFICATION_PAGE, { type: 'create' });
        utils.showToast(
          'success',
          'Workspace created successfully. Please check your email to verify your account.',
        );
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <AuthCard
      title="Create Your Workspace"
      subTitle="Set up your organisation’s central hub"
      className="pb-6 sm:pb-8 md:pb-8"
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Stack spacing={9}>
            <RHFTextField
              name="workspaceName"
              label="Organization Name"
              placeholder="Enter your company or team name"
              disabled={isPending || isLoading}
            />
            <Box display="flex" columnGap={2}>
              <Typography className="mt-3">app.okushon.ai/</Typography>
              <RHFTextField
                name="workspaceUrl"
                label="Workspace URL"
                placeholder="your-workspace"
                className="w-full"
                disabled={isPending || isLoading}
              />
            </Box>
            <RHFSelect
              name="industry"
              label="Select Industry"
              options={industryOptions}
              disabled={isPending || isLoading}
            />
          </Stack>
          <Button
            type="submit"
            size="large"
            fullWidth
            className="py-3 mt-10"
            disabled={isPending || isLoading}
            isLoading={isPending || isLoading}
          >
            Verify email
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
