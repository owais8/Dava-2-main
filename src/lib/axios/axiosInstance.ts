/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  AxiosError,
  AxiosInstance as AxiosInstanceType,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import axios from 'axios';
import { getSession } from 'next-auth/react';

import constants from '@/constants';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
  accessToken?: boolean;
  _retry?: boolean;
}

export interface AxiosRequestConfigWithToken<T = any> extends AxiosRequestConfig<T> {
  accessToken?: boolean;
}

class AxiosInstanceClass {
  private axiosInstance: AxiosInstanceType;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        timeout: constants.shared.API.TIMEOUT,
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config: AdaptAxiosRequestConfig) => {
        config.headers = config.headers ?? {};

        if (config.accessToken) {
          const accessToken = await this.getAccessToken();
          if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  private async getAccessToken(): Promise<string | null> {
    const session = await getSession();
    if (session) return session.user.accessToken;

    return null;
  }

  public async request<T, U>(config: AxiosRequestConfigWithToken<U>): Promise<AxiosResponse<T>> {
    return this.axiosInstance.request<T>({ ...config });
  }

  // You can also expose the original Axios instance if needed
  public getOriginalInstance(): AxiosInstanceType {
    return this.axiosInstance;
  }
}

export const axiosInstance = new AxiosInstanceClass();
