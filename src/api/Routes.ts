import { ApiConfig } from '../configs';

const _BaseUrl = ApiConfig.url;

const _Urls = 'urls';
const _UrlsAnonymous = 'urls/anonymous';
const _Url = (id: string): string => `urls/${id}`;

export { _BaseUrl, _Urls, _UrlsAnonymous, _Url };
