import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Tooltip, Toast } from '@ui/react';
import { ReactNode } from 'react';

export default function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { getLayout: (page: ReactNode) => ReactNode } }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Tooltip.Provider>
      <Toast.Provider>
        <ThemeProvider attribute="class">
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Toast.Provider>
    </Tooltip.Provider>
  );
}
