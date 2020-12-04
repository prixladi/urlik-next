import getConfig from 'next/config';

const config = () => {
  const { publicRuntimeConfig } = getConfig();
  const { GOOGLE_CLIENT_ID } = publicRuntimeConfig;

  return { clientId: GOOGLE_CLIENT_ID };
};
export default config;