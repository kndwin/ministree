import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Tooltip, Toast } from '@minis/ui/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Tooltip.Provider>
      <Toast.Provider>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </Toast.Provider>
    </Tooltip.Provider>
  );
}
