import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import Layout from '../components/Layout';
import Head from 'next/head';

type Props<T> = {
  Component: React.FC<T>;
  pageProps: T;
};

const MyApp = ({ Component, pageProps }: Props<never>): JSX.Element => (
  <>
    <Head>
      <title>Urlik</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="/config.js"></script>
    </Head>
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </>
);

export default MyApp;
