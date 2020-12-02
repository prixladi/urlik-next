import { toast } from 'react-toastify';

const authServerError = () => {
  toast.error('Authorization server returned error response.');
};

const apiServerError = () => {
  toast.error('Aplication server returned error response.');
};

const loggedIn = () => {
  toast.success('Successfuly logged in.');
};

const loggedOut = () => {
  toast.info('You session expired please log in again.');
};

const loginNeeded = () => {
  toast.info('You need to login first.');
};

export {
    authServerError,
    apiServerError,
    loggedIn,
    loggedOut,
    loginNeeded
}
