import readConfig from 'next/config';

type Config = { clientId: string };

let config: Config;

const getConfig = (): Config => {
  if (config) {
    return config;
  }

  const { publicRuntimeConfig } = readConfig();
  const { GOOGLE_CLIENT_ID } = publicRuntimeConfig;

  return (config ??= { clientId: GOOGLE_CLIENT_ID });
};

export default getConfig;
