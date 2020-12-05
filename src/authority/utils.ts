import jwt_decode from 'jwt-decode';

type UserProfile = {
  id: string;
  email: string;
  username?: string;
  givenName?: string;
  familyName?: string;
};

const idClaim = 'name';
const usernameClaim = 'username';
const emailClaim = 'email';
const givenNameClaim = 'given_name';
const familyNameClaim = 'family_name';

const getUserProfile = (): UserProfile | null => {
  const bearerToken = localStorage.getItem('bearerToken');
  if (!bearerToken) {
    return null;
  }

  const token = jwt_decode(bearerToken) as { [claim: string]: string };

  return {
    id: token[idClaim],
    email: token[emailClaim],
    username: token[usernameClaim],
    givenName: token[givenNameClaim],
    familyName: token[familyNameClaim],
  };
};

const isUserLoggedIn = (): boolean => localStorage.getItem('bearerToken') !== null;

export { getUserProfile, isUserLoggedIn };
