'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SearchOutlined } from '@mui/icons-material';
import { Grid2, Stack, Tooltip } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Card, RHFTextField, TableSimple } from '@/components';
import { SearchReqSchema } from '@/modules/url-mapper/schemas';

const columns: TColumn[] = [
  {
    id: 'campaignName',
    label: 'Campaign Name',
    minWidth: 120,
  },
  {
    id: 'url',
    label: 'URL',
    minWidth: 130,
    maxWidth: 130,
    format: (value: string) => (
      <Tooltip title={value} placement="top" arrow>
        <span className="line-clamp-1">{value}</span>
      </Tooltip>
    ),
  },
  {
    id: 'platform',
    label: 'Platform',
    minWidth: 130,
  },
  {
    id: 'source',
    label: 'Source',
    minWidth: 130,
  },
  {
    id: 'medium',
    label: 'Medium',
    minWidth: 130,
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 130,
  },
  {
    id: 'term',
    label: 'Term',
    minWidth: 130,
  },
  {
    id: 'visit',
    label: 'Visits',
    minWidth: 100,
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 140,
  },
  {
    id: 'coldLeads',
    label: 'Cold Leads',
    minWidth: 120,
    headerClassName: 'bg-blur-start',
  },
  {
    id: 'costPerColdLead',
    label: 'Cost Per Cold Lead',
    minWidth: 120,
  },
  {
    id: 'hotLead',
    label: 'Hot Leads',
    minWidth: 120,
  },
  {
    id: 'costPerHotLead',
    label: 'Cost Per Hot Lead',
    minWidth: 120,
  },
  {
    id: 'acquisitions',
    label: 'Acquisitions',
    minWidth: 120,
  },
  {
    id: 'costPerAcquisitions',
    label: 'Cost Per Acquisition',
    minWidth: 120,
    headerClassName: 'bg-blur-end',
  },
  {
    id: 'action',
    label: 'Campaign Mapped?',
    align: 'center',
    minWidth: 160,
    isFixedColumn: true,
  },
];

