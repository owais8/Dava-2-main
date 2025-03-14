'use client';

import { Fragment, useState, useTransition } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Card, PageHeading, RHFSwitch } from '@/components';
import { SettingContainer } from '@/modules/user';
import utils from '@/utils';

const data = [
  {
    title: 'Email notifications',
    description: 'Receive notifications about updates',
    value: false,
  },
];

export function SettingNotification() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        utils.showToast('success', 'Notification preferences updated');
      }, 2000);
    });
  };

  return (
    <SettingContainer tab="notifications">
      <Card>
        <PageHeading
          title="Notification Preferences"
          description="Choose what notifications you want to receive"
        />
        <FormProvider {...methods}>
          <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            {data.map((item, index) => (
              <Fragment key={index}>
                <Stack>
                  <Typography component="h3" variant="subtitle1">
                    {item.title}
                  </Typography>
                  <Typography className="text-text-secondary" mt={1}>
                    {item.description}
                  </Typography>
                  <RHFSwitch
                    name="email"
                    checked={item.value}
                    className="mt-4"
                    disabled={isPending || isLoading}
                  />
                </Stack>
                {index !== 0 && <Divider className="my-5" />}
              </Fragment>
            ))}

            <Box mt={10}>
              <Button
                type="submit"
                disabled={isPending || isLoading}
                isLoading={isPending || isLoading}
              >
                Save change
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </SettingContainer>
  );
}
