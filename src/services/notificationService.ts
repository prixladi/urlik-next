import { toast } from 'react-toastify';

const authServerError = (): void => {
  toast.error('Authorization server returned error response.');
};

const apiServerError = (): void => {
  toast.error('Aplication server returned error response.');
};

const loggedIn = (): void => {
  toast.success('Successfuly logged in.');
};

const loggedOut = (): void => {
  toast.info('You session expired please log in again.');
};

const loginNeeded = (): void => {
  toast.info('You need to login first.');
};

export { authServerError, apiServerError, loggedIn, loggedOut, loginNeeded };
