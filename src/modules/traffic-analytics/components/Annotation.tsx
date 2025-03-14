/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Fragment } from 'react';

import { StarRate } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { isEmpty } from 'lodash';
import type { SyntheticEvent } from 'react';

import { AccordionSummary } from '../style';
import { Button } from '@/components';
import { cn, dayjs } from '@/lib';
import type { TAnnotation } from '@/modules/traffic-analytics/schemas';

interface IAnnotationProsp {
  annotationData: TAnnotation[];
  errorFields: TAnnotation[] | null;
  expanded: string | false;
  handleInputChange: (e: any, id?: string) => void;
  handleExpand: (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => void;
  handleDelete: (id: string) => void;
  handleCreate: () => void;
  handleSave: (id: string) => void;
  handleEdit: (id: string) => void;
  handleToggleHighlight: (id: string) => void;
}

export function Annotation({
  expanded,
  annotationData,
  errorFields,
  handleInputChange,
  handleExpand,
  handleDelete,
  handleCreate,
  handleSave,
  handleEdit,
  handleToggleHighlight,
}: IAnnotationProsp) {
  return (
    <Accordion
      elevation={0}
      expanded={expanded === 'panel'}
      onChange={handleExpand('panel')}
      className="overflow-hidden"
    >
      <Box
        component="span"
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:justify-between sm:items-center"
      >
        <AccordionSummary aria-controls="paneld-content" id="paneld-header">
          {expanded !== 'panel' ? (
            <Typography variant="body2" component="span" fontWeight={600}>
              Annotations
            </Typography>
          ) : (
            <Box component="span" className="w-full flex items-center gap-3">
              <Typography variant="body2" component="span" fontWeight={600}>
                Show All
              </Typography>
              <Divider component="span" orientation="vertical" flexItem />
              <Typography variant="body2" component="span" color="textSecondary">
                Show Starred
              </Typography>
            </Box>
          )}
        </AccordionSummary>

        {expanded === 'panel' && (
          <Button size="small" variant="text" className="w-[210px] shrink-0" onClick={handleCreate}>
            + Create New Annotation
          </Button>
        )}
      </Box>
      <AccordionDetails className="px-4 md:px-9 mt-2 sm:mt-4 bg-custom-secondary py-2 w-full overflow-x-scroll">
        {isEmpty(annotationData) ? (
          <Typography component="p" variant="subtitle2" py={2}>
            No annotations found.
          </Typography>
        ) : (
          <Stack className="min-w-[600px]">
            {annotationData.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Box className="flex items-center gap-2 md:gap-4">
                    <IconButton
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      className="p-0"
                      onClick={() => handleToggleHighlight(item.id)}
                    >
                      <StarRate
                        className={cn(
                          'w-5 h-5',
                          item.isActived ? 'text-text-primary' : 'text-text-disabled',
                        )}
                      />
                    </IconButton>

                    {item.isEdit || item.isCreate ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                          id={item.id}
                          name="date"
                          value={dayjs(item.date)}
                          format="DD MMM, YYYY"
                          size="small"
                          onChange={(errorFields) => handleInputChange(errorFields, item.id)}
                          // className={cn(
                          //   'w-[110px] input-custom',
                          //   errorFields?.some((s) => s.id === item.id) &&
                          //     item.date === '' &&
                          //     'border-error',
                          // )}
                          inputProps={{
                            className: 'w-[120px] input-custom h-[23px] py-0',
                          }}
                          slotProps={{
                            htmlInput: { className: 'w-[120px] input-custom h-[23px] py-0' },
                          }}
                          className="shrink-0"
                          sx={{
                            '& .MuiInputBase-root': {
                              pr: 0,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    ) : (
                      <Typography
                        component="span"
                        variant="subtitle2"
                        mt={0.5}
                        width={110}
                        className="truncate shrink-0"
                        px={1}
                      >
                        {item.date}
                      </Typography>
                    )}

                    {item.isEdit || item.isCreate ? (
                      <input
                        id={item.id}
                        type="text"
                        name="text"
                        value={item.text || ''}
                        onChange={handleInputChange}
                        className={cn(
                          'w-full input-custom py-0.5',
                          errorFields?.some((s) => s.id === item.id) &&
                            item.text === '' &&
                            'border-error',
                        )}
                      />
                    ) : (
                      <Typography
                        component="span"
                        variant="subtitle2"
                        mt={0.5}
                        className="truncate"
                      >
                        {item.text}
                      </Typography>
                    )}

                    <Box className="flex items-center gap-2 ml-auto">
                      <Button
                        size="small"
                        variant={item.isEdit || item.isCreate ? 'contained' : 'outlined'}
                        onClick={() =>
                          item.isEdit || item.isCreate ? handleSave(item.id) : handleEdit(item.id)
                        }
                        className="min-w-[76px] sm:min-w-[90px]"
                      >
                        {item.isEdit || item.isCreate ? 'Save' : 'Edit'}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        className="min-w-[76px] sm:min-w-[90px] text-action-active border-action-active"
                        onClick={() =>
                          item.isEdit && !item.isCreate
                            ? handleEdit(item.id)
                            : handleDelete(item.id)
                        }
                      >
                        {item.isEdit || item.isCreate ? 'Cancel' : 'Delete'}
                      </Button>
                    </Box>
                  </Box>
                  {index !== annotationData.length - 1 && <Divider className="my-2" />}
                </Fragment>
              );
            })}
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
