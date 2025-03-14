'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { GroupOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { teamMemberOptions } from '@/__mocks';
import type { IListItem, IModalProps } from '@/components';
import { CheckedIcon, List, ListDot, Modal, RHFSelect, TransferIcon } from '@/components';
import utils from '@/utils';

const data: IListItem[] = [
  {
    title: 'Before proceeding, please note:',
    titleProps: { variant: 'body1', fontWeight: 'bold' },
    className: 'py-5',
    listItemTextProps: { className: 'my-0' },
    subTitle: (
      <ListDot
        className="mt-2 mb-0 space-y-1"
        data={[
          {
            text: 'The new owner will assume all billing responsibilities',
            className: 'text-sm leading-6',
          },
          {
            text: 'They will have full access to manage the account',
            className: 'text-sm leading-6',
          },
          { text: 'This action cannot be undone', className: 'text-sm leading-6' },
          { text: 'Your role will change to Admin after transfer', className: 'text-sm leading-6' },
        ]}
      />
    ),
  },
];

const dataSuccess: IListItem[] = [
  {
    title: 'What happens next?',
    titleProps: { variant: 'body1', fontWeight: 'bold' },
    className: 'py-5',
    listItemTextProps: { className: 'my-0' },
    subTitle: (
      <ListDot
        className="mt-2 mb-0 space-y-1"
        data={[
          {
            text: 'Your role has been changed to Team Manager',
            className: 'text-sm leading-6',
          },
          {
            text: 'Billing responsibilities have been transferred',
            className: 'text-sm leading-6',
          },
          { text: 'The new owner can now manage account settings', className: 'text-sm leading-6' },
        ]}
      />
    ),
  },
];

const dataNewRole: IListItem[] = [
  {
    title: 'New Account Owner',
    icon: <GroupOutlined />,
    subTitle: (
      <>
        <Typography>Michael Chen</Typography>
        <Typography>michael.chen@company.com</Typography>
      </>
    ),
    desc: 'Confirmation has been emailed to you and the new owner. ',
  },
];

const schema = z.object({
  member: z.string().nonempty('Please select a team member'),
});

export const TransferAccountModal = ({ open, onCancel }: IModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferSuccess, setTransferSuccess] = useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      member: '',
    },
  });

  const onSubmit = async () => {
    if (!isTransferSuccess) {
      setIsLoading(true);
      setTimeout(() => {
        setTransferSuccess(true);
        utils.showToast('success', 'Ownership has been transferred successfully');
        setIsLoading(false);
      }, 2000);

      return;
    }

    onCancel?.();
  };

  return (
    <Modal
      title={isTransferSuccess ? 'Ownership Transfer Complete' : 'Transfer Account Ownership'}
      subTitle={
        isTransferSuccess
          ? 'Account ownership has been successfully transferred'
          : 'This action will transfer all billing responsibilities and owner permissions to another team member.'
      }
      subTitleProps={{ mt: 6 }}
      okText={isTransferSuccess ? 'Close' : 'Transfer Account'}
      icon={isTransferSuccess ? <CheckedIcon /> : <TransferIcon />}
      open={open}
      onCancel={!isTransferSuccess ? onCancel : undefined}
      onSubmit={methods.handleSubmit(onSubmit)}
      paperClassName="max-w-[493px]"
      isLoading={isLoading}
    >
      <FormProvider {...methods}>
        <Stack noValidate component="form">
          <Stack spacing={6}>
            {isTransferSuccess && <List data={dataNewRole} />}
            <List data={isTransferSuccess ? dataSuccess : data} />
            {!isTransferSuccess && (
              <>
                <Typography>Select New Owner</Typography>
                <RHFSelect name="member" label="Select Team Member" options={teamMemberOptions} />
              </>
            )}
          </Stack>
        </Stack>
      </FormProvider>
    </Modal>
  );
};
