type Config = {
  url: string;
  clientId: string;
};

const getConfig = (): Config => ({
  url: window.config.authApiUrl,
  clientId: window.config.authApiClientId,
});

export default getConfig;
