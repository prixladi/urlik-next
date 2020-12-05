import { Form as FormikForm, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React, { FormEventHandler } from 'react';
import { ObjectSchema } from 'yup';

type Props<T extends FormikValues> = {
  validationScheme?: ObjectSchema<T>;
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  onFormChange: FormEventHandler;
  children: (props: FormikProps<T>) => React.ReactNode;
};

const Form = <T extends FormikValues>({ validationScheme, onSubmit, initialValues, onFormChange, children }: Props<T>): JSX.Element => (
  <Formik<T>
    validationSchema={validationScheme}
    validateOnBlur={false}
    validateOnChange={false}
    validateOnMount={false}
    onSubmit={onSubmit}
    initialValues={initialValues}
  >
    {(props) => <FormikForm onChange={onFormChange}>{children(props)}</FormikForm>}
  </Formik>
);

export default Form;