const mockTableData: ITableItem[] = [
  {
    id: 1,
    campaignName: 'Campaign Alpha',
    url: 'https://example-domain.com/alpha',
    platform: 'Facebook',
    source: 'Ads',
    medium: 'CPC',
    type: 'Awareness',
    term: 'marketing',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '500',
    costPerColdLead: '$2.40',
    hotLead: '50',
    costPerHotLead: '$24.00',
    acquisitions: '10',
    costPerAcquisitions: '$120.00',
    action: [{ id: 'text', label: 'Yes' }],
  },
  {
    id: 2,
    campaignName: 'Campaign Beta',
    url: 'https://example-domain.com/beta',
    platform: 'Google',
    source: 'Search',
    medium: 'CPC',
    type: 'Conversion',
    term: 'business',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '300',
    costPerColdLead: '$2.67',
    hotLead: '40',
    costPerHotLead: '$20.00',
    acquisitions: '8',
    costPerAcquisitions: '$100.00',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 3,
    campaignName: 'Campaign Gamma',
    url: 'https://example-domain.com/gamma',
    platform: 'Instagram',
    source: 'Social',
    medium: 'CPC',
    type: 'Engagement',
    term: 'fitness',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '200',
    costPerColdLead: '$3.00',
    hotLead: '30',
    costPerHotLead: '$20.00',
    acquisitions: '5',
    costPerAcquisitions: '$120.00',
    action: [{ id: 'text', label: 'Yes' }],
  },
  {
    id: 4,
    campaignName: 'Campaign Delta',
    url: 'https://example-domain.com/delta',
    platform: 'LinkedIn',
    source: 'Ads',
    medium: 'CPC',
    type: 'Awareness',
    term: 'software',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '400',
    costPerColdLead: '$2.50',
    hotLead: '45',
    costPerHotLead: '$22.22',
    acquisitions: '12',
    costPerAcquisitions: '$83.33',
    action: [{ id: 'text', label: 'Yes' }],
  },
  {
    id: 5,
    campaignName: 'Campaign Epsilon',
    url: 'https://example-domain.com/epsilon',
    platform: 'YouTube',
    source: 'Video',
    medium: 'CPV',
    type: 'Branding',
    term: 'education',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '350',
    costPerColdLead: '$2.57',
    hotLead: '25',
    costPerHotLead: '$36.00',
    acquisitions: '6',
    costPerAcquisitions: '$150.00',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 6,
    campaignName: 'Campaign Zeta',
    url: 'https://example-domain.com/zeta',
    platform: 'TikTok',
    source: 'Ads',
    medium: 'CPC',
    type: 'Engagement',
    term: 'fashion',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '280',
    costPerColdLead: '$2.50',
    hotLead: '35',
    costPerHotLead: '$20.00',
    acquisitions: '7',
    costPerAcquisitions: '$100.00',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 7,
    campaignName: 'Campaign Eta',
    url: 'https://example-domain.com/eta',
    platform: 'Snapchat',
    source: 'Ads',
    medium: 'CPC',
    type: 'Awareness',
    term: 'travel',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '250',
    costPerColdLead: '$3.20',
    hotLead: '20',
    costPerHotLead: '$40.00',
    acquisitions: '5',
    costPerAcquisitions: '$160.00',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 8,
    campaignName: 'Campaign Theta',
    url: 'https://example-domain.com/theta',
    platform: 'Pinterest',
    source: 'Pins',
    medium: 'CPC',
    type: 'Branding',
    term: 'decor',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '180',
    costPerColdLead: '$2.78',
    hotLead: '15',
    costPerHotLead: '$33.33',
    acquisitions: '4',
    costPerAcquisitions: '$125.00',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 9,
    campaignName: 'Campaign Iota',
    url: 'https://example-domain.com/iota',
    platform: 'Reddit',
    source: 'Ads',
    medium: 'CPC',
    type: 'Engagement',
    term: 'tech',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '150',
    costPerColdLead: '$2.67',
    hotLead: '10',
    costPerHotLead: '$40.00',
    acquisitions: '3',
    costPerAcquisitions: '$133.33',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 10,
    campaignName: 'Campaign Kappa',
    url: 'https://example-domain.com/kappa',
    platform: 'Twitter',
    source: 'Ads',
    medium: 'CPC',
    type: 'Conversion',
    term: 'marketing',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '600',
    costPerColdLead: '$2.50',
    hotLead: '60',
    costPerHotLead: '$25.00',
    acquisitions: '15',
    costPerAcquisitions: '$100.00',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 11,
    campaignName: 'Campaign Lambda',
    url: 'https://example-domain.com/lambda',
    platform: 'Facebook',
    source: 'Ads',
    medium: 'CPC',
    type: 'Engagement',
    term: 'gaming',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '220',
    costPerColdLead: '$3.18',
    hotLead: '25',
    costPerHotLead: '$28.00',
    acquisitions: '6',
    costPerAcquisitions: '$116.67',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
  {
    id: 12,
    campaignName: 'Campaign Mu',
    url: 'https://example-domain.com/mu',
    platform: 'Instagram',
    source: 'Social',
    medium: 'CPC',
    type: 'Awareness',
    term: 'health',
    visit: '23',
    startDate: '20 Dec 2025',
    coldLeads: '300',
    costPerColdLead: '$3.00',
    hotLead: '30',
    costPerHotLead: '$30.00',
    acquisitions: '8',
    costPerAcquisitions: '$112.50',
    action: [{ id: 'add', label: 'Add to mapper' }],
  },
];

interface ITableItem extends TRow {
  campaignName: string;
  url: string;
  platform: string;
  source: string;
  medium: string;
  type: string;
  term: string;
  visit: string;
  startDate: string;
  coldLeads: string;
  costPerColdLead: string;
  hotLead: string;
  costPerHotLead: string;
  acquisitions: string;
  costPerAcquisitions: string;
}

export const Table = () => {
  const methods = useForm({
    resolver: zodResolver(SearchReqSchema),
    defaultValues: {
      source: '',
      dateRange: '',
    },
  });

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
            <Grid2 size={{ xs: 12, sm: 6, md: 5, lg: 4 }}>
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
      <TableSimple
        isShowBgBlur
        columns={columns}
        rows={mockTableData}
        onActionClick={handleActionClick}
      />
    </Card>
  );
};
