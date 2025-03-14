'use client';

import * as React from 'react';

import { List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';

import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib';

const MAIN_NAV = [
  {
    id: 'traffic-analytics',
    label: 'Traffic Analytics',
    href: constants.routePages.private.TRAFFIC_ANALYTICS_PAGE,
  },
  {
    id: 'url-mapper',
    label: 'URL Mapper',
    href: constants.routePages.private.URL_MAPPER_PAGE,
  },
  {
    id: 'campaign-calculator',
    label: 'Campaign Calculator',
    href: constants.routePages.private.CAMPAIGN_CALCULATOR_PAGE,
  },
];

export default function MenuContent() {
  const pathname = usePathname();
  const { redirect } = useRedirect();

  const selected = React.useMemo(
    () => MAIN_NAV.findIndex((item) => item.href === pathname),
    [pathname],
  );

  return (
    <Stack sx={{ flexGrow: 1, pr: 6, justifyContent: 'space-between' }}>
      <List className="py-3 md:py-0 space-y-1.5">
        {MAIN_NAV.map((item, index) => (
          <ListItem key={index} disablePadding disableGutters className="block py">
            <ListItemButton
              disableRipple
              selected={selected === index}
              className={cn(
                'group rounded-r-lg px-4 py-[5px] cursor-pointer hover:bg-secondary hover:text-white transition-all',
                selected === index && 'bg-secondary text-white',
              )}
              onClick={() => redirect(item.href)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
