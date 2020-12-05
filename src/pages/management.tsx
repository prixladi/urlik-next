import React, { useEffect } from 'react';
import { Text, Heading, Button, Flex, Box, Grid } from '@chakra-ui/react';
import { InputField } from '../components';
import { useShortenCopy } from '../hooks';
import { useRouter } from 'next/router';
import { authorityManager } from '../clients';
import { authService, notificationService } from '../services';
import { Form as FormikForm } from '../components';
import { Values } from '../hooks/useShortenCopy/types';

const initialValues: Values = {
  url: '',
  path: '',
};

const Form = () => {
  const router = useRouter();
  const { url, onFormChange, onSubmit, buttonText, colorScheme, validationScheme } = useShortenCopy(router);

  return (
    <FormikForm<Values> validationScheme={validationScheme} onFormChange={onFormChange} onSubmit={onSubmit} initialValues={initialValues}>
      {({ isSubmitting }) => (
        <Grid gridGap="1em">
          <InputField value={url} variant="filled" h="3em" name="url" placeHolder="Link to shorten" />
          <Flex gridGap="1em">
            <InputField variant="filled" h="3em" name="path" placeHolder="Path to use (5-10 characters)" />
            <Button h="3em" borderRadius={0} type="submit" isLoading={isSubmitting} colorScheme={colorScheme}>
              {buttonText}
            </Button>
          </Flex>
        </Grid>
      )}
    </FormikForm>
  );
};

const Management: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!authorityManager.isUserLoggedIn()) {
      notificationService.loginNeeded();
      authService.logout(router);
    }
  }, [router]);

  return (
    <>
      <Heading mb={5} textAlign="center" fontSize={['2.4em', '3em', '3em', '3.5em']} as="h1">
        Url management and statistics
      </Heading>
      <Text fontSize={['1.3em', '1.4em', '1.4em', '1.5em']} fontWeight="300">
        Generate a shortcut for your link using your own shortcut. The path may consist of lowercase letters, uppercase letters, and
        numbers.
      </Text>
      <Box mt={10}>
        <Form />
      </Box>
    </>
  );
};

export default Management;
