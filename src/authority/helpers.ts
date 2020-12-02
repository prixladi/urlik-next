import { TokensModel } from './models';

const getBearerToken = (): string | null => localStorage.getItem('bearerToken');

const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

const setTokens = (tokens: TokensModel): void => {
  localStorage.setItem('refreshToken', tokens.refreshToken);
  localStorage.setItem('bearerToken', tokens.bearerToken);
};

const unsetTokens = (): void => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('bearerToken');
};

export { getBearerToken, getRefreshToken, setTokens, unsetTokens };
