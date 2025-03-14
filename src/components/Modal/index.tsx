'use client';

import React from 'react';

import type { ButtonProps, TypographyProps } from '@mui/material';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material';
import type { FC } from 'react';

import { Button } from '@/components';
import { cn } from '@/lib';

export interface IModalProps extends DialogProps {
  cancelText?: string;
  okText?: string;
  subTitle?: string;
  subTitleProps?: TypographyProps;
  buttonProps?: ButtonProps;
  headerClassName?: string;
  footerClassName?: string;
  contentClassName?: string;
  paperClassName?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const Modal: FC<IModalProps> = ({
  open,
  title,
  children,
  subTitle,
  headerClassName,
  footerClassName,
  contentClassName,
  paperClassName,
  isLoading = false,
  cancelText = 'Cancel',
  okText = 'Submit',
  maxWidth = 'xs',
  subTitleProps,
  buttonProps,
  icon,
  onSubmit,
  onCancel,
  ...props
}) => {
  return (
    <Dialog
      scroll="paper"
      open={open}
      maxWidth={maxWidth}
      onClose={onCancel}
      slotProps={{
        paper: {
          className: cn('bg-white mx-4 rounded-[10px] w-full max-w-[360px]', paperClassName),
        },
      }}
      {...props}
    >
      <DialogTitle
        component="div"
        className={cn('px-5 sm:px-[30px] pt-5 sm:pt-[30px] pb-2', headerClassName)}
      >
        {!!icon && (
          <Box display="flex" mb={6}>
            {icon}
          </Box>
        )}
        <Typography component="h2" variant="h6">
          {title}
        </Typography>
        {!!subTitle && (
          <Typography mt={2} {...subTitleProps}>
            {subTitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent
        className={cn(children ? 'pt-4 pb-0 px-5 sm:px-[30px]' : 'p-0', contentClassName)}
      >
        {children}
      </DialogContent>

      {(!!onSubmit || !!onCancel) && (
        <DialogActions className={cn('p-5 sm:p-[30px] justify-start', footerClassName)}>
          {!!onSubmit && (
            <Button
              type="submit"
              onClick={onSubmit}
              isLoading={isLoading}
              disabled={isLoading}
              className={cn('w-full sm:w-auto px-2 sm:px-6', buttonProps?.className)}
              {...buttonProps}
            >
              {okText}
            </Button>
          )}

          {!!onCancel && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
              disabled={isLoading}
              className={cn('ml-4 sm:ml-6 w-full sm:w-auto px-2 sm:px-6', buttonProps?.className)}
              {...buttonProps}
            >
              {cancelText}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
