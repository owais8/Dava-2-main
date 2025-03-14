'use client';

import React, { Fragment, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChatOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { roleOptions } from '@/__mocks';
import type { IModalProps } from '@/components';
import {
  CardRole,
  CheckedIcon,
  ERole,
  List,
  Modal,
  RHFSelect,
  RHFTextField,
  TextLink,
} from '@/components';
import constants from '@/constants';
import type { TRequestAccessRole } from '@/modules/auth';
import { RequestAccessRoleReqSchema } from '@/modules/auth';
import utils from '@/utils';

export const RequestAccessRoleModal = ({ open, onCancel }: IModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TRequestAccessRole>({
    resolver: zodResolver(RequestAccessRoleReqSchema),
    defaultValues: {
      role: '',
      reason: '',
    },
  });
  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        utils.showToast('success', 'Request sent successfully');
        setIsSuccess(true);
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <Modal
      title={isSuccess ? 'Request Sent Successfully' : 'Request Access Role'}
      okText={isSuccess ? 'Close' : 'Send Request'}
      icon={isSuccess ? <CheckedIcon /> : undefined}
      open={open}
      onSubmit={isSuccess ? onCancel : methods.handleSubmit(onSubmit)}
      onCancel={!isSuccess ? onCancel : undefined}
      paperClassName="max-w-[493px]"
      isLoading={isPending || isLoading}
    >
      {isSuccess ? (
        <Stack>
          <Typography mb={4}>Your access change request has been submitted</Typography>
          <Stack className="bg-custom-card py-3 px-4 rounded-[10px] space-y-[2px]">
            <Box display="flex" justifyContent="space-between">
              <Typography>Requested Role:</Typography>
              <Typography fontWeight={600}>Team Manager</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Current Status:</Typography>
              <Typography fontWeight={600}>Pending Approval</Typography>
            </Box>
          </Stack>

          <Box mt={6}>
            Need immediate assistance?
            <TextLink href={`mailto:${constants.shared.APP.MAIL}`} ml={1} fontWeight="bold">
              Contact Support
            </TextLink>
          </Box>
        </Stack>
      ) : (
        <FormProvider {...methods}>
          <Stack width="100%" component="form" noValidate>
            <Stack>
              <Typography mb={4}>Current Role:</Typography>
              <CardRole type={ERole.MANAGER} />
            </Stack>

            <Stack mt={9} mb={6}>
              <Typography mb={4}>Request Role:</Typography>

              <RHFSelect name="role" label="Select Role" options={roleOptions} />
              <RHFTextField
                name="reason"
                label="Reason for Request"
                placeholder="Please explain why you need this level of access."
                multiline
                rows={2.3}
                className="mt-6"
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
          </Stack>
        </FormProvider>
      )}
    </Modal>
  );
};
