/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { EntityError } from './types';

/**
 * Checks if the given error is an instance of FetchBaseQueryError.
 *
 * @param {unknown} error - The error to be checked.
 * @return {boolean} Returns true if the error is an instance of FetchBaseQueryError, false otherwise.
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

/**
 * Checks if the given error object has a 'message' property of type string.
 *
 * @param {unknown} error - The error object to check.
 * @return {boolean} Returns true if the error object has a 'message' property of type string, false otherwise.
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

/**
 * Checks if the given error is an EntityError.
 *
 * @param {unknown} error - The error to check.
 * @return {boolean} Returns true if the error is an EntityError, false otherwise.
 */
export function isEntityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  );
}

/**
 * Checks if the given payload is an object with the required structure
 * to be considered an error message payload.
 *
 * @param {unknown} payload - The payload to be checked.
 * @return {boolean} Returns true if the payload is a valid error message payload, otherwise false.
 */
export function isPayloadErrorMessage(payload: unknown): payload is {
  data: {
    error: string;
  };
  status: number;
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  );
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
