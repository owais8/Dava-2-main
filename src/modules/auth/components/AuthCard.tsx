'use client';

import type { CardProps, TypographyProps } from '@mui/material';
import { Box, Card, Stack, Typography } from '@mui/material';

import { LogoDarkIcon, TextLink } from '@/components';
import constants from '@/constants';
import { cn } from '@/lib';

interface IAuthCardProps extends Omit<CardProps, 'title'> {
  logoIcon?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  variantTitle?: TypographyProps['variant'];
}

export function AuthCard({
  logoIcon = <LogoDarkIcon className="w-[240px] h-[68px] sm:w-[300px] sm:h-[86px]" />,
  icon,
  title,
  subTitle,
  children,
  className,
  variantTitle = 'h5',
  ...props
}: IAuthCardProps) {
  return (
    <Stack className="w-full h-full">
      <Card
        variant="outlined"
        className={cn(
          'bg-white flex flex-col w-full h-full self-center items-center max-w-[626px] py-12 sm:py-[60px] md:py-[70px] px-6 sm:px-10 md:px-[97px] gap-8 sm:gap-10 shadow-none rounded-[20px] border-none',
          className,
        )}
        {...props}
      >
        {logoIcon}

        {(!!title || !!subTitle || !!icon) && (
          <Stack alignItems="center">
            {!!icon && <Box mb={4}>{icon}</Box>}
            {!!title && (
              <Typography component="h1" variant={variantTitle} fontWeight={500}>
                {title}
              </Typography>
            )}
            {!!subTitle && (
              <Typography component="div" textAlign="center" mt={2}>
                {subTitle}
              </Typography>
            )}
          </Stack>
        )}

        {children}
      </Card>
      <Typography variant="caption" component="p" mt={7} textAlign="center">
        {`By using ${constants.shared.APP.NAME}, you agree to our `}
        <TextLink
          variant="caption"
          href={constants.routePages.public.PRIVACY_PAGE}
          fontWeight="bold"
        >
          Privacy policy
        </TextLink>{' '}
        and{' '}
        <TextLink variant="caption" href={constants.routePages.public.TERMS_PAGE} fontWeight="bold">
          Terms of service.
        </TextLink>
      </Typography>
    </Stack>
  );
}
