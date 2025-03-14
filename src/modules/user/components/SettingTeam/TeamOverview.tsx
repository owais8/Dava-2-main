'use client';

import { GroupAddOutlined, GroupOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

import { CardOverview } from '@/components';

const overviewData = [
  {
    title: 'Total Members',
    value: '24',
    icon: <GroupOutlined className="icon" />,
  },
  {
    title: 'Active Now',
    value: '12',
    icon: <GroupAddOutlined className="icon" />,
  },
  {
    title: 'Pending Invites',
    value: '3',
    icon: <GroupOutlined className="icon" />,
  },
];

export function TeamOverview() {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-3" columnGap={{ xs: 4, lg: 6 }} rowGap={4} mb={6}>
      {overviewData.map((item, index) => (
        <CardOverview key={index} {...item} />
      ))}
    </Box>
  );
}
