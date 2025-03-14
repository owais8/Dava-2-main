'use client';

import React, { useEffect, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { GppGoodOutlined } from '@mui/icons-material';
import { Box, Grid2, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import type { IModalProps } from '@/components';
import { Card, Modal, RHFCheckbox, RHFDateField, RHFTextField } from '@/components';
import type { TPaymentCard } from '@/modules/user';
import { PaymentCardReqSchema } from '@/modules/user';
import utils from '@/utils';

interface IUpsertModalProps extends IModalProps {
  data?: TPaymentCard;
}

export const UpsertCardModal = ({ data, open, onCancel }: IUpsertModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TPaymentCard>({
    resolver: zodResolver(PaymentCardReqSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: null,
      cvv: '',
      cardName: '',
      isDefault: false,
    },
  });

  useEffect(() => {
    if (data) {
      methods.setValue('cardNumber', data.cardNumber);
      methods.setValue('expiryDate', data.expiryDate);
      methods.setValue('cvv', data.cvv);
      methods.setValue('cardName', data.cardName);
      methods.setValue('isDefault', data.isDefault);
    }
  }, [data]);

  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        utils.showToast('success', 'Card added successfully');
        onCancel?.();
      }, 2000);
    });
  };

  return (
    <Modal
      title={data ? 'Edit Card' : 'Add New Card'}
      okText={data ? 'Save' : 'Add Card'}
      open={open}
      onSubmit={methods.handleSubmit(onSubmit)}
      onCancel={onCancel}
      paperClassName="max-w-[493px]"
      isLoading={isPending || isLoading}
    >
      <FormProvider {...methods}>
        <Stack noValidate component="form">
          <Grid2 container columnSpacing={1.4} rowSpacing={4}>
            <Grid2 size={12}>
              <RHFTextField
                name="cardNumber"
                label="Card Number"
                placeholder="xxxx xxxx xxxx xxxx"
                disabled={isPending || isLoading}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFDateField
                name="expiryDate"
                label="Expiry Date"
                format="MM/YY"
                disabled={isPending || isLoading}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField
                name="cvv"
                label="CVV"
                placeholder="123"
                disabled={isPending || isLoading}
              />
            </Grid2>
            <Grid2 size={12}>
              <RHFTextField
                name="cardName"
                label="Card holder Name"
                placeholder="Enter card holder name"
                disabled={isPending || isLoading}
              />
            </Grid2>
            <Grid2 size={12}>
              <RHFCheckbox
                name="defaultCard"
                label="Set as default payment method"
                labelClassName="text-text-secondary"
                disabled={isPending || isLoading}
              />
            </Grid2>
            <Grid2 size={12}>
              <Card cardContentClassName="py-2 px-4 bg-custom-secondary">
                <Box className="flex items-center space-x-2">
                  <GppGoodOutlined className="icon" />
                  <Typography variant="caption">
                    Your card information will be stored securely
                  </Typography>
                </Box>
              </Card>
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>
    </Modal>
  );
};
