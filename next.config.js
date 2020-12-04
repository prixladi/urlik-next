/**
 * @see {@link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration}
 */

module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    URLIK_URL: process.env.URLIK_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
    AUTH_API_CLIENT_ID: process.env.AUTH_API_CLIENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};
