'use client';

import {
  BusinessOutlined,
  CreditCardOutlined,
  GroupsOutlined,
  NotificationsOutlined,
  PersonOutline,
  SecurityOutlined,
} from '@mui/icons-material';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import type { SyntheticEvent } from 'react';

import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { cn } from '@/lib';

export const SETIING_TABS = [
  {
    label: 'Profile',
    icon: <PersonOutline className="w-6 h-6 mr-2" />,
    href: constants.routePages.private.SETTING_PROFILE_PAGE,
  },
  {
    label: 'Organisation',
    icon: <BusinessOutlined className="w-6 h-6 mr-2" />,
    href: constants.routePages.private.SETTING_ORGANISATION_PAGE,
  },
  {
    label: 'Team',
    icon: <GroupsOutlined className="w-6 h-6 mr-2" />,
    href: constants.routePages.private.SETTING_TEAM_PAGE,
  },
  {
    label: 'Notifications',
    icon: <NotificationsOutlined className="w-6 h-6 mr-2" />,
    href: constants.routePages.private.SETTING_NOTIFICATION_PAGE,
  },
  {
    label: 'Security',
    icon: <SecurityOutlined className="w-6 h-6 mr-2" />,
    href: constants.routePages.private.SETTING_SECURITY_PAGE,
  },
  {
    label: 'Billing',
    icon: <CreditCardOutlined className="w-6 h-6 mr-2" />,
    href: constants.routePages.private.SETTING_BILLING_PAGE,
  },
];
interface ISettingTabProps {
  tab: 'profile' | 'organisation' | 'team' | 'agencies' | 'notifications' | 'security' | 'billing';
  children: React.ReactNode;
}

export function SettingContainer({ tab, children }: ISettingTabProps) {
  const { redirect } = useRedirect();

  const tabActived = SETIING_TABS.findIndex((t) => t.label.toLowerCase() === tab);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    redirect(SETIING_TABS[newValue].href);
  };

  return (
    <Stack rowGap={{ xs: 4, md: 6 }} className="max-w-full h-full">
      <Tabs
        value={tabActived}
        onChange={handleChange}
        variant="scrollable"
        aria-label="Setting navigation"
        textColor="secondary"
        TabIndicatorProps={{
          style: { display: 'none' },
        }}
        sx={{
          minHeight: '42px',
          ml: { sm: -4, md: 0 },
          mr: { sm: -4, md: 0 },
          width: { sm: 'calc(100% + 32px)', md: '100%' },
        }}
      >
        {SETIING_TABS.map((tab, index) => {
          return (
            <Tab
              key={index}
              disableRipple
              iconPosition="start"
              icon={tab.icon}
              label={tab.label}
              className={cn(
                'min-w-[160px] max-w-full font-normal flex-1 normal-case text-text-secondary bg-custom-card min-h-[42px] px-4',
                index === tabActived
                  ? 'bg-custom-tab text-white'
                  : 'hover:bg-custom-tab hover:text-white',
                index === 0 && 'rounded-l-lg',
                index === SETIING_TABS.length - 1 && 'rounded-r-lg',
              )}
            />
          );
        })}
      </Tabs>
      <Box className="flex-1">{children}</Box>
    </Stack>
  );
}
