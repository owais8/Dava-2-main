/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios';

import type { AxiosRequestConfigWithToken } from './axiosInstance';
import { axiosInstance } from './axiosInstance';

/**
 * Helper function to make API calls using axiosInstance.
 *
 * @param {AxiosRequestConfigWithToken<U>} config - The request configuration.
 * @returns {Promise<T>} - The response data.
 */
export async function axiosService<T, U = any>(config: AxiosRequestConfigWithToken<U>): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.request<T, U>(config);

    return response.data;
  } catch (error) {
    throw error; // You can customize error handling here
  }
}
