'use client';

import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

export type IRHFTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
} & TextFieldProps;

export function RHFTextField<T extends FieldValues>({
  name,
  color = 'secondary',
  ...props
}: IRHFTextFieldProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          color={color}
          error={!!error}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
}
