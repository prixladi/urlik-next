import { FormikHelpers } from 'formik';
import { Dispatch } from 'react';

export type Action = {
  url?: string;
  type: 'shortened' | 'copied' | 'copiedTimeout' | 'changed';
};

export type State = {
  url?: string;
  value: 'write' | 'copy' | 'copied';
};

export type AnonymousValues = {
  url: string;
};

export type Values = AnonymousValues & {
  path: string;
};

export type OnSubmmitShorten<T = Values | AnonymousValues> = (values: T, { setErrors }: FormikHelpers<T>) => Promise<void>;

export type OnSubmmitShortenFactory<T = Values | AnonymousValues> = (dispatch: Dispatch<Action>) => OnSubmmitShorten<T>;

export type Handles<T = Values | AnonymousValues> = {
  onSubmit: (values: T, helpers: FormikHelpers<T>) => Promise<void> | void;
  onFormChange: () => void;
  buttonText: string;
  colorScheme: 'blue' | 'green' | string;
  url?: string;
};
