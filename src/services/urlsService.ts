import { StatusCodes } from 'http-status-codes';
import { NextRouter } from 'next/router';
import { UrlDetailModel, Urls, UrlsAnonymous } from '../api';
import { apiClient } from '../clients';

const { OK, CREATED, BAD_REQUEST, CONFLICT } = StatusCodes;

export type ResponseError = {
  status?: number;
};

const createAsAnonymous = async (url: string, router: NextRouter): Promise<UrlDetailModel | ResponseError> => {
  const response = await apiClient.post<UrlDetailModel>(UrlsAnonymous, { url }, { router, expectedStatus: [OK, CREATED, BAD_REQUEST] });

  if (!response || response?.status === BAD_REQUEST) {
    return {
      status: response?.status,
    };
  }

  return response.data;
};

const create = async (url: string, path: string, router: NextRouter): Promise<UrlDetailModel | ResponseError> => {
  const response = await apiClient.post<UrlDetailModel>(
    Urls,
    { url, path },
    { router, expectedStatus: [OK, CREATED, BAD_REQUEST, CONFLICT], shouldAuth: true },
  );

  if (!response || response?.status >= BAD_REQUEST) {
    return {
      status: response?.status,
    };
  }

  return response.data;
};

export { createAsAnonymous, create };
