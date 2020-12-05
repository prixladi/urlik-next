import React from 'react';
import { Button, Flex, Box } from '@chakra-ui/react';
import { InputField, InfoText, Headline } from '../components';
import { useShortenCopyAnonymous } from '../hooks';
import { useRouter } from 'next/router';
import { AnonymousValues } from '../hooks/useShortenCopy/types';
import { Form as FormikForm } from '../components';

const initialValues: AnonymousValues = {
  url: '',
};

const Form = () => {
  const router = useRouter();
  const { url, onFormChange, onSubmit, buttonText, colorScheme, validationScheme } = useShortenCopyAnonymous(router);

  return (
    <FormikForm<AnonymousValues>
      validationScheme={validationScheme}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ isSubmitting }) => (
        <Flex gridGap="1em">
          <InputField value={url} variant="filled" h="3em" name="url" placeHolder="Link to shorten" />
          <Button h="3em" borderRadius={0} type="submit" isLoading={isSubmitting} colorScheme={colorScheme}>
            {buttonText}
          </Button>
        </Flex>
      )}
    </FormikForm>
  );
};

const Index: React.FC = () => (
  <>
    <Headline>Shorten links, collect statistics</Headline>
    <InfoText>
      Generate a shortcut for your link or log in and choose your personal shortcut. As a logged user you can also gather additional
      statistics about your link shortcuts.
    </InfoText>
    <Box mt={10}>
      <Form />
    </Box>
  </>
);

export default Index;
