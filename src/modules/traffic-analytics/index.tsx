'use client';

import { useMemo } from 'react';

import { PersonOutline } from '@mui/icons-material';
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { FormProvider } from 'react-hook-form';

import { Table } from './components/Table';
import { CHART_DATA, dateRangeOptions, sourceOptions } from './data';
import { generateLineChartMockData } from './helper';
import type { IData } from './type';
import { Card, CardOverview, Loading, PageHeading, RHFSelect } from '@/components';
import { Annotation } from '@/modules/traffic-analytics/components/Annotation';
import { useLogic } from '@/modules/traffic-analytics/hooks/useLogic';

const BarChartSource = dynamic(
  () => import('./components/BarChartSource').then((res) => res.BarChartSource<IData>),
  {
    ssr: false,
    loading: () => <Loading size="32px" />,
  },
);

const LineChartOverTime = dynamic(
  () => import('./components/LineChartOverTime').then((res) => res.LineChartOverTime<IData>),
  {
    ssr: false,
    loading: () => <Loading size="32px" />,
  },
);

export function TrafficAnalyticPage() {
  const { methods, annotationData, ...rest } = useLogic();

  const renderLineChart = useMemo(() => {
    const lineChartData = generateLineChartMockData(CHART_DATA, methods.watch('dateRange'));

    return (
      <LineChartOverTime
        data={lineChartData}
        currentSource={methods.watch('source')}
        dateRange={methods.watch('dateRange')}
        annotationData={annotationData}
      />
    );
  }, [methods.watch('source'), methods.watch('dateRange'), annotationData]);

  const renderBarChart = useMemo(() => {
    return <BarChartSource data={CHART_DATA} currentSource={methods.watch('source')} />;
  }, [CHART_DATA, methods.watch('source')]);

  return (
    <Stack spacing={4}>
      <Card>
        <PageHeading
          title="Ad Campaign Calculator"
          titleVariant={{ variant: 'h5', fontWeight: 500 }}
        />

        <FormProvider {...methods}>
          <Stack noValidate component="form">
            <Grid2
              container
              columnSpacing={{ xs: 6, lg: 30 }}
              rowSpacing={{ xs: 4, lg: 0 }}
              justifyContent="space-between"
            >
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <CardOverview
                  isVertical
                  type="sale"
                  title="Visits"
                  value="5287"
                  valueProps={{ className: 'text-[30px]' }}
                  text="this month"
                  rate={8.1}
                  icon={<PersonOutline />}
                  className="mt-1"
                  boxClassName="gap-4"
                  contentClassName="sm:p-3"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <Grid2 container columnSpacing={{ sm: 4, lg: 8 }} rowSpacing={{ xs: 4, sm: 0 }}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <RHFSelect
                      displayEmpty
                      name="source"
                      label="Source"
                      placeholder="Select Source"
                      options={sourceOptions}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <RHFSelect
                      name="dateRange"
                      label="Date Range"
                      placeholder="Select Date Range"
                      options={dateRangeOptions}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Stack>
        </FormProvider>
      </Card>

      <Card>
        <Grid2 container columnSpacing={20} rowSpacing={{ xs: 10, lg: 0 }}>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Stack sx={{ height: 400 }}>
              <Typography variant="h6" mb={2}>
                Visits Over Time
              </Typography>
              <Divider />
              {renderLineChart}
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Stack sx={{ height: 400 }}>
              <Typography variant="h6" mb={2}>
                Visits By Source
              </Typography>
              <Divider />
              {renderBarChart}
            </Stack>
          </Grid2>
        </Grid2>

        <Stack rowGap={4}>
          <Divider />

          <Annotation {...rest} annotationData={annotationData} />
        </Stack>
      </Card>

      <Table />
    </Stack>
  );
}
