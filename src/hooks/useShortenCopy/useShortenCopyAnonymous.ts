import { NextRouter } from 'next/router';
import useShortenCopyBase from './useShortenCopyBase';
import buildUrl from 'build-url';
import { FormikHelpers } from 'formik';
import { StatusCodes } from 'http-status-codes';
import { Dispatch, useCallback } from 'react';
import { UrlDetailModel } from '../../api';
import { getUrlikConfig } from '../../configs';
import { urlsService } from '../../services';
import { ResponseError } from '../../services/urlsService';
import { Action, AnonymousValues, Handles } from './types';
import * as yup from 'yup';
import { requiredText, validateUrl } from '../../utils/validation';

const schema = yup.object().shape({
  url: yup.string().test(validateUrl).required(requiredText('url')),
});

const useShortenCopyAnonymous = (router: NextRouter): Handles<AnonymousValues> => {
  const onSubmmitShortenFactory = useCallback(
    (dispatch: Dispatch<Action>) => async (values: AnonymousValues, { setErrors }: FormikHelpers<AnonymousValues>) => {
      const url = values.url.includes('://') ? values.url : `http://${values.url}`;
      const result = await urlsService.createAsAnonymous(url, router);
      if ((result as UrlDetailModel).id) {
        const model = result as UrlDetailModel;
        return dispatch({
          url: buildUrl(getUrlikConfig().url, { path: model.path }),
          type: 'shortened',
        });
      }

      const error = result as ResponseError;
      if (error.status === StatusCodes.BAD_REQUEST) {
        return setErrors({ url: 'Url is not valid, provide valid url eg. https://google.com.' });
      }

      return setErrors({ url: 'Server returned error, try again later.' });
    },
    [router],
  );

  return useShortenCopyBase<AnonymousValues>(onSubmmitShortenFactory, schema);
};

export default useShortenCopyAnonymous;
