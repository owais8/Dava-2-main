'use client';

import React, { Fragment } from 'react';

import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import type { CardProps, TypographyProps } from '@mui/material';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { isString } from 'lodash';
import { NumericFormat } from 'react-number-format';

import { cn } from '@/lib';

export interface ICardOverviewProps extends CardProps {
  type?: 'default' | 'team' | 'sale';
  icon?: React.ReactNode;
  title: string;
  value: string | number | React.ReactNode;
  valueProps?: TypographyProps;
  rate?: number;
  text?: string | React.ReactNode;
  contentClassName?: TClassName;
  iconClassName?: TClassName;
  boxClassName?: TClassName;
  isVertical?: boolean;
}

export const CardOverview = ({
  type = 'team',
  title,
  value,
  valueProps,
  icon,
  rate,
  text,
  contentClassName,
  iconClassName,
  boxClassName,
  isVertical,
  className,
  ...props
}: ICardOverviewProps) => {
  return (
    <Card
      elevation={0}
      className={cn('w-full bg-custom-secondary rounded-[10px]', className)}
      {...props}
    >
      <CardContent className={cn('p-4 sm:p-6', type === 'default' && 'sm:px-4', contentClassName)}>
        <Box className={cn('flex items-center gap-5', type === 'default' && 'gap-6', boxClassName)}>
          {!!icon && (
            <Box
              className={cn(
                'flex items-center justify-center w-10 h-10 bg-custom-icon rounded-lg',
                iconClassName,
              )}
            >
              {icon}
            </Box>
          )}
          <Stack
            className={cn(
              type === 'default' && 'flex-col-reverse items-center w-full text-center',
              type === 'sale' && isVertical && 'flex-row gap-2 items-start',
            )}
          >
            <Stack direction={isVertical ? 'column-reverse' : 'column'}>
              <Typography
                variant="caption"
                color={type !== 'sale' ? 'textPrimary' : 'textSecondary'}
              >
                {title}
              </Typography>

              <Typography variant={valueProps?.variant || 'h6'} {...valueProps}>
                {value}
              </Typography>
            </Stack>

            {type === 'sale' && (
              <Box className={cn('flex items-center', isVertical && 'mt-1.5')}>
                {!!rate && (
                  <Fragment>
                    {rate > 0 ? (
                      <KeyboardArrowUpOutlined color="success" className="w-6 h-6" />
                    ) : (
                      <KeyboardArrowDownOutlined color="error" className="w-6 h-6" />
                    )}
                  </Fragment>
                )}
                <Typography variant="caption" color={rate! > 0 ? 'success' : 'error'}>
                  <NumericFormat value={rate} displayType="text" thousandSeparator suffix="%" />
                </Typography>
                <Typography variant="caption" ml={isString(text) ? 1 : 0}>
                  {text}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
