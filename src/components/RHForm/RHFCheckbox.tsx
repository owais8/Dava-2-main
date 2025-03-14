'use client';

import type { CheckboxProps } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  labelClassName?: TClassName;
} & CheckboxProps;

export function RHFCheckbox<T extends FieldValues>({
  name,
  label,
  labelClassName,
  color = 'secondary',
  size = 'small',
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Checkbox {...field} disableRipple size={size} color={color} {...props} />}
          className={labelClassName}
        />
      )}
    />
  );
}
