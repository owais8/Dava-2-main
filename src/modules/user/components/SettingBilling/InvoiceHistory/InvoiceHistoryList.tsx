'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FeedOutlined, FileDownloadOutlined, SearchOutlined } from '@mui/icons-material';
import type { StackProps } from '@mui/material';
import { Box, Grid2, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { categoryOptions, sortByOptions } from '@/__mocks';
import { Button, RHFDateRangeField, RHFSelect, RHFTextField } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import type { TSearchInvoice } from '@/modules/user';
import { SearchInvoiceReqSchema } from '@/modules/user';
import theme from '@/themes';

export interface IInvoiceHistoryItem {
  id: string | number;
  name: string;
  amount: string;
  date: string;
  publisher: string;
  cardBrand: string;
  card4lastDigits: string;
}

interface IInvoiceHistoryListProps extends StackProps {
  data: IInvoiceHistoryItem[];
}

export function InvoiceHistoryList({ data, ...props }: IInvoiceHistoryListProps) {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<TSearchInvoice>({
    resolver: zodResolver(SearchInvoiceReqSchema),
    defaultValues: {
      keyword: '',
      category: 'digital_marketing',
      dateRange: '',
      sortBy: 'recent',
    },
  });

  const onSubmit = async () => {
    startTransition(() => {
      redirect(constants.routePages.auth.WORKSPACE_REQUEST_SUCCESS_PAGE);
    });
  };

  return (
    <Stack alignItems="flex-start" rowGap={6}>
      <Stack className="items-center rounded-lg bg-custom-secondary p-4 min-w-[132px]">
        <Typography component="h3" variant="h6">
          $3000
        </Typography>
        <Typography variant="caption">Total Spent</Typography>
      </Stack>

      <FormProvider {...methods}>
        <Stack
          noValidate
          component="form"
          width="100%"
          height="100%"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Grid2 container columnSpacing={{ xs: 2, sm: 4 }} rowSpacing={{ xs: 4, lg: 0 }}>
            <Grid2 size={{ xs: 12, md: 6, lg: 5 }} order={{ xs: 1 }}>
              <RHFTextField
                name="keyword"
                placeholder="Search invoice"
                slotProps={{
                  input: {
                    startAdornment: <SearchOutlined className="w-6 h-6 text-text-secondary" />,
                  },
                }}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 6, lg: 1.75 }} order={{ xs: 3, lg: 2 }}>
              <RHFSelect
                name="category"
                label="Category"
                displayEmpty
                options={categoryOptions}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6, lg: 3.5 }} order={{ xs: 2, lg: 3 }}>
              <RHFDateRangeField name="dateRange" />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 6, lg: 1.75 }} order={{ xs: 4 }}>
              <RHFSelect
                name="sortBy"
                label="Sort By"
                displayEmpty
                options={sortByOptions}
                disabled={isPending}
              />
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>

      <Stack rowGap={2} width="100%" {...props}>
        {data.map((item, index) => (
          <Stack
            key={index}
            pb={4}
            sx={{
              borderBottom: `1px solid ${theme.palette.custom?.border}`,
            }}
          >
            <Box className="flex justify-between">
              <Stack className="flex-1 sm:pr-2" rowGap={1}>
                <Typography component="h3" variant="subtitle1" fontWeight={600}>
                  {item.name}
                </Typography>

                <Typography variant="caption">
                  Publisher: <span className="text-text-secondary">{item.publisher}</span>
                </Typography>

                <Box className="w-full flex items-center" gap={1}>
                  <Typography variant="caption">{item.cardBrand}</Typography>
                  <span className="dot dot-sm">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                  <Typography variant="caption">{item.card4lastDigits}</Typography>
                </Box>
              </Stack>

              <Stack alignItems="flex-end">
                <Typography component="h3" variant="subtitle1">
                  {item.amount}
                </Typography>
                <Typography variant="caption" className="text-text-secondary">
                  {item.date}
                </Typography>
              </Stack>
            </Box>
            <Box className="w-full flex items-center justify-end mt-3 sm:mt-0" gap={2}>
              <Button
                size="small"
                variant="text"
                className="sm:px-2 text-xs"
                startIcon={<FeedOutlined className="icon" />}
                onClick={() => {}}
              >
                View details
              </Button>
              <Button
                size="small"
                variant="text"
                className="sm:px-2 text-xs -mr-2"
                startIcon={<FileDownloadOutlined className="icon" />}
                onClick={() => {}}
              >
                Download pdf
              </Button>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
