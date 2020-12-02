import { AuthApiConfig } from './configs';
import createManager from './authority';
import createClient from './api';

const authorityManager = createManager(AuthApiConfig);
const apiClient = createClient(authorityManager);

export { authorityManager, apiClient };
