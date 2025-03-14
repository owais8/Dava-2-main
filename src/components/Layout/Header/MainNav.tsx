'use client';

import React from 'react';

import { Box, Link as MuiLink } from '@mui/material';

import constants from '@/constants';
import { Link, usePathname } from '@/i18n/routing';
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

export const MainNav = () => {
  const pathname = usePathname();

  return (
    <Box className="flex items-center ml-auto mr-6">
      {MAIN_NAV.map((item) => (
        <MuiLink
          component={Link}
          key={item.id}
          href={item.href || ''}
          passHref
          underline="none"
          className={cn(
            'py-1.5 px-4 lg:px-6 no-underline text-text-secondary hover:text-text-primary transition-all',
            pathname === item.href && 'text-text-primary font-[500]',
          )}
        >
          {item.label}
        </MuiLink>
      ))}
    </Box>
  );
};
