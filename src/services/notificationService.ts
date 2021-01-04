import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const send = (options: UseToastOptions) => {
  const toast = createStandaloneToast();
  toast(options);
};

const authServerError = (): void => {
  send({ description: 'Authorization server returned error response.', status: 'error' });
};

const apiServerError = (): void => {
  send({ description: 'Aplication server returned error response.', status: 'error' });
};

const loggedIn = (): void => {
  send({ description: 'Successfuly logged in.', status: 'success' });
};

const loggedOut = (): void => {
  send({ description: 'You session expired please sign in again.', status: 'info' });
};

const loginNeeded = (): void => {
  send({ description: 'You need to login first.', status: 'info' });
};

export { authServerError, apiServerError, loggedIn, loggedOut, loginNeeded };
