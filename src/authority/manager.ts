import { _TokenGoogle } from './Routes';
import { GoogleLoginModel, TokensModel } from './models';
import { setTokens, unsetTokens } from './helpers';
import api, { tryRefreshToken } from './api';
import { Config } from './config';
import * as utils from './utils';

const any200 = (...additionCodes: number[]) => (status: number) => {
  const valid = status >= 200 && status < 300;
  return valid || additionCodes.length === 0 || additionCodes.includes(status);
};

type Result<TData = void> = {
  ok: boolean;
  status?: number;
  data?: TData;
};

type Callbacks = {
  onError: (err: unknown) => Promise<void>;
  onUnauthorized: () => Promise<void>;
};

const createManager = (getConfig: () => Config) => {
  const googleLogin = async (model: GoogleLoginModel, callbacks: Callbacks): Promise<Result<void>> => {
    const config = getConfig();
    const validateStatus = any200();
    const result = await api.post(`${_TokenGoogle}`, model, { config, ...callbacks, validateStatusCode: validateStatus });

    if (result) {
      const tokens = (await result.json()) as TokensModel;
      setTokens(tokens);
    }

    return { ok: result?.ok ?? false, status: result?.status };
  };

  const refreshToken = async (callbacks: Callbacks): Promise<boolean> => {
    const config = getConfig();
    return await tryRefreshToken({ config, ...callbacks, validateStatusCode: () => true });
  };

  const logout = () => {
    unsetTokens();
    return Promise.resolve();
  };

  const getTokens = () => {
    return {
      bearerToken: localStorage.getItem('bearerToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  };

  return {
    googleLogin,
    refreshToken,
    logout,
    getTokens,
    ...utils,
  };
};

export default createManager;
