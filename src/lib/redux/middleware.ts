/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MiddlewareAPI, UnknownAction } from '@reduxjs/toolkit';
import { isRejected, isRejectedWithValue } from '@reduxjs/toolkit';

import { isPayloadErrorMessage } from './helpers';

export const rtkQueryErrorLogger =
  (_api: MiddlewareAPI) => (next: any) => (action: UnknownAction) => {
    if (isRejected(action)) {
      if (action.error.name === 'CustomError') {
        console.error(action.error.message);
      }
    }

    if (isRejectedWithValue(action)) {
      if (isPayloadErrorMessage(action.payload)) {
        console.error(action.payload.data.error);
      }
    }

    return next(action);
  };
