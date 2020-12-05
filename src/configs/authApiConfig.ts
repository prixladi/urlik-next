import readConfig from 'next/config';

type Config = { url: string; clientId: string };

let config: Config;

const getConfig = (): Config => {
  if (config) {
    return config;
  }

  const { publicRuntimeConfig } = readConfig();
  const { AUTH_API_URL, AUTH_API_CLIENT_ID } = publicRuntimeConfig;

  return (config ??= { url: AUTH_API_URL, clientId: AUTH_API_CLIENT_ID });
};

export default getConfig;
