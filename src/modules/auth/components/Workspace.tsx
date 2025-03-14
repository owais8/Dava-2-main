'use client';

import { ApartmentOutlined, PeopleAltOutlined } from '@mui/icons-material';

import { type IListItem, List } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { AuthCard } from '@/modules/auth';

export function Workspace() {
  const { redirect } = useRedirect();

  const MOCK_DATA: IListItem[] = [
    {
      title: 'Create a new workspace',
      subTitle: 'Set up a workspace for your team',
      icon: <ApartmentOutlined />,
      onAction: () => redirect(constants.routePages.auth.WORKSPACE_CREATE_PAGE),
    },
    {
      title: 'Join an existing workspace',
      subTitle: 'Enter an invite code',
      icon: <PeopleAltOutlined />,
      onAction: () => redirect(constants.routePages.auth.WORKSPACE_JOIN_PAGE),
    },
  ];

  return (
    <AuthCard title="What would you like to do?" className="py-[60px] sm:pb-[80px] md:pb-[120px]">
      <List variant="outlined" data={MOCK_DATA} />
    </AuthCard>
  );
}
