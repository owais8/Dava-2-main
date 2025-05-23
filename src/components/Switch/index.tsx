'use client';

import React from 'react';

import type { SwitchProps } from '@mui/material';
import { Stack, Switch as MuiSwitch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { FC } from 'react';

const SwitchContainer = styled(MuiSwitch)(({ theme, color }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: color,
        ...theme.applyStyles('dark', {
          backgroundColor: color,
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));

interface ISwitchProps extends SwitchProps {
  label?: string;
}

export const Switch: FC<ISwitchProps> = ({ label, ...props }) => {
  return (
    <Stack direction="row" sx={{ alignItems: 'center' }}>
      <SwitchContainer {...props} />
      {label ? <Typography ml={2}>{label}</Typography> : null}
    </Stack>
  );
};
