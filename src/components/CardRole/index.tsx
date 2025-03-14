'use client';

import React, { Fragment, useMemo } from 'react';

import {
  AdminPanelSettingsOutlined,
  PeopleAltOutlined,
  VisibilityRounded,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import type { FC } from 'react';

import type { IListItem } from '@/components';
import { List, ListDot } from '@/components';

export enum ERole {
  ADMIN = 'Administrator',
  MANAGER = 'Team',
}

interface ICardRoleProps {
  type: ERole;
  actionIcon?: React.ReactNode;
  className?: string;
}

export const CardRole: FC<ICardRoleProps> = ({ actionIcon, className, type }) => {
  const data: IListItem[] = [
    {
      title: 'Administrator',
      icon: <AdminPanelSettingsOutlined />,
      subTitle: (
        <Fragment>
          <Typography>Full system access with the ability to manage users and settings</Typography>
          <ListDot
            className="mt-2"
            data={[
              { text: 'Manage team members' },
              { text: 'Configure system settings & billing' },
              { text: 'Create & manage auctions & bidding' },
            ]}
          />
        </Fragment>
      ),
      actionIcon,
      className,
    },
    {
      title: 'Team',
      icon: <PeopleAltOutlined />,
      subTitle: (
        <Fragment>
          <Typography>Manage auctions & bidding with no admin capabilities</Typography>
          <ListDot
            className="mt-2"
            data={[{ text: 'Create & manage auctions' }, { text: 'Bid on auctions' }]}
          />
        </Fragment>
      ),
      actionIcon,
      className,
    },
    {
      title: 'Viewer',
      icon: <VisibilityRounded />,
      subTitle: (
        <Fragment>
          <Typography>View-only access to projects & resources</Typography>
          <ListDot
            className="mt-2"
            data={[{ text: 'Read-only permissions' }, { text: 'Access shared resources' }]}
          />
        </Fragment>
      ),
      actionIcon,
      className,
    },
  ];

  const roleData = useMemo(() => data.filter((item) => item.title === type), [type]);

  return <List data={roleData} />;
};
