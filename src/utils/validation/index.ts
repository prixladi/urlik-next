import { TestContext, ValidationError } from 'yup';
import { getUrlikConfig } from '../../configs';
import { allowedPathCharacters } from '../../constants';

const maxLength = (name: string, max: number): [number, string] => [max, `${name} is too long (max ${max} characters).`];

const minLength = (name: string, min: number): [number, string] => [min, `${name} must be at least ${min} characters long.`];

const requiredText = (name: string): string => `${name} is required.`;

function validateUrl(this: TestContext<Record<string, string>>, value: string | undefined): boolean | ValidationError {
  // this should be validated by .required method
  if (!value) {
    return true;
  }

  const urlikUrl = new URL(getUrlikConfig().url);
  if (!value.includes('://') && value.includes('.')) {
    value = `http://${value}`;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return this.createError({ message: 'Url is not valid, provide valid url eg. https://google.com.' });
    }

    if (url.host == urlikUrl.host && url.port == urlikUrl.port) {
      return this.createError({ message: "You can't shorten Urlik url." });
    }

    return true;
  } catch (_) {
    return this.createError({ message: 'Url is not valid, provide valid url eg. https://google.com.' });
  }
}

function validatePath(this: TestContext<Record<string, string>>, value: string | undefined): boolean | ValidationError {
  // this should be validated by .required method
  if (!value) {
    return true;
  }

  const regex = new RegExp(`^[${allowedPathCharacters}]+$`);
  if (value.match(regex)) {
    return true;
  }

  return this.createError({ message: 'You can only use lowercase and upercase characters, numbers and underscore.' });
}

export { maxLength, minLength, requiredText, validateUrl, validatePath };
