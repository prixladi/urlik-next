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
import { validateUrl } from '../../utils';
import { Action, AnonymousValues } from './types';

const useShortenCopyAnonymous = (router: NextRouter) => {
  const onSubmmitShortenFactory = useCallback(
    (dispatch: Dispatch<Action>) => async (values: AnonymousValues, { setErrors }: FormikHelpers<AnonymousValues>) => {
      const urlikUrl = new URL(getUrlikConfig().url);
      const errorModel = { url: 'Url is not valid, provide valid url eg. https://google.com.' };
      const url = validateUrl(values.url, true);

      if (!url) {
        return setErrors(errorModel);
      } else if (url.host == urlikUrl.host && url.port == urlikUrl.port) {
        return setErrors({ url: "You can't shorten urlik url." });
      }

      const result = await urlsService.createAsAnonymous(url.href, router);
      if ((result as UrlDetailModel).id) {
        const model = result as UrlDetailModel;
        return dispatch({
          url: buildUrl(getUrlikConfig().url, { path: model.path }),
          type: 'shortened',
        });
      }

      const error = result as ResponseError;
      if (error.status === StatusCodes.BAD_REQUEST) {
        return setErrors(errorModel);
      }

      return setErrors({ url: 'Server returned error, try again later.' });
    },
    []
  );

  return useShortenCopyBase<AnonymousValues>(onSubmmitShortenFactory);
};

export default useShortenCopyAnonymous;
