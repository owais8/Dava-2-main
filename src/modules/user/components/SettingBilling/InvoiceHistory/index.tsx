'use client';

import { Fragment } from 'react';

import { FileDownloadOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import type { IInvoiceHistoryItem } from './InvoiceHistoryList';
import { InvoiceHistoryList } from './InvoiceHistoryList';
import { dateFilterOptions } from '@/__mocks';
import { Button, Card, PageHeading, RHFSelect } from '@/components';

const invoiceHistoryData: IInvoiceHistoryItem[] = [
  {
    id: 1,
    name: 'Invoice INV-2025-001',
    amount: '$1000',
    date: 'Jan 2, 2024',
    publisher: 'Finder.com',
    cardBrand: 'Visa',
    card4lastDigits: '4242',
  },
  {
    id: 2,
    name: 'Invoice INV-2025-001',
    amount: '$1000',
    date: 'Jan 2, 2024',
    publisher: 'Finder.com',
    cardBrand: 'Visa',
    card4lastDigits: '4242',
  },
  {
    id: 3,
    name: 'Invoice INV-2025-001',
    amount: '$1000',
    date: 'Jan 2, 2024',
    publisher: 'Finder.com',
    cardBrand: 'Visa',
    card4lastDigits: '4242',
  },
];

export function InvoiceHistory() {
  const methods = useForm({
    defaultValues: {
      date: 30,
    },
  });

  return (
    <Card>
      <FormProvider {...methods}>
        <Stack noValidate component="form">
          <PageHeading
            title="Invoices"
            description="View and download your billing history"
            actionElement={
              <Fragment>
                <RHFSelect name="date" label="" options={dateFilterOptions} />
                <Button
                  fullWidth
                  variant="text"
                  size="small"
                  startIcon={<FileDownloadOutlined className="icon" />}
                  className="max-w-[140px]"
                >
                  Export all
                </Button>
              </Fragment>
            }
            actionElementProps={{ className: 'flex items-center flex-1 w-full sm:max-w-[360px]' }}
          />
        </Stack>
      </FormProvider>

      <InvoiceHistoryList data={invoiceHistoryData} />
    </Card>
  );
}
