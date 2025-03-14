'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, RHFTextField } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { useAppDispatch } from '@/lib/redux/hooks';
import { appActions } from '@/modules/app';
import type { TVerifyWorkspace } from '@/modules/auth';
import { AuthCard, VerifyWorkspaceReq } from '@/modules/auth';

export function WorkspaceJoinForm() {
  const { redirect, back } = useRedirect();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TVerifyWorkspace>({
    resolver: zodResolver(VerifyWorkspaceReq),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: TVerifyWorkspace) => {
    startTransition(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        dispatch(appActions.setWorkspaceCode(data.code));
        redirect(constants.routePages.auth.WORKSPACE_INFO_PAGE);
      }, 2000);
    });
  };

  return (
    <AuthCard
      title="Join a Workspace"
      subTitle="Enter your invitation details"
      className="pb-6 sm:pb-8 md:pb-8"
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <RHFTextField
            name="code"
            label="Invitation code"
            placeholder="XXXXXX"
            disabled={isPending || isLoading}
          />

          <Button
            type="submit"
            size="large"
            fullWidth
            className="py-3 mt-[68px]"
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
