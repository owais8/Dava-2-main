import React from 'react';

import { MoreVertOutlined } from '@mui/icons-material';
import type { BoxProps, Grid2Props, TypographyProps } from '@mui/material';
import { Box, Fade, Grid2, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

import { Button } from '@/components';
import { cn } from '@/lib';
import theme from '@/themes';

export type TListColumn = {
  size: Grid2Props['size'];
} & TColumn;

interface IListActionProps extends BoxProps {
  noHeader?: boolean;
  columns: TListColumn[];
  rows: TRow[];
  onActionClick?: ({ actionType, id }: TActionClick) => void;
}

export const ListAction: React.FC<IListActionProps> = ({
  noHeader = false,
  columns,
  rows,
  onActionClick,
  sx,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | {
    element: HTMLElement;
    id: number | string;
  }>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number | string) => {
    setAnchorEl({ element: event.currentTarget, id });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateBgColor = (status: string) => {
    switch (status) {
      case 'Active':
        return theme.palette.success.main;

      case 'Away':
        return theme.palette.warning.main;

      default:
        return theme.palette.secondary.main;
    }
  };

  const generateTextAlign = (align: string): TypographyProps['textAlign'] => {
    const alignments: { [key: string]: TypographyProps['textAlign'] } = {
      center: 'center',
      end: 'right',
    };

    return alignments[align] || 'left';
  };

  const generateStatusColumn = (status: string) => {
    return (
      <Box
        sx={{
          fontSize: '13px',
          lineHeight: '18px',
          width: '100%',
          textAlign: 'center',
          px: 4,
          py: 2,
          borderRadius: '8px',
          backgroundColor: generateBgColor(status),
        }}
      >
        {status}
      </Box>
    );
  };

  const generateActionColumn = (row: TRow) => {
    const isMenuOpen = anchorEl?.id === row.id;

    return (
      <Box>
        <IconButton id={`button-${row.id}`} className="p-0" onClick={(e) => handleClick(e, row.id)}>
          <MoreVertOutlined className="icon" />
        </IconButton>
        <Menu
          id={`menu-${row.id}`}
          elevation={0}
          anchorEl={isMenuOpen ? anchorEl?.element : null}
          open={isMenuOpen}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          TransitionComponent={Fade}
          slotProps={{
            paper: { className: 'bg-custom-card border border-solid border-custom-border' },
          }}
        >
          {row.action?.map((action: TRowAction) => (
            <MenuItem
              key={action.id}
              className="px-4 py-2 text-sm"
              onClick={() => onActionClick?.({ actionType: action.id, id: row.id })}
            >
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  const generateDataColumn = (column: TColumn, row: TRow) => {
    if (column.id === 'status') {
      return generateStatusColumn(row['status']);
    }

    if (column.id === 'action' && !isEmpty(row.action)) {
      return generateActionColumn(row);
    }

    if (column.id === 'button') {
      return (
        <Button
          variant="outlined"
          onClick={() => onActionClick?.({ actionType: 'edit', id: row.id })}
        >
          {row[column.id]}
        </Button>
      );
    }

    return (
      <Typography component="span" variant="subtitle2" textAlign={generateTextAlign(column.align!)}>
        {row[column.id]}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        ...sx,
      }}
      {...props}
    >
      <Grid2 container id="header" sx={{ minWidth: 720 }}>
        {columns.map((column, index) => (
          <Grid2
            key={column.id}
            size={column.size}
            display="flex"
            alignItems="center"
            justifyContent={column.align}
            sx={{
              paddingY: !noHeader ? 3 : 0,
              borderBottom: !noHeader ? `1px solid ${theme.palette.custom?.icon}` : 'none',
              paddingX: { xs: 2, sm: 3, lg: 5 },
            }}
            className={cn(index === 0 && 'pl-0', index === columns.length - 1 && 'pr-0')}
          >
            <Typography variant="subtitle2" className="text-text-secondary">
              {column.label}
            </Typography>
          </Grid2>
        ))}
      </Grid2>

      <Box id="body" sx={{ minWidth: 720 }}>
        {rows.map((row, rowIndex) => (
          <Grid2 id="body" key={rowIndex} container>
            {columns.map((column, index) => (
              <Grid2
                key={column.id}
                size={column.size}
                display="flex"
                justifyContent={column.align}
                alignItems="center"
                sx={{
                  paddingY: 3,
                  borderBottom: `1px solid ${theme.palette.custom?.icon}`,
                  paddingX: { xs: 2, sm: 3, lg: 5 },
                }}
                className={cn(index === 0 && 'pl-0', index === columns.length - 1 && 'pr-0')}
              >
                {generateDataColumn(column, row)}
              </Grid2>
            ))}
          </Grid2>
        ))}
      </Box>
    </Box>
  );
};
