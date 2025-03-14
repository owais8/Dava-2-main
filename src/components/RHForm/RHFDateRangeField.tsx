/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';

import type { TypographyProps } from '@mui/material';
import { Box, FormHelperText, Stack, Typography } from '@mui/material';
import type { DateFieldProps } from '@mui/x-date-pickers';
import { DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { cn, type Dayjs } from '@/lib';
import theme from '@/themes';

type RHFDateRangeFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  labelProps?: TypographyProps;
  labelStart?: string;
  labelEnd?: string;
} & DateFieldProps<any, any>;

export function RHFDateRangeField<T extends FieldValues>({
  name,
  label,
  labelProps,
  color = 'secondary',
  format = 'DD/MM/YYYY',
  labelStart = 'Start Date',
  labelEnd = 'End Date',
}: RHFDateRangeFieldProps<T>) {
  const { control, setError, clearErrors } = useFormContext<T>();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const [startDate, endDate] = Array.isArray(value) ? value : [null, null];

          const validateDates = (start: Dayjs | null, end: Dayjs | null) => {
            if (start && end && end.isBefore(start)) {
              setError(name, { message: 'End date must be after start date' });
            } else {
              clearErrors(name);
            }
          };

          const handleStartDateChange = (newValue: Dayjs | null) => {
            validateDates(newValue, endDate);
            onChange([newValue, endDate]);
          };

          const handleEndDateChange = (newValue: Dayjs | null) => {
            validateDates(startDate, newValue);
            onChange([startDate, newValue]);
          };

          return (
            <Stack>
              {!!label && (
                <Typography
                  variant={labelProps?.variant || 'subtitle2'}
                  mb={labelProps?.mb || 1}
                  {...labelProps}
                >
                  {label}
                </Typography>
              )}
              <Box
                display="flex"
                sx={{
                  '&:hover .MuiInputBase-root:not(.Mui-error) fieldset': {
                    borderColor: theme.palette.text.primary,
                  },
                  '& .MuiInputBase-root fieldset': {
                    borderWidth: isFocused ? 2 : 1,
                  },
                  '& .MuiInputBase-root:not(.Mui-error) fieldset': {
                    borderColor: isFocused ? theme.palette.text.primary : undefined,
                  },
                }}
                className={cn({ focused: isFocused })}
              >
                <DateField
                  fullWidth
                  color={error ? 'error' : color}
                  format={format}
                  label={!label ? labelStart : undefined}
                  value={startDate}
                  maxDate={endDate || undefined}
                  onChange={handleStartDateChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  slotProps={{
                    textField: { error: !!error },
                  }}
                  sx={{
                    position: 'relative',
                    minWidth: '132px',
                    '& .MuiInputBase-root': {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      '& fieldset': {
                        borderRight: 'none',
                      },
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      right: '8px',
                      transform: 'translateY(-50%)',
                      width: '8px',
                      height: '2px',
                      backgroundColor: theme.palette.text.secondary,
                    },
                  }}
                />
                <DateField
                  fullWidth
                  color={error ? 'error' : color}
                  format={format}
                  label={!label ? labelEnd : undefined}
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate || undefined}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  slotProps={{
                    textField: { error: !!error },
                  }}
                  sx={{
                    minWidth: '160px',
                    '& .MuiInputBase-root': {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      '& fieldset': {
                        borderLeft: 'none',
                      },
                    },
                  }}
                />
              </Box>
              <FormHelperText error className="pt-1 pl-1">
                {error?.message}
              </FormHelperText>
            </Stack>
          );
        }}
      />
    </LocalizationProvider>
  );
}
