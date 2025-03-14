'use client';

import React, { Fragment, useMemo, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { ChangeRoleModal } from './ChangeRoleModal';
import { roleOptions } from '@/__mocks';
import type { ERole, TListColumn } from '@/components';
import { ListAction, Modal } from '@/components';
import utils from '@/utils';

const columns: TListColumn[] = [
  { id: 'team', label: 'Team', size: { xs: 6, lg: 7 } },
  { id: 'role', label: 'Role', align: 'center', size: 3 },
  { id: 'status', label: 'Status', align: 'center', size: { xs: 2, lg: 1.5 } },
  { id: 'action', label: '', align: 'center', size: { xs: 1, lg: 0.5 } },
];

export interface IMember extends TRow {
  id: number;
  team: React.ReactNode;
  role: ERole;
}

export function TeamMemberList() {
  const [actionModal, setActionModal] = useState<TActionClick | undefined>();
  const [iseLoading, setIsLoading] = useState(false);

  const rows: IMember[] = [
    {
      id: 1,
      team: (
        <Stack>
          <Typography fontWeight="bold">John Doe</Typography>
          <Typography variant="caption" color="text-secondary">
            sarah.wilson@company.com
          </Typography>
        </Stack>
      ),
      role: roleOptions[0].value,
      status: 'Active',
      action: [
        { id: 'changeRole', label: 'Change Role' },
        { id: 'delete', label: 'Delete User' },
      ],
    },
    {
      id: 2,
      team: (
        <Stack>
          <Typography fontWeight="bold">Michael Chen</Typography>
          <Typography variant="caption" color="text-secondary">
            michael.chen@company.com
          </Typography>
        </Stack>
      ),
      role: roleOptions[1].value,
      status: 'Active',
      action: [
        { id: 'changeRole', label: 'Change Role' },
        { id: 'delete', label: 'Delete User' },
      ],
    },
    {
      id: 3,
      team: (
        <Stack>
          <Typography fontWeight="bold">Emily Rodriguez</Typography>
          <Typography variant="caption" color="text-secondary">
            emily.r@company.com
          </Typography>
        </Stack>
      ),
      role: roleOptions[1].value,
      status: 'Away',
      action: [
        { id: 'changeRole', label: 'Change Role' },
        { id: 'delete', label: 'Delete User' },
      ],
    },
  ];

  const currentMember = useMemo(
    () => rows.find((row) => row.id === actionModal?.id),
    [actionModal],
  );

  const handleSubmit = () => {
    setIsLoading(true);
    if (actionModal?.actionType === 'delete') {
      setTimeout(() => {
        setIsLoading(false);
        utils.showToast('success', 'User has been deleted successfully');
        setActionModal(undefined);
      }, 2000);
    }
  };

  const handleCloseActionModal = () => {
    setActionModal(undefined);
  };

  return (
    <Fragment>
      <ListAction columns={columns} rows={rows} onActionClick={setActionModal} sx={{ mb: 8 }} />

      {actionModal?.actionType === 'delete' && (
        <Modal
          title="Confirm Delete User"
          subTitle="This cannot be undone."
          okText="Delete"
          onSubmit={handleSubmit}
          open={actionModal?.actionType === 'delete'}
          onCancel={handleCloseActionModal}
          isLoading={iseLoading}
          buttonProps={{ fullWidth: true }}
        />
      )}

      {actionModal?.actionType === 'changeRole' && (
        <ChangeRoleModal
          data={currentMember!}
          open={actionModal?.actionType === 'changeRole'}
          onCancel={handleCloseActionModal}
        />
      )}
    </Fragment>
  );
}
