import readConfig from 'next/config';

type Config = { url: string };

let config: Config;

const getConfig = (): Config => {
  if (config) {
    return config;
  }

  const { publicRuntimeConfig } = readConfig();
  const { API_URL } = publicRuntimeConfig;

  return (config = { url: API_URL });
};

export default getConfig;
