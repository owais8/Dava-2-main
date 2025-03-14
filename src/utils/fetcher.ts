import {
  type input as ZodInput,
  type output as ZodOutput,
  type ZodType,
  type ZodTypeAny,
} from 'zod';

import constants, { HTTP_STATUS_AUTH_FAILED, HTTP_STATUS_CODE } from '@/constants';
import type { TResponse } from '@/schemas';
import utils from '@/utils';
export type FetcherProps<
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
> = {
  apiConfig: TAPIConfig;
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: ZodInput<TRequestSchema>;
  accessToken?: string;
  refreshToken?: string;
  queryParams?: Record<string, string | number | boolean> | string | (string | number)[];
  headers?: Record<string, string>;
  timeout?: number;
};

export async function fetcher<
  TRequestSchema extends ZodTypeAny,
  TResponseSchema extends ZodType<TResponse>,
>(props: FetcherProps<TRequestSchema, TResponseSchema>): Promise<ZodOutput<TResponseSchema>> {
  const {
    apiConfig,
    requestSchema,
    responseSchema,
    payload,
    queryParams,
    accessToken,
    refreshToken,
    headers = {},
    timeout,
  } = props;

  const { endPoint, method, isAuthRequired = false } = apiConfig;
  // Validate request data if provided
  if (requestSchema && payload) {
    const validationResult = requestSchema.safeParse(payload);

    if (!validationResult.success) {
      return responseSchema.parse({
        data: null,
        statusCode: 400,
        success: false,
        errors: `Request validation failed: ${validationResult.error.message}`,
      });
    }
  }

  // Format the URL based on withQueryParams
  const formattedUrl = utils.shared.formatQueryString(
    constants.shared.API.BASE_URL + endPoint,
    queryParams,
  );

  const controller = new AbortController();
  const signal = timeout
    ? (setTimeout(() => controller.abort(), timeout), controller.signal)
    : undefined;

  const authHeaders: Record<string, string> = {};

  // Add Authorization header if accessToken is required
  if (isAuthRequired) {
    if (accessToken) authHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    console.log(formattedUrl)
    const response = await fetch(formattedUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...authHeaders,
      },
      body: payload ? JSON.stringify(payload) : undefined,
      next: {
        tags: apiConfig.key,
      },
      signal,
    });
    console.log(response)
    // Refresh token if 401 Unauthorized
    if (HTTP_STATUS_AUTH_FAILED.includes(response.status) === true && refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        return fetcher<TRequestSchema, TResponseSchema>(props);
      }
    }

    if (response.status !== HTTP_STATUS_CODE.OK) {
      return responseSchema.parse({
        data: null,
        statusCode: response.status,
        success: response.ok,
        errors: response.statusText,
      });
    }

    const data = await response.json();
    return responseSchema.parse({
      data: {
        ...data,
        accesstoken: data.access_token // From headers instead of data
      },
      statusCode: 200,
      success: response.statusText === 'OK',
    });
  } catch (exception) {
    if (process.env.NODE_ENV === constants.shared.ENV.DEVELOPMENT) {
      throw exception;
    }

    return responseSchema.parse({
      data: null,
      statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      success: false,
      errors: 'Internal server error',
    });
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    if (!refreshToken) return null;

    const fetchUrl = constants.shared.API.BASE_URL + constants.routeApis.AUTH.REFRESH_TOKEN;
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');

    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Token refresh failed:', error);

    return null;
  }
}
