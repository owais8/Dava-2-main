'use client';

import React, { Fragment } from 'react';

import { FolderOutlined } from '@mui/icons-material';
import type { TableCellProps, TableProps } from '@mui/material';
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { isEmpty } from 'lodash';

import { Button } from '@/components';
import { usePagination } from '@/hooks';
import { cn } from '@/lib';
import { default as globalTheme } from '@/themes';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.custom?.secondary,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TableSimpleProps extends TableProps {
  id?: string;
  columns: TColumn[];
  rows: TRow[];
  isLoading?: boolean;
  isShowBgBlur?: boolean;
  onActionClick?: ({ actionType, id }: TActionClick) => void;
}

export const TableSimple: React.FC<TableSimpleProps> = ({
  id,
  columns,
  rows,
  isLoading = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isShowBgBlur = false,
  onActionClick,
  ...tableProps
}) => {
  const match = useMediaQuery('(min-width: 600px)');
  const { page, totalPages, paginatedData, handleChangePage } = usePagination(rows);

  const generateAlignCell = (align: string) => {
    const alignments: { [key: string]: TableCellProps['align'] } = {
      center: 'center',
      end: 'right',
    };

    return alignments[align] || 'left';
  };

  const generateTableColumn = (column: TColumn, row: TRow) => {
    if (column.id === 'action' && row.action) {
      return (
        <Box className="flex items-center justify-center gap-2">
          {row.action.map((action, index) => {
            return action.id !== 'text' ? (
              <Button
                key={index}
                size="small"
                variant="outlined"
                color={action.id === 'delete' ? 'error' : 'secondary'}
                onClick={() => onActionClick?.({ actionType: action.id, id: row.id })}
              >
                {action.label}
              </Button>
            ) : (
              <Typography key={index} variant="body2">
                {action.label}
              </Typography>
            );
          })}
        </Box>
      );
    }

    if (column.format) {
      return column.format(row[column.id]);
    }

    return row[column.id] || '-';
  };

  const fixedColumnStyle = {
    position: 'sticky',
    right: 0,
    zIndex: 100,
    backgroundColor: globalTheme.palette.common.white,
  };

  return (
    <Stack>
      <TableContainer>
        <Table {...tableProps} aria-label={id}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={generateAlignCell(column.align || 'start')}
                  sx={[
                    {
                      minWidth: column.minWidth || 100,
                      maxWidth: column.maxWidth || '100%',
                      ...(column.isFixedColumn && match && fixedColumnStyle),
                    },
                  ]}
                  className={cn('border border-custom-icon', column.headerClassName)}
                >
                  <Typography
                    component="span"
                    variant="subtitle2"
                    className="text-text-secondary font-medium"
                  >
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="relative">
            {isLoading ? (
              <StyledTableRow>
                <TableCell colSpan={columns.length} align="center" className="py-20">
                  <CircularProgress color="secondary" disableShrink />
                </TableCell>
              </StyledTableRow>
            ) : (
              <Fragment>
                {isEmpty(paginatedData) ? (
                  <StyledTableRow>
                    <TableCell colSpan={columns.length} align="center" className="py-10">
                      <FolderOutlined className="w-12 h-12 text-text-secondary" />
                      <Typography color="textSecondary">No data to display</Typography>
                    </TableCell>
                  </StyledTableRow>
                ) : (
                  <Fragment>
                    {paginatedData.map((row, rowIndex) => (
                      <StyledTableRow key={rowIndex} hover>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={generateAlignCell(column.align || 'start')}
                            sx={[
                              {
                                minWidth: column.minWidth || 100,
                                maxWidth: column.maxWidth || '100%',
                                ...(column.isFixedColumn && match && fixedColumnStyle),
                              },
                            ]}
                            className={cn('border border-custom-icon', column.bodyClassName)}
                          >
                            {generateTableColumn(column, row)}
                          </TableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                  </Fragment>
                )}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        className={cn('flex justify-center py-4 mt-4', { hidden: totalPages <= 1 || isLoading })}
      >
        <Pagination
          color="secondary"
          page={page}
          count={totalPages}
          onChange={handleChangePage}
          shape="rounded"
        />
      </Box>
    </Stack>
  );
};
