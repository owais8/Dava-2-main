'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PersonAddAlt1Outlined, SearchOutlined } from '@mui/icons-material';
import { Box, Grid2, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { MemberInviteModal } from './MemberInviteModal';
import { RequestAccessRoleModal } from './RequestAccessRoleModal';
import { TeamMemberList } from './TeamMemberList';
import { TeamOverview } from './TeamOverview';
import { roleOptions } from '@/__mocks';
import { Button, Card, CardRole, ERole, PageHeading, RHFSelect, RHFTextField } from '@/components';
import { SearchTeamReqSchema, SettingContainer, type TSearchTeam } from '@/modules/user';
import utils from '@/utils';

export function SettingTeam() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openRequestChangeRoleModal, setOpenRequestChangeRoleModal] = useState(false);

  const methods = useForm<TSearchTeam>({
    resolver: zodResolver(SearchTeamReqSchema),
    defaultValues: {
      keyword: '',
      department: 'all',
      role: 'all',
    },
  });

  const onSubmit = async (_data: TSearchTeam) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        utils.showToast('success', 'Team members updated.');
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <SettingContainer tab="team">
      <Card>
        <PageHeading
          title="Team Management"
          description="Manage your team members and their roles"
          buttonText="Invite member"
          buttonProps={{
            endIcon: <PersonAddAlt1Outlined />,
            onClick: () => setOpenInviteModal(true),
          }}
        />

        <TeamOverview />

        <FormProvider {...methods}>
          <Stack noValidate component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid2 container columnSpacing={4} mb={6}>
              <Grid2 size={{ xs: 7, md: 8, lg: 9 }}>
                <RHFTextField
                  name="keyword"
                  placeholder="Search"
                  slotProps={{
                    input: {
                      startAdornment: <SearchOutlined className="w-6 h-6 text-text-secondary" />,
                    },
                  }}
                  disabled={isPending || isLoading}
                />
              </Grid2>
              <Grid2 size={{ xs: 5, md: 4, lg: 3 }}>
                <RHFSelect
                  name="role"
                  label="Role"
                  options={[{ value: 'all', label: 'All' }, ...roleOptions]}
                  disabled={isPending || isLoading}
                />
              </Grid2>
            </Grid2>

            <TeamMemberList />

            <Box>
              <Typography mb={8}>Your Permission</Typography>
              <CardRole
                type={ERole.ADMIN}
                className="p-4 sm:p-6"
                actionIcon={
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setOpenRequestChangeRoleModal(true)}
                  >
                    Change access role
                  </Button>
                }
              />
            </Box>

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

      {openInviteModal && (
        <MemberInviteModal open={openInviteModal} onCancel={() => setOpenInviteModal(false)} />
      )}

      {openRequestChangeRoleModal && (
        <RequestAccessRoleModal
          open={openRequestChangeRoleModal}
          onCancel={() => setOpenRequestChangeRoleModal(false)}
        />
      )}
    </SettingContainer>
  );
}
