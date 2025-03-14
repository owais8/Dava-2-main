import type { TAuthInfo } from '@/modules/auth';

export interface IAuthState extends TBaseState {
  userInfo: TAuthInfo;
}

export const defaultState: IAuthState = {
  userInfo: {} as TAuthInfo,
  loading: 'idle',
  requestId: '',
  error: undefined,
};

const reducers = {};

export default reducers;
