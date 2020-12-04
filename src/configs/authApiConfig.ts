import getConfig from 'next/config';

const config = () => {
  const { publicRuntimeConfig } = getConfig();
  const { AUTH_API_URL, AUTH_API_CLIENT_ID } = publicRuntimeConfig;
  
  return { url: AUTH_API_URL, clientId: AUTH_API_CLIENT_ID };
};
export default config;