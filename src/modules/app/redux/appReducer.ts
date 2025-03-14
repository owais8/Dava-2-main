import { set } from 'lodash';

export interface IAppState extends TBaseState {
  isMinimized: boolean;
  workspaceCode: string;
}

export const defaultState: IAppState = {
  isMinimized: false,
  workspaceCode: '',
  loading: 'idle',
  requestId: '',
  error: undefined,
};

const reducers = {
  toggleSidebar: (state: IAppState) => {
    set(state, 'isMinimized', !state.isMinimized);
  },
  setWorkspaceCode: (state: IAppState, action: { payload: string }) => {
    set(state, 'workspaceCode', action.payload);
  },
  removeWorkspaceCode: (state: IAppState) => {
    set(state, 'workspaceCode', '');
  },
};

export default reducers;
