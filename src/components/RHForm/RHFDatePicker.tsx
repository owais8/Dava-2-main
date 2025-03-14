/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { TextFieldProps } from '@mui/material';
import type { DatePickerProps } from '@mui/x-date-pickers';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import theme from '@/themes';

type IRHFDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  textFieldProps?: TextFieldProps;
} & DatePickerProps<any, any>;

export function RHFDatePicker<T extends FieldValues>({
  name,
  label,
  textFieldProps,
  format = 'DD/MM/YYYY',
  ...props
}: IRHFDatePickerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        // Fix date offset issue by properly handling the value
        const handleChange = (date: any) => {
          // Ensure we're working with the date at noon to avoid timezone issues
          if (date) {
            const normalizedDate = date.hour(12);
            field.onChange(normalizedDate);
          } else {
            field.onChange(null);
          }
        };
        
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              label={label}
              format={format}
              onChange={handleChange}
              value={field.value}
              slotProps={{
                textField: {
                  color: error ? 'error' : textFieldProps?.color || 'secondary',
                  error: !!error,
                  helperText: error?.message || '',
                  fullWidth: true,
                  ...textFieldProps,
                },
              }}
              sx={{
                '& .MuiIconButton-root': {
                  color: theme.palette.text.primary,
                },
              }}
              {...props}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}