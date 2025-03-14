'use client';

import React, { useEffect, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { roleOptions } from '@/__mocks';
import type { ERole, IModalProps } from '@/components';
import { Button, CardRole, Modal, RHFSelect, RHFTextField } from '@/components';
import type { TWorkspaceInviteMembers } from '@/modules/auth';
import { WorkspaceInviteMembersReqSchema } from '@/modules/auth';
import utils from '@/utils';

export const MemberInviteModal = ({ open, onCancel }: IModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<TWorkspaceInviteMembers>({
    resolver: zodResolver(WorkspaceInviteMembersReqSchema),
    defaultValues: {
      members: [{ email: '', role: '' }],
    },
  });

  const { control, watch } = methods;
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

  const onSubmit = async () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        utils.showToast('success', 'Invites sent successfully');
        onCancel?.();
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
    <Modal
      title="Invite Member"
      subTitle="Add new members to your team"
      okText="Send invites"
      open={open}
      onSubmit={methods.handleSubmit(onSubmit)}
      onCancel={onCancel}
      paperClassName="max-w-[493px]"
      isLoading={isPending || isLoading}
    >
      <FormProvider {...methods}>
        <Stack noValidate component="form">
          <Stack spacing={6}>
            {fields.map((field, index) => (
              <Stack key={field.id}>
                {index > 0 && (
                  <IconButton
                    disableRipple
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
              fullWidth
              color="inherit"
              variant="outlined"
              className="py-[11px]"
              onClick={handleAddMore}
              startIcon={<AddOutlined />}
              disabled={isPending || isLoading}
            >
              Add another team member
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Modal>
  );
};
