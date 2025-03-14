'use client';

import { useTransition } from 'react';

import { ApartmentOutlined, ChevronLeft } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, CardRole, ERole, List, RHFTextField, TextLink } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { useSelectorAppStore } from '@/modules/app';
import { AuthCard } from '@/modules/auth';

export function WorkspaceInfo() {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const { workspaceCode } = useSelectorAppStore();

  const methods = useForm({
    defaultValues: {
      code: workspaceCode,
    },
  });

  const onSubmit = async () => {
    startTransition(() => {
      redirect(constants.routePages.auth.PROFILE_SETUP_PAGE);
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
            disabled={isPending}
          />

          <Stack spacing={6} mt={6}>
            <List
              data={[
                {
                  title: 'Company Name',
                  subTitle: 'Invited by: Sarah Wilson (Admin)',
                  icon: <ApartmentOutlined />,
                  titleProps: { variant: 'subtitle1' },
                },
              ]}
            />
            <Typography textAlign="center">Your Access Level:</Typography>
            <CardRole type={ERole.MANAGER} />

            <Box display="flex" justifyContent="center" alignItems="center">
              Not the right access level?
              <TextLink
                href={constants.routePages.auth.WORKSPACE_REQUEST_CHANGE_PAGE}
                ml={1}
                fontWeight="bold"
              >
                Request Change
              </TextLink>
            </Box>
          </Stack>

          <Button type="submit" size="large" fullWidth className="py-3 mt-6" disabled={isPending}>
            Accept & Join
          </Button>

          <Box display="flex" mt={9}>
            <IconButton
              disableRipple
              size="medium"
              color="inherit"
              onClick={() => redirect(constants.routePages.auth.WORKSPACE_PAGE)}
              sx={{ ml: -4 }}
              className="group"
              disabled={isPending}
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
