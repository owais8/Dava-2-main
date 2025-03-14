'use client';

import 'react-toastify/dist/ReactToastify.css';

import { Fragment } from 'react';

import { ToastContainer } from 'react-toastify';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: 'bg-success-dark',
    error: 'bg-error-dark',
    info: 'bg-info-dark',
    warning: 'bg-warning-dark',
    default: 'bg-secondary',
    dark: 'bg-secondary-dark',
  };

  return (
    <Fragment>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || 'default'] +
          ' relative flex items-center py-2 px-3 text-sm rounded-lg overflow-hidden'
        }
      />
    </Fragment>
  );
}
