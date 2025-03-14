'use client';

import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(12, 4),
  backgroundColor: theme.palette.custom?.background2,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20),
  },
}));

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthContainer direction="column" justifyContent="center" alignItems="center">
      {children}
    </AuthContainer>
  );
}
