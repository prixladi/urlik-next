type Config = {
  clientId: string;
};

const getConfig = (): Config => ({
  clientId: window.config.googleClientId,
});

export default getConfig;
