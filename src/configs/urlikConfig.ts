import readConfig from 'next/config';

type Config = { url: string };

let config: Config;

const getConfig = (): Config => {
  if (config) {
    return config;
  }

  const { publicRuntimeConfig } = readConfig();
  const { URLIK_URL } = publicRuntimeConfig;

  return (config ??= { url: URLIK_URL as string });
};

export default getConfig;
