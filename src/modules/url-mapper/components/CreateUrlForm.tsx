'use client';

import React, { Fragment } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddOutlined } from '@mui/icons-material';
import { Grid2, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { FilterUrlReqSchema } from '../schemas';
import { sourceOptions } from '@/__mocks';
import { Button, Card, RHFDateRangeField, RHFSelect } from '@/components';
import { CreateUrlModal } from '@/modules/url-mapper/components/CreateUrlModal';

interface CreateUrlFormProps {
  onCreateMapping: (data: any) => Promise<void>;
}
export const CreateUrlForm = ({ onCreateMapping }: CreateUrlFormProps) => {
  const [open, setOpen] = React.useState(false);

  const methods = useForm({
    resolver: zodResolver(FilterUrlReqSchema),
    defaultValues: {
      source: '',
      dateRange: '',
    },
  });

  const onSubmit = () => {
    //TODO
  };

  return (
    <Fragment>
      <Card>
        <FormProvider {...methods}>
          <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid2 container columnSpacing={8} rowSpacing={6} alignItems="center">
              <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                <RHFSelect
                  name="source"
                  label="Source"
                  placeholder="Select source"
                  options={sourceOptions}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
                <RHFDateRangeField name="dateRange" label="Date Range" />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }} className="flex justify-end">
                <Button endIcon={<AddOutlined />} onClick={() => setOpen(true)}>
                  Create new URL
                </Button>
              </Grid2>
            </Grid2>
          </Stack>
        </FormProvider>
      </Card>
      <CreateUrlModal 
        open={open} 
        onCancel={() => setOpen(false)}
        onCreateMapping={onCreateMapping}
      />
      </Fragment>
  );
};
