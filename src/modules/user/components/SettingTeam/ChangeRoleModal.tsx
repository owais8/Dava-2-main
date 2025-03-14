'use client';

import React, { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import type { IMember } from './TeamMemberList';
import { roleOptions } from '@/__mocks';
import type { IModalProps } from '@/components';
import { CardRole, Modal, RHFSelect } from '@/components';
import type { TRequestAccessRole } from '@/modules/auth';
import { RequestAccessRoleReqSchema } from '@/modules/auth';
import utils from '@/utils';

export const ChangeRoleModal = ({ data, open, onCancel }: { data: IMember } & IModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<Omit<TRequestAccessRole, 'reason'>>({
    resolver: zodResolver(RequestAccessRoleReqSchema.omit({ reason: true })),
    defaultValues: {
      role: '',
    },
  });

  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        utils.showToast('success', 'Role has been changed successfully');
        onCancel?.();
      }, 2000);
    });
  };

  return (
    <Modal
      title="Change Access Role"
      okText="Confirm"
      open={open}
      onSubmit={methods.handleSubmit(onSubmit)}
      onCancel={onCancel}
      paperClassName="max-w-[493px]"
      isLoading={isPending || isLoading}
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" noValidate>
          <Stack gap={4} mb={8}>
            <Typography>Current Role:</Typography>
            <CardRole type={data.role} />
          </Stack>

          <Stack gap={4}>
            <Typography>New Role:</Typography>
            <RHFSelect name="role" label="Select Role" options={roleOptions} />
          </Stack>
        </Stack>
      </FormProvider>
    </Modal>
  );
};
