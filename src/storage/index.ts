import type { Middleware } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import constants from '@/constants';
import { rtkQueryErrorLogger } from '@/lib';
import { appReducer } from '@/modules/app/redux';
import { authApi, authReducer } from '@/modules/auth';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const apiMiddleware: Middleware[] = [authApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  devTools: constants.shared.ENV.DEFAULT !== constants.shared.ENV.PRODUCTION,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      rtkQueryErrorLogger as Middleware,
      ...apiMiddleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
