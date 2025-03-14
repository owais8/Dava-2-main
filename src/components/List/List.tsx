'use client';

import React from 'react';

import { EastOutlined, PeopleAltOutlined } from '@mui/icons-material';
import type { ListItemProps, ListItemTextProps, ListProps, TypographyProps } from '@mui/material';
import {
  Avatar,
  Box,
  IconButton,
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { isEmpty, isString } from 'lodash';
import type { FC } from 'react';

import { cn } from '@/lib';

export interface IListItem extends ListItemProps {
  title?: string;
  subTitle: string | React.ReactNode;
  icon?: React.ReactNode;
  titleProps?: TypographyProps;
  subTitleProps?: TypographyProps;
  listItemTextProps?: ListItemTextProps;
  desc?: string | React.ReactNode;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
}

interface IListProsp extends ListProps {
  variant?: 'default' | 'outlined';
  data: IListItem[];
}

export const List: FC<IListProsp> = ({ data, variant = 'default', className, ...props }) => {
  if (isEmpty(data)) return null;

  const listItemClassName =
    variant === 'outlined'
      ? ' border border-solid border-custom-border rounded xs:py-3 sm:py-4 xs:px-4 sm:px-6'
      : 'bg-custom-secondary rounded-[10px] border-none';

  return (
    <MUIList
      component="div"
      className={cn('w-full flex flex-col py-0 space-y-8', className)}
      {...props}
    >
      {data.map((item, index) => {
        return (
          <ListItem
            key={index}
            component="div"
            alignItems="flex-start"
            secondaryAction={
              item.onAction ? (
                <IconButton
                  onClick={item.onAction}
                  disableTouchRipple
                  className="text-text-primary"
                >
                  {item.actionIcon || <EastOutlined />}
                </IconButton>
              ) : (
                item.actionIcon
              )
            }
            className={cn('w-full flex-col sm:flex-row', listItemClassName, item.className)}
            sx={
              !item.onAction
                ? {
                    '& .MuiListItemSecondaryAction-root': {
                      position: 'relative',
                      transform: 'none',
                      right: 0,
                      top: 0,
                      width: { xs: '100%', sm: 'auto' },
                    },
                  }
                : undefined
            }
          >
            <Stack flex={1} rowGap={2.5} pr={2}>
              <Box display="flex" width="100%">
                {!!item.icon && (
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      className="bg-custom-icon text-text-primary w-[45px] h-[45px] mr-4"
                    >
                      {item.icon || <PeopleAltOutlined />}
                    </Avatar>
                  </ListItemAvatar>
                )}

                <ListItemText
                  disableTypography
                  primary={
                    item.title ? (
                      <Typography
                        component="h6"
                        variant={item.titleProps?.variant || 'h6'}
                        {...item.titleProps}
                      >
                        {item.title}
                      </Typography>
                    ) : null
                  }
                  secondary={
                    <Typography
                      component="div"
                      variant={item.subTitleProps?.variant || 'body1'}
                      {...item.subTitleProps}
                    >
                      {item.subTitle}
                    </Typography>
                  }
                  {...item.listItemTextProps}
                />
              </Box>
              {isString(item.desc) ? (
                <Typography variant="body2" mb={2}>
                  {item.desc}
                </Typography>
              ) : (
                item.desc
              )}
            </Stack>
          </ListItem>
        );
      })}
    </MUIList>
  );
};
