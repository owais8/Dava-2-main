'use client';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { isEmpty } from 'lodash';
import type { FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: TOption[];
  label: string;
};

export function RHFAutocomplete<T extends FieldValues>({ name, options, label }: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        const valueFiltered = !isEmpty(value)
          ? value?.map((id: string) => options?.find((item) => item.id === id))
          : [];

        return (
          <Autocomplete
            options={options || []}
            value={valueFiltered}
            getOptionLabel={(option) => options?.find((item) => item.id === option.id)?.label ?? ''}
            isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
            onChange={(_, newValue) => {
              onChange(newValue.map((item) => item.id));
            }}
            disableCloseOnSelect
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                inputRef={ref}
                error={!!error}
                helperText={error?.message}
                label={label}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <Box component="li" {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option.label}
              </Box>
            )}
          />
        );
      }}
    />
  );
}
