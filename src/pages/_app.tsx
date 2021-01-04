import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import Layout from '../components/Layout';
import Head from 'next/head';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
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

export default App;
