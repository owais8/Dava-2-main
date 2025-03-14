'use client';

import React from 'react';

import { NorthOutlined } from '@mui/icons-material';
import { Avatar, Box, FormHelperText, Stack, styled, Typography } from '@mui/material';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components';
import { cn } from '@/lib';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export type IRHFUploadProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  variant?: 'default' | 'button';
  disabled?: boolean;
};

export function RHFUpload<T extends FieldValues>({
  name,
  variant = 'default',
  label,
  disabled = false,
}: IRHFUploadProps<T>) {
  const { control } = useFormContext();
  const [selectedImage, setselectedImage] = React.useState<File | undefined>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        variant === 'default' ? (
          <Stack spacing={3} alignItems="center">
            <Button
              component="label"
              variant="text"
              disableRipple
              disableFocusRipple
              className={cn(
                'flex flex-col space-y-2 group p-0 hover:bg-transparent',
                selectedImage && 'hover:opacity-75 transition-all duration-300',
              )}
              sx={{ textTransform: 'initial' }}
              disabled={disabled}
            >
              <Avatar
                src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
                component="span"
                variant="circular"
                className="w-[110px] h-[110px] bg-custom-icon group-hover:bg-custom-secondary transition-all duration-300"
              >
                {!selectedImage && <NorthOutlined className="w-10 h-10 text-text-primary" />}
              </Avatar>

              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  setselectedImage(file);
                }}
              />
              {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
            </Button>
            <Typography component="span">{label}</Typography>
          </Stack>
        ) : (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }}>
            <Box display="flex" alignItems="center" columnGap={4}>
              <Avatar
                src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
                component="span"
                variant="circular"
                className="w-[72px] h-[72px] bg-custom-icon group-hover:bg-custom-card transition-all duration-300"
              />
              <Button
                component="label"
                variant="outlined"
                color="inherit"
                className="rounded-[40px]"
                disabled={disabled}
              >
                {label}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    setselectedImage(file);
                  }}
                />
              </Button>
            </Box>

            {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
          </Stack>
        )
      }
    />
  );
}
