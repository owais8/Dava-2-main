'use client';

import { useState } from 'react';

import type { ChangeEvent } from 'react';

import constants from '@/constants';

export const usePagination = <T>(
  data: T[],
  defaultPage = constants.shared.PAGINATION.DEFAULT_PAGE,
  defaultRowsPerPage = constants.shared.PAGINATION.DEFAULT_PAGE_SIZE,
) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
  const [page, setPage] = useState<number>(defaultPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  return {
    page,
    rowsPerPage,
    totalPages,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
