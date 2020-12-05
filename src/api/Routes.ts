import { getApiConfig } from '../configs';

const BaseUrl = (): string => getApiConfig().url;

const Urls = 'urls';
const UrlsAnonymous = 'urls/anonymous';
const Url = (id: string): string => `urls/${id}`;

export { BaseUrl, Urls, UrlsAnonymous, Url };
