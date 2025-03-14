'use client';

import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type IRHFTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function RHFTimePicker<T extends FieldValues>({ name, label }: IRHFTimePickerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker label={label} {...field} />
        </LocalizationProvider>
      )}
    />
  );
}
