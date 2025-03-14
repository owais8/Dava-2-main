import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { AuthProvider } from '@/components';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session} refetchOnWindowFocus={true}>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
