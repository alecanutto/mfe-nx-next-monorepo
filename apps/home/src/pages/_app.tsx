import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { ThemeProvider } from '@mfe/shared/components';
import { Inter } from 'next/font/google';
import { init } from '@module-federation/runtime';
import RootLayout from '../components/RootLayout';

const inter = Inter({ subsets: ['latin'] });

const remotes = (isServer: boolean) => {
  const location = isServer ? 'ssr' : 'chunks';
  return [
    {
      name: 'checkout',
      entry: `http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    },
  ];
};

init({
  name: 'home',
  remotes: remotes(typeof window === 'undefined'),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <title>MFE Nextjs</title>
      </Head>
      <main className={inter.className}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </main>
    </ThemeProvider>
  );
}

export default CustomApp;
