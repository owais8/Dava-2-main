'use client';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type IRHFRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  options?: TOption[];
  label: string;
};

export function RHFRadioGroup<T extends FieldValues>({
  name,
  options,
  label,
}: IRHFRadioGroupProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                value={option.id}
                control={<Radio checked={field.value === option.id} />}
                label={option.label}
                key={option.id}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}
