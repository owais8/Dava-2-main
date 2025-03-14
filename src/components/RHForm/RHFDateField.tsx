/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { DateFieldProps } from '@mui/x-date-pickers';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type IRHFDateFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
} & DateFieldProps<any, any>;

export function RHFDateField<T extends FieldValues>({
  name,
  label,
  color = 'secondary',
  format = 'DD/MM/YYYY',
  ...props
}: IRHFDateFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              {...field}
              label={label}
              color={error ? 'error' : color}
              slotProps={{
                textField: { error: !!error, helperText: error?.message || '' },
              }}
              format={format}
              {...props}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
