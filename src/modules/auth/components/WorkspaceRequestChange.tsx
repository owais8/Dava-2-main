'use client';

import { Fragment, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChatOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { roleOptions } from '@/__mocks';
import { Button, CardRole, ERole, List, RHFSelect, RHFTextField } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import type { TRequestAccessRole } from '@/modules/auth';
import { AuthCard, RequestAccessRoleReqSchema } from '@/modules/auth';
import utils from '@/utils';

export function WorkspaceRequestChange() {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TRequestAccessRole>({
    resolver: zodResolver(RequestAccessRoleReqSchema),
    defaultValues: {
      role: '',
      reason: '',
    },
  });

  const onSubmit = async (_data: TRequestAccessRole) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.WORKSPACE_REQUEST_SUCCESS_PAGE);
        utils.showToast('success', 'Request sent successfully');
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <AuthCard
      title="Request Access Change"
      subTitle="Contact workspace admin for role modification"
      className="py-10 sm:pb-10 md:pb-[60px]"
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Stack>
            <Typography textAlign="center" mb={4}>
              Current Role:
            </Typography>
            <CardRole type={ERole.MANAGER} />
          </Stack>

          <Stack mt={9} mb={6}>
            <Typography textAlign="center" mb={4}>
              Request Role:
            </Typography>

            <RHFSelect
              name="role"
              label="Select Role"
              options={roleOptions}
              disabled={isPending || isLoading}
            />
            <RHFTextField
              name="reason"
              label="Reason for Request"
              placeholder="Please provide the reason for this request..."
              multiline
              rows={2.3}
              className="mt-6"
              disabled={isPending || isLoading}
            />
          </Stack>

          <List
            data={[
              {
                subTitle: (
                  <Fragment>
                    <Typography>Your request will be sent to:</Typography>
                    <Typography>Sarah Wilson (Workspace Admin)</Typography>
                  </Fragment>
                ),

                icon: <ChatOutlined />,
                titleProps: { variant: 'subtitle1' },
              },
            ]}
          />

          <Stack direction="row" justifyContent="space-between" gap={3} mt={10}>
            <Button
              size="large"
              fullWidth
              color="inherit"
              variant="outlined"
              className="py-2.5"
              onClick={() => redirect(constants.routePages.auth.WORKSPACE_INFO_PAGE)}
              disabled={isPending || isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="large"
              fullWidth
              className="py-3 px-2"
              disabled={isPending || isLoading}
              isLoading={isPending || isLoading}
            >
              Send request
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </AuthCard>
  );
}
