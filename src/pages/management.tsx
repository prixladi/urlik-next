import React, { useEffect } from 'react';
import { Text, Heading, Button, Flex, Box, Grid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components';
import { useShortenCopy } from '../hooks';
import { useRouter } from 'next/router';
import { authorityManager } from '../clients';
import { authService, notificationService } from '../services';

type Values = {
  url: string;
  path: string;
};

const initialValues: Values = {
  url: '',
  path: '',
};

const Management: React.FC = () => {
  const router = useRouter();
  const { url, onFormChange, onSubmit, buttonText, colorScheme } = useShortenCopy(router);

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
        <Formik<Values> onSubmit={onSubmit} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form onChange={onFormChange}>
              <Grid gridGap="1em">
                <InputField value={url} variant="filled" h="3em" name="url" placeHolder="Link to shorten" />
                <Flex gridGap="1em">
                  <InputField variant="filled" h="3em" name="path" placeHolder="Path to use (5-10 characters)" />
                  <Button h="3em" borderRadius={0} type="submit" isLoading={isSubmitting} colorScheme={colorScheme}>
                    {buttonText}
                  </Button>
                </Flex>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Management;
