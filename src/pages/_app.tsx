import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import Layout from '../components/Layout';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props<T> = {
  Component: React.FC<T>;
  pageProps: T;
};

const MyApp: React.FC<Props<any>> = ({ Component, pageProps }: Props<any>) => (
  <>
    <Head>
      <title>Urlik</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </ChakraProvider>
  </>
);

export default MyApp;
