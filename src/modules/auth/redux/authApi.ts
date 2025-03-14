/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { set } from 'lodash';

import constants from '@/constants';
import { axiosBaseQuery } from '@/lib';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({}),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: constants.routeApis.AUTH.ME,
        method: constants.shared.API_REQUEST_METHODS.GET,
      }),
      transformResponse: (response: TApiResponseBase<any>) => response.data,
    }),
  }),
});

/**
 * Generates a function comment for the given function body.
 *
 * @param {ActionReducerMapBuilder<any>} builder - The action reducer map builder.
 */
export const userProfileBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addMatcher(authApi.endpoints.getUserProfile.matchPending, (state, payload) => {
    set(state, 'loading', 'loading');
    set(state, 'requestId', payload);
  });
  builder.addMatcher(authApi.endpoints.getUserProfile.matchFulfilled, (state, payload) => {
    set(state, 'currentUser', payload);
    set(state, 'loading', 'idle');
    set(state, 'requestId', '');
  });
  builder.addMatcher(authApi.endpoints.getUserProfile.matchRejected, (state) => {
    set(state, 'loading', 'idle');
    set(state, 'requestId', '');
  });
};

export const { useGetUserProfileQuery } = authApi;
