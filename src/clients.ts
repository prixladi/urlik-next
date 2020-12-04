import { getAuthApiConfig } from './configs';
import createManager from './authority';
import createClient from './api';

const authorityManager = createManager(getAuthApiConfig);
const apiClient = createClient(authorityManager);

export { authorityManager, apiClient };
