'use client';

import React, { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import type { IModalProps } from '@/components';
import { Modal, RHFTextField } from '@/components';
import type { TEditBilling } from '@/modules/user';
import { EditBillingReqSchema } from '@/modules/user';
import utils from '@/utils';

interface IEditBillingModalProps extends IModalProps {
  data: TEditBilling;
}

export const EditBillingModal = ({ data, open, onCancel }: IEditBillingModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TEditBilling>({
    resolver: zodResolver(EditBillingReqSchema),
    defaultValues: data,
  });

  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        utils.showToast('success', 'Billing information updated successfully');
        onCancel?.();
      }, 2000);
    });
  };

  return (
    <Modal
      title="Billing Information"
      okText="Save changes"
      open={open}
      onSubmit={methods.handleSubmit(onSubmit)}
      onCancel={onCancel}
      paperClassName="max-w-[493px]"
      isLoading={isPending || isLoading}
    >
      <FormProvider {...methods}>
        <Stack noValidate component="form">
          <Stack spacing={6}>
            <RHFTextField
              name="billingName"
              label="Billing Name"
              placeholder="Enter billing name"
              disabled={isPending || isLoading}
            />
            <RHFTextField
              name="billingAddress"
              label="Billing Address"
              placeholder="Enter billing address"
              disabled={isPending || isLoading}
            />
          </Stack>
        </Stack>
      </FormProvider>
    </Modal>
  );
};
