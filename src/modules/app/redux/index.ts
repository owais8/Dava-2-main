import { createSlice } from '@reduxjs/toolkit';

import reducers, { defaultState } from './appReducer';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers,
  extraReducers: (_builder) => {},
});

const extraActions = {
  ...actions,
};

export * from './appApi';
export * from './appSelector';
export { reducer as appReducer, extraActions as appActions };
