import { useSelector } from 'react-redux';

import type { IAppState } from './appReducer';
import type { RootState } from '@/storage';

export const useSelectorAppStore = (): IAppState => {
  return useSelector<RootState, IAppState>((state) => state.app);
};
