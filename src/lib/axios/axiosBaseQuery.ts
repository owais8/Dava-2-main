/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { axiosInstance } from './axiosInstance';
import constants from '@/constants';

type AxiosBaseQueryArgs = {
  url: string;
  accessToken?: boolean;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

type AxiosBaseQueryResult = { data?: any; error?: { status?: number; data?: any } };

type AxiosBaseQueryParams = {
  baseUrl?: string;
};

export const axiosBaseQuery =
  ({ baseUrl }: AxiosBaseQueryParams): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async (
    { url, method, data, params, headers, accessToken = true },
    { signal },
  ): Promise<AxiosBaseQueryResult> => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.request({
        url: baseUrl || constants.shared.API.BASE_URL + url,
        method,
        data,
        headers,
        params,
        signal,
        accessToken,
      });

      return { data: response.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
