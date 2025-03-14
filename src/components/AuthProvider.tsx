'use client';

import { Fragment } from 'react';

interface Props extends React.PropsWithChildren {}

export function AuthProvider({ children }: Props) {
  return <Fragment>{children}</Fragment>;
}
