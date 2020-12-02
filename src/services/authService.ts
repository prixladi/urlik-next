import { GoogleLoginModel } from '../authority';
import { _Index, _Management } from '../Routes';
import { authorityManager } from '../clients';
import { NextRouter } from 'next/router';
import { notificationService } from '.';

type Callbacks = {
  onUnauthorized: () => Promise<void>;
  onError: (err: any) => Promise<void>;
};

const createCallbacks = (router: NextRouter): Callbacks => ({
  onUnauthorized: () => {
    notificationService.loggedOut();
    router.push(_Index);
    return Promise.resolve();
  },
  onError: (err: any) => {
    notificationService.authServerError();
    console.error(err);
    return Promise.resolve();
  },
});

const googleLogin = async (model: GoogleLoginModel, router: NextRouter) => {
  const result = await authorityManager.googleLogin(model, createCallbacks(router));

  if (result.ok) {
    notificationService.loggedIn();
    router.push(_Management);
  }
};

const logout = async (router: NextRouter) => {
  await authorityManager.logout();
  router.push(_Index);
};

export { googleLogin, logout };
