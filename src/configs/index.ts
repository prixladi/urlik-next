import getApiConfig from './apiConfig';
import getAuthApiConfig from './authApiConfig';
import getGoogleConfig from './googleConfig';
import getUrlikConfig from './urlikConfig';

declare global {
  interface Window {
    config: {
      apiUrl: string;
      urlikUrl: string;
      authApiUrl: string;
      authApiClientId: string;
      googleClientId: string;
    };
  }
}

export { getApiConfig, getAuthApiConfig, getGoogleConfig, getUrlikConfig };
