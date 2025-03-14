/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { SelectProps, TypographyProps } from '@mui/material';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export type IRHFSelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: TOption[];
  labelProps?: TypographyProps;
  placeholder?: string;
} & SelectProps;

export function RHFSelect<T extends FieldValues>({
  name,
  label,
  options,
  labelProps,
  placeholder,
  required,
  color = 'secondary',

  ...props
}: IRHFSelectProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack alignItems={required ? 'flex-start' : 'stretch'}>
          {placeholder && (
            <Typography
              variant={labelProps?.variant || 'subtitle2'}
              mb={labelProps?.mb || 1}
              className={cn(
                required && 'required',
                ...(labelProps?.className ? [labelProps.className] : []),
              )}
              {...labelProps}
            >
              {label}
            </Typography>
          )}
          <FormControl fullWidth>
            {!placeholder && (
              <InputLabel id={`select-${name}-label`} color={color} error={!!error}>
                {label}
              </InputLabel>
            )}
            <Select
              {...field}
              id={`select-${name}`}
              labelId={`select-${name}-label`}
              MenuProps={MenuProps}
              color={color}
              error={!!error}
              label={!placeholder ? label : undefined}
              displayEmpty={!!placeholder}
              renderValue={(selected: any) => {
                if (selected?.length === 0 && placeholder)
                  return <span className="text-text-secondary">{placeholder}</span>;

                return options.find((option) => option.value === selected)?.label;
              }}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <span title={option.label} className="truncate">
                    {option.label}
                  </span>
                </MenuItem>
              ))}
            </Select>
            {!!error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
          </FormControl>
        </Stack>
      )}
    />
  );
}
