type Config = {
  url: string;
};

const getConfig = (): Config => ({
  url: window.config.urlikUrl,
});

export default getConfig;
