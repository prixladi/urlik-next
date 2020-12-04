import getConfig from 'next/config';

const config = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_URL } = publicRuntimeConfig;

  return { url: API_URL };
};
export default config;
