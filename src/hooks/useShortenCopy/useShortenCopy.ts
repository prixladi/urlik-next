import { NextRouter } from 'next/router';
import useShortenCopyBase from './useShortenCopyBase';
import buildUrl from 'build-url';
import { FormikHelpers } from 'formik';
import { StatusCodes } from 'http-status-codes';
import { Dispatch, useCallback } from 'react';
import { UrlDetailModel, _BaseUrl } from '../../api';
import { UrlikConfig } from '../../configs';
import { urlsService } from '../../services';
import { ResponseError } from '../../services/urlsService';
import { validateUrl } from '../../utils';
import { Action, Values } from './types';

const urlikUrl = new URL(UrlikConfig.url);

type Errors = Partial<Values>;

const validateValues = (url: URL | null, path: string): Errors | null => {
  const errors = {} as Errors;

  if (!url) {
    errors.url = 'Url is not valid, provide valid url eg. https://google.com.';
  } else if (url.host == urlikUrl.host && url.port == urlikUrl.port) {
    errors.url = "You can't shorten urlik url.";
  }

  if (path.length > 10 || path.length < 5) {
    errors.path = 'Path must be between 5 and 10 characters long.';
  }

  if (errors.url || errors.path) {
    return errors;
  }

  return null;
};

const useShortenCopyAnonymous = (router: NextRouter) => {
  const onSubmmitShortenFactory = useCallback(
    (dispatch: Dispatch<Action>) => async (values: Values, { setErrors }: FormikHelpers<Values>) => {
      const url = validateUrl(values.url, true);
      const errors = validateValues(url, values.path);
      if (errors) {
        return setErrors(errors);
      }

      const result = await urlsService.create(url!.href, values.path, router);
      if ((result as UrlDetailModel).id) {
        const model = result as UrlDetailModel;
        return dispatch({
          url: buildUrl(UrlikConfig.url, { path: model.path }),
          type: 'shortened',
        });
      }

      const error = result as ResponseError;
      if (error.status === StatusCodes.BAD_REQUEST) {
        return setErrors({ url: 'Url is not valid, provide valid url eg. https://google.com.' });
      }
      if (error.status === StatusCodes.CONFLICT) {
        return setErrors({ path: 'Provided path is already occupied.' });
      }

      return setErrors({ url: 'Server returned error, try again later.' });
    },
    []
  );

  return useShortenCopyBase<Values>(onSubmmitShortenFactory);
};

export default useShortenCopyAnonymous;
