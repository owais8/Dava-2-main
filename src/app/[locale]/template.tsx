'use client';

import { Provider } from 'react-redux';

import { store } from '@/storage';

export default function StorageProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
