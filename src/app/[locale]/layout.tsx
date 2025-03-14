import { CssBaseline, ThemeProvider } from '@mui/material';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

import { ToastProvider } from '@/components/ToastProvider';
import { cn } from '@/lib/utils';
import theme from '@/themes';

const inter = Inter({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

export { default as metadata } from '@constants/siteConfig';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
export default async function LocaleLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <NextTopLoader showSpinner={false} />
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NextIntlClientProvider messages={messages}>
              <ToastProvider>{children}</ToastProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
