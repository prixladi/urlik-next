import React from 'react';
import { Heading, Button, Flex, Box } from '@chakra-ui/react';
import { InputField, InfoText } from '../components';
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
    <Heading mb={5} textAlign="center" fontSize={['2.4em', '3em', '3em', '3.5em']} as="h1">
      Shorten links, collect statistics
    </Heading>
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
