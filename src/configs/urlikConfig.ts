import getConfig from 'next/config';

const config = () => {
  const { publicRuntimeConfig } = getConfig();
  const { URLIK_URL } = publicRuntimeConfig;

  return { url: URLIK_URL as string };
};
export default config;