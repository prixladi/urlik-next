import { NextRouter } from 'next/router';
import { UrlDetailModel, _Urls, _UrlsAnonymous } from '../api';
import { apiClient } from '../clients';

export type ResponseError = {
  status?: number;
};

const createAsAnonymous = async (url: string, router: NextRouter): Promise<UrlDetailModel | ResponseError> => {
  const response = await apiClient.post<UrlDetailModel>(_UrlsAnonymous, { url }, { router, expectedStatus: [200, 201, 400] });

  if (!response || response?.status === 400) {
    return {
      status: response?.status,
    };
  }

  return response.data;
};

const create = async (url: string, path: string, router: NextRouter): Promise<UrlDetailModel | ResponseError> => {
  const response = await apiClient.post<UrlDetailModel>(
    _Urls,
    { url, path },
    { router, expectedStatus: [200, 201, 400, 409], shouldAuth: true }
  );

  if (!response || response?.status >= 400) {
    return {
      status: response?.status,
    };
  }

  return response.data;
};

export { createAsAnonymous, create };
