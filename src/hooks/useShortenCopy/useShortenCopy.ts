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
import { Action, Handles, Values } from './types';
import { requiredText, maxLength, minLength, validatePath, validateUrl } from '../../utils/validation';
import * as yup from 'yup';
import { maxPathLength, minPathLength } from '../../constants';

type Errors = Partial<Values>;

const schema = yup.object().shape<any>({
  url: yup.string().required(requiredText('Url')).test(validateUrl),
  path: yup
    .string()
    .min(...minLength('Path', minPathLength))
    .max(...maxLength('Path', maxPathLength))
    .required(requiredText('Path'))
    .test(validatePath),
});

const validateErrorResponse = (error: ResponseError): Errors => {
  if (error.status === StatusCodes.BAD_REQUEST) {
    return { url: 'Url is not valid, provide valid url eg. https://google.com.' };
  }
  if (error.status === StatusCodes.CONFLICT) {
    return { path: 'Provided path is already occupied.' };
  }

  return { url: 'Server returned error, try again later.' };
};

const useShortenCopy = (router: NextRouter): Handles<Values> => {
  const onSubmmitShortenFactory = useCallback(
    (dispatch: Dispatch<Action>) => async (values: Values, { setErrors }: FormikHelpers<Values>) => {
      const url = values.url.includes('://') ? values.url : `http://${values.url}`;
      const result = await urlsService.create(url, values.path, router);
      if ((result as UrlDetailModel).id) {
        const model = result as UrlDetailModel;
        return dispatch({
          url: buildUrl(getUrlikConfig().url, { path: model.path }),
          type: 'shortened',
        });
      }

      const responseErrors = validateErrorResponse(result as ResponseError);
      return setErrors(responseErrors);
    },
    [router],
  );

  return useShortenCopyBase<Values>(onSubmmitShortenFactory, schema);
};

export default useShortenCopy;
