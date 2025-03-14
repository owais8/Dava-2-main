import { createSlice } from '@reduxjs/toolkit';

import { userProfileBuilder } from './authApi';
import reducers, { defaultState } from './authReducer';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers,
  extraReducers: (builder) => {
    userProfileBuilder(builder);
  },
});

const extraActions = {
  ...actions,
};

export * from './authApi';
export * from './authSelector';
export { reducer as authReducer, extraActions as authActions };
