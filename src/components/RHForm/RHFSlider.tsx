'use client';

import { Slider, Typography } from '@mui/material';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

interface IRHFSliderProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export function RHFSlider<T extends FieldValues>({ name, label }: IRHFSliderProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider valueLabelDisplay="auto" {...field} />
        </>
      )}
    />
  );
}
