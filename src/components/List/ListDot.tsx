'use client';

import React from 'react';

import { styled } from '@mui/material';
import { isEmpty } from 'lodash';
import type { FC } from 'react';

import { cn } from '@/lib';

const ListItemContainer = styled('li')(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(4),

  '&:after': {
    content: "''",
    position: 'absolute',
    left: 0,
    top: theme.spacing(2),
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    backgroundColor: theme.palette.text.primary,
    borderRadius: '100%',
  },
}));

export interface IListDotItem extends React.HTMLAttributes<HTMLLIElement> {
  text: string;
}

interface IListDotProsp extends React.HTMLAttributes<HTMLUListElement> {
  data: IListDotItem[];
}

export const ListDot: FC<IListDotProsp> = ({ data, className, ...props }) => {
  if (isEmpty(data)) return null;

  return (
    <ul className={cn('list-none pl-0', className)} {...props}>
      {data.map((item, index) => (
        <ListItemContainer key={index} {...item}>
          {item.text}
        </ListItemContainer>
      ))}
    </ul>
  );
};
