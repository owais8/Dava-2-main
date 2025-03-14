'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SearchOutlined } from '@mui/icons-material';
import { Grid2, Stack, Tooltip } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchReqSchema } from '../schemas';
import { Card, RHFTextField, TableSimple } from '@/components';

export interface ITableItem extends TRow {
  link: string;
  platform: string;
  campaignObjective: string;
  campaignTarget: string;
  source: string;
  medium: string;
  campaignName: string;
  placementLocation: string;
  contentType: string;
  costPerClick: string;
  sourceId: string;
  davaPixel: string;
}
interface TableProps {
  data: ITableItem[];
}
export const Table = ({ data }: TableProps) => {
  const methods = useForm({
    resolver: zodResolver(SearchReqSchema),
    defaultValues: { source: '', dateRange: '' },
  });
const columns: TColumn[] = [
  {
    id: 'link',
    label: 'URL',
    minWidth: 140,
    maxWidth: 140,
    format: (value: string) => (
      <Tooltip title={value} placement="top" arrow>
        <span className="line-clamp-1">{value}</span>
      </Tooltip>
    ),
  },
  {
    id: 'platform',
    label: 'Platform',
    minWidth: 140,
  },
  {
    id: 'campaignObjective',
    label: 'Campaign Objective',
    minWidth: 180,
  },
  {
    id: 'campaignTarget',
    label: 'Campaign Target',
    minWidth: 160,
  },
  {
    id: 'source',
    label: 'Source',
    minWidth: 120,
  },
  {
    id: 'medium',
    label: 'Medium',
    minWidth: 160,
  },
  {
    id: 'placementLocation',
    label: 'Placement Location',
    minWidth: 180,
  },
  {
    id: 'contentType',
    label: 'Content Type',
    minWidth: 160,
  },
  {
    id: 'costPerClick',
    label: 'Cost Per Click',
    minWidth: 160,
  },
  {
    id: 'sourceId',
    label: 'Source ID',
    minWidth: 180,
  },
  {
    id: 'davaPixel',
    label: 'Dava Pixel',
    minWidth: 140,
  },
];

  const onSubmit = () => {
    //TODO
  };

  const handleActionClick = ({ actionType, id }: TActionClick) => {
    //TODO
    // eslint-disable-next-line no-console
    console.log(actionType, id);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid2 container columnSpacing={8} mb={4}>
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <RHFTextField
                name="keywork"
                placeholder="Search..."
                slotProps={{
                  input: {
                    startAdornment: <SearchOutlined className="w-6 h-6 text-text-secondary" />,
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>
      <TableSimple columns={columns} rows={data} onActionClick={handleActionClick} />
    </Card>
  );
};
