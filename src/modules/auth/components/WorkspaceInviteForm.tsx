'use client';

import { useEffect, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddOutlined, ChevronLeft, RemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { AuthCard } from './AuthCard';
import { roleOptions } from '@/__mocks';
import type { ERole } from '@/components';
import { Button, CardRole, RHFSelect, RHFTextField } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { type TWorkspaceInviteMembers, WorkspaceInviteMembersReqSchema } from '@/modules/auth';
import utils from '@/utils';

export function WorkspaceInviteForm() {
  const { redirect } = useRedirect();
  const [isPending, startTransition] = useTransition();
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TWorkspaceInviteMembers>({
    resolver: zodResolver(WorkspaceInviteMembersReqSchema),
    defaultValues: {
      members: [{ email: '', role: '' }],
    },
  });

  const { handleSubmit, control, watch } = methods;
  const { append, fields, remove } = useFieldArray({ name: 'members', control });
  const members = watch('members');

  const isInvalidMember =
    members.filter((member) => !member.email.trim() || !member.role.trim()).length > 0;

  useEffect(() => {
    if (isInvalidMember && hasClicked) {
      utils.showToast('default', 'Please fill in all fields before adding another team member');
      setHasClicked(false);
    }
  }, [isInvalidMember, hasClicked]);

  const onSubmit = async (_data: TWorkspaceInviteMembers) => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        redirect(constants.routePages.auth.PROFILE_SETUP_PAGE);
        utils.showToast('success', 'Invites sent successfully.');
        setIsLoading(false);
      }, 2000);
    });
  };

  const handleAddMore = () => {
    if (isInvalidMember) {
      if (!hasClicked) {
        setHasClicked(true);
      }

      return;
    }

    append({ email: '', role: '' });
  };

  return (
    <AuthCard
      title="Invite your team"
      subTitle="Add team members and set their roles"
      className="pb-6 sm:pb-8 md:pb-8"
    >
      <FormProvider {...methods}>
        <Stack width="100%" component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={6}>
            {fields.map((field, index) => (
              <Stack key={field.id}>
                {index > 0 && (
                  <IconButton
                    className="ml-auto -mr-3"
                    onClick={() => remove(index)}
                    disabled={isPending || isLoading}
                  >
                    <RemoveOutlined />
                  </IconButton>
                )}
                <Stack spacing={6}>
                  <RHFTextField
                    name={`members.${index}.email`}
                    label="Email Address"
                    placeholder="name@company.com"
                    disabled={isPending || isLoading}
                  />
                  <RHFSelect
                    name={`members.${index}.role`}
                    label="Select Role"
                    options={roleOptions}
                    disabled={isPending || isLoading}
                  />
                  {members[index].role && <CardRole type={members[index].role as ERole} />}
                </Stack>
              </Stack>
            ))}

            <Button
              size="large"
              fullWidth
              variant="outlined"
              color="inherit"
              className="py-[11px] px-2 sm:px-6"
              onClick={handleAddMore}
              startIcon={<AddOutlined />}
              disabled={isPending || isLoading}
            >
              Add another team member
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={3} mt={12}>
            <Button
              size="large"
              fullWidth
              color="inherit"
              variant="outlined"
              className="py-2.5"
              onClick={() => redirect(constants.routePages.auth.PROFILE_SETUP_PAGE)}
              disabled={isPending || isLoading}
            >
              Skip for now
            </Button>
            <Button
              type="submit"
              size="large"
              fullWidth
              className="py-3"
              disabled={isPending || isLoading}
              isLoading={isPending || isLoading}
            >
              Send invites
            </Button>
          </Stack>

          <Box display="flex" mt={9}>
            <IconButton
              disableRipple
              size="medium"
              color="inherit"
              onClick={() => redirect(constants.routePages.auth.WORKSPACE_PAGE)}
              sx={{ ml: -4 }}
              className="group"
              disabled={isPending || isLoading}
            >
              <ChevronLeft />
              <Typography className="group-hover:underline">Back</Typography>
            </IconButton>
          </Box>
        </Stack>
      </FormProvider>
    </AuthCard>
  );
}
