import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { init } from '@module-federation/runtime'

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
})

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to home!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
