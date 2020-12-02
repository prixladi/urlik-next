import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, LayoutProps, Input, FormErrorMessage, FormControlOptions, ThemingProps } from '@chakra-ui/react';

type Props = FormControlOptions &
  ThemingProps &
  InputHTMLAttributes<HTMLInputElement> &
  LayoutProps & {
    placeHolder: string;
    name: string;
  };

const InputField: React.FC<Props> = ({ placeHolder, size: _, ...props }: Props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <Input placeholder={placeHolder} {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
