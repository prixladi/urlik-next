type Config = {
  url: string;
};

const getConfig = (): Config => ({
  url: window.config.apiUrl,
});

export default getConfig;
